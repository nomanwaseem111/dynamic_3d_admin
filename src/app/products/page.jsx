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

  // Get the current page (or a default if not yet loaded)
  const currentPage = pages[currentPageIndex] || {
    products: [],
    nextToken: null,
  };

  // Filter products based on activeTab
  const filteredProducts = currentPage.products.filter((product) => {
    if (activeTab === "Visible") return product.visibility === true;
    if (activeTab === "Not Visible") return product.visibility === false;
    return true;
  });

  // Handle next page click
  const handleNextPage = async () => {
    if (currentPage.nextToken) {
      // If we've already fetched the next page, just move to it
      if (pages[currentPageIndex + 1]) {
        setCurrentPageIndex(currentPageIndex + 1);
      } else {
        // Otherwise, fetch the next page and update currentPageIndex
        await fetchProducts(currentPage.nextToken);
        setCurrentPageIndex((prev) => prev + 1);
      }
    }
  };

  // Handle previous page click
  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

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
              {/* Tab Navigation */}
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

              {/* Products Table */}
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
                                    ? "bg-[#28a745] text-white"
                                    : "bg-[#dc3545] text-white"
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

              {/* Pagination Buttons */}
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

          {/* Modal for product details */}
          {isModalOpen && selectedProduct && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" />
              <div
                className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800">
                  {selectedProduct?.images?.[0]?.imageUrl ? (
                    <img
                      src={selectedProduct.images[0].imageUrl}
                      alt={selectedProduct.productName}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image available
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    {selectedProduct?.visibility ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                        Enabled
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                        Disabled
                      </span>
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="absolute top-4 left-4 p-1 rounded-full cursor-pointer bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 transition-colors dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:text-gray-300 dark:hover:text-white"
                    aria-label="Close modal"
                  >
                    <Image
                      src={closeIcon}
                      alt="closeIcon"
                      className="w-[15px] h-[15px]"
                    />
                  </button>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {selectedProduct?.productName}
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        SKU
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedProduct?.sku}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Category
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedProduct?.categories}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Price
                      </span>
                      <span className="font-bold text-lg text-gray-900 dark:text-white">
                        ${selectedProduct?.defaultPrice?.toLocaleString()}.00
                      </span>
                    </div>
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
