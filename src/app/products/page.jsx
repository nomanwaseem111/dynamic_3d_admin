// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Sidebar } from "../../components/Sidebar/page";
// import Button from "../../components/common/Button";
// import Link from "next/link";
// import Header from "../../components/Header";
// import { Loader } from "../../components/Loader";

// export default function Products() {
//   const productTypeRef = useRef(null);
//   const brandRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         productTypeRef.current &&
//         !productTypeRef.current.contains(event.target)
//       ) {
//         setIsProductTypeOpen(false);
//       }
//       if (brandRef.current && !brandRef.current.contains(event.target)) {
//         setIsBrandOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [activeTab, setActiveTab] = useState("All");
//   const [products, setProducts] = useState([]);
//   const [isLoader, setIsLoader] = useState(false);
//   const [fetchError, setFetchError] = useState(null);

//   useEffect(() => {
//     async function fetchProducts() {
//       setIsLoader(true);
//       // clear out any existing error
//       setFetchError(null);

//       try {
//         const res = await fetch(
//           "https://s51b3gg2hh.execute-api.us-east-1.amazonaws.com/dev/get-products"
//         );
//         const data = await res.json();

//         if (data.error) {
//           setFetchError(data.error);
//           // optionally setProducts([]) if you want an empty array
//           setProducts([]);
//           return;
//         }

//         // otherwise set your products
//         setProducts(Array.isArray(data) ? data : [data]);
//       } catch (error) {
//         // if the request fails entirely, set an error message
//         console.error("Error fetching products:", error);
//         setFetchError(error.message);
//       } finally {
//         setIsLoader(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   const tabs = ["All", "Visible", "Not Visible"];

//   const [visibility, setVisibility] = useState("Enabled");

//   const toggleVisibility = (id) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === id
//           ? {
//               ...product,
//               visibility:
//                 product.visibility.toLowerCase() === "enabled"
//                   ? "Disabled"
//                   : "Enabled",
//             }
//           : product
//       )
//     );
//   };

//   const toggleProductSelection = (productId) => {
//     if (selectedProducts.includes(productId)) {
//       setSelectedProducts(selectedProducts.filter((id) => id !== productId));
//     } else {
//       setSelectedProducts([...selectedProducts, productId]);
//     }
//   };

//   const toggleAllProducts = () => {
//     if (selectedProducts.length === products.length) {
//       setSelectedProducts([]);
//     } else {
//       setSelectedProducts(products.map((product) => product.id));
//     }
//   };
//   let productsData = products[0]?.products;

//   return (
//     <div className="flex flex-col h-screen font-[montserrat] bg-[#111] text-white">
//       <Header />
//       <div className="flex h-full w-full">
//         <Sidebar />
//         <div className="p-5 w-full bg-[#121212] text-white">
//           <header className="flex justify-between w-full items-center mb-5">
//             <h1 className="text-[40px] font-medium">Products</h1>
//             <Link href="/add-product">
//               <Button
//                 children="Add Product"
//                 className="skew-x-[-30deg] btn uppercase max-w-[180px] px-5 w-full rounded-[9.421px] h-[56px] font-bold flex justify-center items-center text-[#000]"
//               />
//             </Link>
//           </header>

//           {productsData?.length > 0 && (
//             <div className="bg-[#141414] w-full rounded-[20px]">
//               <div className="flex  no-scrollbar  p-[20px]  mb-2 overflow-x-auto whitespace-nowrap">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab}
//                     className={`bg-transparent font-[montserrat] border-none px-4 py-2.5 cursor-pointer relative ${
//                       activeTab === tab
//                         ? "text-white after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-[#9bdc28]"
//                         : "text-[#aaa]"
//                     }`}
//                     onClick={() => setActiveTab(tab)}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               <div className="w-full rounded overflow-hidden">
//                 <div className="max-h-[400px] overflow-auto no-scrollbar">
//                   <table className="w-full border-collapse">
//                     <thead className="sticky -top-1 bg-[#141414] z-10">
//                       <tr className="border-b border-t  border-[#333]">
//                         <th className="p-3 font-medium text-left"></th>
//                         <th className="p-3 font-medium text-left">Name</th>
//                         <th className="p-3 font-medium text-left">SKU</th>
//                         <th className="p-3 font-medium text-left">
//                           Categories
//                         </th>

