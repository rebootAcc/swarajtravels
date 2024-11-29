import Accordian from "@/components/Accordian";
import Carousel from "@/components/Carousel";
import ContactComponent from "@/components/ContactComponent";
import DetailCard from "@/components/DetailCard";
import SubBanner from "@/components/SubBanner";
import WebsiteTemplate from "@/template/WebsiteTemplate";
import Image from "next/image";

async function getPackageDetails(pId: string) {
  try {
    const response = await fetch(`${process.env.API_URI}/api/packages/${pId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function ServiceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentPackage = await getPackageDetails(id);

  const cardData = [
    {
      title: "Itinerary of Tour",
      value: currentPackage._doc.packageIternary,
      icon: "/icons/iternary-of-tour-icon.png",
    },
    {
      title: "Places Covered",
      value: currentPackage._doc.packageCity,
      icon: "/icons/place-cover-icon.png",
    },
    {
      title: "Package Price",
      value: "₹" + " " + currentPackage._doc.packagePrice + " " + "/-",
      icon: "/icons/price-icon.png",
    },
  ];

  return (
    <WebsiteTemplate>
      <SubBanner
        heading="Services"
        subHeading={currentPackage._doc.packageCity}
      />
      <section className="p-4 sm:p-10 xl:p-20 flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="flex flex-col gap-4 sm:gap-8 xl:gap-16">
          <Carousel>
            {currentPackage._doc.packageCover.map(
              (imgsrc: { path: string }, key: number) => (
                <div className="overflow-hidden relative" key={key}>
                  <Image
                    src={imgsrc.path}
                    width={1440}
                    height={514}
                    className="w-full h-[35vh] lg:h-[75vh] object-cover object-center rounded-lg"
                    alt="carousel"
                  />
                </div>
              )
            )}
          </Carousel>
          <div className="flex flex-col gap-7">
            <h1 className="text-typeograph-1 text-lg sm:text-2xl xl:text-4xl font-bold">
              Day Wise Itinerary
            </h1>
            <div className="flex flex-col gap-6">
              {currentPackage._doc.packageDescriptions.map(
                (
                  desc: { title: string; detail: string; _id: string },
                  index: number
                ) => (
                  <Accordian
                    key={desc._id}
                    data={desc}
                    open={index === 0 ? true : false}
                  />
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 sm:gap-8 xl:gap-16">
          <div className="grid grid-cols-2 gap-4 lg:gap-6 place-items-stretch">
            {cardData.map((card, index) => (
              <DetailCard
                title={card.title}
                value={card.value}
                key={index}
                icon={card.icon}
              />
            ))}
          </div>
          <div className="border border-[#ccc] rounded overflow-hidden">
            <ContactComponent
              normalHeading={"Are You Think You Visit"}
              highlightedHeading={"Darjeeling?"}
            />
          </div>
        </div>
      </section>
    </WebsiteTemplate>
  );
}
