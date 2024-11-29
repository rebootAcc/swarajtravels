import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="shadow-custom-shadow bg-white rounded-xl flex flex-col">
      {children}
    </div>
  );
}
