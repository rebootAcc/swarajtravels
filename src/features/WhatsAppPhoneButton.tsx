"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa6";

const WhatssappPhoneButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
      setIsAnimated(true);
    } else {
      setIsVisible(false);
      setIsAnimated(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      setIsAnimated(true);
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed bottom-10 p-4 flex z-[100] left-0 justify-between w-fit items-end transition-opacity  ${
        isVisible ? "opacity-100" : "opacity-0 slidefromright"
      }`}
    >
      <div
        className={` md:flex sm:hidden flex-col gap-4  ${
          isAnimated ? "animate" : ""
        }`}
      >
        <div className="bg-green-700 text-2xl  border border-white  text-white rounded-full justify-center items-center flex w-[3rem] h-[3rem] cursor-pointer">
          <span>
            <Link
              href="https://api.whatsapp.com/send?phone=919339013347"
              target="_blank"
              rel="noopener"
            >
              <FaWhatsapp />
            </Link>
          </span>
        </div>
        <div className=" bg-red-600 text-2xl  border border-white text-white rounded-full justify-center items-center flex w-[3rem] h-[3rem] cursor-pointer">
          <span>
            <Link href="tel:+916297661559">
              <FaPhone className="w-6 h-6" />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WhatssappPhoneButton;
