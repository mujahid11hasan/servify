import ProviderSignIn from "@/components/auth/ProviderSignIn";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ProviderLoginPage() {
  return (
    <>
      <Navbar />
      <ProviderSignIn />
      <Footer />
    </>
  );
}