"use client";
import Accordian from "@/components/Accordian";
import { useState } from "react";

interface PackageDescription {
  title: string;
  detail: string;
  _id: string;
}

// Define the props for the ServiceDetailsList component
interface ServiceDetailsListProps {
  packageDescriptions: PackageDescription[];
}

export default function ServiceDetailsList({
  packageDescriptions,
}: ServiceDetailsListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    // If the clicked accordion is already open, close it (set to null)
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-6">
      {packageDescriptions.map(
        (
          desc: { title: string; detail: string; _id: string },
          index: number
        ) => (
          <Accordian
            key={desc._id}
            data={desc}
            toggle={() => toggleAccordion(index)}
            isOpen={openIndex === index}
          />
        )
      )}
    </div>
  );
}
