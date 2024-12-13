import DashBoardTopHeader from "@/components/DashboardTopheader";
import LeadsTable from "@/features/LeadsTable";
import AdminDashboardTemplate from "@/template/AdminDashboardTemplate";

async function getAllLeads() {
  try {
    const response = await fetch(`${process.env.API_URI}/api/leads`);
    const pageData = await response.json();
    return pageData;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Leads() {
  const pageData = await getAllLeads();
  return (
    <AdminDashboardTemplate>
      <div className="">
        <DashBoardTopHeader />
      </div>
      <div className="xlg:px-8 px-4 py-4 flex flex-col gap-2">
        <LeadsTable tableData={pageData} />
      </div>
    </AdminDashboardTemplate>
  );
}
