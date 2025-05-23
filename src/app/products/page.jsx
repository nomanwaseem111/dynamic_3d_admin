"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/page";
import Button from "../../components/common/Button";
import Link from "next/link";
import Header from "../../components/Header";
import { Loader } from "../../components/Loader";
import Image from "next/image";
import { addIcon, closeIcon } from "../../../public";
import { useRouter } from 'next/navigation'

export default function Products() {
  const router = useRouter();

  // Store pages: each page is an object with { products, nextToken }
  const [pages, setPages] = useState([]);
  console.log("pages", pages);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const [isLoader, setIsLoader] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);


  // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tabs state for filtering products
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Visible", "Not Visible"];

  // Fetch function that accepts a token (null for first page)
  const fetchProducts = async (nextToken = null) => {
    setIsLoader(true);
    setFetchError(null);

    try {
      let url = "https://s51b3gg2hh.execute-api.us-east-1.amazonaws.com/dev/get-products";

      if (nextToken) {
        url += `?nextToken=${nextToken}`;
      }

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (data.error) {
        setFetchError(data.error);
        return;
      }

      const pageData = {
        products: data.products || [],
        nextToken: data.nextToken || null,
      };

      setPages((prev) => [...prev, pageData]);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFetchError(error.message);
    } finally {
      setIsLoader(false);
    }
  };

  const handleDelete = async (productId) => {
    setDeletingProductId(productId);
    setFetchError(null);
    try {
      const res = await fetch(
        `https://s51b3gg2hh.execute-api.us-east-1.amazonaws.com/dev/delete-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.error) {
        setFetchError(data.error);
      } else {
        setPages((prev) =>
          prev.map((page) => ({
            ...page,
            products: page.products.filter((p) => p.productId !== productId),
          }))
        );
      }
    } catch (err) {
      console.error(err);
      setFetchError(err.message);
    } finally {
      setDeletingProductId(null);
    }
  };

  const confirmDelete = () => {
    if (!deleteProductId) return;
    handleDelete(deleteProductId).then(() => {
      setIsDeleteModalOpen(false);
      setDeleteProductId(null);
    });
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteProductId(null);
  };

  // Fetch the first page on mount
  useEffect(() => {
    fetchProducts(); // token null for the first page
  }, []);

  const goToDetail = (product) => {
    const slug = product.productName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    router.push(`/product-info/${slug}/${product.productId}`);
  };

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
    if (isLoader) return;
    const token = currentPage.nextToken;
    if (!token) return;
    if (pages[currentPageIndex + 1]) {
      setCurrentPageIndex(currentPageIndex + 1);
      return;
    }
    await fetchProducts(token);
    setCurrentPageIndex((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => Math.max(prev - 1, 0))
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

  const isNextDisabled = !currentPage.nextToken || isLoader;

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
                className="skew-x-[-30deg] btn uppercase text-[12.562px] w-[160px] gap-1  rounded-[9.421px] h-[40px] font-bold flex justify-center items-center text-[#000]"
              />
            </Link>
          </header>

          {filteredProducts.length > 0 && (
            <div className="bg-[#141414]  w-full rounded-[20px]">
              <div className="flex gap-3 no-scrollbar p-[20px] mb-2 overflow-x-auto whitespace-nowrap">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`bg-transparent font-[montserrat]   rounded-[8px] skew-x-[-30deg]  px-4 py-2.5 cursor-pointer relative ${activeTab === tab
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
                        <th className="p-3 font-medium text-left w-[10%]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.productId}
                          onClick={() => goToDetail(product)}
                          className="border-b border-[#333] cursor-pointer hover:bg-[#ffffff1f]"
                        >
                          <td className="p-5">
                            <input
                              type="checkbox"
                              checked={
                                selectedProduct?.productId === product.productId
                              }
                              onChange={(e) => {
                                e.stopPropagation();
                                handleProductSelection(product);
                              }}
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
                                className={`px-2.5 py-1 rounded text-xs font-medium ${product.visibility
                                  ? "bg-[#0B9B00] text-white"
                                  : "bg-red-800 text-white"
                                  }`}
                              >
                                {product.visibility ? "Enabled" : "Disabled"}
                              </span>
                            </button>
                          </td>
                          <td className="p-3">
                            <div
                              className="w-20 cursor-pointer flex justify-center items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteProductId(product.productId);
                                setIsDeleteModalOpen(true);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M21.0702 5.23C19.4602 5.07 17.8502 4.95 16.2302 4.86V4.85L16.0102 3.55C15.8602 2.63 15.6402 1.25 13.3002 1.25H10.6802C8.35016 1.25 8.13016 2.57 7.97016 3.54L7.76016 4.82C6.83016 4.88 5.90016 4.94 4.97016 5.03L2.93016 5.23C2.51016 5.27 2.21016 5.64 2.25016 6.05C2.29016 6.46 2.65016 6.76 3.07016 6.72L5.11016 6.52C10.3502 6 15.6302 6.2 20.9302 6.73C20.9602 6.73 20.9802 6.73 21.0102 6.73C21.3902 6.73 21.7202 6.44 21.7602 6.05C21.7902 5.64 21.4902 5.27 21.0702 5.23Z"
                                  fill="#C2C2C2"
                                  fillOpacity="0.9"
                                />
                                <path
                                  d="M19.2302 8.14C18.9902 7.89 18.6602 7.75 18.3202 7.75H5.68024C5.34024 7.75 5.00024 7.89 4.77024 8.14C4.54024 8.39 4.41024 8.73 4.43024 9.08L5.05024 19.34C5.16024 20.86 5.30024 22.76 8.79024 22.76H15.2102C18.7002 22.76 18.8402 20.87 18.9502 19.34L19.5702 9.09C19.5902 8.73 19.4602 8.39 19.2302 8.14ZM13.6602 17.75H10.3302C9.92024 17.75 9.58024 17.41 9.58024 17C9.58024 16.59 9.92024 16.25 10.3302 16.25H13.6602C14.0702 16.25 14.4102 16.59 14.4102 17C14.4102 17.41 14.0702 17.75 13.6602 17.75ZM14.5002 13.75H9.50024C9.09024 13.75 8.75024 13.41 8.75024 13C8.75024 12.59 9.09024 12.25 9.50024 12.25H14.5002C14.9102 12.25 15.2502 12.59 15.2502 13C15.2502 13.41 14.9102 13.75 14.5002 13.75Z"
                                  fill="#C2C2C2"
                                  fillOpacity="0.9"
                                />
                              </svg>
                            </div>
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
                  className={`px-4 py-2 rounded-[9.421px] font-bold  skew-x-[-30deg] ${currentPageIndex === 0
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
                  disabled={isNextDisabled}
                  className={`px-4 py-2 rounded-[9.421px] font-bold skew-x-[-30deg] cursor-pointer ${isNextDisabled
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

          {isDeleteModalOpen && (
            <div
              onClick={!deletingProductId ? cancelDelete : undefined}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm bg-[#1a1a1a] border border-[#282828] rounded-xl shadow-xl p-6"
              >
                <h3 className="text-white text-lg font-bold mb-4">
                  Confirm Deletion
                </h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete this product?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={cancelDelete}
                    disabled={deletingProductId !== null}
                    className={`px-4 py-2 rounded bg-gray-600 text-white ${deletingProductId !== null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deletingProductId !== null}
                    className={`px-4 py-2 rounded bg-red-600 text-white flex items-center justify-center ${deletingProductId !== null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {deletingProductId === deleteProductId
                      ? <Loader size="small" />
                      : 'Delete'
                    }
                  </button>
                </div>
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
                  <p className="text-gray-400 text-sm mb-3">
                    {selectedProduct?.categories}
                  </p>

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
