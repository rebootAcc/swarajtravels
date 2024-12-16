"use client";

import ViewDetails from "@/components/ViewDetails";
import { IoClose } from "react-icons/io5";

export default function ViewPackageDetails({
  packageData,
  setIsViewOpen,
}: {
  packageData: any;
  setIsViewOpen: any;
}) {
  const closeView = () => {
    setIsViewOpen(false); // Close the view
  };

  return (
    <ViewDetails setIsViewOpen={setIsViewOpen}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{packageData.packageName}</h2>
        <button onClick={closeView} className="text-xl text-gray-500">
          <IoClose />
        </button>
      </div>
      <div className="mt-4">
        <p>
          <strong>Package ID:</strong> {packageData.packageId}
        </p>
        <p>
          <strong>Price:</strong> ₹ {packageData.packagePrice}
        </p>
        <p>
          <strong>Duration:</strong> {packageData.packageDuration} Days
        </p>
        <p>
          <strong>City:</strong> {packageData.packageCity}
        </p>
        <p>
          <strong>Itinerary:</strong> {packageData.packageIternary}
        </p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Package Descriptions:</h3>
          <ul className="flex flex-col gap-2">
            {packageData.packageDescriptions.map((desc: any, index: number) => (
              <li
                key={index}
                className="flex flex-col border border-[#333333] p-2 rounded-sm gap-2 "
              >
                <div className="  border-b border-[#33333397]">
                  {desc.title}
                </div>
                <div className="  "> {desc.detail}</div>
              </li>
            ))}
          </ul>
        </div>
        {packageData.packageSeatDetails ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Seat Details:</h3>
            <img
              src={packageData.packageSeatDetails.path}
              alt="Package Seat Details"
              className="w-full h-auto mt-2"
            />
          </div>
        ) : (
          <p>No seat details available.</p>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Package Cover:</h3>
          {packageData.packageCover.map((cover: any, index: number) => (
            <img
              key={index}
              src={cover.path}
              alt={`Cover ${index + 1}`}
              className="w-full  object-cover"
            />
          ))}
        </div>
      </div>
    </ViewDetails>
  );
}
