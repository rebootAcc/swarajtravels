"use client";
import Card from "@/components/Card";
import Image from "next/image";

export default function OurServices() {
  const services = [
    {
      label: "Flight Ticket",
      icon: "/services/flight-booking.png",
      handekClick: () => {
        return 0;
      },
    },
    {
      label: "Rail Ticket",
      icon: "/services/rail-booking.png",
      handekClick: () => {
        return 0;
      },
    },
    {
      label: "Bike Ticket",
      icon: "/services/bike-rental-booking.png",
      handekClick: () => {
        return 0;
      },
    },
    {
      label: "Hotel Booking Service",
      icon: "/services/hotel-booking.png",
      handekClick: () => {
        return 0;
      },
    },
  ];
  return (
    <section className="p-4 sm:p-10 xl:p-20 flex flex-col gap-4 lg:gap-8">
      <h2 className="text-xl sm:text-3xl font-bold text-typeograph-1">
        Our Services
      </h2>
      <div className="flex flex-wrap justify-center lg:justify-normal gap-4">
        {services.map((service, id) => (
          <Card key={id}>
            <div className="flex flex-col p-3 lg:p-5 !pb-0">
              <div className="">
                <Image
                  src={service.icon}
                  alt="service"
                  width={376}
                  height={408}
                  className="lg:h-[400px] lg:w-[376px] object-cover rounded-lg"
                />
              </div>
              <h2 className="text-typeograph-1 text-base text-center lg:text-xl font-semibold my-3 md:my-8">
                {service.label}
              </h2>
            </div>
            <div className="inline-flex">
              <button
                type="button"
                className="text-base flex-1 py-3 overflow-hidden rounded-b-xl lg:text-xl font-semibold text-white bg-primary"
              >
                Click For More Details
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
