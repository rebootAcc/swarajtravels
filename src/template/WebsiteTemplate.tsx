import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatssappPhoneButton from "@/features/WhatsAppPhoneButton";
import { ReactNode } from "react";

export default function WebsiteTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <WhatssappPhoneButton />
      <Footer />
    </>
  );
}
