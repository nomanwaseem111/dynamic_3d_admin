import Image from "next/image";
import { useState } from "react";
import { starIcon } from "../../../../public";

export default function StoreFront() {
  const [isVisibleOnStorefront, setIsVisibleOnStorefront] = useState(true);

  return (
    <div className="h-auto  text-white mt-[35px]">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-1">Storefront</h1>
        <p className="text-sm text-[#fff]">
          Setup what customers will see on the storefront
        </p>
      </div>
      <div className="bg-[#141414] rounded-[20px] p-4 md:p-6 mb-8 relative">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[14px] flex items-center gap-[21px] font-[400]">
              <Image src={starIcon} alt="starIcon" />
              Set as a Featured Product on my Storefront
            </h2>
            <div className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded border ${
                    isVisibleOnStorefront
                      ? "bg-blue-500 border-blue-500"
                      : "bg-transparent border-gray-500"
                  } flex items-center justify-center mr-2 cursor-pointer`}
                  onClick={() =>
                    setIsVisibleOnStorefront(!isVisibleOnStorefront)
                  }
                >
                  {isVisibleOnStorefront && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <label
                  htmlFor="visible"
                  className="text-[16px] cursor-pointer"
                  onClick={() =>
                    setIsVisibleOnStorefront(!isVisibleOnStorefront)
                  }
                >
                  Show condition on storefront
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="search-keywords" className="block mb-2 font-medium">
              Search Keywords
            </label>
            <input
              type="text"
              id="search-keywords"
              className="w-full  border border-[#5f5f5f] rounded-md p-2 text-sm"
              placeholder="most accurate, black, elite, limited, 12 microns, automations, robot, cobot, automatic, quality"
            />
          </div>

          <div>
            <label htmlFor="availability" className="block mb-2 font-medium">
              Availability Test
            </label>
            <input
              type="text"
              id="availability"
              className="w-full  border border-[#5f5f5f]  rounded-md p-2 text-sm"
              placeholder="usually ships within 1-2 weeks"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="sort-order" className="block mb-2 font-medium">
                Sort Order
              </label>
              <input
                type="number"
                id="sort-order"
                className="w-full border border-[#5f5f5f]  rounded-md p-2 text-sm"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="template" className="block mb-2 font-medium">
                Template Layout File
              </label>
              <div className="relative">
                <select
                  id="template"
                  className="w-full  border border-[#5f5f5f]  rounded-md p-2 text-sm appearance-none"
                >
                  <option>Default</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="condition" className="block mb-2 font-medium">
                Condition
              </label>
              <div className="relative">
                <select
                  id="condition"
                  className="w-full  border border-[#5f5f5f]  rounded-md p-2 text-sm appearance-none"
                >
                  <option>New</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="warranty" className="block mb-2 font-medium">
              Warranty Information
            </label>
            <textarea
              id="warranty"
              className="w-full border border-[#5f5f5f]  rounded-md p-2 text-sm min-h-[100px]"
              placeholder="Warranty Coverage: 12 Months Parts & Labor + 24/5 Tech Support (Extended Warranty Options Available)"
              defaultValue="Warranty Coverage: 12 Months Parts & Labor + 24/5 Tech Support (Extended Warranty Options Available)"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
