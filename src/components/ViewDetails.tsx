"use client";

import { ReactNode } from "react";

export default function ViewDetails({
  children,
  setIsViewOpen,
}: {
  children: ReactNode | ReactNode[];
  setIsViewOpen: any;
}) {
  const closeView = () => {
    setIsViewOpen(false); // Close the view
  };

  if (!children) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end ">
      <div
        className="bg-black bg-opacity-50 absolute inset-0"
        onClick={closeView}
      ></div>
      <div
        className="bg-white w-[50%] h-screen overflow-scroll p-4 transform transition-all ease-in-out duration-300"
        style={{ transform: "translateX(0)" }}
      >
        {children}
      </div>
    </div>
  );
}
