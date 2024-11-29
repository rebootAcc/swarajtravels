import Card from "@/components/Card";
import Image from "next/image";
import Link from "next/link";

export default function HomePopularPackages({ packages }: { packages: any }) {
  return (
    <section className="p-4 sm:p-10 xl:p-20 flex flex-col gap-4 lg:gap-8">
      <h2 className="text-xl sm:text-3xl font-bold text-typeograph-1 capitalize">
        Most Popular Tour Packages
      </h2>
      <div className="flex flex-wrap justify-center lg:justify-normal gap-4">
        {packages.map((service: any) => (
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
  );
}
