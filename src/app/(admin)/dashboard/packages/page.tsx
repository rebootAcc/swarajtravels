import DashBoardTopHeader from "@/components/DashboardTopheader";
import PacakagesTable from "@/features/PacakagesTable";
import AdminDashboardTemplate from "@/template/AdminDashboardTemplate";
import Link from "next/link";

async function getALLPackages() {
  const response = await fetch(process.env.API_URI + "/api/packages/");
  const pageData = await response.json();
  return pageData;
}

export default async function Packages() {
  const pageData = await getALLPackages();

  return (
    <AdminDashboardTemplate>
      <div className="">
        <DashBoardTopHeader>
          <Link
            href="/dashboard/packages/add"
            className="flex items-center bg-primary hover:bg-blue-500 gap-3 rounded px-2 xl:px-3 h-[2.5rem] text-xs xlg:text-base xl:text-sm text-[#F5F5F5] transition-colors duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM7.172 3.034h1.656v4.138h4.138v1.656H8.828v4.138H7.172V8.828H3.034V7.172h4.138V3.034Z"
                clipRule="evenodd"
              />
            </svg>
            <h3>Add New Package</h3>
          </Link>
        </DashBoardTopHeader>
      </div>
      <div className="xlg:px-8 px-4 py-4 flex flex-col gap-2">
        <PacakagesTable tableData={pageData} />
        <div className="flex justify-between py-4 text-typeograph-1 text-sm lg:text-base">
          <span>
            Showing {pageData.packages.length} of{" "}
            {pageData.pagination.totalPackages} packages
          </span>
          <div>
            {pageData.pagination.currentPage !== 1 && (
              <Link
                href={`/dashboard/packages?page=${
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
                href={`/dashboard/packages?page=${
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
