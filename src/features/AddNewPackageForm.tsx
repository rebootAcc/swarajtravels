"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function AddNewPackageForm({
  editedPackage,
}: {
  editedPackage?: any;
}) {
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [itinerary, setIternary] = useState<string>("");
  const [foodCoverage, setFoodCoverage] = useState<boolean>(false);
  const [hotelCoverage, setHotelCoverage] = useState<boolean>(false);
  const [transportCoverage, setTransportCoverage] = useState<boolean>(false);
  const [uploadedPicture1, setUploadedPicture1] = useState<File | null>(null);
  const [uploadedPicture2, setUploadedPicture2] = useState<File | null>(null);
  const router = useRouter();
  const [allDescriptions, setAllDescriptions] = useState<
    {
      title: string;
      detail: string;
    }[]
  >([]);
  const [description, setDescription] = useState<{
    title: string;
    detail: string;
  }>({
    title: "",
    detail: "",
  });
  const [errors, setErrors] = useState<{
    city?: { message: string };
    name?: { message: string };
    duration?: { message: string };
    price?: { message: string };
    itiernary?: { message: string };
    descriptionTitle?: { message: string };
    descriptionDetail?: { message: string };
  }>({});

  useEffect(() => {
    if (!editedPackage) {
      return;
    } else {
      setCity(editedPackage.packageCity);
      setName(editedPackage.packageName);
      setDuration(editedPackage.packageDuration);
      setPrice(editedPackage.packagePrice);
      setIternary(editedPackage.packageIternary);
      const packageCoverage = JSON.parse(editedPackage.packageCoverage);
      setFoodCoverage(packageCoverage.food);
      setHotelCoverage(packageCoverage.hotel);
      setTransportCoverage(packageCoverage.transport);
      setAllDescriptions(editedPackage.packageDescriptions);
    }
  }, [editedPackage]);

  const addNewPackage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("packageCity", city);
      formdata.append("packageName", name);
      formdata.append("packageDuration", duration);
      formdata.append("packagePrice", price);
      formdata.append("packageIternary", itinerary);
      formdata.append(
        "packageCoverage",
        JSON.stringify({
          food: foodCoverage,
          hotel: hotelCoverage,
          transport: transportCoverage,
        })
      );
      formdata.append("packageDescriptions", JSON.stringify(allDescriptions));
      if (uploadedPicture1 !== null) {
        formdata.append("packageCover", uploadedPicture1);
      }
      if (uploadedPicture2 !== null) {
        formdata.append("packageCover", uploadedPicture2);
      }
      const response = await fetch("/api/packages", {
        method: "POST",
        body: formdata,
      });
      const result = await response.json();
      router.push("/admin/dashboard");
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
            packageCity: city,
            packageName: name,
            packageDuration: duration,
            packagePrice: price,
            packageIternary: itinerary,
            packageCoverage: JSON.stringify({
              food: foodCoverage,
              hotel: hotelCoverage,
              transport: transportCoverage,
            }),
            packageDescriptions: allDescriptions,
          },
        }),
      });
      const result = await response.json();
      router.push("/admin/dashboard");
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
          addNewPackage(e);
        }
      }}
    >
      <div className="grid grid-cols-2 gap-8">
        <div>
          <select
            className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City/State</option>
            <option value="darjeeling">Darjeeling</option>
            <option value="dooars">Dooars</option>
            <option value="kalimpong">Kalimpong</option>
            <option value="sikkim">Sikkim</option>
            <option value="rajastan">Rajastan</option>
          </select>
          {errors.city && (
            <span className="text-red-600 font-medium text-sm">
              {errors.city.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="text"
            className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tour Package Name"
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
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Select Duration (8 Days)"
          />
          {errors.duration && (
            <span className="text-red-600 font-medium text-sm">
              {errors.duration.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="number"
            className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (₹3000)"
          />
          {errors.price && (
            <span className="text-red-600 font-medium text-sm">
              {errors.price.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="text"
            className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
            value={itinerary}
            onChange={(e) => setIternary(e.target.value)}
            placeholder="Put Itinerary of Tour (7 Nights | 8 Days)"
          />
          {errors.itiernary && (
            <span className="text-red-600 font-medium text-sm">
              {errors.itiernary.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 place-items-stretch">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="food"
              checked={foodCoverage}
              onChange={(e) => setFoodCoverage(e.target.checked)}
              className="bg-[#f5f5f5] rounded-md placeholder-typeograph-2 text-base accent-[#f5f5f5] checked:border checked:border-[#f5f5f5] text-typeograph-1"
            />
            <label
              htmlFor="food"
              className="text-base xl:text-lg text-typeograph-1 cursor-pointer"
            >
              Food Coverage
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="hotel"
              checked={hotelCoverage}
              onChange={(e) => setHotelCoverage(e.target.checked)}
              className="bg-[#f5f5f5] rounded-md placeholder-typeograph-2 text-base accent-[#f5f5f5] checked:border checked:border-[#f5f5f5] text-typeograph-1"
            />
            <label
              htmlFor="hotel"
              className="text-base xl:text-lg text-typeograph-1 cursor-pointer"
            >
              Hotel Coverage
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="transport"
              checked={transportCoverage}
              onChange={(e) => setTransportCoverage(e.target.checked)}
              className="bg-[#f5f5f5] rounded-md placeholder-typeograph-2 text-base accent-[#f5f5f5] checked:border checked:border-[#f5f5f5] text-typeograph-1"
            />
            <label
              htmlFor="transport"
              className="text-base xl:text-lg text-typeograph-1 cursor-pointer"
            >
              Transport Coverage
            </label>
          </div>
        </div>
        <div className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none flex items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file1"
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
        <div className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none flex items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file2"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setUploadedPicture2(file);
            }}
          />
          <label
            htmlFor="file2"
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
      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
          value={description.title}
          onChange={(e) =>
            setDescription((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Add (Day 1)"
        />
        <textarea
          name=""
          id=""
          rows={6}
          value={description.detail}
          onChange={(e) =>
            setDescription((prev) => ({ ...prev, detail: e.target.value }))
          }
          placeholder="Day Text...."
          className="px-2 py-2 xl:py-4 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none"
        ></textarea>
      </div>
      <button
        type="button"
        className="flex items-center bg-primary hover:bg-secondary gap-3 rounded px-2 xl:px-3 h-[2.5rem] text-xs xlg:text-base xl:text-sm text-[#F5F5F5] transition-colors duration-300 ease-in-out self-start"
        onClick={() =>
          setAllDescriptions((prev) => [
            ...prev,
            { title: description.title, detail: description.detail },
          ])
        }
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
        <h3>Add</h3>
      </button>
      {allDescriptions.length > 0 &&
        allDescriptions.map((desc, index) => (
          <div
            className="flex flex-col gap-4 border border-[#cccccc] bg-[#f5f5f5] rounded"
            key={index}
          >
            <div className="flex justify-between p-3 !pb-0">
              <h1 className="text-typeograph-1 text-lg xl:text-2xl font-bold">
                {desc.title}
              </h1>
              <button
                type="button"
                className="bg-white text-red-600 text-base border border-red-600 py-2 px-4 rounded"
                onClick={() =>
                  setAllDescriptions((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM3.0343 7.17241V8.82758L12.9653 8.82758V7.17241L3.0343 7.17241Z"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-[#cccccc] w-full h-0.5" />
            <p className="p-3 !pt-0 text-typeograph-2 text-base xl:text-xl">
              {desc.detail}
            </p>
          </div>
        ))}
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
