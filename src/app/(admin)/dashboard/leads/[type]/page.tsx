import DashBoardTopHeader from "@/components/DashboardTopheader";
import LeadsDateFilter from "@/features/LeadsDateFilter";
import LeadsTable from "@/features/LeadsTable";
import AdminDashboardTemplate from "@/template/AdminDashboardTemplate";
import Link from "next/link";

async function getRentalsByType(
  leadtype: string,
  page: string,
  startDate = "",
  endDate = ""
) {
  try {
    const response = await fetch(
      `${process.env.API_URI}/api/leads/?leadType=${leadtype}&page=${page}&startDate=${startDate}&endDate=${endDate}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export default async function LeadType({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const type = (await params).type;
  const startDate = (await searchParams).startDate ?? "";
  const endDate = (await searchParams).endDate ?? "";
  const pageNumber = (await searchParams).page ?? "1";
  const pageData = await getRentalsByType(type, pageNumber, startDate, endDate);

  return (
    <AdminDashboardTemplate>
      <div className="">
        <DashBoardTopHeader>
          <LeadsDateFilter leadType={type} />
          <Link
            href={`/api/leads/export?leadType=${type}&page=${pageNumber}&startDate=${startDate}&endDate=${endDate}`}
            className="px-4 p-1 bg-[#FF27221A] text-[#FF2722] text-sm font-medium rounded text-center self-center"
          >
            Export
          </Link>
        </DashBoardTopHeader>
      </div>
      <div className="xlg:px-8 px-4 py-4 flex flex-col gap-2">
        {pageData && pageData.leads ? (
          <LeadsTable
            key={`${type}-${pageData.pagination.currentPage}-${pageData.leads.length}`}
            tableData={pageData}
            leadType={type}
          />
        ) : (
          <div>Loading...</div>
        )}
        <div className="flex justify-between py-4 text-typeograph-1 text-sm lg:text-base">
          <span>
            Showing {pageData.leads.length} of {pageData.pagination.totalLeads}{" "}
            leads
          </span>
          <div>
            {pageData.pagination.currentPage !== 1 && (
              <Link
                href={
                  `/dashboard/leads/${type}?page=${
                    pageData.pagination.currentPage - 1
                  }` +
                  (startDate ? startDate : "") +
                  (endDate ? endDate : "")
                }
                className="px-3 py-1 mx-1 border rounded disabled:cursor-not-allowed"
              >
                Prev
              </Link>
            )}
            <span className="font-bold">
              {pageData.pagination.currentPage} /{" "}
              {pageData.pagination.totalPages}
            </span>
            {pageData.pagination.currentPage !==
              pageData.pagination.totalPages && (
              <Link
                href={`/dashboard/leads/${type}?page=${
                  pageData.pagination.currentPage + 1
                }`}
                className="px-3 py-1 mx-1 border rounded disabled:cursor-not-allowed"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
}
