import LoginForm from "@/components/LoginForm";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Login() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token?.value) {
    redirect("/dashboard/packages/");
  }
  return (
    <div className="flex justify-center h-screen bg-[#EDF4F7] overflow-y-scroll bg-no-repeat bg-cover bg-center overflow-x-hidden items-center ">
      <div className="lg:w-[45%] xl:w-[40%] xlg:w-[35%] w-[95%] md:w-[60%] bg-white h-fit py-10 lg:px-6 xlg:px-16 gap-8 flex flex-col rounded-lg text-black bg-transparent">
        <div className="flex flex-col justify-center items-center gap-4 ">
          <Image
            src="/logo.png"
            alt="logo"
            className="h-[5rem]"
            width={80}
            height={80}
          />
          <div className="xlg:text-lg text-base">
            Welcome back, Login to your account
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
