"use client";
import Card from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OurServices() {
  const services = [
    {
      label: "Flight Ticket",
      icon: "/services/flight-booking.jpg",
      handekClick: () => {
        return 0;
      },
    },
    {
      label: "Rail Ticket",
      icon: "/services/rail-booking.jpg",
      handekClick: () => {
        return 0;
      },
    },
    {
      label: "Bike Rental",
      icon: "/services/bike-rental-booking.jpg",
      handekClick: () => {
        return 0;
      },
    },
    {
      label: "Car Rental Service",
      icon: "/services/car-rental-booking.jpg",
      handekClick: () => {
        return 0;
      },
    },
    {
      label: "Hotel Booking Service",
      icon: "/services/hotel-booking.jpg",
      handekClick: () => {
        return 0;
      },
    },
  ];
  const [currentCity, setCurrentCity] = useState<string>("");
  const [allCities, setAllCities] = useState<string[]>([]);
  const getAllCities = async () => {
    try {
      const response = await fetch("/api/packages/cities");
      const results = await response.json();
      setAllCities(results);
      setCurrentCity(results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCities();
  }, []);

  return (
    <section className="p-4 sm:p-10 xlg:p-20 flex flex-col gap-4 lg:gap-8">
      <h2 className="text-xl sm:text-3xl font-bold text-typeograph-1">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center lg:justify-normal gap-4">
        <Card>
          <div className="flex flex-col flex-1 p-3 lg:p-5 !pb-0">
            <div className="relative">
              <Image
                src={"/services/packages.jpg"}
                alt="service"
                width={376}
                height={408}
                className="lg:h-[280px] xl:h-[400px] w-full object-cover rounded-lg"
              />
              <select
                name=""
                id=""
                value={currentCity}
                onChange={(e) => setCurrentCity(e.target.value)}
                className="absolute top-0 right-0 border rounded-md capitalize focus:outline-none p-1 cursor-pointer"
              >
                {allCities.map((city, index) => (
                  <option value={city} key={index}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="text-typeograph-1 text-base text-center lg:text-xl font-semibold my-3 md:my-8">
              Top Packages
            </h2>
          </div>
          <div className="inline-flex">
            <Link
              href={`/services/${currentCity}`}
              className="text-base flex-1 py-3 overflow-hidden text-center rounded-b-xl lg:text-xl font-semibold text-white bg-primary"
            >
              Click For More Details
            </Link>
          </div>
        </Card>
        {services.map((service, id) => (
          <Card key={id}>
            <div className="flex flex-col flex-1 p-3 lg:p-5 !pb-0">
              <div className="">
                <Image
                  src={service.icon}
                  alt="service"
                  width={376}
                  height={408}
                  className="lg:h-[280px] xl:h-[400px] w-full object-cover rounded-lg"
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
