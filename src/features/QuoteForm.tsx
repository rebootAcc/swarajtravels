"use client";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface ExampleCustomInputProps {
  value?: string; // Assuming 'value' is a string, you can change it to match your use case
  onClick?: () => void; // Function type for 'onClick'
  className?: string; // Optional className, as it's passed as a prop
}

const ExampleCustomInput = forwardRef<
  HTMLButtonElement,
  ExampleCustomInputProps
>(({ value, onClick, className }, ref) => (
  <button
    className={
      className + " text-typeograph-1 text-sm md:text-xl font-semibold"
    }
    onClick={onClick}
    ref={ref}
  >
    Date
  </button>
));

export default function QuoteForm() {
  const [location, setLocation] = useState<string>("darjeeling");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [number, setNumber] = useState<string>("974632793765");

  function formatDate(inputDate: Date | string | null) {
    if (!inputDate) {
      return;
    }
    const date = new Date(inputDate); // Create a Date object from the input string

    // Format the date to "Sat, 30 Nov 2024"
    return date.toLocaleDateString("en-IN", {
      weekday: "short", // Short weekday name (e.g., "Sat")
      day: "2-digit", // Day as two digits (e.g., "30")
      month: "short", // Abbreviated month (e.g., "Nov")
      year: "numeric", // Full year (e.g., "2024")
    });
  }

  const handleSubmit = () => {
    // Construct the WhatsApp message
    const whatsappMessage = `Location: ${location}\nMobile: ${number}\nDate: ${formatDate(
      startDate
    )}`;

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
    <section className="shadow-custom-shadow rounded-full px-9 py-6 my-6 mx-6 xl:mx-20 xl:my-10 hidden lg:block">
      <div className="flex justify-between">
        <div className="flex gap-2 lg:gap-4 items-center">
          <span className="rounded-full p-3 text-2xl text-primary border border-black/25 inline-flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="none"
            >
              <mask
                id="a"
                width="1em"
                height="1em"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
                style={{ maskType: "alpha" }}
              >
                <path fill="#D9D9D9" d="M0 0h24v24H0z" />
              </mask>
              <g mask="url(#a)">
                <path
                  fill="currentColor"
                  d="M12 22c-1.767 0-3.208-.28-4.325-.837C6.558 20.604 6 19.883 6 19c0-.4.12-.77.362-1.113.242-.341.58-.637 1.013-.887l1.575 1.475c-.15.067-.313.142-.487.225a1.228 1.228 0 0 0-.413.3c.217.267.717.5 1.5.7.783.2 1.6.3 2.45.3.85 0 1.67-.1 2.463-.3.791-.2 1.295-.433 1.512-.7a1.305 1.305 0 0 0-.45-.325A12.465 12.465 0 0 0 15 18.45l1.55-1.5c.467.267.825.57 1.075.913.25.341.375.72.375 1.137 0 .883-.558 1.604-1.675 2.163C15.208 21.72 13.767 22 12 22Zm.025-5.5c1.65-1.217 2.892-2.438 3.725-3.662.833-1.225 1.25-2.455 1.25-3.688 0-1.7-.542-2.983-1.625-3.85S13.167 4 12 4c-1.167 0-2.292.433-3.375 1.3C7.542 6.167 7 7.45 7 9.15c0 1.117.408 2.28 1.225 3.487.817 1.209 2.083 2.496 3.8 3.863ZM12 19c-2.35-1.733-4.104-3.417-5.263-5.05C5.58 12.317 5 10.717 5 9.15c0-1.183.213-2.22.638-3.113.425-.891.97-1.637 1.637-2.237a6.755 6.755 0 0 1 2.25-1.35A7.27 7.27 0 0 1 12 2c.817 0 1.642.15 2.475.45.833.3 1.583.75 2.25 1.35.667.6 1.212 1.346 1.637 2.237.426.892.638 1.93.638 3.113 0 1.567-.58 3.167-1.738 4.8S14.35 17.267 12 19Zm0-8c.55 0 1.02-.196 1.412-.588C13.804 10.021 14 9.55 14 9c0-.55-.196-1.02-.588-1.412A1.926 1.926 0 0 0 12 7c-.55 0-1.02.196-1.412.588A1.926 1.926 0 0 0 10 9c0 .55.196 1.02.588 1.412.391.392.862.588 1.412.588Z"
                />
              </g>
            </svg>
          </span>
          <div className="flex flex-col">
            <select
              name=""
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              id=""
              className="text-typeograph-1 text-sm md:text-xl font-semibold cursor-pointer focus:outline-none"
            >
              <option value="darjeeling">Darjeeling</option>
              <option value="sikkim">Sikkim</option>
              <option value="dooars">Dooars</option>
              <option value="kalimpong">Kalimpong</option>
              <option value="rajastan">Rajastan</option>
            </select>
            <span className="text-typeograph-2 text-sm md:text-base ps-1 capitalize">
              {location}, India
            </span>
          </div>
        </div>
        <div className="flex gap-2 lg:gap-4 items-center">
          <span className="rounded-full p-3 text-2xl text-primary border border-black/25 inline-flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="none"
            >
              <mask
                id="a"
                width="1em"
                height="1em"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
                style={{ maskType: "alpha" }}
              >
                <path fill="#D9D9D9" d="M0 0h24v24H0z" />
              </mask>
              <g mask="url(#a)">
                <path
                  fill="currentColor"
                  d="M5 22c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 0 1 3 20V6c0-.55.196-1.02.587-1.412A1.926 1.926 0 0 1 5 4h1V2h2v2h8V2h2v2h1c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412v14c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0 1 19 22H5Zm0-2h14V10H5v10ZM5 8h14V6H5v2Zm7 6a.968.968 0 0 1-.713-.287A.968.968 0 0 1 11 13c0-.283.096-.52.287-.713A.968.968 0 0 1 12 12c.283 0 .52.096.713.287.191.192.287.43.287.713s-.096.52-.287.713A.968.968 0 0 1 12 14Zm-4 0a.967.967 0 0 1-.713-.287A.968.968 0 0 1 7 13c0-.283.096-.52.287-.713A.967.967 0 0 1 8 12c.283 0 .52.096.713.287.191.192.287.43.287.713s-.096.52-.287.713A.967.967 0 0 1 8 14Zm8 0a.968.968 0 0 1-.713-.287A.968.968 0 0 1 15 13c0-.283.096-.52.287-.713A.968.968 0 0 1 16 12a.97.97 0 0 1 .712.287c.192.192.288.43.288.713s-.096.52-.288.713A.968.968 0 0 1 16 14Zm-4 4a.968.968 0 0 1-.713-.288A.968.968 0 0 1 11 17a.97.97 0 0 1 .287-.712A.968.968 0 0 1 12 16a.97.97 0 0 1 .713.288c.191.191.287.429.287.712s-.096.52-.287.712A.968.968 0 0 1 12 18Zm-4 0a.967.967 0 0 1-.713-.288A.968.968 0 0 1 7 17a.97.97 0 0 1 .287-.712A.967.967 0 0 1 8 16a.97.97 0 0 1 .713.288c.191.191.287.429.287.712s-.096.52-.287.712A.967.967 0 0 1 8 18Zm8 0a.968.968 0 0 1-.713-.288A.968.968 0 0 1 15 17a.97.97 0 0 1 .287-.712A.968.968 0 0 1 16 16c.283 0 .52.096.712.288.192.191.288.429.288.712s-.096.52-.288.712A.968.968 0 0 1 16 18Z"
                />
              </g>
            </svg>
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
              />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 13 13"
                  className="text-typeograph-1 text-sm md:text-xl"
                  fill="none"
                >
                  <mask
                    id="mask0_4_185"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="1em"
                    height="1em"
                  >
                    <rect width="1em" height="1em" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_4_185)">
                    <path
                      d="M6.5 8.34166L3.25 5.09166L4.00833 4.33333L6.5 6.825L8.99167 4.33333L9.75 5.09166L6.5 8.34166Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
            </div>
            <span className="text-typeograph-2 text-sm md:text-base ps-1">
              {formatDate(startDate)}
            </span>
          </div>
        </div>
        <div className="flex gap-2 lg:gap-4 items-center">
          <span className="rounded-full p-3 text-2xl text-primary border border-black/25 inline-flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask
                id="mask0_10_680"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1em"
                height="1em"
              >
                <rect width="1em" height="1em" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_10_680)">
                <path
                  d="M16 11V8H13V6H16V3H18V6H21V8H18V11H16ZM19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h2 className="text-typeograph-1 text-sm md:text-xl font-semibold">
                Mobile
              </h2>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 13 13"
                  className="text-typeograph-1 text-sm md:text-xl"
                  fill="none"
                >
                  <mask
                    id="mask0_4_185"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="1em"
                    height="1em"
                  >
                    <rect width="1em" height="1em" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_4_185)">
                    <path
                      d="M6.5 8.34166L3.25 5.09166L4.00833 4.33333L6.5 6.825L8.99167 4.33333L9.75 5.09166L6.5 8.34166Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
            </div>
            <input
              type="tel"
              className="text-typeograph-2 text-sm md:text-base ps-1 focus:outline-none"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="py-3 bg-primary text-sm md:text-xl font-semibold px-5 rounded-full text-white"
        >
          Get Quote
        </button>
      </div>
    </section>
  );
}
