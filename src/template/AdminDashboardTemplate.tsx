import SideHeader from "@/components/SideHeader";
import { ReactNode } from "react";

export default function AdminDashboardTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row h-screen">
        <span className="xl:w-[15%] w-[20%]">
          <SideHeader />
        </span>
        <div className="w-[80%] xl:w-[85%] xl:px-6 px-4 xlg:px-8 p-4 overflow-hidden overflow-y-scroll flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
