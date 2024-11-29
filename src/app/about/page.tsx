import SubBanner from "@/components/SubBanner";
import Banner from "@/features/Banner";
import ContactForm from "@/features/ContactForm";
import WhyChooseUs from "@/features/WhyChooseUs";
import WebsiteTemplate from "@/template/WebsiteTemplate";

export default function About() {
  return (
    <WebsiteTemplate>
      <SubBanner heading="About Us" />
      <WhyChooseUs />
      <Banner />
      <ContactForm />
    </WebsiteTemplate>
  );
}
