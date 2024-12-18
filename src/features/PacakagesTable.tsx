"use client";
import TableComponent from "@/components/TableComponent";
import Link from "next/link";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import ViewPackageDetails from "./ViewPackageDetails";

export default function PackagesTable({ tableData }: { tableData: any }) {
  const {
    packages,
    pagination: { currentPage, totalPages, totalPackages, pageSize },
  } = tableData;

  const [allPack, setAllPack] = useState(packages);
  const [viewPackage, setViewPackage] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const updateActiveStatus = async (packId: string, updatedValue: boolean) => {
    try {
      const response = await fetch(`/api/packages/${packId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packageActiveStatus: updatedValue }),
      });
      const result = await response.json();

      if (response.ok) {
        // Update the status locally if the update was successful
        setAllPack((prevPackages: any) => {
          return prevPackages.map((pack: any) =>
            pack.packageId === packId
              ? { ...pack, packageActiveStatus: updatedValue }
              : pack
          );
        });
      } else {
        console.error("Error updating active status:", result.message);
      }
    } catch (error) {
      console.error("Error updating active status:", error);
    }
  };

  const deletePackage = async (packId: string, packageName: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this Package: ${packageName}?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`/api/packages/${packId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        setAllPack((prevPackages: any) => {
          return prevPackages.filter((pack: any) => pack.packageId !== packId);
        });
      } catch (error) {
        console.error("Error deleting package", error);
      }
    }
  };

  const openViewPackage = (packId: string) => {
    const packageToView = allPack.find(
      (item: any) => item.packageId === packId
    );
    setViewPackage(packageToView); // Set the selected package data
    setIsViewOpen(true); // Open the slide-in component
  };

  const customizeTableData = {
    tableHead: [
      "Tour Package Name",
      "City/State",
      "Duration",
      "Rate",
      "Action",
    ],
    tableBody: allPack.map((item: any) => ({
      "Tour Package Name": item.packageName,
      "City/State": item.packageCity,
      Duration: item.packageDuration,
      Rate: `₹ ${item.packagePrice}`,
      Action: (
        <div className="flex items-center space-x-2" key={item.packageId}>
          <div className="inline-flex items-center cursor-pointer">
            <label htmlFor={item.packageId} className="cursor-pointer relative">
              <input
                type="checkbox"
                checked={item.packageActiveStatus}
                onChange={() =>
                  updateActiveStatus(item.packageId, !item.packageActiveStatus)
                }
                id={item.packageId}
                className="sr-only peer"
              />
              <div className="relative w-8 h-4 bg-gray-200 rounded-full transition-all peer-checked:bg-green-600"></div>
              <div className="absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full w-3 h-3 transition-transform peer-checked:translate-x-4 peer-checked:border-green-600"></div>
            </label>
          </div>
          <div className=" text-violet-600 cursor-pointer">
            <IoEye onClick={() => openViewPackage(item.packageId)} />
          </div>
          <Link
            href={`/dashboard/packages/${item.packageId}`}
            className="text-blue-600 text-base rounded-full p-2 "
          >
            <FaRegEdit />
          </Link>
          <button
            type="button"
            onClick={() => deletePackage(item.packageId, item.packageName)}
            className="text-red-600 text-base rounded-full p-2"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ),
    })),
  };

  return (
    <div className="container mx-auto my-7">
      <TableComponent tableData={customizeTableData} />

      {/* Slide-in View Component */}
      {isViewOpen && (
        <ViewPackageDetails
          packageData={viewPackage}
          setIsViewOpen={setIsViewOpen}
        />
      )}
    </div>
  );
}
