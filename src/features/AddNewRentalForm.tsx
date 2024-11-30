"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function AddNewRentalForm({
  editedPackage,
  uploadFileDisable = false,
}: {
  editedPackage?: any;
  uploadFileDisable?: boolean;
}) {
  const [type, setType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [seasonPrice, setSeasonPrice] = useState<string>("");
  const [offSeasonPrice, setOffSeasonPrice] = useState<string>("");
  const [uploadedPicture1, setUploadedPicture1] = useState<File | null>(null);
  const router = useRouter();
  const [errors, setErrors] = useState<{
    type?: { message: string };
    name?: { message: string };
    seasonPrice?: { message: string };
    offSeasonPrice?: { message: string };
  }>({});

  useEffect(() => {
    if (!editedPackage) {
      return;
    } else {
    }
  }, [editedPackage]);

  const addNewRental = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("rentalName", name);
      formdata.append("rentalSeasonPrice", seasonPrice);
      formdata.append("rentalOffSeasonPrice", offSeasonPrice);
      formdata.append("rentalType", type);
      if (uploadedPicture1 !== null) {
        formdata.append("rentalCover", uploadedPicture1);
      }
      const response = await fetch("/api/rentals", {
        method: "POST",
        body: formdata,
      });
      const result = await response.json();
      router.push("/dashboard/rentals/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateNewPackage = async (
    e: FormEvent<HTMLFormElement>,
    pId: string
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/packages/${pId}`, {
        method: "PUT",
        body: JSON.stringify({
          updatedData: {
            rentalName: name,
            rentalSeasonPrice: seasonPrice,
            rentalOffSeasonPrice: offSeasonPrice,
          },
        }),
      });
      const result = await response.json();
      router.push("/dashboard/rentals");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(e) => {
        if (editedPackage) {
          updateNewPackage(e, editedPackage.packageId);
        } else {
          addNewRental(e);
        }
      }}
    >
      <div className="grid grid-cols-2 gap-8">
        <div>
          <select
            className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Rental Type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
          {errors.type && (
            <span className="text-red-600 font-medium text-sm">
              {errors.type.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="text"
            className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Car/Bike Name"
          />
          {errors.name && (
            <span className="text-red-600 font-medium text-sm">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="number"
            className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
            value={seasonPrice}
            onChange={(e) => setSeasonPrice(e.target.value)}
            placeholder="Season Price"
          />
          {errors.seasonPrice && (
            <span className="text-red-600 font-medium text-sm">
              {errors.seasonPrice.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="number"
            className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
            value={offSeasonPrice}
            onChange={(e) => setOffSeasonPrice(e.target.value)}
            placeholder="Off Season Price "
          />
          {errors.offSeasonPrice && (
            <span className="text-red-600 font-medium text-sm">
              {errors.offSeasonPrice.message}
            </span>
          )}
        </div>
        <div className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none flex items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file1"
            disabled={uploadFileDisable}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setUploadedPicture1(file);
            }}
          />
          <label
            htmlFor="file1"
            className="capitalize text-typeograph-2 cursor-pointer w-full font-medium inline-flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              className="text-xl"
              fill="currentColor"
            >
              <path d="M15 10H12.975C12.6917 10 12.4583 9.90417 12.275 9.7125C12.0917 9.52083 12 9.28333 12 9C12 8.71667 12.0958 8.47917 12.2875 8.2875C12.4792 8.09583 12.7167 8 13 8H15V6C15 5.71667 15.0958 5.47917 15.2875 5.2875C15.4792 5.09583 15.7167 5 16 5C16.2833 5 16.5208 5.09583 16.7125 5.2875C16.9042 5.47917 17 5.71667 17 6V8H19C19.2833 8 19.5208 8.09583 19.7125 8.2875C19.9042 8.47917 20 8.71667 20 9C20 9.28333 19.9042 9.52083 19.7125 9.7125C19.5208 9.90417 19.2833 10 19 10H17V12C17 12.2833 16.9042 12.5208 16.7125 12.7125C16.5208 12.9042 16.2833 13 16 13C15.7167 13 15.4792 12.9042 15.2875 12.7125C15.0958 12.5208 15 12.2833 15 12V10ZM8 10H5C3.61667 10 2.4375 9.5125 1.4625 8.5375C0.4875 7.5625 0 6.38333 0 5C0 3.61667 0.4875 2.4375 1.4625 1.4625C2.4375 0.4875 3.61667 0 5 0H8C8.28333 0 8.52083 0.0958333 8.7125 0.2875C8.90417 0.479167 9 0.716667 9 1C9 1.28333 8.90417 1.52083 8.7125 1.7125C8.52083 1.90417 8.28333 2 8 2H5C4.16667 2 3.45833 2.29167 2.875 2.875C2.29167 3.45833 2 4.16667 2 5C2 5.83333 2.29167 6.54167 2.875 7.125C3.45833 7.70833 4.16667 8 5 8H8C8.28333 8 8.52083 8.09583 8.7125 8.2875C8.90417 8.47917 9 8.71667 9 9C9 9.28333 8.90417 9.52083 8.7125 9.7125C8.52083 9.90417 8.28333 10 8 10ZM7 6C6.71667 6 6.47917 5.90417 6.2875 5.7125C6.09583 5.52083 6 5.28333 6 5C6 4.71667 6.09583 4.47917 6.2875 4.2875C6.47917 4.09583 6.71667 4 7 4H13C13.2833 4 13.5208 4.09583 13.7125 4.2875C13.9042 4.47917 14 4.71667 14 5C14 5.28333 13.9042 5.52083 13.7125 5.7125C13.5208 5.90417 13.2833 6 13 6H7ZM20 5H18C18 4.16667 17.7083 3.45833 17.125 2.875C16.5417 2.29167 15.8333 2 15 2H11.975C11.6917 2 11.4583 1.90417 11.275 1.7125C11.0917 1.52083 11 1.28333 11 1C11 0.716667 11.0958 0.479167 11.2875 0.2875C11.4792 0.0958333 11.7167 0 12 0H15C16.3833 0 17.5625 0.4875 18.5375 1.4625C19.5125 2.4375 20 3.61667 20 5Z" />
            </svg>
            <span>upload picture</span>
          </label>
        </div>
      </div>
      <div className="flex gap-6">
        <button
          type="submit"
          className="text-secondary border-secondary border rounded py-2 px-10 text-center text-lg hover:text-white hover:bg-secondary transition-colors duration-500 xl:text-2xl font-medium"
        >
          Submit
        </button>
        <button
          type="reset"
          className="text-secondary border-secondary border rounded py-2 px-10 text-center text-lg hover:text-white hover:bg-secondary transition-colors duration-500 xl:text-2xl font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
