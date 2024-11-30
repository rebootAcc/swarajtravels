"use client";
import TableComponent from "@/components/TableComponent";
import Link from "next/link";
import { useState } from "react";

export default function RentalsTable({ tableData }: { tableData: any }) {
  const {
    rentals,
    pagination: { currentPage, totalPages, totalRentals, pageSize },
  } = tableData;

  const [allPack, setAllPAck] = useState(rentals);

  const updateActiveStatus = async (packId: string, updatedValue: boolean) => {
    try {
      const response = await fetch(`/api/rentals/${packId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updatedData: { rentalActiveStatus: updatedValue },
        }),
      });
      const result = await response.json();
      setAllPAck((prevPackages: any) => {
        return prevPackages.map((pack: any) =>
          pack._id === result._id
            ? { ...pack, rentalActiveStatus: result.rentalActiveStatus }
            : pack
        );
      });
    } catch (error) {
      console.error("Error updating package status", error);
    }
  };
  const deletePackage = async (packId: string) => {
    try {
      const response = await fetch(`/api/rentals/${packId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setAllPAck((prevPackages: any) => {
        return prevPackages.map((pack: any) => pack._id !== result._id);
      });
    } catch (error) {
      console.error("Error Deleting rental status", error);
    }
  };

  const customizeTableData = {
    tableHead: [
      "Car/Bike Name",
      "Season Price",
      "Off. Season",
      "Rental Type",
      "Action",
    ],
    tableBody: allPack.map((item: any) => ({
      "Car/Bike Name": item.rentalName,
      "Season Price": `₹ ${item.rentalSeasonPrice}`,
      "Off. Season": `₹ ${item.rentalOffSeasonPrice}`,
      "Rental Type": item.rentalType,
      Action: (
        <div className="flex space-x-2">
          <div className="inline-flex items-center cursor-pointer">
            <label htmlFor="active" className="cursor-pointer relative">
              <input
                type="checkbox"
                value=""
                checked={item.rentalActiveStatus}
                onChange={() =>
                  updateActiveStatus(item._id, !item.rentalActiveStatus)
                }
                id="active"
                className="sr-only peer"
              />
              <div className="relative w-8 h-4 bg-gray-200 rounded-full transition-all peer-checked:bg-green-600"></div>
              <div className="absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full w-3 h-3 transition-transform peer-checked:translate-x-4 peer-checked:border-green-600"></div>
            </label>
          </div>
          <Link
            href={`/admin/rentals/${item.rentalId}`}
            className="text-blue-600 text-base rounded-full p-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.75 1.5C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V11.25C1.5 11.8467 1.73705 12.419 2.15901 12.841C2.58097 13.2629 3.15326 13.5 3.75 13.5H11.25C11.8467 13.5 12.419 13.2629 12.841 12.841C13.2629 12.419 13.5 11.8467 13.5 11.25V6.75C13.5 6.55109 13.579 6.36032 13.7197 6.21967C13.8603 6.07902 14.0511 6 14.25 6C14.4489 6 14.6397 6.07902 14.7803 6.21967C14.921 6.36032 15 6.55109 15 6.75V11.25C15 12.2446 14.6049 13.1984 13.9017 13.9017C13.1984 14.6049 12.2446 15 11.25 15H3.75C2.75544 15 1.80161 14.6049 1.09835 13.9017C0.395088 13.1984 0 12.2446 0 11.25V3.75C0 2.75544 0.395088 1.80161 1.09835 1.09835C1.80161 0.395088 2.75544 0 3.75 0H8.25C8.44891 0 8.63968 0.0790176 8.78033 0.21967C8.92098 0.360322 9 0.551088 9 0.75C9 0.948912 8.92098 1.13968 8.78033 1.28033C8.63968 1.42098 8.44891 1.5 8.25 1.5H3.75Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4118 0.615008C11.8082 0.231555 12.3395 0.0192538 12.891 0.0238777C13.4425 0.0285016 13.9701 0.24968 14.36 0.639726C14.75 1.02977 14.971 1.55744 14.9755 2.10896C14.98 2.66048 14.7676 3.19167 14.384 3.58801L13.7968 4.17601C13.6561 4.31661 13.4654 4.3956 13.2665 4.3956C13.0676 4.3956 12.8769 4.31661 12.7363 4.17601L10.8238 2.26351C10.6832 2.12286 10.6042 1.93213 10.6042 1.73326C10.6042 1.53438 10.6832 1.34365 10.8238 1.20301L11.4118 0.615008ZM9.76327 3.32401C9.62263 3.1834 9.4319 3.10442 9.23302 3.10442C9.03415 3.10442 8.84342 3.1834 8.70277 3.32401L5.35702 6.67051C5.26098 6.76651 5.19281 6.88679 5.15977 7.01851L4.52227 9.56851C4.49095 9.69415 4.49269 9.82575 4.52732 9.95052C4.56195 10.0753 4.62829 10.189 4.71989 10.2805C4.81148 10.372 4.92521 10.4382 5.05001 10.4728C5.1748 10.5073 5.30641 10.5089 5.43202 10.4775L7.98127 9.84001C8.11299 9.80698 8.23327 9.7388 8.32927 9.64276L11.6758 6.29701C11.8164 6.15636 11.8954 5.96563 11.8954 5.76676C11.8954 5.56789 11.8164 5.37715 11.6758 5.23651L9.76327 3.32401Z"
              />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => deletePackage(item._id)}
            className="text-red-600 text-base rounded-full p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
            >
              <path d="M2.25 15C1.8375 15 1.48438 14.8368 1.19062 14.5104C0.896875 14.184 0.75 13.7917 0.75 13.3333V2.5C0.5375 2.5 0.359375 2.42014 0.215625 2.26042C0.071875 2.10069 0 1.90278 0 1.66667C0 1.43056 0.071875 1.23264 0.215625 1.07292C0.359375 0.913194 0.5375 0.833333 0.75 0.833333H3.75C3.75 0.597222 3.82187 0.399306 3.96562 0.239583C4.10938 0.0798611 4.2875 0 4.5 0H7.5C7.7125 0 7.89063 0.0798611 8.03438 0.239583C8.17813 0.399306 8.25 0.597222 8.25 0.833333H11.25C11.4625 0.833333 11.6406 0.913194 11.7844 1.07292C11.9281 1.23264 12 1.43056 12 1.66667C12 1.90278 11.9281 2.10069 11.7844 2.26042C11.6406 2.42014 11.4625 2.5 11.25 2.5V13.3333C11.25 13.7917 11.1031 14.184 10.8094 14.5104C10.5156 14.8368 10.1625 15 9.75 15H2.25ZM9.75 2.5H2.25V13.3333H9.75V2.5ZM4.5 11.6667C4.7125 11.6667 4.89062 11.5868 5.03438 11.4271C5.17812 11.2674 5.25 11.0694 5.25 10.8333V5C5.25 4.76389 5.17812 4.56597 5.03438 4.40625C4.89062 4.24653 4.7125 4.16667 4.5 4.16667C4.2875 4.16667 4.10938 4.24653 3.96562 4.40625C3.82187 4.56597 3.75 4.76389 3.75 5V10.8333C3.75 11.0694 3.82187 11.2674 3.96562 11.4271C4.10938 11.5868 4.2875 11.6667 4.5 11.6667ZM7.5 11.6667C7.7125 11.6667 7.89063 11.5868 8.03438 11.4271C8.17813 11.2674 8.25 11.0694 8.25 10.8333V5C8.25 4.76389 8.17813 4.56597 8.03438 4.40625C7.89063 4.24653 7.7125 4.16667 7.5 4.16667C7.2875 4.16667 7.10938 4.24653 6.96563 4.40625C6.82188 4.56597 6.75 4.76389 6.75 5V10.8333C6.75 11.0694 6.82188 11.2674 6.96563 11.4271C7.10938 11.5868 7.2875 11.6667 7.5 11.6667Z" />
            </svg>
          </button>
        </div>
      ),
    })),
  };

  return (
    <div className="container mx-auto my-7">
      <TableComponent tableData={customizeTableData} />
    </div>
  );
}
