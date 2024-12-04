// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/authContext";
// import { useEffect } from "react";

// export const requireAuth = (role) => {
//   const { currentUser, role: userRole } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!currentUser || userRole !== role) {
      
//       router.push("/auth/provider-login");
//     }
//   }, [currentUser, userRole, router, role]);

//   return currentUser && userRole === role;
// };

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { useEffect } from 'react';

export const requireAuth = (role) => {
  const { currentUser, role: userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if the user is not authenticated or doesn't have the correct role
    if (!currentUser || userRole !== role) {
      router.push("/auth/provider-login");
    }
  }, [currentUser, userRole, router, role]);

  return currentUser && userRole === role;
};
