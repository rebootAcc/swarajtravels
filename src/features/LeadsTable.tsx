"use client";

import TableComponent from "@/components/TableComponent";
import { useEffect, useState } from "react";
import ViewLeadDetails from "./ViewLeadDetails";
import { IoEye } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function LeadsTable({
  tableData,
  leadType,
}: {
  tableData: any;
  leadType: string;
}) {
  const {
    leads,
    pagination: { currentPage, totalPages, totalLeads, pageSize },
  } = tableData;
  const [allLeads, setAllLeads] = useState(leads);
  const [customizeTableData, setCustomizeTableData] = useState<{
    tableHead: string[];
    tableBody: any;
  }>({
    tableHead: [],
    tableBody: [],
  });
  const [viewLeads, setViewLeads] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    if (leadType === "general") {
      setCustomizeTableData({
        tableHead: ["Date & Time", "Name", "Number", "Query", "Action"],
        tableBody: allLeads.map((item: any) => ({
          "Date & Time": `${extractDateTime(item.createdAt).date} - ${
            extractDateTime(item.createdAt).time
          }`,
          Name: item.leadName,
          Number: item.leadPhoneNumber,
          Query: item.leadQuery,
          Action: (
            <div className="flex space-x-2 items-center" key={item.leadId}>
              <div className="inline-flex items-center cursor-pointer">
                <select
                  value={item.leadStatus}
                  className="capitalize outline-none"
                  onChange={(e) =>
                    updateActiveStatus(item.leadId, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className=" text-violet-600 cursor-pointer">
                <IoEye onClick={() => openViewPackage(item.leadId)} />
              </div>
              <button
                type="button"
                onClick={() => deletePackage(item.leadId)}
                className="text-red-600 text-base rounded-full p-2"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          ),
        })),
      });
    } else if (leadType === "tour_package") {
      setCustomizeTableData({
        tableHead: ["Date & Time", "Name", "Number", "Package", "Action"],
        tableBody: allLeads.map((item: any) => ({
          "Date & Time": `${extractDateTime(item.createdAt).date} - ${
            extractDateTime(item.createdAt).time
          }`,
          Name: item.leadName,
          Number: item.leadPhoneNumber,
          Package: item.leadPackage,
          Action: (
            <div className="flex space-x-2 items-center" key={item.leadId}>
              <div className="inline-flex items-center cursor-pointer">
                <select
                  value={item.leadStatus}
                  className="capitalize outline-none"
                  onChange={(e) =>
                    updateActiveStatus(item.leadId, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className=" text-violet-600 cursor-pointer">
                <IoEye onClick={() => openViewPackage(item.leadId)} />
              </div>
              <button
                type="button"
                onClick={() => deletePackage(item.leadId)}
                className="text-red-600 text-base rounded-full p-2"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          ),
        })),
      });
    } else if (leadType === "bike_rental") {
      setCustomizeTableData({
        tableHead: [
          "Date & Time",
          "Name",
          "Number",
          "StartPoint",
          "EndPoint",
          "Action",
        ],
        tableBody: allLeads.map((item: any) => ({
          "Date & Time": `${extractDateTime(item.createdAt).date} - ${
            extractDateTime(item.createdAt).time
          }`,
          Name: item.leadName,
          Number: item.leadPhoneNumber,
          StartPoint: item.startPoint,
          EndPoint: item.endPoint,
          Action: (
            <div className="flex space-x-2 items-center" key={item.leadId}>
              <div className="inline-flex items-center cursor-pointer">
                <select
                  value={item.leadStatus}
                  className="capitalize outline-none"
                  onChange={(e) =>
                    updateActiveStatus(item.leadId, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className=" text-violet-600 cursor-pointer">
                <IoEye onClick={() => openViewPackage(item.leadId)} />
              </div>
              <button
                type="button"
                onClick={() => deletePackage(item.leadId)}
                className="text-red-600 text-base rounded-full p-2"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          ),
        })),
      });
    } else if (leadType === "car_rental") {
      setCustomizeTableData({
        tableHead: [
          "Date & Time",
          "Name",
          "Number",
          "StartPoint",
          "EndPoint",
          "Action",
        ],
        tableBody: allLeads.map((item: any) => ({
          "Date & Time": `${extractDateTime(item.createdAt).date} - ${
            extractDateTime(item.createdAt).time
          }`,
          Name: item.leadName,
          Number: item.leadPhoneNumber,
          StartPoint: item.startPoint,
          EndPoint: item.endPoint,
          Action: (
            <div className="flex space-x-2 items-center" key={item.leadId}>
              <div className="inline-flex items-center cursor-pointer">
                <select
                  value={item.leadStatus}
                  className="capitalize outline-none"
                  onChange={(e) =>
                    updateActiveStatus(item.leadId, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className=" text-violet-600 cursor-pointer">
                <IoEye onClick={() => openViewPackage(item.leadId)} />
              </div>
              <button
                type="button"
                onClick={() => deletePackage(item.leadId)}
                className="text-red-600 text-base rounded-full p-2"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          ),
        })),
      });
    } else if (leadType === "rail_booking") {
      setCustomizeTableData({
        tableHead: [
          "Date & Time",
          "Name",
          "Number",
          "StartDate",
          "EndDate",
          "Action",
        ],
        tableBody: allLeads.map((item: any) => ({
          "Date & Time": `${extractDateTime(item.createdAt).date} - ${
            extractDateTime(item.createdAt).time
          }`,
          Name: item.leadName,
          Number: item.leadPhoneNumber,
          Email: item.leadEmail,
          StartDate: extractDateTime(item.startDate).date,
          EndDate: extractDateTime(item.endDate).date,
          Action: (
            <div className="flex space-x-2 items-center" key={item.leadId}>
              <div className="inline-flex items-center cursor-pointer">
                <select
                  value={item.leadStatus}
                  className="capitalize outline-none"
                  onChange={(e) =>
                    updateActiveStatus(item.leadId, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className=" text-violet-600 cursor-pointer">
                <IoEye onClick={() => openViewPackage(item.leadId)} />
              </div>
              <button
                type="button"
                onClick={() => deletePackage(item.leadId)}
                className="text-red-600 text-base rounded-full p-2"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          ),
        })),
      });
    } else if (leadType === "flight_booking") {
      setCustomizeTableData({
        tableHead: [
          "Date & Time",
          "Name",
          "Number",
          "StartDate",
          "EndDate",
          "Action",
        ],
        tableBody: allLeads.map((item: any) => ({
          "Date & Time": `${extractDateTime(item.createdAt).date} - ${
            extractDateTime(item.createdAt).time
          }`,
          Name: item.leadName,
          Number: item.leadPhoneNumber,
          Email: item.leadEmail,
          StartDate: extractDateTime(item.startDate).date,
          EndDate: extractDateTime(item.endDate).date,
          Action: (
            <div className="flex space-x-2 items-center" key={item.leadId}>
              <div className="inline-flex items-center cursor-pointer">
                <select
                  value={item.leadStatus}
                  className="capitalize outline-none"
                  onChange={(e) =>
                    updateActiveStatus(item.leadId, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className=" text-violet-600 cursor-pointer">
                <IoEye onClick={() => openViewPackage(item.leadId)} />
              </div>
              <button
                type="button"
                onClick={() => deletePackage(item.leadId)}
                className="text-red-600 text-base rounded-full p-2"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          ),
        })),
      });
    }
  }, [leadType, allLeads]);

  const updateActiveStatus = async (packId: string, updatedValue: string) => {
    try {
      const response = await fetch(`/api/leads/${packId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updatedData: { leadStatus: updatedValue },
        }),
      });
      const result = await response.json();
      setAllLeads((prevPackages: any) => {
        return prevPackages.map((pack: any) =>
          pack.leadId === result.leadId
            ? { ...pack, leadStatus: result.leadStatus }
            : pack
        );
      });
    } catch (error) {
      console.error("Error updating package status", error);
    }
  };

  const deletePackage = async (packId: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this Leads?`
    );
    if (isConfirmed) {
      try {
        const response = await fetch(`/api/leads/${packId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();

        setAllLeads((prevPackages: any) => {
          return prevPackages.filter((pack: any) => pack.leadId !== packId);
        });
      } catch (error) {
        console.error("Error updating package status", error);
      }
    }
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

  const openViewPackage = (rentId: string) => {
    const packageToView = allLeads.find((item: any) => item.leadId === rentId);
    setViewLeads(packageToView); // Set the selected package data
    setIsViewOpen(true); // Open the slide-in component
  };

  return (
    <div className="container mx-auto my-7">
      <TableComponent tableData={customizeTableData} />
      {isViewOpen && (
        <ViewLeadDetails leadData={viewLeads} setIsViewOpen={setIsViewOpen} />
      )}
    </div>
  );
}
