"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function AddNewPackageForm({
  editedPackage,
  uploadFileDisable = false,
}: {
  editedPackage?: any;
  uploadFileDisable?: boolean;
}) {
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [itinerary, setIternary] = useState<string>("");
  const [seatImage, setSeatImage] = useState<File | null>(null);
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
    city?: boolean;
    name?: boolean;
    duration?: boolean;
    price?: boolean;
    itiernary?: boolean;
    description?: boolean;
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
      setAllDescriptions(editedPackage.packageDescriptions);
    }
  }, [editedPackage]);

  const addNewPackage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city === "") {
      setErrors((prev) => ({ ...prev, city: true }));
      return;
    }
    if (name === "") {
      setErrors((prev) => ({ ...prev, name: true }));
      return;
    }
    if (duration === "") {
      setErrors((prev) => ({ ...prev, duration: true }));
      return;
    }
    if (price === "") {
      setErrors((prev) => ({ ...prev, price: true }));
      return;
    }
    if (itinerary === "") {
      setErrors((prev) => ({ ...prev, itiernary: true }));
      return;
    }
    if (allDescriptions.length < 1) {
      setErrors((prev) => ({ ...prev, description: true }));
      return;
    }
    try {
      const formdata = new FormData();
      formdata.append("packageCity", city);
      formdata.append("packageName", name);
      formdata.append("packageDuration", duration);
      formdata.append("packagePrice", price);
      formdata.append("packageIternary", itinerary);
      if (seatImage !== null) {
        formdata.append("packageSeatDetails", seatImage);
      }
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
      if (!response.ok) {
        return;
      }
      const result = await response.json();
      router.push("/dashboard/packages");
    } catch (error) {
      console.log(error);
    }
  };

  const updateNewPackage = async (
    e: FormEvent<HTMLFormElement>,
    pId: string
  ) => {
    e.preventDefault();
    if (city === "") {
      setErrors((prev) => ({ ...prev, city: true }));
      return;
    }
    if (name === "") {
      setErrors((prev) => ({ ...prev, name: true }));
      return;
    }
    if (duration === "") {
      setErrors((prev) => ({ ...prev, duration: true }));
      return;
    }
    if (price === "") {
      setErrors((prev) => ({ ...prev, price: true }));
      return;
    }
    if (itinerary === "") {
      setErrors((prev) => ({ ...prev, itiernary: true }));
      return;
    }
    if (allDescriptions.length < 1) {
      setErrors((prev) => ({ ...prev, description: true }));
      return;
    }
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
            packageDescriptions: allDescriptions,
          },
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        return;
      }
      router.push("/dashboard/packages");
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
            className={`h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none ${
              errors.city ? "border border-red-600" : "border-0"
            }`}
            value={city}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, city: false }));
              setCity(e.target.value);
            }}
          >
            <option value="">Select City/State</option>
            <option value="darjeeling">Darjeeling</option>
            <option value="dooars">Dooars</option>
            <option value="kalimpong">Kalimpong</option>
            <option value="sikkim">Sikkim</option>
            <option value="rajastan">Rajastan</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            className={`h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none ${
              errors.name ? "border border-red-600" : "border-0"
            }`}
            value={name}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, name: false }));
              setName(e.target.value);
            }}
            placeholder="Tour Package Name"
          />
        </div>
        <div>
          <input
            type="number"
            className={`h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none ${
              errors.duration ? "border border-red-600" : "border-0"
            }`}
            value={duration}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, duration: false }));
              setDuration(e.target.value);
              if (parseInt(e.target.value) > 1) {
                setIternary(
                  `${parseInt(e.target.value, 10) - 1} Nigths | ${parseInt(
                    e.target.value
                  )} Days`
                );
              } else {
                setIternary("");
              }
            }}
            placeholder="Select Duration (8 Days)"
          />
        </div>
        <div>
          <input
            type="number"
            className={`h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none ${
              errors.price ? "border border-red-600" : "border-0"
            }`}
            value={price}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, price: false }));
              setPrice(e.target.value);
            }}
            placeholder="Price (₹3000)"
          />
        </div>
        <div>
          <input
            type="text"
            className={`h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none ${
              errors.itiernary ? "border border-red-600" : "border-0"
            }`}
            value={itinerary}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, itiernary: false }));
              setIternary(e.target.value);
            }}
            placeholder="Put Itinerary of Tour (7 Nights | 8 Days)"
          />
        </div>
        <div className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none flex items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="seat"
            disabled={uploadFileDisable}
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setSeatImage(file);
            }}
          />
          <label
            htmlFor="seat"
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
            <span>{seatImage ? seatImage.name : "upload seat details"}</span>
          </label>
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
            <span>
              {uploadedPicture1
                ? uploadedPicture1.name
                : "upload cover picture 1"}
            </span>
          </label>
        </div>
        <div className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none flex items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploadFileDisable}
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
            <span>
              {uploadedPicture2
                ? uploadedPicture2.name
                : "upload cover picture 2"}
            </span>
          </label>
        </div>
      </div>
      <div
        className={`flex flex-col gap-4 ${
          errors.description ? "border border-red-600" : "border-0"
        }`}
      >
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
        onClick={() => {
          setErrors((prev) => ({ ...prev, description: false }));
          setAllDescriptions((prev) => [
            ...prev,
            { title: description.title, detail: description.detail },
          ]);
          setDescription((prev) => ({ ...prev, title: "", detail: "" }));
        }}
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
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDescription((prev) => ({
                      ...prev,
                      title: desc.title,
                      detail: desc.detail,
                    }));
                    setAllDescriptions((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  }}
                  className="bg-white text-blue-600 text-base border border-blue-600 py-2 px-4 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.75 1.5C3.15326 1.5 2.58097 1.73705 2.15901 2.15901C1.73705 2.58097 1.5 3.15326 1.5 3.75V11.25C1.5 11.8467 1.73705 12.419 2.15901 12.841C2.58097 13.2629 3.15326 13.5 3.75 13.5H11.25C11.8467 13.5 12.419 13.2629 12.841 12.841C13.2629 12.419 13.5 11.8467 13.5 11.25V6.75C13.5 6.55109 13.579 6.36032 13.7197 6.21967C13.8603 6.07902 14.0511 6 14.25 6C14.4489 6 14.6397 6.07902 14.7803 6.21967C14.921 6.36032 15 6.55109 15 6.75V11.25C15 12.2446 14.6049 13.1984 13.9017 13.9017C13.1984 14.6049 12.2446 15 11.25 15H3.75C2.75544 15 1.80161 14.6049 1.09835 13.9017C0.395088 13.1984 0 12.2446 0 11.25V3.75C0 2.75544 0.395088 1.80161 1.09835 1.09835C1.80161 0.395088 2.75544 0 3.75 0H8.25C8.44891 0 8.63968 0.0790176 8.78033 0.21967C8.92098 0.360322 9 0.551088 9 0.75C9 0.948912 8.92098 1.13968 8.78033 1.28033C8.63968 1.42098 8.44891 1.5 8.25 1.5H3.75Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.4118 0.615008C11.8082 0.231555 12.3395 0.0192538 12.891 0.0238777C13.4425 0.0285016 13.9701 0.24968 14.36 0.639726C14.75 1.02977 14.971 1.55744 14.9755 2.10896C14.98 2.66048 14.7676 3.19167 14.384 3.58801L13.7968 4.17601C13.6561 4.31661 13.4654 4.3956 13.2665 4.3956C13.0676 4.3956 12.8769 4.31661 12.7363 4.17601L10.8238 2.26351C10.6832 2.12286 10.6042 1.93213 10.6042 1.73326C10.6042 1.53438 10.6832 1.34365 10.8238 1.20301L11.4118 0.615008ZM9.76327 3.32401C9.62263 3.1834 9.4319 3.10442 9.23302 3.10442C9.03415 3.10442 8.84342 3.1834 8.70277 3.32401L5.35702 6.67051C5.26098 6.76651 5.19281 6.88679 5.15977 7.01851L4.52227 9.56851C4.49095 9.69415 4.49269 9.82575 4.52732 9.95052C4.56195 10.0753 4.62829 10.189 4.71989 10.2805C4.81148 10.372 4.92521 10.4382 5.05001 10.4728C5.1748 10.5073 5.30641 10.5089 5.43202 10.4775L7.98127 9.84001C8.11299 9.80698 8.23327 9.7388 8.32927 9.64276L11.6758 6.29701C11.8164 6.15636 11.8954 5.96563 11.8954 5.76676C11.8954 5.56789 11.8164 5.37715 11.6758 5.23651L9.76327 3.32401Z"
                    />
                  </svg>
                </button>
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
