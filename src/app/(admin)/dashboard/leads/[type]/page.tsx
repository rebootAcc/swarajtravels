import DashBoardTopHeader from "@/components/DashboardTopheader";
import LeadsTable from "@/features/LeadsTable";
import AdminDashboardTemplate from "@/template/AdminDashboardTemplate";
import Link from "next/link";

async function getRentalsByType(leadtype: string, page: string) {
  try {
    const response = await fetch(
      `${process.env.API_URI}/api/leads/?leadType=${leadtype}&pageData=${page}`
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
  const pageNumber = (await searchParams).page ?? "1";
  const pageData = await getRentalsByType(type, pageNumber);

  return (
    <AdminDashboardTemplate>
      <div className="">
        <DashBoardTopHeader />
      </div>
      <div className="xlg:px-8 px-4 py-4 flex flex-col gap-2">
        <LeadsTable tableData={pageData} leadType={type} />
        <div className="flex justify-between py-4 text-typeograph-1 text-sm lg:text-base">
          <span>
            Showing {pageData.leads.length} of {pageData.pagination.totalLeads}{" "}
            leads
          </span>
          <div>
            {pageData.pagination.currentPage !== 1 && (
              <Link
                href={`/dashboard/leads/general?page=${
                  pageData.pagination.currentPage - 1
                }`}
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
                href={`/dashboard/leads/general?page=${
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
