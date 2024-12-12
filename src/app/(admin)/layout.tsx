import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Swaraj Travellers Admin",
  description:
    "Swaraj Travellers made by Reboot AI private limited. Here you can find your dream spot travels package in your budget and much more",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token?.value) {
    redirect("/login");
  }

  return <>{children}</>;
}
