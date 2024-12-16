"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FiMinusCircle } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineAddLink } from "react-icons/md";

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
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [errors, setErrors] = useState<{
    city?: boolean;
    name?: boolean;
    duration?: boolean;
    price?: boolean;
    itinerary?: boolean;
    description?: boolean;
    packageCover?: boolean;
  }>({});
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
  const [isPopular, setIsPopular] = useState<boolean>(false);

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
      setIsPopular(editedPackage.propulerPackage);
    }
  }, [editedPackage]);

  const addNewPackage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasErrors = false;

    if (city === "") {
      setErrors((prev) => ({ ...prev, city: true }));
      hasErrors = true;
    }
    if (name === "") {
      setErrors((prev) => ({ ...prev, name: true }));
      hasErrors = true;
    }
    if (duration === "") {
      setErrors((prev) => ({ ...prev, duration: true }));
      hasErrors = true;
    }
    if (price === "") {
      setErrors((prev) => ({ ...prev, price: true }));
      hasErrors = true;
    }
    if (itinerary === "") {
      setErrors((prev) => ({ ...prev, itinerary: true }));
      hasErrors = true;
    }
    if (allDescriptions.length < 1) {
      setErrors((prev) => ({ ...prev, description: true }));
      hasErrors = true;
    }
    if (!uploadedPicture1 && !uploadedPicture2) {
      setErrors((prev) => ({ ...prev, packageCover: true }));
      hasErrors = true;
    }
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("packageCity", city);
      formdata.append("packageName", name);
      formdata.append("packageDuration", duration);
      formdata.append("packagePrice", price);
      formdata.append("packageIternary", itinerary);
      formdata.append("propulerPackage", isPopular.toString());
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
    } finally {
      setLoading(false);
    }
  };

  const updateNewPackage = async (
    e: FormEvent<HTMLFormElement>,
    pId: string
  ) => {
    e.preventDefault();

    let hasErrors = false;

    if (city === "") {
      setErrors((prev) => ({ ...prev, city: true }));
      hasErrors = true;
    }
    if (name === "") {
      setErrors((prev) => ({ ...prev, name: true }));
      hasErrors = true;
    }
    if (duration === "") {
      setErrors((prev) => ({ ...prev, duration: true }));
      hasErrors = true;
    }
    if (price === "") {
      setErrors((prev) => ({ ...prev, price: true }));
      hasErrors = true;
    }
    if (itinerary === "") {
      setErrors((prev) => ({ ...prev, itinerary: true }));
      hasErrors = true;
    }
    if (allDescriptions.length < 1) {
      setErrors((prev) => ({ ...prev, description: true }));
      hasErrors = true;
    }
    if (!uploadedPicture1 && !uploadedPicture2) {
      setErrors((prev) => ({ ...prev, packageCover: true }));
      hasErrors = true;
    }

    setLoading(true);

    try {
      // Initialize FormData for PUT request
      const formdata = new FormData();
      formdata.append("packageCity", city);
      formdata.append("packageName", name);
      formdata.append("packageDuration", duration);
      formdata.append("packagePrice", price);
      formdata.append("packageIternary", itinerary);
      formdata.append("packageDescriptions", JSON.stringify(allDescriptions));
      formdata.append("propulerPackage", isPopular.toString());

      // Handle packageSeatDetails upload
      if (seatImage !== null) {
        formdata.append("packageSeatDetails", seatImage);
      }

      // Handle packageCover upload
      if (uploadedPicture1 !== null) {
        formdata.append("packageCover", uploadedPicture1);
      }
      if (uploadedPicture2 !== null) {
        formdata.append("packageCover", uploadedPicture2);
      }

      // Make the PUT request
      const response = await fetch(`/api/packages/${pId}`, {
        method: "PUT",
        body: formdata,
      });

      const result = await response.json();

      if (!response.ok) {
        return;
      }

      // Redirect after successful update
      router.push("/dashboard/packages");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            <option value="rajasthan">Rajasthan</option>
          </select>
          {errors.city && (
            <p className="text-red-600 text-sm ">This field is required</p>
          )}
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
          {errors.name && (
            <p className="text-red-600 text-sm ">This field is required</p>
          )}
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
                  `${parseInt(e.target.value, 10) - 1} Nights | ${parseInt(
                    e.target.value
                  )} Days`
                );
              } else {
                setIternary("");
              }
            }}
            placeholder="Select Duration (8 Days)"
          />
          {errors.duration && (
            <p className="text-red-600 text-sm ">This field is required</p>
          )}
        </div>

        <div>
          <input
            type="text"
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
          {errors.price && (
            <p className="text-red-600 text-sm ">This field is required</p>
          )}
        </div>
        <div>
          <input
            type="text"
            className={`h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none ${
              errors.itinerary ? "border border-red-600" : "border-0"
            }`}
            value={itinerary}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, itiernary: false }));
              setIternary(e.target.value);
            }}
            placeholder="Put Itinerary of Tour (7 Nights | 8 Days)"
          />
          {errors.itinerary && (
            <p className="text-red-600 text-sm ">This field is required</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-[4rem] px-2 xl:px-7 bg-[#f5f5f5] w-full rounded-md placeholder-typeograph-2 text-base text-typeograph-1 outline-none flex items-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="seat"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setSeatImage(file);
              }}
            />
            <label
              htmlFor="seat"
              className="capitalize text-typeograph-2 cursor-pointer w-full font-medium inline-flex gap-2 items-center"
            >
              <MdOutlineAddLink className="text-2xl" />
              <span>{seatImage ? seatImage.name : "upload seat details"}</span>
            </label>
          </div>
          {editedPackage?.packageSeatDetails?.path && !seatImage && (
            <div className="mt-2">
              <img
                src={editedPackage.packageSeatDetails.path}
                alt="Existing Seat Details"
                className="w-24 h-24 object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
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
              <MdOutlineAddLink className="text-2xl" />
              <span>
                {uploadedPicture1
                  ? uploadedPicture1.name
                  : "upload cover picture 1"}
              </span>
            </label>
            {errors.packageCover && (
              <p className="text-red-600 text-sm ">This field is required</p>
            )}
          </div>
          {editedPackage?.packageCover?.[0]?.path && !uploadedPicture1 && (
            <div className="mt-2">
              <img
                src={editedPackage.packageCover[0].path}
                alt="Existing Cover Picture 1"
                className="w-24 h-24 object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
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
              <MdOutlineAddLink className="text-2xl" />
              <span>
                {uploadedPicture2
                  ? uploadedPicture2.name
                  : "upload cover picture 2"}
              </span>
            </label>
          </div>
          {editedPackage?.packageCover?.[1]?.path && !uploadedPicture2 && (
            <div className="mt-2">
              <img
                src={editedPackage.packageCover[1].path}
                alt="Existing Cover Picture 2"
                className="w-24 h-24 object-cover"
              />
            </div>
          )}
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
        {errors.description && (
          <p className="text-red-600 text-sm ">
            At least one description is required
          </p>
        )}
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
        <IoMdAddCircleOutline />
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
                  <FaRegEdit />
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
                  <FiMinusCircle />
                </button>
              </div>
            </div>
            <div className="bg-[#cccccc] w-full h-0.5" />
            <p className="p-3 !pt-0 text-typeograph-2 text-base xl:text-xl">
              {desc.detail}
            </p>
          </div>
        ))}
      <div className="flex flex-row items-center gap-4 ">
        <span>
          <input
            type="checkbox"
            name="popular"
            id="popular"
            checked={isPopular}
            onChange={() => setIsPopular(!isPopular)}
            className="size-5"
          />
        </span>
        <span className=" text-xl font-medium pb-1">
          Most Propular Tour Package Enable
        </span>
      </div>
      <div className="flex gap-6">
        <button
          type="submit"
          className="text-secondary border-secondary border rounded py-2 px-10 text-center text-lg hover:text-white hover:bg-secondary transition-colors duration-500 xl:text-2xl font-medium"
        >
          {loading ? "Wait" : "Submit"}
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
