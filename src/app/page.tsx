import Banner from "@/features/Banner";
import CarouselContainer from "@/features/CarouselContainer";
import ContactForm from "@/features/ContactForm";
import HomePopularPackages from "@/features/HomePopularPackages";
import OurServices from "@/features/OurServices";
import QuoteForm from "@/features/QuoteForm";
import WhyChooseUs from "@/features/WhyChooseUs";
import WebsiteTemplate from "@/template/WebsiteTemplate";

async function getAllPackages() {
  try {
    const response = await fetch(
      `${process.env.API_URI}/api/packages?packageActiveStatus=true`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const packages = await getAllPackages();

  return (
    <WebsiteTemplate>
      <CarouselContainer />
      <QuoteForm />
      <WhyChooseUs />
      <OurServices />
      <HomePopularPackages packages={packages.packages} />
      <Banner />
      <ContactForm />
    </WebsiteTemplate>
  );
}
