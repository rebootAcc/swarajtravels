import Image from "next/image";

export default function DetailCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-[#f5f5f5] rounded p-10 flex flex-col gap-3 items-center">
      <div>
        {!!icon && (
          <Image
            src={icon}
            alt="card icon"
            width={70}
            height={70}
            className="w-[4.85vmax]"
          />
        )}
      </div>
      <div className="flex flex-col gap-3 items-center">
        {title !== "" && (
          <h2 className="text-base md:text-xl text-typeograph-1 font-bold whitespace-nowrap">
            {title}
          </h2>
        )}
        {value !== "" && (
          <h3 className="text-typeograph-2 font-medium text-sm md:text-base capitalize">
            {value}
          </h3>
        )}
      </div>
    </div>
  );
}
