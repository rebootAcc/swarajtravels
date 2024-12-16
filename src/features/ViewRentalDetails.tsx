import ViewDetails from "@/components/ViewDetails";
import { IoClose } from "react-icons/io5";

export default function ViewRentalDetails({
  rentalData,
  setIsViewOpen,
}: {
  rentalData: any;
  setIsViewOpen: any;
}) {
  const closeView = () => {
    setIsViewOpen(false); // Close the view
  };

  return (
    <ViewDetails setIsViewOpen={setIsViewOpen}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{rentalData.rentalName}</h2>
        <button onClick={closeView} className="text-xl text-gray-500">
          <IoClose />
        </button>
      </div>
      <div className="mt-4">
        <p>
          <strong>Rental ID:</strong> {rentalData.rentalId}
        </p>
        <p>
          <strong>Season Price:</strong> ₹ {rentalData.rentalSeasonPrice}
        </p>
        <p>
          <strong>Off Season Price:</strong> ₹ {rentalData.rentalOffSeasonPrice}
        </p>
        <p>
          <strong>Rental Type:</strong> {rentalData.rentalType}
        </p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Rental Cover:</h3>
          {rentalData.rentalCover.map((cover: any, index: number) => (
            <img
              key={index}
              src={cover.path}
              alt={`Cover ${index + 1}`}
              className="w-full object-cover"
            />
          ))}
        </div>
      </div>
    </ViewDetails>
  );
}
