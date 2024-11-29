import SubBanner from "@/components/SubBanner";
import ContactDetails from "@/features/ContactDetails";
import ContactForm from "@/features/ContactForm";
import WebsiteTemplate from "@/template/WebsiteTemplate";

export default function Contact() {
  return (
    <WebsiteTemplate>
      <SubBanner heading="Contact Us" />
      <ContactDetails />
      <ContactForm />
    </WebsiteTemplate>
  );
}
