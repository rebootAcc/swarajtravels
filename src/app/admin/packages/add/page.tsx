import DashBoardTopHeader from "@/components/DashboardTopheader";
import AddNewPackageForm from "@/features/AddNewPackageForm";
import AdminDashboardTemplate from "@/template/AdminDashboardTemplate";

export default function AddPackage() {
  return (
    <AdminDashboardTemplate>
      <div className="">
        <DashBoardTopHeader />
      </div>
      <div className="xlg:px-8 px-4 py-4 flex flex-col gap-5 xl:gap-7">
        <h1 className="text-typeograph-1 text-lg xl:text-2xl font-medium">
          Add Tour Package
        </h1>
        <AddNewPackageForm />
      </div>
    </AdminDashboardTemplate>
  );
}
