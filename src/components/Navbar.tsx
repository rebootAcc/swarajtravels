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
        return 0;
      },
    },
    {
      href: null,
      label: "Rail Ticket",
      handelClick: () => {
        return 0;
      },
    },
    {
      href: null,
      label: "Car Rental",
      handelClick: () => {
        return 0;
      },
    },
    {
      href: null,
      label: "Bike Rental",
      handelClick: () => {
        return 0;
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
        return 0;
      },
    },
    {
      href: null,
      label: "Rail Ticket",
      handelClick: () => {
        return 0;
      },
    },
    {
      href: null,
      label: "Car Rental",
      handelClick: () => {
        return 0;
      },
    },
    {
      href: null,
      label: "Bike Rental",
      handelClick: () => {
        return 0;
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
    </motion.nav>
  );
}
