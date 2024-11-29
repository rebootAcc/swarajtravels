import Image from "next/image";
import Link from "next/link";

export default function SideHeader() {
  const sideheader = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 18 20"
          fill="currentColor"
        >
          <path d="M17.4622 7.64647C17.4622 6.02565 16.1436 4.70702 14.5227 4.70702H13.932V1.17187H14.5227V0H7.46221V1.17187H8.05303V4.12163C7.75046 4.1396 7.45218 4.22714 7.18624 4.39495L7.02636 4.48948L7.06686 4.3082C7.37288 3.08535 6.32757 1.82957 5.10894 1.86445C3.84999 1.82968 2.85109 3.1296 3.15101 4.3082L3.19152 4.48948L3.03164 4.39495C1.96047 3.72769 0.447501 4.32987 0.102502 5.50186C-0.316091 6.69264 0.604844 8.03846 1.8216 8.11909L2.00648 8.13655L1.86719 8.25936C0.900899 9.06666 1.00836 10.6997 2.0148 11.3872C2.76933 11.9643 3.84468 11.8462 4.52273 11.2674V17.6465H5.69948V20H9.22487V17.6465H12.76V20H16.2854V17.6465H17.4622V7.64647H17.4622ZM9.62791 4.70702C9.50662 4.5895 9.37124 4.48745 9.22487 4.40319V3.52538H12.7601V4.70702H9.62791ZM12.7601 1.17187V2.35351H9.22487V1.17187H12.7601ZM2.70363 10.4392C2.25781 10.1263 2.27367 9.44744 2.64226 9.13838L4.05273 7.89479L3.80191 7.12928L1.93199 6.95245C1.44004 6.91815 1.05113 6.38038 1.21707 5.86401C1.37332 5.34151 2.03613 5.15198 2.43523 5.40366L4.05277 6.36011L4.70464 5.88675L4.29476 4.05265C4.17816 3.52292 4.61597 3.02417 5.10898 3.03636C5.65421 3.02347 6.03929 3.59538 5.92319 4.05265L5.51335 5.88679L6.16546 6.36003L7.78268 5.4037C8.25042 5.12913 8.8601 5.3914 9.00084 5.86405C9.16678 6.38042 8.77792 6.91819 8.28592 6.95249L6.41601 7.12932L6.16519 7.89483L7.57565 9.13842C7.99003 9.49186 7.91034 10.1662 7.51428 10.4392C7.07444 10.7566 6.44284 10.5529 6.25819 10.0956L5.51183 8.37108H4.70613L3.95976 10.0956C3.755 10.6011 3.07718 10.7274 2.70363 10.4392ZM5.69464 16.4747V11.2687C6.02476 11.5501 6.44698 11.718 6.87733 11.7552V16.4747H5.69952H5.69464ZM8.05303 18.8282H6.8714V17.6465H8.05303V18.8282ZM8.04917 16.4747V11.4929C8.10234 11.4605 8.15371 11.4253 8.20303 11.3873C9.24108 10.6746 9.28788 9.03865 8.35065 8.25944L8.21135 8.13663L8.3962 8.11916C9.51737 8.04553 10.3307 6.92971 10.2033 5.87905H13.932V5.87889H13.9368V16.4747H8.04917ZM15.1136 18.8282H13.9319V17.6465H15.1136V18.8282ZM16.2903 16.4747H15.1087V5.97913C15.7961 6.22143 16.2903 6.87717 16.2903 7.64647V16.4747Z" />
          <path d="M4.52246 6.5408H5.69434V7.71268H4.52246V6.5408Z" />
        </svg>
      ),
      name: "Tour Package",
      link: "/admin/dashboard",
    },
  ];

  return (
    <aside>
      <div
        className={` flex flex-col gap-4 h-screen overflow-hidden bg-[white] shadow-[5px_0px_8px_0px_rgba(0,0,0,0.05)] transition-all duration-300 z-50 `}
      >
        <div className="flex justify-center items-center mt-4 border-b p-2 pb-4 border-[#00000033]">
          <Image
            height={48}
            width={48}
            src="/logo.png"
            alt="Clinic Logo"
            className="xlg:h-[3rem] h-[2.5rem]"
          />
        </div>
        <div className="flex flex-col xl:gap-4 gap-4 mt-2 p-1 xl:p-2 xlg:px-4 ">
          {sideheader.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-start"
              //   onClick={() => handleIconClick(index)}
            >
              <div
                className={`flex items-center rounded-lg w-full hover:bg-[#eee] pr-3 xl:pr-6`}
                style={{
                  transition: "background-color 0.5s ease, width 0.5s ease",
                }}
              >
                <span
                  className={`p-2 rounded-md xlg:text-2xl text-base text-primary`}
                >
                  {item.icon}
                </span>
                {item.link ? (
                  <Link
                    href={item.link}
                    className={`xlg:text-base xxl:text-xl xl:text-sm text-xs font-semibold cursor-pointer hover:text-primary text-typeograph-1 ml-2`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    className={`xlg:text-base xxl:text-xl xl:text-sm text-xs font-semibold cursor-pointer hover:text-primary text-typeograph-1 ml-2`}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
