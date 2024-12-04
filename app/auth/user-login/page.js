import UserSignIn from "@/components/auth/UserSignIn";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function UserLoginPage() {
  return (
    <>
      <Navbar />
      <UserSignIn />
      <Footer />
    </>
  );
}