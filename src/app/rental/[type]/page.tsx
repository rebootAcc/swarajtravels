import SubBanner from "@/components/SubBanner";
import RentalCardList from "@/features/RentalCardList";
import WebsiteTemplate from "@/template/WebsiteTemplate";

async function getRentals(type: string) {
  try {
    const response = await fetch(
      `${process.env.API_URI}/api/rentals?rentalType=${type}&rentalActiveStatus=true`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export default async function Rental({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const type = (await params).type;
  const rentals = await getRentals(type);

  return (
    <WebsiteTemplate>
      <SubBanner heading={`${type} Rental Packages`} />
      <section className="p-4 sm:p-10 xlg:p-20 flex flex-col gap-4 lg:gap-8">
        <h2 className="text-xl sm:text-3xl font-bold text-typeograph-1 capitalize">
          {type} Rental Packages
        </h2>
        <RentalCardList rentals={rentals?.rentals} />
      </section>
    </WebsiteTemplate>
  );
}
