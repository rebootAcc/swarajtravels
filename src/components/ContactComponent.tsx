"use client";
import { FormEvent, useState } from "react";

export default function ContactComponent({
  normalHeading,
  highlightedHeading,
  currentLocation = "",
  queryFor,
}: {
  normalHeading: string;
  highlightedHeading: string;
  queryFor: string;
  currentLocation?: string; // Replace with the current location of the user
}) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>(queryFor);
  const [message, setMessage] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");
  const [packageLocation, setPackageLocation] =
    useState<string>(currentLocation);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let body = {};

    if (location === "flight_booking") {
      body = {
        leadName: name,
        leadPhoneNumber: phone,
        leadType: location,
        leadQuery: location,
        leadMessage: message,
        depertureDate: startDate,
        startPoint,
        endPoint,
      };
    } else if (location === "rail_booking") {
      body = {
        leadName: name,
        leadPhoneNumber: phone,
        leadType: location,
        leadQuery: location,
        leadMessage: message,
        depertureDate: startDate,
        startPoint,
        endPoint,
      };
    } else if (location === "tour_package") {
      body = {
        leadName: name,
        leadPhoneNumber: phone,
        leadType: location,
        leadQuery: location,
        leadMessage: message,
        leadPackage: packageLocation,
      };
    } else if (location === "car_rental") {
      body = {
        leadName: name,
        leadPhoneNumber: phone,
        leadType: location,
        leadQuery: location,
        leadMessage: message,
        depertureDate: startDate,
        startPoint,
        endPoint,
      };
    } else if (location === "bike_rental") {
      body = {
        leadName: name,
        leadPhoneNumber: phone,
        leadType: location,
        leadQuery: location,
        leadMessage: message,
        depertureDate: startDate,
        startPoint,
        endPoint,
      };
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (response.ok && result) {
        alert(
          "Your Query has been submitted successfully. Our team will contact you soon!"
        );
        setName("");
        setPhone("");
        setLocation(queryFor);
        setMessage("");
        setStartDate("");
        setPackageLocation("");
        setStartPoint("");
        setEndPoint("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[url('/assets/sticker-bg.jpg')] bg-cover bg-no-repeat flex-1 overflow-hidden">
      <div className="flex flex-col px-6 md:px-16 py-4 md:py-8 w-full bg-white/75 flex-1 gap-5">
        <h1 className="inline-flex flex-col gap-3 md:gap-6 text-xl sm:text-3xl font-bold text-center capitalize">
          <span className="text-typeograph-1">{normalHeading}</span>
          <span className="text-primary">{highlightedHeading}</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <div className="flex gap-2">
            {location === "tour_package" && (
              <select
                className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded text-[#aaa] flex-1"
                value={packageLocation}
                onChange={(e) => setPackageLocation(e.target.value)}
              >
                <option value="" className="text-typeograph-2">
                  Location
                </option>
                <option value="darjeeling" className="text-typeograph-2">
                  Darjeeling
                </option>
                <option value="sikkim" className="text-typeograph-2">
                  Sikkim
                </option>
                <option value="dooars" className="text-typeograph-2">
                  Dooars
                </option>
                <option value="kalimpong" className="text-typeograph-2">
                  Kalimpong
                </option>
                <option value="rajasthan" className="text-typeograph-2">
                  Rajasthan
                </option>
              </select>
            )}
          </div>
          {location !== "tour_package" && (
            <div className="flex gap-2">
              <input
                type="date"
                value={startDate}
                placeholder="Start date"
                onChange={(e) => setStartDate(e.target.value)}
                className="py-3 lg:py-5 px-4 lg:px-6 outline-none border border-dashed border-primary rounded flex-1"
              />
            </div>
          )}
          {location !== "tour_package" && (
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder={
                  location === "flight_booking" || location === "rail_booking"
                    ? "From"
                    : "Start Point"
                }
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
                className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded flex-1"
              />
              <input
                type="text"
                placeholder={
                  location === "flight_booking" || location === "rail_booking"
                    ? "To"
                    : "Drop Point"
                }
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
                className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded flex-1"
              />
            </div>
          )}
          {location === "tour_package" && (
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
            />
          )}
          <button
            type="submit"
            className="text-2xl text-white bg-primary lg:py-5 py-3 rounded"
          >
            Message
          </button>
        </form>
      </div>
    </div>
  );
}
