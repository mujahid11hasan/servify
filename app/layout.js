import { Cabin as cabinFont } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from "@/context/authContext";

const cabin = cabinFont({ subsets: ["latin"] });

export const metadata = {
  title: "Servify-Home Service",
  description: "Servify-Home Service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cabin.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
