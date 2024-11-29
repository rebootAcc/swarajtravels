import DashBoardTopHeader from "@/components/DashboardTopheader";
import DashBoardTable from "@/features/DashBoardTable";
import AdminDashboardTemplate from "@/template/AdminDashboardTemplate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getALLPackages() {
  const response = await fetch(process.env.API_URI + "/api/packages/");
  const pageData = await response.json();
  return pageData;
}

export default async function DashBoard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) {
    redirect("/login");
  }
  const pageData = await getALLPackages();

  return (
    <AdminDashboardTemplate>
      <div className="">
        <DashBoardTopHeader />
      </div>
      <div className="xlg:px-8 px-4 py-4 flex flex-col gap-2">
        <DashBoardTable tableData={pageData} />
      </div>
    </AdminDashboardTemplate>
  );
}
