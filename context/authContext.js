'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null); // To distinguish between 'User' and 'Service Provider'
  const [loading, setLoading] = useState(true);

  // Signup for Users
  const signUpUser = async ({ username, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user details to Firestore with role and uid
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,  // Add the user's UID
        username,
        email,
        role: 'User',
      });

      setCurrentUser(user);
      setRole('User');
    } catch (error) {
      console.error('Error signing up user: ', error);
    }
  };

  // Signup for Service Providers
  const signUpProvider = async ({ name, email, password, contact }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add provider details to Firestore with role and uid
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,  // Add the provider's UID
        name,
        email,
        contact,
        role: 'Service Provider',
      });

      setCurrentUser(user);
      setRole('Service Provider');
    } catch (error) {
      console.error('Error signing up service provider: ', error);
    }
  };

  // Login for Users
  const loginUser = async ({ username, password }) => {
    try {
      if (!username) {
        throw new Error('Username is required');
      }
  
      // Query Firestore for the user by username
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        throw new Error('Username not found');
      }
  
      const userDoc = querySnapshot.docs[0]; // Get the first matching document
      const userEmail = userDoc.data().email;
  
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, userEmail, password);
      const user = userCredential.user;
  
      setCurrentUser(user);
      setRole('User');
    } catch (error) {
      console.error('Error logging in user: ', error);
      throw error;
    }
  };

  // Login for Service Providers
  const loginProvider = async ({ email, password }) => {
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Fetch role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().role === 'Service Provider') {
        setCurrentUser(user);
        setRole('Service Provider');
      } else {
        throw new Error('Invalid credentials or not a Service Provider');
      }
    } catch (error) {
      console.error('Error logging in service provider: ', error);
      throw error;
    }
  };
  

  // Logout
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setRole(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            ...(userData.role === 'User' ? { username: userData.username } : { name: userData.name, contact: userData.contact }),
          });
          setRole(userData.role);
        }
      } else {
        setCurrentUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    role,
    signUpUser,
    signUpProvider,
    loginUser,
    loginProvider,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Hook for consuming the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
