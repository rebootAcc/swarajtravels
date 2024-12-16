"use client";
import Card from "@/components/Card";
import ContactComponent from "@/components/ContactComponent";
import useClickOutSide from "@/hooks/useClickOutSide";
import Image from "next/image";
import { useState } from "react";

export default function RentalCardList({ rentals }: { rentals: any }) {
  const [contactForm, setContactForm] = useState<boolean>(false);
  const [queryFor, setQueryFor] = useState<string>("");

  const contactBoxRef = useClickOutSide(() => setContactForm(false));
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-center lg:justify-normal gap-4">
      {rentals.map((service: any) => (
        <Card key={service._id}>
          <div className="flex flex-col p-3 lg:p-5 !pb-0">
            <div className="">
              <Image
                src={service.rentalCover[0].path}
                alt="service"
                width={376}
                height={408}
                className="lg:h-[280px] xl:h-[400px] w-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3 my-3 md:my-6">
              <h2 className="text-typeograph-1 text-base lg:text-xl font-semibold">
                {service.rentalName}
              </h2>
              <div className="justify-between flex">
                <p className="text-typeograph-2 text-sm lg:text-lg">
                  Season Price / day
                </p>
                <p className="text-typeograph-2 text-sm lg:text-lg">
                  ₹ {service.rentalSeasonPrice}
                </p>
              </div>
              <div className="justify-between flex">
                <p className="text-typeograph-2 text-sm lg:text-lg">
                  Off. Season Price / day
                </p>
                <p className="text-typeograph-2 text-sm lg:text-lg">
                  ₹ {service.rentalOffSeasonPrice}
                </p>
              </div>
            </div>
          </div>
          <div className="inline-flex">
            <button
              type="button"
              onClick={() => {
                console.log(service.rentalType);
                service.rentalType === "bike"
                  ? setQueryFor("bike_rental")
                  : setQueryFor("car_rental");
                setContactForm(true);
              }}
              className="text-base flex-1 py-3 overflow-hidden text-center rounded-b-xl lg:text-xl font-semibold text-white bg-primary"
            >
              Click For More Details
            </button>
          </div>
        </Card>
      ))}
      {contactForm && (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black/40 z-[1100]">
          <div className="relative flex max-w-lg" ref={contactBoxRef}>
            <button
              type="button"
              onClick={() => setContactForm(false)}
              className="text-2xl text-typeograph-1 absolute top-3 right-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 30 30"
                fill="currentColor"
              >
                <path d="M25.0701 4.93919C19.5226 -0.608309 10.4933 -0.608309 4.9458 4.93919C2.25858 7.62746 0.77832 11.2009 0.77832 15.0013C0.77832 18.8018 2.25858 22.3752 4.9458 25.0624C7.72011 27.8367 11.364 29.2233 15.0079 29.2233C18.6518 29.2233 22.2958 27.8367 25.0701 25.0624C30.6176 19.5149 30.6176 10.4877 25.0701 4.93919ZM23.5116 23.5038C18.8227 28.1927 11.1932 28.1927 6.50431 23.5038C4.23376 21.2333 2.98274 18.2132 2.98274 15.0013C2.98274 11.7894 4.23376 8.76935 6.50431 6.49769C11.1932 1.80883 18.8227 1.80995 23.5116 6.49769C28.1993 11.1865 28.1993 18.8161 23.5116 23.5038Z" />
                <path d="M19.7574 18.0479L16.637 14.9319L19.7574 11.816C20.1873 11.3861 20.1873 10.6884 19.7585 10.2574C19.3276 9.82532 18.6299 9.82643 18.1989 10.2563L15.0763 13.3745L11.9538 10.2563C11.5228 9.82643 10.8251 9.82532 10.3942 10.2574C9.96431 10.6883 9.96431 11.3861 10.3953 11.816L13.5157 14.9319L10.3953 18.0479C9.96431 18.4777 9.96431 19.1754 10.3942 19.6064C10.6091 19.8224 10.8924 19.9294 11.1746 19.9294C11.4567 19.9294 11.7389 19.8213 11.9538 19.6075L15.0764 16.4893L18.199 19.6075C18.4139 19.8224 18.6961 19.9294 18.9783 19.9294C19.1232 19.9295 19.2667 19.901 19.4006 19.8456C19.5345 19.7902 19.6562 19.7089 19.7586 19.6064C20.1884 19.1754 20.1884 18.4777 19.7574 18.0479Z" />
              </svg>
            </button>
            <ContactComponent
              normalHeading="Want to Rent?"
              highlightedHeading="Discuss Now"
              queryFor={queryFor}
            />
          </div>
        </div>
      )}
    </div>
  );
}
