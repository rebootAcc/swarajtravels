"use client";
import {
  motion,
  useCycle,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ContactComponent from "./ContactComponent";
export default function Navbar() {
  const navVariant = {
    start: {
      position: "relative",
    },
    stop: {
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
    },
  };
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isMenuOpen, toggleOpen] = useCycle(false, true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [availableCities, setAvailableCities] = useState([]);
  const [contactForm, setContactForm] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    latest > 0 ? setIsScrolled(true) : setIsScrolled(false);
  });

  const iconVariants = {
    open: {
      d: "M20.746 3.329a1 1 0 0 0-1.415 0l-7.294 7.294-7.294-7.294a1 1 0 1 0-1.414 1.414l7.294 7.294-7.294 7.294a1 1 0 0 0 1.414 1.415l7.294-7.295 7.294 7.295a1 1 0 0 0 1.415-1.415l-7.295-7.294 7.295-7.294a1 1 0 0 0 0-1.414Z",
    },
    closed: {
      d: "M12 17h7M5 12h14M5 7h14",
    },
  };

  const isActiveRoute = (href: string) => {
    return pathname === href ? true : false;
  };
  const getAllCities = async () => {
    try {
      const response = await fetch("/api/packages/cities");
      const results = await response.json();
      setAvailableCities(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCities();
  }, []);

  const memoizedCities = useMemo(() => availableCities, [availableCities]);

  const medimumLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: null,
      label: "Tour Packages",
      submenu: memoizedCities.map((city) => {
        return { href: `/services/${city}`, label: city };
      }),
    },
    {
      href: null,
      label: "Flight Ticket",
      handelClick: () => {
        setContactForm(true);
      },
    },
    {
      href: null,
      label: "Rail Ticket",
      handelClick: () => {
        setContactForm(true);
      },
    },
    {
      href: null,
      label: "Car Rental",
      handelClick: () => {
        setContactForm(true);
      },
    },
    {
      href: null,
      label: "Bike Rental",
      handelClick: () => {
        setContactForm(true);
      },
    },
  ];

  const smalllinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: null,
      label: "Tour Packages",
      submenu: memoizedCities.map((city) => {
        return { href: `/services/${city}`, label: city };
      }),
    },
    {
      href: null,
      label: "Flight Ticket",
      handelClick: () => {
        setContactForm(true);
        toggleOpen();
      },
    },
    {
      href: null,
      label: "Rail Ticket",
      handelClick: () => {
        setContactForm(true);
        toggleOpen();
      },
    },
    {
      href: null,
      label: "Car Rental",
      handelClick: () => {
        setContactForm(true);
        toggleOpen();
      },
    },
    {
      href: null,
      label: "Bike Rental",
      handelClick: () => {
        setContactForm(true);
        toggleOpen();
      },
    },
    {
      href: "/contact",
      label: "Contact Us",
    },
  ];

  useEffect(() => {
    toggleOpen();
  }, [pathname]);

  return (
    <motion.nav
      className="w-full flex items-center justify-between py-4 px-4 sm:px-10 xl:px-20 bg-white"
      variants={navVariant}
      animate={isScrolled ? "stop" : "start"}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={356}
          height={32.5}
          className="w-14 md:w-16"
        />
      </Link>
      <ul className="hidden lg:flex items-center gap-3 xl:gap-5">
        {medimumLinks.map((link, index) => (
          <li key={index} className="">
            {link.href ? (
              <Link
                href={link.href}
                className={`${
                  isActiveRoute(link.href)
                    ? "text-primary"
                    : "text-typeograph-1"
                } text-xl`}
              >
                {link.label}
              </Link>
            ) : (
              <div className="relative group">
                <button
                  type="button"
                  className="text-typeograph-1 text-xl"
                  onClick={link.handelClick || undefined}
                >
                  {link.label}
                </button>
                {link.submenu && (
                  <ul className="absolute hidden group-hover:flex flex-col gap-1 top-full left-0 z-50 w-full bg-white rounded-md shadow-custom-shadow px-1">
                    {link.submenu.map((submenu, subIndex) => (
                      <li
                        key={subIndex}
                        className={`p-2 capitalize ${
                          isActiveRoute(submenu.href)
                            ? "text-primary"
                            : "text-typeograph-1"
                        } text-lg`}
                      >
                        <Link href={submenu.href}>{submenu.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="relative">
        <button
          type="button"
          className="text-primary text-2xl relative z-[1000] lg:hidden"
          onClick={() => toggleOpen()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={"1em"}
            height={"1em"}
          >
            <motion.path
              initial={false}
              animate={isMenuOpen ? "open" : "closed"}
              variants={iconVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>
        </button>
        <Link
          href="/contact"
          className="font-semibold text-white bg-primary text-base rounded-full xl:text-xl hidden lg:inline-flex px-3 xl:px-5 py-2 xl:py-3"
        >
          Contact Us
        </Link>
      </div>
      <motion.div
        className="fixed z-[900] top-0 right-0 w-full h-screen overflow-hidden bg-white/75 backdrop-blur-sm block lg:hidden"
        initial={false}
        animate={isMenuOpen ? { width: "100%" } : { width: "0" }}
        transition={{ duration: 0.75, ease: "easeInOut", type: "spring" }}
      >
        <ul className="flex flex-col lg:hidden p-8 gap-3 xl:gap-5">
          {smalllinks.map((link, index) => (
            <li key={index} className="">
              {link.href ? (
                <Link
                  href={link.href}
                  className={`${
                    isActiveRoute(link.href)
                      ? "text-primary"
                      : "text-typeograph-1"
                  } text-xl`}
                >
                  {link.label}
                </Link>
              ) : (
                <div className="relative group">
                  <button
                    type="button"
                    className="text-typeograph-1 text-xl"
                    onClick={link.handelClick || undefined}
                  >
                    {link.label}
                  </button>
                  {link.submenu && (
                    <ul className=" hidden group-hover:flex flex-col gap-1 top-full left-0 z-50 w-full rounded-md px-1">
                      {link.submenu.map((submenu, subIndex) => (
                        <li
                          key={subIndex}
                          className={`p-2 capitalize ${
                            isActiveRoute(submenu.href)
                              ? "text-primary"
                              : "text-typeograph-1"
                          } text-lg`}
                        >
                          <Link href={submenu.href}>{submenu.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
      {contactForm && (
        <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black/40 z-[1100]">
          <div className="relative flex max-w-lg">
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
            />
          </div>
        </div>
      )}
    </motion.nav>
  );
}
