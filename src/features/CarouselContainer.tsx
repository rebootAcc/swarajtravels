import Carousel from "@/components/Carousel";
import Image from "next/image";

export default function CarouselContainer() {
  const carouselData = [
    "/slider/carousel-image-2.jpeg",
    "/slider/carousel-image-3.jpeg",
    "/slider/carousel-image-4.jpeg",
    "/slider/carousel-image-5.jpeg",
    "/slider/carousel-image-6.jpeg",
    "/slider/carousel-image-7.jpeg",
    "/slider/carousel-image-8.jpeg",
    "/slider/carousel-image-9.jpeg",
  ];
  return (
    <Carousel autoplay={true}>
      {carouselData.map((imgsrc, key) => (
        <div className="overflow-hidden relative" key={key}>
          <Image
            src={imgsrc}
            width={1440}
            priority
            height={514}
            className="w-full h-[35vh] lg:h-[75vh] object-cover object-center"
            alt="carousel"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,_rgba(14,_39,_34,_0.00)_28%,_rgba(14,_39,_34,_0.65)_62.5%)] flex flex-col items-center justify-center">
            <h1 className="text-3xl lg:text-7xl font-semibold text-white">
              <span className="relative before:absolute before:content-[''] before:w-full before:h-1 before:bg-primary before:bottom-[25%]">
                Travel
              </span>{" "}
              far,{" "}
              <span className="relative before:absolute before:content-[''] before:w-full before:h-1 before:bg-primary before:bottom-[25%]">
                Travel
              </span>{" "}
              wide,
            </h1>
            <h3 className="lg:text-3xl text-xl text-white font-semibold">
              and let the journey redefine your life.
            </h3>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
