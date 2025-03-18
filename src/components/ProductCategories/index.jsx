"use client"

import Image from "next/image";
import { useState, useRef } from "react";
import { downArrowIcon, PlusIcon } from "../../../public";
import Button from "../common/Button";
import Link from "next/link";

export const ProductCategories = () => {
  const [categories, setCategories] = useState([
    // { id: 1, name: "3D Scanners", checked: true, icon: "📁" },
    // { id: 2, name: "3D Software", checked: false, icon: "📁" },
    // { id: 3, name: "Accessories", checked: false, icon: "📁" },
    // { id: 4, name: "Engineering Computers", checked: false, icon: "📁" },
    // { id: 5, name: "3D Scanning Services", checked: false, icon: "📁" },
    // { id: 5, name: "3D Scanning Services", checked: false, icon: "📁" },
    // { id: 5, name: "3D Scanning Services", checked: false, icon: "📁" },
    // { id: 5, name: "3D Scanning Services", checked: false, icon: "📁" },
  ]);

  const [isVisibleOnStorefront, setIsVisibleOnStorefront] = useState(true);
  const [productType, setProductType] = useState("");
  const [categoriesType, setCategoriesType] = useState("");
  const [brand, setBrand] = useState("");
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);
  const [isCategoriesTypeOpen, setIsCategoriesTypeOpen] = useState(false);

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const productTypeRef = useRef(null);
  const brandRef = useRef(null);
  const categoriesRef = useRef(null);
  const toggleCategory = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  return (
    <div className="mb-8 mt-[37.5px] bg-[#141414] rounded-[20px] p-[35px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[28px] font-[700]">Basic Information</h2>
        <div className="flex items-center">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 rounded border ${
                isVisibleOnStorefront
                  ? "bg-blue-500 border-blue-500"
                  : "bg-transparent border-gray-500"
              } flex items-center justify-center mr-2 cursor-pointer`}
              onClick={() => setIsVisibleOnStorefront(!isVisibleOnStorefront)}
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
              onClick={() => setIsVisibleOnStorefront(!isVisibleOnStorefront)}
            >
              Visible on Storefront
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1  mt-[41.5px] sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <label className="block mb-2 text-[18px] font-[700]">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 h-[50px] bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
          />
        </div>

        <div>
          <label className="block mb-2 text-[18px] font-[700]">SKU</label>
          <input
            type="text"
            className="w-full px-3 h-[50px] bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
          />
        </div>

        <div ref={productTypeRef}>
          <label className="block mb-2 text-[18px] font-[700]">
            Product Type
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full flex h-[50px] items-center justify-between px-3 py-2 bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
              onClick={() => setIsProductTypeOpen(!isProductTypeOpen)}
            >
              <span>{productType}</span>

              <Image
                src={downArrowIcon}
                alt="downArrowIcon"
                className={`transition-transform ${
                  isProductTypeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProductTypeOpen && (
              <div className="absolute z-10 mt-1 w-full bg-[#111] border border-[#333] rounded-md shadow-lg">
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setProductType("Physical");
                    setIsProductTypeOpen(false);
                  }}
                >
                  Physical
                </div>
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setProductType("Digital");
                    setIsProductTypeOpen(false);
                  }}
                >
                  Digital
                </div>
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setProductType("Service");
                    setIsProductTypeOpen(false);
                  }}
                >
                  Service
                </div>
              </div>
            )}
          </div>
        </div>

        <div ref={brandRef}>
          <label className="block mb-2 text-[18px] font-[700]">Brand</label>
          <div className="relative">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 h-[50px] bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
              onClick={() => setIsBrandOpen(!isBrandOpen)}
            >
              <span>{brand}</span>
              {/* <ChevronDown size={16} className={`transition-transform ${isBrandOpen ? "rotate-180" : ""}`} /> */}
            </button>

            {isBrandOpen && (
              <div className="absolute z-10 mt-1 w-full bg-[#111] border border-[#333] rounded-md shadow-lg">
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setBrand("Creaform");
                    setIsBrandOpen(false);
                  }}
                >
                  Creaform
                </div>
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setBrand("Other Brands");
                    setIsBrandOpen(false);
                  }}
                >
                  Other Brands
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-[18px] font-[700]">
            Default Price <span className="text-red-500">*</span>
            <span className="text-gray-400 ml-1">(excluding tax)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5">$</span>
            <input
              type="number"
              className="w-full pl-6  pr-3 h-[50px] bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-[18px] font-[700]">
            Weight <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 h-[50px] pr-12 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
            />
            <span className="absolute right-3 top-3.5 text-gray-400">LBS</span>
          </div>
        </div>

        <div ref={categoriesRef}>
          <label className="block mb-2 text-[18px] font-[700]">
            Categories
          </label>
          <div className="relative">
            <button
              type="button"
              className="w-full flex h-[50px] items-center justify-between px-3 py-2 bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
              onClick={() => setIsCategoriesTypeOpen(!isCategoriesTypeOpen)}
            >
              <span>{categoriesType}</span>

              <Image
                src={downArrowIcon}
                alt="downArrowIcon"
                className={`transition-transform ${
                  isCategoriesTypeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoriesTypeOpen && (
              <div className="absolute z-10 mt-1 w-full bg-[#111] border border-[#333] rounded-md shadow-lg">
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setCategoriesType("3D Scanners");
                    setIsCategoriesTypeOpen(false);
                  }}
                >
                  3D Scanners
                </div>
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setCategoriesType("3D Software");
                    setIsCategoriesTypeOpen(false);
                  }}
                >
                  3D Software
                </div>
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setCategoriesType("Accessories");
                    setIsCategoriesTypeOpen(false);
                  }}
                >
                  Accessories
                </div>
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setCategoriesType("Engineering Computers");
                    setIsCategoriesTypeOpen(false);
                  }}
                >
                  Engineering Computers
                </div>
                <div
                  className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                  onClick={() => {
                    setCategoriesType("3D Scanning Services");
                    setIsCategoriesTypeOpen(false);
                  }}
                >
                  3D Scanning Services
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="mt-[55px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-[700]">Categories</h2>
          {categories.length > 0 && (
            <Link
              href="/"
              className={`skew-x-[0deg] text-[#B2D235] !flex items-center font-[700] uppercase`}
            >
              <Image src={PlusIcon} alt="PlusIcon" /> Add Category
            </Link>
          )}
        </div>

        {categories.length > 0 ? (
          <div className="bg-[#111] border h-[280px] no-scrollbar overflow-y-auto border-[#333]  rounded-[8px] p-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center  py-2 border-b border-[#222] last:border-0"
              >
                <div className="w-6 text-center mr-2">
                  <div
                    className={`w-4 h-4 mx-auto rounded border ${
                      category.checked
                        ? "bg-blue-500 border-blue-500"
                        : "bg-transparent border-gray-500"
                    } flex items-center justify-center cursor-pointer`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    {category.checked && (
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
                </div>
                <div className="w-6 text-center mr-2 text-yellow-500">
                  {category.icon}
                </div>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col bg-[#111] border justify-center gap-y-1 border-[#333]  rounded-[8px] items-center min-h-[280px]">
            <h2 className="text-[#595959] text-[38px] font-[700]">
              No Categories
            </h2>
            <p className="text-[#595959]">Click on Add Category to add one</p>
            <Link
              href="/"
              className={`skew-x-[0deg] text-[#B2D235] !flex items-center font-[700] uppercase`}
            >
              <Image src={PlusIcon} alt="PlusIcon" /> Add Category
            </Link>
          </div>
        )}
      </div> */}
    </div>
  );
};
