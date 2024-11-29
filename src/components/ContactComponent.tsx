export default function ContactComponent({
  normalHeading,
  highlightedHeading,
}: {
  normalHeading: string;
  highlightedHeading: string;
}) {
  return (
    <div className="bg-[url('/assets/sticker-bg.jpg')] bg-cover bg-no-repeat flex-1 overflow-hidden">
      <div className="flex flex-col px-6 md:px-16 py-4 md:py-10 w-full bg-white/75 flex-1 gap-5 md:gap-12">
        <h1 className="inline-flex flex-col gap-3 md:gap-6 text-xl sm:text-3xl font-bold text-center">
          <span className="text-typeograph-1">{normalHeading}</span>
          <span className="text-primary">{highlightedHeading}</span>
        </h1>
        <div className="flex flex-col gap-3 md:gap-5">
          <input
            type="text"
            placeholder="Name"
            className="py-3 lg:py-7 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="py-3 lg:py-7 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="py-3 lg:py-7 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <select className="py-3 lg:py-7 px-4 lg:px-8 outline-none border border-dashed border-primary rounded text-[#aaa]">
            <option value="" className="text-typeograph-2">
              Location
            </option>
            <option value="darjeeling" className="text-typeograph-2">
              Darjeeling
            </option>
            <option value="dooars" className="text-typeograph-2">
              Dooars
            </option>
            <option value="kalimpong" className="text-typeograph-2">
              Kalimpong
            </option>
            <option value="sikkim" className="text-typeograph-2">
              Sikkim
            </option>
            <option value="rajastan " className="text-typeograph-2">
              Rajastan
            </option>
          </select>
          <input
            type="text"
            placeholder="Message"
            className="py-3 lg:py-7 px-4 lg:px-8 outline-none border border-dashed border-primary rounded"
          />
          <button
            type="button"
            className="text-2xl text-white bg-primary lg:py-7 py-3 rounded"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
