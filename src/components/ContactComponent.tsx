"use client";
import { FormEvent, useState } from "react";

export default function ContactComponent({
  normalHeading,
  highlightedHeading,
  currentLocation = "",
}: {
  normalHeading: string;
  highlightedHeading: string;
  currentLocation?: string; // Replace with the current location of the user
}) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [location, setLocation] = useState<string>(currentLocation);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Construct the WhatsApp message
    const whatsappMessage = `Name: ${name}\nMobile: ${phone}\nEmail: ${email}\nQuery: ${location}`;

    // Encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Replace with your actual WhatsApp number, including country code, without "+" or "00"
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const whatsappUrl = isDesktop
      ? `https://web.whatsapp.com/send?phone=919339013347&text=${encodedMessage}`
      : ` https://api.whatsapp.com/send?phone=919339013347&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-[url('/assets/sticker-bg.jpg')] bg-cover bg-no-repeat flex-1 overflow-hidden">
      <div className="flex flex-col px-6 md:px-16 py-4 md:py-10 w-full bg-white/75 flex-1 gap-5 md:gap-12">
        <h1 className="inline-flex flex-col gap-3 md:gap-6 text-xl sm:text-3xl font-bold text-center capitalize">
          <span className="text-typeograph-1">{normalHeading}</span>
          <span className="text-primary">{highlightedHeading}</span>
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3 lg:py-6 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="py-3 lg:py-6 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 lg:py-6 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <select
            className="py-3 lg:py-6 px-4 lg:px-8 outline-none border border-dashed border-primary rounded text-[#aaa]"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="Tour Package" className="text-typeograph-2">
              Tour Package
            </option>
            <option value="Flight Ticket" className="text-typeograph-2">
              Flight Ticket
            </option>
            <option value="Rail Ticket" className="text-typeograph-2">
              Rail Ticket
            </option>
            <option value="Car Rental" className="text-typeograph-2">
              Car Rental
            </option>
            <option value="Bike Rental" className="text-typeograph-2">
              Bike Rental
            </option>
          </select>
          <input
            type="text"
            placeholder="Message"
            className="py-3 lg:py-6 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <button
            type="submit"
            className="text-2xl text-white bg-primary lg:py-6 py-3 rounded"
          >
            Message
          </button>
        </form>
      </div>
    </div>
  );
}
