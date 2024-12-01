import DashBoardTopHeader from "@/components/DashboardTopheader";
import AddNewRentalForm from "@/features/AddNewRentalForm";
import AdminDashboardTemplate from "@/template/AdminDashboardTemplate";
import Link from "next/link";

async function getEditedRental(pId: string) {
  try {
    const response = await fetch(`${process.env.API_URI}/api/rentals/${pId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default async function EditRentals({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const editedRental = await getEditedRental(id);
  return (
    <AdminDashboardTemplate>
      <div className="">
        <DashBoardTopHeader>
          <Link
            href="/dashboard/rentals/add"
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
            <h3>Add New Car/Bike Package</h3>
          </Link>
        </DashBoardTopHeader>
      </div>
      <div className="xlg:px-8 px-4 py-4 flex flex-col gap-5 xl:gap-7">
        <h1 className="text-typeograph-1 text-lg xl:text-2xl font-medium">
          Add Car/Bike Package
        </h1>
        <AddNewRentalForm
          editedReantal={editedRental._doc}
          uploadFileDisable={true}
        />
      </div>
    </AdminDashboardTemplate>
  );
}
