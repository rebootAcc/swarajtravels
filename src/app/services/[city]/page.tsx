import Card from "@/components/Card";
import SubBanner from "@/components/SubBanner";
import WebsiteTemplate from "@/template/WebsiteTemplate";
import Image from "next/image";
import Link from "next/link";

async function getPackage(city: string) {
  try {
    const response = await fetch(
      `${process.env.API_URI}/api/packages?packageCity=${city}&packageActiveStatus=true`
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
      <section className="p-4 sm:p-10 xlg:p-20 flex flex-col gap-4 lg:gap-8">
        <h2 className="text-xl sm:text-3xl font-bold text-typeograph-1 capitalize">
          Most Popular Tour Packages {city}
        </h2>
        {packages.packages.length <= 0 ? (
          <div className="text-typeograph-1 font-bold text-4xl text-center place-self-center">
            More Packages Coming Soon. Stay Tuned
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center lg:justify-normal gap-4">
            {packages.packages.map((service: any) => (
              <Card key={service._id}>
                <div className="flex flex-col p-3 lg:p-5 !pb-0">
                  <div className="">
                    <Image
                      src={service.packageCover[0].path}
                      alt="service"
                      width={376}
                      height={408}
                      className="lg:h-[280px] xl:h-[400px] w-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-3 my-3 md:my-6">
                    <h2 className="text-typeograph-1 text-base lg:text-xl font-semibold">
                      {service.packageName}
                    </h2>
                    <p className="text-typeograph-2 text-sm lg:text-lg">
                      {service.packageDuration} days
                    </p>
                  </div>
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
        )}
      </section>
    </WebsiteTemplate>
  );
}
