"use client";
import { FormEvent, useState } from "react";

export default function GeneralForm() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadName: name,
          leadPhoneNumber: phone,
          leadType: "general",
          leadEmail: email,
          leadQuery: location,
          leadMessage: message,
        }),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[url('/assets/sticker-bg.jpg')] bg-cover bg-no-repeat flex-1 overflow-hidden">
      <div className="flex flex-col px-6 md:px-16 py-4 md:py-8 w-full bg-white/75 flex-1 gap-5">
        <h1 className="inline-flex flex-col gap-3 md:gap-6 text-xl sm:text-3xl font-bold text-center capitalize">
          <span className="text-typeograph-1">Still Confused?</span>
          <span className="text-primary">Discuss Now</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <select
            className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded text-[#aaa] flex-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="tour_package" className="text-typeograph-2">
              Tour Package
            </option>
            <option value="flight_booking" className="text-typeograph-2">
              Flight Ticket
            </option>
            <option value="rail_booking" className="text-typeograph-2">
              Rail Ticket
            </option>
            <option value="car_rental" className="text-typeograph-2">
              Car Rental
            </option>
            <option value="bike_rental" className="text-typeograph-2">
              Bike Rental
            </option>
          </select>
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="py-3 lg:py-5 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
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
