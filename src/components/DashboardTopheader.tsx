"use client";

import useClickOutSide from "@/hooks/useClickOutSide";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export default function DashBoardTopHeader({
  children,
}: {
  children?: ReactNode;
}) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState<boolean>(false);

  const profileDropdownRef = useClickOutSide<HTMLDivElement>(() =>
    setIsProfileDropdownOpen(false)
  );

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const router = useRouter();

  async function logout() {
    try {
      const response = await fetch("/api/users/logout");
      const result = await response.json();
      if (result.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="flex justify-end gap-3 lg:gap-6 pb-4 xl:pb-5 p-2 px-4 xl:p-4 xl:px-8 border-b border-black/20 flex-1">
      {children}
      <div className="flex items-center justify-center relative group">
        <span className="w-[3rem] lg:w-fit">
          <Image
            width={32}
            height={32}
            src="/profile-picture.png"
            alt="avatar"
            className="h-[2rem] cursor-pointer"
            onClick={toggleProfileDropdown}
          />
          {isProfileDropdownOpen && (
            <div
              ref={profileDropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            >
              <div className="px-4 py-2 text-gray-700">
                <span className="block text-sm font-semibold capitalize">
                  Name
                </span>
                <span className="block text-sm capitalize">Admin</span>
              </div>
              <div className="border-t border-gray-200"></div>
              <button
                onClick={logout}
                type="button"
                className="w-full px-4 py-2 flex justify-between items-center text-left text-gray-700 hover:bg-gray-100"
              >
                Logout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 2a5 5 0 0 0-5 5 1 1 0 1 0 2 0 3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3 1 1 0 1 0-2 0 5 5 0 0 0 5 5h4a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5h-4Z" />
                  <path d="M14 11a1 1 0 1 1 0 2v-2Zm-8.282 0a38.459 38.459 0 0 0 1.027-1.325l.047-.063.012-.017.004-.007L6 9l.808.588a1 1 0 0 0-1.617-1.176l-.003.004-.01.014-.042.057-.16.216c-.14.184-.337.442-.57.736-.472.595-1.068 1.31-1.613 1.854L2.086 12l.707.707c.545.545 1.141 1.26 1.613 1.854a37.88 37.88 0 0 1 .73.952l.042.057.01.014.002.003a1 1 0 0 0 1.619-1.175l-.81.588.81-.588-.005-.007-.012-.017-.047-.063-.172-.23A39.987 39.987 0 0 0 5.718 13H14v-2H5.718Z" />
                </svg>
              </button>
            </div>
          )}
        </span>
      </div>
    </header>
  );
}
