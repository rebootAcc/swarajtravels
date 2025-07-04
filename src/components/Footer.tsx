"use client";
import useClickOutSide from "@/hooks/useClickOutSide";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContactComponent from "./ContactComponent";

export default function Footer() {
  const [contactForm, setContactForm] = useState<boolean>(false);
  const [queryFor, setQueryFor] = useState<string>("");

  const contactBoxRef = useClickOutSide(() => setContactForm(false));

  const services = [
    {
      label: "Darjeeling Tour Packages",
      href: "/services/darjeeling",
    },
    {
      label: "Sikkim Tour Packages",
      href: "/services/sikkim",
    },
    {
      label: "Dooars Tour Packages",
      href: "/services/dooars",
    },
    {
      label: "Kalimpong Tour Packages",
      href: "/services/kailmpong",
    },
    {
      label: "Rajasthan Tour Packages",
      href: "/services/rajhastan",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ];

  const quickLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Bike Rental",
      href: "/rental/bike",
    },
    {
      label: "Car Rental",
      href: "/rental/car",
    },
    {
      label: "Rail Ticket",
      handleClick: () => {
        setQueryFor("rail_booking");
        setContactForm(true);
      },
    },
    {
      label: "Flight Ticket",
      handleClick: () => {
        setQueryFor("flight_booking");
        setContactForm(true);
      },
    },
  ];

  const socialLinks = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="currentColor"
        >
          <path d="M24.485 12.318C24.485 5.515 19.005 0 12.245 0 5.48.002 0 5.515 0 12.32c0 6.146 4.477 11.241 10.328 12.165v-8.607H7.222V12.32h3.11V9.603c0-3.086 1.828-4.79 4.623-4.79 1.34 0 2.741.24 2.741.24v3.03h-1.544c-1.52 0-1.994.95-1.994 1.924v2.31h3.394l-.541 3.56h-2.854v8.607c5.851-.925 10.328-6.02 10.328-12.166Z" />
        </svg>
      ),
      href: "https://www.facebook.com/share/1BBqFPLz1i/",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="currentColor"
        >
          <path d="M14.303 12.54a1.96 1.96 0 1 1-1.91-1.995 1.983 1.983 0 0 1 1.91 1.995Z" />
          <path d="M15.714 6.407H9.073a2.478 2.478 0 0 0-2.478 2.477v6.791a2.478 2.478 0 0 0 2.478 2.478h6.641a2.478 2.478 0 0 0 2.478-2.478V8.897a2.48 2.48 0 0 0-2.478-2.49Zm-3.321 9.454a3.31 3.31 0 1 1 3.234-3.309 3.27 3.27 0 0 1-3.234 3.31Zm3.594-6.617a.607.607 0 0 1-.607-.62.62.62 0 1 1 1.239 0 .606.606 0 0 1-.682.62h.05Z" />
          <path d="M12.393 0a12.243 12.243 0 1 0-.123 24.485A12.243 12.243 0 0 0 12.393 0Zm7.435 15.55a4.15 4.15 0 0 1-4.175 4.176H9.135a4.152 4.152 0 0 1-4.176-4.174v-6.52a4.15 4.15 0 0 1 4.175-4.175h6.52a4.15 4.15 0 0 1 4.174 4.174v6.52Z" />
        </svg>
      ),
      href: "https://www.instagram.com/travelsden_official?igsh=b2J6M2x4MGNvZmpk",
    },
  ];

  return (
    <footer className="bg-[url('/assets/footer-bg.png')] bg-no-repeat bg-cover bg-center">
      <div className="flex flex-col bg-black/65 gap-6 lg:gap-11 text-white backdrop-blur-sm p-4 sm:p-10 xlg:p-20">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <div className="flex flex-col lg:items-start gap-4 lg:max-w-xs">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                className="w-[24.7vmax] lg:w-[10vmax]"
                width={351}
                height={351}
              />
            </Link>
            <h3 className="text-base font-semibold text-[#d1d1d1]">
              Travels Den are the one of the oldest Tour Operator, Flight
              Ticket, Rail Ticket, Bike &amp; Car Rental Service Provider in
              Siliguri.
            </h3>
            <div className="flex flex-col gap-5">
              <h2 className="flex items-center gap-2 text-white font-semibold text-xl">
                <span>Contact Info</span>
                <span className="flex-1 h-0.5 bg-white max-w-[40%]" />
              </h2>
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-start gap-3 text-white text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="none"
                    className="text-xl text-primary"
                  >
                    <path
                      fill="currentColor"
                      d="M6.5.772C2.906.772 0 3.746 0 7.422c0 1.653.464 3.202 1.31 4.599.881 1.462 2.042 2.716 2.934 4.18.436.712.752 1.377 1.086 2.146.241.523.436 1.425 1.17 1.425s.929-.902 1.16-1.424c.344-.77.65-1.435 1.087-2.147.892-1.454 2.052-2.708 2.934-4.18.855-1.398 1.319-2.946 1.319-4.6 0-3.676-2.906-6.65-6.5-6.65Zm0 9.263c-1.281 0-2.321-1.064-2.321-2.375S5.219 5.285 6.5 5.285c1.281 0 2.321 1.064 2.321 2.375s-1.04 2.375-2.321 2.375Z"
                    />
                  </svg>
                  <Link
                    href="https://maps.app.goo.gl/mKoGM3G5MNJe4pX1A"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="text-base lg:text-lg font-semibold"
                  >
                    DAK GHAR SARANI POST OFFICE ROAD, NJP, BHAKTINAGAR DIST -
                    JALPAIGURI SILIGURI Pin-734007
                  </Link>
                </div>
                <div className="inline-flex items-center gap-3 text-white text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="none"
                    className="text-xl text-primary"
                  >
                    <path
                      fill="currentColor"
                      d="M13.5.772h-12C.675.772.007 1.504.007 2.397L0 12.147c0 .894.675 1.626 1.5 1.626h12c.825 0 1.5-.732 1.5-1.625v-9.75c0-.894-.675-1.626-1.5-1.626Zm0 3.25-6 4.063-6-4.063V2.397l6 4.063 6-4.063v1.625Z"
                    />
                  </svg>
                  <Link
                    href="mailTo:travelsden.official@gmail.com"
                    className="text-base lg:text-lg font-semibold"
                  >
                    travelsden.official@gmail.com
                  </Link>
                </div>
                <div className="inline-flex items-center gap-3 text-white text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={"1em"}
                    height={"1em"}
                    fill="none"
                    stroke="currentColor"
                    className="text-xl text-primary"
                  >
                    <path d="M17.71 8.783c0-4.996-3.951-8.39-8.346-8.39-4.35 0-8.346 3.321-8.346 8.444-.556.31-.927.892-.927 1.565v1.82c0 1.001.834 1.82 1.854 1.82h.928v-5.55c0-3.522 2.902-6.37 6.49-6.37 3.59 0 6.492 2.848 6.492 6.37v6.46H8.436v1.82h7.418c1.02 0 1.855-.819 1.855-1.82v-1.11a1.68 1.68 0 0 0 .927-1.492v-2.093c0-.637-.38-1.192-.927-1.474Z" />
                    <path d="M6.582 10.402a.919.919 0 0 0 .927-.91.919.919 0 0 0-.927-.91.919.919 0 0 0-.927.91c0 .503.415.91.927.91Zm5.563 0a.919.919 0 0 0 .928-.91.919.919 0 0 0-.928-.91.919.919 0 0 0-.927.91c0 .503.415.91.927.91Z" />
                    <path d="M14.927 7.7c-.445-2.594-2.745-4.578-5.517-4.578-2.81 0-5.833 2.284-5.591 5.87 2.29-.92 4.015-2.922 4.506-5.36a7.465 7.465 0 0 0 6.602 4.067Z" />
                  </svg>
                  <h3 className="text-base lg:text-lg font-semibold">
                    <Link href="tel:+919339013347">+91 93390 13347</Link> /{" "}
                    <Link href="tel:+916297661559">+91 62976 61559</Link> /{" "}
                    <Link href="tel:+918900143969">+91 89001 43969</Link> /{" "}
                    <Link href="tel:+918918065464">+91 89180 65464</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 xl:gap-12">
            <h2 className="text-xl lg:text-2xl text-left font-semibold">
              Our Services
            </h2>
            <ul className="flex flex-col gap-3 lg:flex-1 justify-between">
              {services.map((service, id) => (
                <li
                  className="hover:text-primary text-base lg:text-lg font-semibold whitespace-nowrap"
                  key={id}
                >
                  <Link href={service.href}>
                    &gt;&nbsp;&nbsp;{service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 xl:gap-12">
            <h2 className="text-xl lg:text-2xl text-left font-semibold">
              Quick Links
            </h2>
            <ul className="flex flex-col justify-between lg:flex-1 gap-3">
              {quickLinks.map((link, id) => (
                <li
                  className="hover:text-primary text-base lg:text-lg font-semibold whitespace-nowrap"
                  key={id}
                >
                  {link.href ? (
                    <Link href={link.href}>&gt;&nbsp;&nbsp;{link.label}</Link>
                  ) : link.handleClick ? (
                    <button type="button" onClick={link.handleClick}>
                      &gt;&nbsp;&nbsp;{link.label}
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68232.31428117937!2d88.38845581078961!3d26.718175919316817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4419ddbd461ed%3A0x16d266792a4b85b5!2sRabindra%20sarani%20post%20office!5e1!3m2!1sen!2sin!4v1750399549283!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-none rounded-md"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="">
              <iframe
                src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fswarajtravellersslg%2Fposts%2F572574742368668&show_text=true"
                width="100%"
                height="100%"
                className="border-none"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
            <div className="flex gap-4 items-center">
              {socialLinks.map((social, index) => (
                <Link
                  href={social.href}
                  target="_blank"
                  className="text-2xl text-white"
                  referrerPolicy="no-referrer"
                  key={index}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-0.5 bg-white/40" />
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <h1 className="text-base text-center">
            Copyright 2024{" "}
            <Link href="/" className="font-bold">
              Travels Den
            </Link>{" "}
            | All Rights Reserved.{" "}
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Refund Policy", href: "#" },
              { label: "Terms & Conditions", href: "#" },
            ].map((extra, index) => (
              <Link href={extra.href} key={index}>
                {extra.label} <span>{"| "}</span>
              </Link>
            ))}
          </h1>
          <h1 className="text-base text-center">
            Design &amp; Developed By:{" "}
            <Link
              href="https://rebootai.in/"
              target="_blank"
              className="font-bold"
            >
              Reboot AI Pvt. Ltd.
            </Link>
          </h1>
        </div>
      </div>
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
              normalHeading="Want to book you travel?"
              highlightedHeading="Discuss Now"
              queryFor={queryFor}
            />
          </div>
        </div>
      )}
    </footer>
  );
}
