import Image from "next/image";

export default function Banner() {
  return (
    <section className="bg-[url('/assets/banner-cover.png')] bg-no-repeat bg-cover">
      <div className="px-4 sm:px-8 lg:px-16 bg-black/60 text-white flex flex-col md:flex-row items-end justify-between">
        <div className="flex flex-col gap-3 md:gap-5 md:w-[50%] py-4 sm:py-6 lg:py-10">
          <h1 className="font-bold text-2xl sm:text-4xl xl:text-7xl">
            A Truly Wonderful Experience - Testimonials
          </h1>
          <p className="text-sm md:text-xl">
            Our family vacation was an unforgettable experience, thanks to your
            exceptional service! From seamless bookings to personalized
            itineraries, everything was perfectly planned. The accommodations
            were top-notch, and the guided tours were informative and fun. We
            felt cared for every step of the way. Highly recommend for
            stress-free and memorable travels!
          </p>
          <span className="font-bold text-xl md:text-2xl">- Masud Rahaman</span>
          <div className="flex gap-2 md:gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="text-5xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 40"
                  fill="currentColor"
                  width="1em"
                  height="1em"
                >
                  <rect width="1em" height="1em" fill="#EF7237" />
                  <path
                    d="M20 5.92578L23.1598 15.6507H33.3852L25.1127 21.6611L28.2725 31.386L20 25.3757L11.7274 31.386L14.8873 21.6611L6.61474 15.6507H16.8402L20 5.92578Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src="/assets/banner-model.png"
            alt="model"
            width={524}
            height={784}
            className="w-[36.38vmax]"
          />
        </div>
      </div>
    </section>
  );
}
