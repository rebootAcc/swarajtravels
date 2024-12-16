import ViewDetails from "@/components/ViewDetails";
import { IoClose } from "react-icons/io5";

export default function ViewLeadDetails({
  leadData,
  setIsViewOpen,
}: {
  leadData: any;
  setIsViewOpen: any;
}) {
  const closeView = () => {
    setIsViewOpen(false); // Close the view
  };

  function extractDateTime(isoString: string) {
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Extract date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
    const year = date.getFullYear();

    // Extract time components
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock

    // Format the date and time
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  return (
    <ViewDetails setIsViewOpen={setIsViewOpen}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{leadData.leadName}</h2>
        <button onClick={closeView} className="text-xl text-gray-500">
          <IoClose />
        </button>
      </div>
      <div className="mt-4">
        <p>
          <strong>Rental ID:</strong> {leadData.leadId}
        </p>
        <p>
          <strong>Phone Number:</strong> {leadData.leadPhoneNumber}
        </p>
        <p>
          <strong>Email Id:</strong> {leadData.leadEmail}
        </p>
        <p>
          <strong>Lead Generated:</strong>{" "}
          {`${extractDateTime(leadData.createdAt).date} - ${
            extractDateTime(leadData.createdAt).time
          }`}
        </p>
        <p className="capitalize">
          <strong>Lead Type:</strong> {leadData.leadType.split("_").join(" ")}
        </p>
        {leadData.leadType === "general" && (
          <p className="capitalize">
            <strong>Lead Type:</strong>{" "}
            {leadData.leadQuery.split("_").join(" ")}
          </p>
        )}
        <p>
          <strong>Message:</strong> {leadData.leadMessage || ""}
        </p>
        <p>
          <strong>Start Point:</strong> {leadData.startPoint || ""}
        </p>
        <p>
          <strong>End Point:</strong> {leadData.endPoint || ""}
        </p>
        {leadData.startDate && (
          <p>
            <strong>From :</strong>{" "}
            {`${extractDateTime(leadData.startDate).date}`}
          </p>
        )}
        {leadData.endDate && (
          <p>
            <strong>To :</strong> {`${extractDateTime(leadData.endDate).date}`}
          </p>
        )}
      </div>
    </ViewDetails>
  );
}
