import Card from "@/components/Card";
import SubBanner from "@/components/SubBanner";
import WebsiteTemplate from "@/template/WebsiteTemplate";
import Image from "next/image";
import Link from "next/link";

async function getPackage(city: string) {
  try {
    const response = await fetch(
      `${process.env.API_URI}/api/packages?packageCity=${city}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default async function Services({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const city = (await params).city;
  const packages = await getPackage(city);
  return (
    <WebsiteTemplate>
      <SubBanner heading="Services" />
      <section className="p-4 sm:p-10 xl:p-20 flex flex-col gap-4 lg:gap-8">
        <h2 className="text-xl sm:text-3xl font-bold text-typeograph-1 capitalize">
          Most Popular Tour Packages {city}
        </h2>
        <div className="flex flex-wrap justify-center lg:justify-normal gap-4">
          {packages.packages.map((service: any) => (
            <Card key={service._id}>
              <div className="flex flex-col p-3 lg:p-5 !pb-0">
                <div className="">
                  <Image
                    src={service.packageCover[0].path}
                    alt="service"
                    width={376}
                    height={408}
                    className="lg:h-[400px] lg:w-[376px] object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-typeograph-1 text-base text-center lg:text-xl font-semibold my-3 md:my-8">
                  {service.packageName}
                </h2>
              </div>
              <div className="inline-flex">
                <Link
                  href={`/services/details/${service._id}`}
                  className="text-base flex-1 py-3 overflow-hidden text-center rounded-b-xl lg:text-xl font-semibold text-white bg-primary"
                >
                  Click For More Details
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </WebsiteTemplate>
  );
}
