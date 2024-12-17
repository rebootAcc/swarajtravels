"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export default function LeadsDateFilter({ leadType }: { leadType: string }) {
  const [tempDateRange, setTempDateRange] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dateFilterApplied, setDateFilterApplied] = useState(false);

  const router = useRouter();

  const searchParam = useSearchParams();

  const startDate = searchParam.get("startDate");

  const endDate = searchParam.get("endDate");

  const handleDateSelection = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setTempDateRange({ startDate, endDate });
  };

  const handleApplyDateFilter = () => {
    const formatDate = (date: any) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedStartDate = formatDate(tempDateRange.startDate);
    const formattedEndDate = formatDate(tempDateRange.endDate);

    setDateFilterApplied(true);
    setShowDatePicker(false);
    router.push(
      `/dashboard/leads/${leadType}?startDate=${formattedStartDate}&endDate=${formattedEndDate}&page=${1}`
    );
  };

  useEffect(() => {
    if (!startDate && !endDate) {
      return;
    }

    setTempDateRange({
      startDate,
      endDate,
    });
  }, [startDate, endDate]);

  const handleClearDateFilter = () => {
    setTempDateRange({ startDate: null, endDate: null });
    setDateFilterApplied(false);
    router.push(`/dashboard/leads/${leadType}?page=${1}`);
  };

  return (
    <div className="py-3 flex items-center flex-wrap gap-6">
      <span className="text-lg font-semibold text-[#777777]">Filter</span>

      <div className="relative">
        <input
          type="text"
          placeholder="Select Date Range"
          readOnly
          value={
            tempDateRange.startDate && tempDateRange.endDate
              ? `${format(
                  new Date(tempDateRange.startDate),
                  "dd/MM/yyyy"
                )} - ${format(new Date(tempDateRange.endDate), "dd/MM/yyyy")}`
              : ""
          }
          className="px-4 py-1 border border-[#cccccc] text-sm rounded-md cursor-pointer"
          onClick={() => setShowDatePicker(!showDatePicker)}
        />
        {showDatePicker && (
          <div className="absolute z-10 left-1/2 -translate-x-1/2">
            <DateRangePicker
              ranges={[
                {
                  startDate: tempDateRange.startDate || new Date(),
                  endDate: tempDateRange.endDate || new Date(),
                  key: "selection",
                },
              ]}
              onChange={handleDateSelection}
              rangeColors={["#00aaff"]}
            />
          </div>
        )}
      </div>

      {/* Show or Clear Button */}
      <div>
        {dateFilterApplied ? (
          <button
            onClick={handleClearDateFilter}
            className="px-4 py-1 bg-red-500 text-white rounded"
          >
            Clear
          </button>
        ) : (
          <button
            onClick={handleApplyDateFilter}
            className="px-4 py-1 bg-green-500 text-white rounded"
          >
            Show
          </button>
        )}
      </div>
    </div>
  );
}
