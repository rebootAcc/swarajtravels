"use client";

import TableComponent from "@/components/TableComponent";
import { useState } from "react";

export default function LeadsTable({ tableData }: { tableData: any }) {
  const {
    leads,
    pagination: { currentPage, totalPages, totalLeads, pageSize },
  } = tableData;
  const [allLeads, setAllLeads] = useState(leads);

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
          pack._id === result._id
            ? { ...pack, leadStatus: result.leadStatus }
            : pack
        );
      });
    } catch (error) {
      console.error("Error updating package status", error);
    }
  };

  const deletePackage = async (packId: string) => {
    try {
      const response = await fetch(`/api/leads/${packId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setAllLeads((prevPackages: any) => {
        return prevPackages.filter((pack: any) => pack._id !== packId);
      });
    } catch (error) {
      console.error("Error updating package status", error);
    }
  };

  const customizeTableData = {
    tableHead: ["Name", "Number", "Email", "Query", "Action"],
    tableBody: allLeads.map((item: any) => ({
      Name: item.leadName,
      Number: item.leadPhoneNumber,
      Email: item.leadEmail,
      Query: item.leadQuery,
      Action: (
        <div className="flex space-x-2" key={item._id}>
          <div className="inline-flex items-center cursor-pointer">
            <select
              value={item.leadStatus}
              className="capitalize outline-none"
              onChange={(e) => updateActiveStatus(item._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
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
