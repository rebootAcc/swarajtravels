import Link from "next/link";

export default function ContactDetails() {
  return (
    <section className="flex flex-col md:flex-row gap-6 p-4 sm:p-10 xlg:p-20">
      <div className="flex flex-col rounded-md overflow-hidden border border-primary md:w-1/2">
        <h1 className="text-xl sm:text-3xl font-semibold text-center text-white bg-primary py-5 xl:py-10">
          Contact Details
        </h1>
        <div className="flex flex-col gap-5 xl:gap-10 p-8">
          <div className="flex gap-5 items-start">
            <div className="bg-primary text-white rounded-full p-3 xl:p-4 text-xl xl:text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 92.25 122.88"
              >
                <path
                  d="M68.51 106.28c-5.59 6.13-12.1 11.62-19.41 16.06-.9.66-2.12.74-3.12.1-10.8-6.87-19.87-15.12-27-24.09C9.14 86.01 2.95 72.33.83 59.15-1.33 45.79.69 32.93 7.34 22.48c2.62-4.13 5.97-7.89 10.05-11.14C26.77 3.87 37.48-.08 48.16 0c10.28.08 20.43 3.91 29.2 11.92 3.08 2.8 5.67 6.01 7.79 9.49 7.15 11.78 8.69 26.8 5.55 42.02-3.1 15.04-10.8 30.32-22.19 42.82v.03zM46.12 23.76c12.68 0 22.95 10.28 22.95 22.95 0 12.68-10.28 22.95-22.95 22.95-12.68 0-22.95-10.27-22.95-22.95-.01-12.68 10.27-22.95 22.95-22.95z"
                  style={{
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                  }}
                />
              </svg>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-primary text-lg sm:text-2xl font-medium">
                Address:
              </h2>
              <Link
                href="https://maps.app.goo.gl/6RyL4uf6naKPTYyz6"
                referrerPolicy="no-referrer"
                target="_blank"
                className="text-typeograph-2 font-medium text-base sm:text-xl"
              >
                B R Ambedkar Rd, opp. Shantinagar Yuba Samity, Ward 36, Middle,
                Shanti Nagar, Dabgram, Siliguri, WB 734001
              </Link>
            </div>
          </div>
          <div className="flex gap-5 items-start">
            <div className="bg-primary text-white rounded-full p-3 xl:p-4 text-xl xl:text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 122.88 118.72"
              >
                <path d="M29.22 56.54c3.57 6.43 7.67 12.6 13.02 18.24 5.34 5.67 12 10.82 20.62 15.22.64.31 1.25.31 1.78.1.82-.31 1.66-.99 2.48-1.81.64-.64 1.43-1.66 2.26-2.77 3.31-4.36 7.42-9.77 13.21-7.07.13.06.23.13.35.19l19.33 11.11c.06.03.13.1.19.13 2.55 1.75 3.6 4.46 3.63 7.52 0 3.12-1.15 6.63-2.83 9.58-2.22 3.91-5.51 6.5-9.29 8.21-3.6 1.66-7.61 2.55-11.46 3.12-6.05.89-11.71.32-17.5-1.46-5.67-1.75-11.37-4.65-17.6-8.5l-.46-.29c-2.86-1.78-5.95-3.7-8.98-5.95-11.1-8.38-22.4-20.47-29.76-33.78C2.03 57.15-1.34 45.09.5 33.59c1.02-6.3 3.72-12.03 8.44-15.82 4.11-3.31 9.64-5.13 16.81-4.49.82.06 1.56.54 1.94 1.24l12.39 20.94c1.81 2.35 2.04 4.68 1.05 7.01-.82 1.91-2.48 3.67-4.74 5.31-.67.57-1.46 1.15-2.29 1.75-2.77 2.01-5.92 4.33-4.84 7.07l-.04-.06zM73.35 7.55c-.51-.04-.99-.18-1.42-.4-.45-.23-.84-.54-1.16-.91a3.92 3.92 0 0 1-.73-1.29c-.14-.46-.2-.95-.16-1.46l.01-.07c.04-.49.18-.95.39-1.36l.04-.07c.22-.42.52-.79.87-1.08A3.754 3.754 0 0 1 73.9 0l.1.01c3.43.27 6.74.79 9.92 1.55 3.21.77 6.27 1.8 9.16 3.05 2.91 1.27 5.65 2.78 8.2 4.52 2.54 1.74 4.91 3.71 7.06 5.9 2.13 2.17 4.06 4.56 5.77 7.15 1.69 2.57 3.16 5.34 4.4 8.28 1.2 2.88 2.18 5.94 2.92 9.18.72 3.17 1.21 6.5 1.45 9.98l.01.17v.18c0 .46-.08.91-.23 1.33-.16.45-.4.85-.71 1.2a3.779 3.779 0 0 1-2.41 1.26l-.2.02h-.19c-.47.01-.92-.07-1.34-.23-.44-.16-.85-.4-1.2-.71-.37-.32-.68-.72-.9-1.17-.21-.43-.35-.92-.38-1.42-.21-3.09-.63-6.03-1.26-8.8-.63-2.83-1.48-5.5-2.52-8.01a42.246 42.246 0 0 0-3.72-7.06 40.163 40.163 0 0 0-4.88-6.07 39.63 39.63 0 0 0-5.97-4.98 41.9 41.9 0 0 0-7.01-3.84l-.04-.02a47.895 47.895 0 0 0-7.88-2.61c-2.76-.63-5.66-1.08-8.7-1.31zm-8.32 35.66a3.87 3.87 0 0 1-1.41-.43 3.69 3.69 0 0 1-1.13-.94 3.97 3.97 0 0 1-.67-1.23c-.14-.42-.2-.87-.18-1.33.01-.13.01-.23.03-.35.07-.48.23-.93.45-1.32.23-.41.54-.77.9-1.06.36-.29.78-.52 1.23-.67.42-.13.87-.2 1.34-.18l.35.03c1.49.16 2.92.42 4.3.77 1.4.36 2.73.82 3.98 1.36l.04.02c1.27.56 2.46 1.21 3.57 1.96a21.315 21.315 0 0 1 5.69 5.67c.76 1.11 1.42 2.3 1.99 3.58.55 1.25 1.01 2.58 1.37 3.98.35 1.37.6 2.83.76 4.37.05.51 0 1.01-.13 1.47l-.01.04c-.14.46-.38.89-.67 1.26l-.01.02a3.78 3.78 0 0 1-2.54 1.36h-.05c-.49.04-.97-.01-1.42-.14-.48-.14-.92-.38-1.3-.69h-.01c-.38-.31-.7-.69-.94-1.14-.23-.42-.38-.9-.43-1.4v-.04c-.11-1.09-.29-2.13-.54-3.12-.25-1.01-.57-1.95-.95-2.82-.38-.87-.82-1.68-1.32-2.42a13.48 13.48 0 0 0-3.75-3.73c-.75-.5-1.57-.94-2.46-1.33l-.05-.02c-.87-.38-1.81-.69-2.8-.94-1.04-.29-2.11-.47-3.23-.59zm4-17.22h-.1l-.13-.02c-.47-.05-.91-.19-1.3-.39-.42-.22-.79-.51-1.1-.85a3.65 3.65 0 0 1-.73-1.23c-.15-.43-.23-.89-.22-1.38v-.17l.02-.16c.05-.46.19-.9.39-1.29.22-.42.51-.8.85-1.1.37-.33.8-.58 1.28-.75.46-.16.95-.23 1.46-.2 2.66.16 5.19.5 7.58 1.01 2.4.51 4.67 1.2 6.78 2.06 2.13.87 4.12 1.92 5.96 3.14a30.185 30.185 0 0 1 9.01 9.32c1.15 1.86 2.14 3.88 2.94 6.05a40.7 40.7 0 0 1 1.84 6.84c.43 2.4.69 4.93.77 7.62l.01.14c0 .48-.09.95-.27 1.38-.18.45-.44.85-.76 1.2-.33.36-.74.65-1.2.85-.43.2-.92.31-1.43.33h-.17a3.777 3.777 0 0 1-2.54-1.03c-.36-.34-.65-.74-.86-1.2-.2-.44-.31-.92-.33-1.44-.06-2.24-.28-4.35-.63-6.34-.35-2.01-.85-3.88-1.47-5.6a26.35 26.35 0 0 0-2.26-4.75 23.02 23.02 0 0 0-3.05-3.96 23.233 23.233 0 0 0-3.85-3.19c-1.42-.94-2.99-1.75-4.67-2.43l-.04-.02a33.92 33.92 0 0 0-5.47-1.63 42.92 42.92 0 0 0-6.25-.82l-.06.01z" />
              </svg>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-primary text-lg sm:text-2xl font-medium">
                Phone:
              </h2>
              <div className="flex flex-wrap gap-1">
                <Link
                  href="tel:+916297661559"
                  referrerPolicy="no-referrer"
                  target="_blank"
                  className="text-typeograph-2 font-medium text-base sm:text-xl"
                >
                  +91 6297661559
                </Link>
                <Link
                  href="tel:+919339013347"
                  referrerPolicy="no-referrer"
                  target="_blank"
                  className="text-typeograph-2 font-medium text-base sm:text-xl"
                >
                  +91 9339013347
                </Link>
                <Link
                  href="tel:+918900143969"
                  referrerPolicy="no-referrer"
                  target="_blank"
                  className="text-typeograph-2 font-medium text-base sm:text-xl"
                >
                  +91 8900143969
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-start">
            <div className="bg-primary text-white rounded-full p-3 xl:p-4 text-xl xl:text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                width="1em"
                height="1em"
                viewBox="0 0 510 512.459"
              >
                <path
                  fill="currentColor"
                  d="M435.689 74.468C387.754 26.471 324 .025 256.071 0 116.098 0 2.18 113.906 2.131 253.916c-.024 44.758 11.677 88.445 33.898 126.946L0 512.459l134.617-35.311c37.087 20.238 78.85 30.891 121.345 30.903h.109c139.949 0 253.88-113.917 253.928-253.928.024-67.855-26.361-131.645-74.31-179.643v-.012zm-179.618 390.7h-.085c-37.868-.011-75.016-10.192-107.428-29.417l-7.707-4.577-79.886 20.953 21.32-77.889-5.017-7.987c-21.125-33.605-32.29-72.447-32.266-112.322.049-116.366 94.729-211.046 211.155-211.046 56.373.025 109.364 22.003 149.214 61.903 39.853 39.888 61.781 92.927 61.757 149.313-.05 116.377-94.728 211.058-211.057 211.058v.011zm115.768-158.067c-6.344-3.178-37.537-18.52-43.358-20.639-5.82-2.119-10.044-3.177-14.27 3.178-4.225 6.357-16.388 20.651-20.09 24.875-3.702 4.238-7.403 4.762-13.747 1.583-6.343-3.178-26.787-9.874-51.029-31.487-18.86-16.827-31.597-37.598-35.297-43.955-3.702-6.355-.39-9.789 2.775-12.943 2.849-2.848 6.344-7.414 9.522-11.116s4.225-6.355 6.343-10.581c2.12-4.238 1.06-7.937-.522-11.117-1.584-3.177-14.271-34.409-19.568-47.108-5.151-12.37-10.385-10.69-14.269-10.897-3.703-.183-7.927-.219-12.164-.219s-11.105 1.582-16.925 7.939c-5.82 6.354-22.209 21.709-22.209 52.927 0 31.22 22.733 61.405 25.911 65.642 3.177 4.237 44.745 68.318 108.389 95.812 15.135 6.538 26.957 10.446 36.175 13.368 15.196 4.834 29.027 4.153 39.96 2.52 12.19-1.825 37.54-15.353 42.824-30.172 5.283-14.818 5.283-27.529 3.701-30.172-1.582-2.641-5.819-4.237-12.163-7.414l.011-.024z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-primary text-lg sm:text-2xl font-medium">
                WhatsApp
              </h2>
              <Link
                href="https://web.whatsapp.com/send?phone=919339013347"
                referrerPolicy="no-referrer"
                target="_blank"
                className="text-typeograph-2 font-medium text-base sm:text-xl"
              >
                +91 9339013347
              </Link>
            </div>
          </div>
          <div className="flex gap-5 items-start">
            <div className="bg-primary text-white rounded-full p-3 xl:p-4 text-xl xl:text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={"1em"}
                height={"1em"}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path fill="transparent" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M5.968 4h12.064c.439 0 .817 0 1.13.021.33.023.66.072.986.207a3 3 0 0 1 1.624 1.624c.135.326.184.656.207.986.021.313.021.691.021 1.13v8.064c0 .439 0 .817-.021 1.13-.023.33-.072.66-.207.986a3 3 0 0 1-1.624 1.624 3.073 3.073 0 0 1-.986.207c-.313.021-.691.021-1.13.021H5.968c-.439 0-.817 0-1.13-.021a3.072 3.072 0 0 1-.986-.207 3 3 0 0 1-1.624-1.624 3.07 3.07 0 0 1-.207-.986C2 16.85 2 16.471 2 16.032V7.968c0-.439 0-.817.021-1.13.023-.33.072-.66.207-.986a3 3 0 0 1 1.624-1.624 3.07 3.07 0 0 1 .986-.207C5.15 4 5.529 4 5.968 4Zm-1.65 2.278a1 1 0 0 1 1.41-.094l5.614 4.911a1 1 0 0 0 1.316 0l5.614-4.911a1 1 0 1 1 1.317 1.505L13.976 12.6a3 3 0 0 1-3.952 0L4.412 7.69a1 1 0 0 1-.095-1.411Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-primary text-lg sm:text-2xl font-medium">
                Email:
              </h2>
              <div className="flex flex-wrap gap-1">
                {[
                  "info@swarajtarvellers.com",
                  "b2b@swarajtarvellers.com",
                  "b2c@swarajtarvellers.com",
                  "swarajtarvellers@gmail.com",
                ].map((mail, index) => (
                  <Link
                    href={`mailto:${mail}`}
                    referrerPolicy="no-referrer"
                    target="_blank"
                    key={index}
                    className="text-typeograph-2 font-medium text-base sm:text-xl "
                  >
                    {mail}&nbsp;&nbsp;
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 h-64 md:h-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26358.719623245368!2d88.4169369!3d26.7086268!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441e04cb46fa1%3A0x7763262b109a52e8!2sSwaraj%20Travellers!5e1!3m2!1sen!2sin!4v1732616251886!5m2!1sen!2sin"
          width="100%"
          height="100%"
          className="border-none rounded-md"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
