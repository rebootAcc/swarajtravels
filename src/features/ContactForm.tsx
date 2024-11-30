import ContactComponent from "@/components/ContactComponent";
import Image from "next/image";

export default function ContactForm() {
  return (
    <section className="p-4 sm:p-10 xlg:p-20 flex flex-col gap-4 lg:gap-8">
      <h1 className="text-xl sm:text-3xl font-bold text-typeograph-1 md:max-w-[64%]">
        Enquire now and let us help you plan your next dream adventure— your
        journey begins here!
      </h1>
      <div className="border border-primary flex rounded-xl overflow-hidden">
        <div className="flex">
          <Image
            src="/assets/contact-cover.png"
            alt="contact"
            width={660}
            height={725}
            className="max-w-[45vw] xlg:max-w-[65vw] md:block hidden overflow-hidden object-cover"
          />
        </div>
        <ContactComponent
          normalHeading={"Still Confused?"}
          highlightedHeading={"Discuss Now"}
        />
      </div>
    </section>
  );
}
