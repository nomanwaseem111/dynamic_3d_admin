"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/page";
import Button from "../../components/common/Button";
import Link from "next/link";
import Header from "../../components/Header";
import { Loader } from "../../components/Loader";
import Image from "next/image";
import { addIcon, closeIcon } from "../../../public";

export default function Products() {
  // Store pages: each page is an object with { products, nextToken }
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [isLoader, setIsLoader] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tabs state for filtering products
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Visible", "Not Visible"];

  // Fetch function that accepts a token (null for first page)
  const fetchProducts = async (token = null) => {
    setIsLoader(true);
    setFetchError(null);

    try {
      let url =
        "https://s51b3gg2hh.execute-api.us-east-1.amazonaws.com/dev/get-products";
      if (token) {
        url += `?nextToken=${encodeURIComponent(token)}`;
      }
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        setFetchError(data.error);
        return;
      }

      const pageData = {
        products: data.products || [],
        nextToken: data.nextToken || null,
      };

      // Append the new page to our pages array
      setPages((prev) => [...prev, pageData]);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFetchError(error.message);
    } finally {
      setIsLoader(false);
    }
  };

  // Fetch the first page on mount
  useEffect(() => {
    fetchProducts(); // token null for the first page
  }, []);

  // Modal functions
  const handleProductSelection = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const currentPage = pages[currentPageIndex] || {
    products: [],
    nextToken: null,
  };

  const filteredProducts = currentPage.products.filter((product) => {
    if (activeTab === "Visible") return product.visibility === true;
    if (activeTab === "Not Visible") return product.visibility === false;
    return true;
  });

  const handleNextPage = async () => {
    if (currentPage.nextToken) {
      if (pages[currentPageIndex + 1]) {
        setCurrentPageIndex(currentPageIndex + 1);
      } else {
        await fetchProducts(currentPage.nextToken);
        setCurrentPageIndex((prev) => prev + 1);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

  return (
    <div className="flex flex-col min-h-full font-[montserrat] bg-[#111]  text-white">
      <Header />
      <div className="flex h-full w-full ">
        <Sidebar />
        <div className="px-[40px] w-full py-6 h-full bg-[#121212]  text-white">
          <header className="flex justify-between  px-3  w-full items-center mb-5">
            <h1 className="text-[40px] font-medium">Products</h1>
            <Link href="/add-product">
              <Button
                plusIcon={
                  <Image
                    src={addIcon}
                    alt="addIcon"
                    className="skew-x-[30deg]"
                  />
                }
                children="Add Product"
                className="skew-x-[-30deg] btn uppercase text-[12.562px] w-[180px] gap-1  rounded-[9.421px] h-[56px] font-bold flex justify-center items-center text-[#000]"
              />
            </Link>
          </header>

          {filteredProducts.length > 0 && (
            <div className="bg-[#141414]  w-full rounded-[20px]">
              <div className="flex gap-3 no-scrollbar p-[20px] mb-2 overflow-x-auto whitespace-nowrap">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`bg-transparent font-[montserrat]   rounded-[8px] skew-x-[-30deg]  px-4 py-2.5 cursor-pointer relative ${
                      activeTab === tab
                        ? "!border-[#9bdc28] text-[#9bdc28] border "
                        : "text-[#aaa] hover:text-[#fff] hover:bg-[#292929]"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <p className="skew-x-[30deg] text-[14px]">{tab}</p>
                  </button>
                ))}
              </div>

              <div className="w-full rounded overflow-hidden">
                <div className=" overflow-auto no-scrollbar">
                  <table className="w-full border-collapse">
                    <thead className="sticky -top-1 bg-[#141414] z-10">
                      <tr className="border-b border-t border-[#333]">
                        <th className="p-3 font-medium text-left"></th>
                        <th className="p-3 font-medium text-left">Name</th>
                        <th className="p-3 font-medium text-left">SKU</th>
                        <th className="p-3 font-medium text-left">
                          Categories
                        </th>
                        <th className="p-3 font-medium text-left w-[10%]">
                          Price
                        </th>
                        <th className="p-3 font-medium text-left w-[10%]">
                          Visibility
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.productId}
                          className="border-b border-[#333]"
                        >
                          <td className="p-5">
                            <input
                              type="checkbox"
                              checked={
                                selectedProduct?.productId === product.productId
                              }
                              onChange={() => handleProductSelection(product)}
                              className="cursor-pointer"
                            />
                          </td>
                          <td className="p-3 flex items-center gap-[20px]">
                            <div className="w-10 h-10 flex items-center rounded">
                              {product?.images?.[0]?.imageUrl ? (
                                <img
                                  src={product.images[0].imageUrl}
                                  alt=""
                                  className="w-10 h-10 object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 flex items-center justify-center bg-[#333]">
                                  N/A
                                </div>
                              )}
                            </div>
                            {product.productName}
                          </td>
                          <td className="p-3 truncate">{product.sku}</td>
                          <td className="p-3">{product.categories}</td>
                          <td className="p-3">${product.defaultPrice}.00</td>
                          <td className="p-3">
                            <button>
                              <span
                                className={`px-2.5 py-1 rounded text-xs font-medium ${
                                  product.visibility
                                    ? "bg-[#0B9B00] text-white"
                                    : "bg-red-800 text-white"
                                }`}
                              >
                                {product.visibility ? "Enabled" : "Disabled"}
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-5 justify-end items-center  p-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPageIndex === 0}
                  className={`px-4 py-2 rounded-[9.421px] font-bold  skew-x-[-30deg] ${
                    currentPageIndex === 0
                      ? "bg-[#474747] cursor-not-allowed text-[#323232]"
                      : "bg-[#9bdc28] text-[#000] cursor-pointer"
                  }`}
                >
                  <p className="skew-x-[30deg] text-[12.562px] font-[Montserrat] uppercase">
                    Previous
                  </p>
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={!currentPage.nextToken}
                  className={`px-4 py-2 rounded-[9.421px] font-bold skew-x-[-30deg] cursor-pointer ${
                    !currentPage.nextToken
                      ? "bg-[#474747] cursor-not-allowed text-[#323232]"
                      : "bg-[#9bdc28] text-[#000] cursor-pointer"
                  }`}
                >
                  <p className="skew-x-[30deg] text-[12.562px] font-[Montserrat] uppercase">
                    Next
                  </p>
                </button>
              </div>
            </div>
          )}

          {isModalOpen && selectedProduct && (
            <div
              onClick={closeModal}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200  flex items-center justify-center p-4 z-50"
            >
              <div
                className="relative w-full max-w-[394px] bg-[#1a1a1a] border border-[#282828] rounded-xl overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-white z-10"
                  aria-label="Close"
                >
                  <Image src={closeIcon} alt="closeIcon" />
                </button>

                <div className="flex justify-center">
                  <div className="h-[309px] relative">
                    <img
                      src={selectedProduct?.images[0]?.imageUrl}
                      alt={selectedProduct.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="p-4  bg-[#0F0F0F]">
                  <div className="inline-block px-3 py-[6px] bg-[#B2D235] text-black text-xs font-[600] rounded-[8px] skew-x-[-30deg] mb-2">
                    <p className="skew-x-[30deg]">{selectedProduct?.sku}</p>
                  </div>

                  <h3 className="text-white text-[28px] line-clamp-1 font-bold mb-1">
                    {selectedProduct?.productName}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">3D Scanners</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="text-white text-[36px] font-bold">
                      ${selectedProduct?.defaultPrice?.toLocaleString()}.00
                    </div>

                    {selectedProduct?.visibility ? (
                      <button className="px-3 py-1 bg-[#0B9B00] text-white text-sm rounded-md">
                        Enabled
                      </button>
                    ) : (
                      <button className="px-3 py-1 bg-red-800 text-white text-sm rounded-md">
                        Disabled
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {fetchError && (
            <div className="text-red-400 text-2xl text-center mb-4">
              {fetchError}
            </div>
          )}

          {isLoader && (
            <div className="flex justify-center items-center mt-4">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
