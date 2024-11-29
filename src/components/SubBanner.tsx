import Image from "next/image";

export default function SubBanner({
  heading,
  subHeading,
}: {
  heading?: string;
  subHeading?: string;
}) {
  return (
    <header className="relative">
      <Image
        src="/assets/carousel-image-1.png"
        alt="banner"
        width={1440}
        height={250}
        className="w-full h-64 object-cover"
      />
      <div className="bg-black/50 flex items-center justify-center w-full h-full absolute top-0 left-0">
        <h1 className="text-white text-2xl lg:text-4xl font-semibold capitalize">
          Home {heading && `| ${heading}`} {subHeading && `| ${subHeading}`}
        </h1>
      </div>
    </header>
  );
}