//                         <th className="p-3 font-medium text-left w-[10%]">
//                           Price
//                         </th>

//                         <th className="p-3 font-medium text-left w-[10%]">
//                           Visibility
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {productsData?.map((product, i) => {
//                         console.log(
//                           "product[i]?.images[0]?.imageUrl",
//                           product.images[0].imageUrl
//                         );
//                         return (
//                           <tr
//                             key={product.productId}
//                             className={`border-b border-[#333] ${
//                               selectedProducts.includes(product.productId)
//                                 ? "bg-[rgba(155,220,40,0.1)]"
//                                 : ""
//                             }`}
//                           >
//                             <td className="p-5">
//                               <input
//                                 type="checkbox"
//                                 checked={selectedProducts.includes(
//                                   product.productId
//                                 )}
//                                 onChange={() =>
//                                   toggleProductSelection(product.productId)
//                                 }
//                                 className="cursor-pointer"
//                               />
//                             </td>

//                             <td className="p-5 flex items-center gap-[20px]">
//                               <div className="w-10 h-10 flex items-center  rounded">
//                                 <img
//                                   src={product?.images[0]?.imageUrl}
//                                   alt=""
//                                   className="w-10 h-10 object-cover"
//                                 />
//                               </div>

//                               {product.productName}
//                             </td>
//                             <td className="p-5 truncate">{product.sku}</td>
//                             <td className="p-5">{product.categories}</td>
//                             <td className="p-5">${product.defaultPrice}.00</td>

//                             <td className="p-5">
//                               <button
//                               // onClick={() => toggleVisibility(product.id)}
//                               >
//                                 <span
//                                   className={`px-2.5 py-1 rounded text-xs font-medium ${
//                                     product.visibility
//                                       ? "bg-[#28a745] text-white"
//                                       : "bg-[#dc3545] text-white"
//                                   }`}
//                                 >
//                                   {product.visibility ? "Enabled" : "Disabled"}
//                                 </span>
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {fetchError && (
//             <div className="text-red-400 text-2xl text-center mb-4">
//               {fetchError}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { Sidebar } from "../../components/Sidebar/page";
import Button from "../../components/common/Button";
import Link from "next/link";
import Header from "../../components/Header";
import { Loader } from "../../components/Loader";
import Image from "next/image";
import { closeIcon } from "../../../public";

export default function Products() {
  const productTypeRef = useRef(null);
  const brandRef = useRef(null);

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
    <div className="flex flex-col h-screen font-[montserrat] bg-[#111] text-white">
      <Header />
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="p-5 w-full bg-[#121212] text-white">
          <header className="flex justify-between w-full items-center mb-5">
            <h1 className="text-[40px] font-medium">Products</h1>
            <Link href="/add-product">
              <Button
                children="Add Product"
                className="skew-x-[-30deg] btn uppercase max-w-[180px] px-5 w-full rounded-[9.421px] h-[56px] font-bold flex justify-center items-center text-[#000]"
              />
            </Link>
          </header>

          {filteredProducts.length > 0 && (
            <div className="bg-[#141414] w-full rounded-[20px]">
              {/* Tab Navigation */}
              <div className="flex no-scrollbar p-[20px] mb-2 overflow-x-auto whitespace-nowrap">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`bg-transparent font-[montserrat] border-none px-4 py-2.5 cursor-pointer relative ${
                      activeTab === tab
                        ? "text-white after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-[#9bdc28]"
                        : "text-[#aaa]"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Products Table */}
              <div className="w-full rounded overflow-hidden">
                <div className="max-h-[400px] overflow-auto no-scrollbar">
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
                          <td className="p-5 flex items-center gap-[20px]">
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
                          <td className="p-5 truncate">{product.sku}</td>
                          <td className="p-5">{product.categories}</td>
                          <td className="p-5">${product.defaultPrice}.00</td>
                          <td className="p-5">
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
              <div className="flex justify-between p-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPageIndex === 0}
                  className={`px-4 py-2 rounded ${
                    currentPageIndex === 0
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#9bdc28] text-[#000]"
                  }`}
                >
                  Previous Page
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={!currentPage.nextToken}
                  className={`px-4 py-2 rounded ${
                    !currentPage.nextToken
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-[#9bdc28] text-[#000]"
                  }`}
                >
                  Next Page
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
