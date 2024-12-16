import Card from "@/components/Card";
import Image from "next/image";
import Link from "next/link";

export default function HomePopularPackages({ packages }: { packages: any }) {
  return (
    <section className="p-4 sm:p-10 xlg:p-20 flex flex-col gap-4 lg:gap-8">
      <h2 className="text-xl sm:text-3xl font-bold text-typeograph-1 capitalize">
        Most Popular Tour Packages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center lg:justify-normal gap-4">
        {packages.map((service: any) => (
          <Card key={service._id}>
            <div className="flex flex-col p-3 flex-1 lg:p-5 !pb-0">
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
                View Details
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
