import DashBoardTopHeader from "@/components/DashboardTopheader";
import AddNewPackageForm from "@/features/AddNewPackageForm";
import AdminDashboardTemplate from "@/template/AdminDashboardTemplate";

async function getEditedPackage(pId: string) {
  try {
    const response = await fetch(`${process.env.API_URI}/api/packages/${pId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export default async function UpdatePackge({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const editedPackage = await getEditedPackage(id);

  return (
    <AdminDashboardTemplate>
      <div className="">
        <DashBoardTopHeader />
      </div>
      <div className="xlg:px-8 px-4 py-4 flex flex-col gap-5 xl:gap-7">
        <h1 className="text-typeograph-1 text-lg xl:text-2xl font-medium">
          Edit Tour Package
        </h1>
        <AddNewPackageForm
          editedPackage={editedPackage._doc}
          uploadFileDisable={true}
        />
      </div>
    </AdminDashboardTemplate>
  );
}
