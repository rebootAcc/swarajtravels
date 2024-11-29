import Banner from "@/features/Banner";
import CarouselContainer from "@/features/CarouselContainer";
import ContactForm from "@/features/ContactForm";
import OurServices from "@/features/OurServices";
import QuoteForm from "@/features/QuoteForm";
import WhyChooseUs from "@/features/WhyChooseUs";
import WebsiteTemplate from "@/template/WebsiteTemplate";

export default function Home() {
  return (
    <WebsiteTemplate>
      <CarouselContainer />
      <QuoteForm />
      <WhyChooseUs />
      <OurServices />
      <Banner />
      <ContactForm />
    </WebsiteTemplate>
  );
}
