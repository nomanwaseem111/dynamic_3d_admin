"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar/page";
import Button from "@/components/common/Button";
import AddProductForm from "@/components/AddProductForm/page";
import Link from "next/link";

export default function Products() {
  const productTypeRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        productTypeRef.current &&
        !productTypeRef.current.contains(event.target)
      ) {
        setIsProductTypeOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setIsBrandOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Enabled",
      starred: true,
    },
    {
      id: 2,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Disabled",
      starred: false,
    },
    {
      id: 3,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Enabled",
      starred: true,
    },
    {
      id: 4,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Enabled",
      starred: false,
    },
    {
      id: 5,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Disabled",
      starred: true,
    },
    {
      id: 6,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Enabled",
      starred: false,
    },
    {
      id: 7,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Enabled",
      starred: true,
    },
    {
      id: 8,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Disabled",
      starred: false,
    },
    {
      id: 9,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Enabled",
      starred: true,
    },
    {
      id: 10,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      sku: "SYS-H3D-BEK",
      categories: "3D Scanners, Portable 3D Scanners...",
      stock: "-",
      price: "$0.00",
      channels: "1",
      visibility: "Enabled",
      starred: false,
    },
  ]);
  const tabs = [
    "All",
    // "Featured",
    // "Free Shipping",
    // "Out of Stock",
    // "Inventory Low",
    // "Last Imported",
    "Visible",
    "Not Visible",
  ];

  // const products = [
  //   {
  //     id: 1,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Enabled",
  //     starred: true,
  //   },
  //   {
  //     id: 2,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Disabled",
  //     starred: false,
  //   },
  //   {
  //     id: 3,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Enabled",
  //     starred: true,
  //   },
  //   {
  //     id: 4,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Enabled",
  //     starred: false,
  //   },
  //   {
  //     id: 5,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Disabled",
  //     starred: true,
  //   },
  //   {
  //     id: 6,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Enabled",
  //     starred: false,
  //   },
  //   {
  //     id: 7,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Enabled",
  //     starred: true,
  //   },
  //   {
  //     id: 8,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Disabled",
  //     starred: false,
  //   },
  //   {
  //     id: 9,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Enabled",
  //     starred: true,
  //   },
  //   {
  //     id: 10,
  //     name: "HandySCAN BLACK | Elite with Automation Kit",
  //     sku: "SYS-H3D-BEK",
  //     categories: "3D Scanners, Portable 3D Scanners...",
  //     stock: "-",
  //     price: "$0.00",
  //     channels: "1",
  //     visibility: "Enabled",
  //     starred: false,
  //   },
  // ];

  const [visibility, setVisibility] = useState("Enabled");

  const toggleVisibility = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              visibility:
                product.visibility.toLowerCase() === "enabled"
                  ? "Disabled"
                  : "Enabled",
            }
          : product
      )
    );
  };

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const toggleAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.id));
    }
  };

  return (
    <div className="flex flex-col h-screen  bg-[#111] text-white">
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

          <div className="bg-[#141414] w-full rounded-[20px]">
            <div className="flex  no-scrollbar  p-[20px]  mb-2 overflow-x-auto whitespace-nowrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`bg-transparent border-none px-4 py-2.5 cursor-pointer relative ${
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

            {/* <div className="flex justify-between mb-5  px-[20px]">
              <div className="relative flex-1 h-[55px] max-w-2xl">
                <input
                  type="text"
                  placeholder="Search Products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-[#333] h-[55px] rounded px-3 py-2 pr-10 text-white"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M11.5 22.25C5.85 22.25 1.25 17.65 1.25 12C1.25 6.35 5.85 1.75 11.5 1.75C17.15 1.75 21.75 6.35 21.75 12C21.75 17.65 17.15 22.25 11.5 22.25ZM11.5 3.25C6.67 3.25 2.75 7.18 2.75 12C2.75 16.82 6.67 20.75 11.5 20.75C16.33 20.75 20.25 16.82 20.25 12C20.25 7.18 16.33 3.25 11.5 3.25Z"
                      fill="white"
                      fill-opacity="0.5"
                    />
                    <path
                      d="M21.9999 23.25C21.8099 23.25 21.6199 23.18 21.4699 23.03L19.4699 21.03C19.1799 20.74 19.1799 20.26 19.4699 19.97C19.7599 19.68 20.2399 19.68 20.5299 19.97L22.5299 21.97C22.8199 22.26 22.8199 22.74 22.5299 23.03C22.3799 23.18 22.1899 23.25 21.9999 23.25Z"
                      fill="white"
                      fill-opacity="0.5"
                    />
                  </svg>
                </span>
              </div>
              <Button
                children="Filters"
                className="skew-x-[-30deg] w-[126px] h-[55px] border border-[#B2D235] rounded-[12px] flex justify-center font-bold uppercase items-center"
              />
            </div> */}

            <div className="w-full rounded overflow-hidden">
              <div className="max-h-[400px] overflow-auto no-scrollbar">
                <table className="w-full border-collapse">
                  <thead className="sticky -top-1 bg-[#141414] z-10">
                    <tr className="border-b border-t  border-[#333]">
                      <th className="p-3 font-medium text-left"></th>
                      <th className="p-3 font-medium text-left">Name</th>
                      <th className="p-3 font-medium text-left">SKU</th>
                      <th className="p-3 font-medium text-left">Categories</th>
                      {/* <th className="p-3 font-medium text-left w-[10%]">
                        Current Stock
                      </th> */}
                      <th className="p-3 font-medium text-left w-[10%]">
                        Price
                      </th>
                      {/* <th className="p-3 font-medium text-left w-[10%]">
                        Channels
                      </th> */}
                      <th className="p-3 font-medium text-left w-[10%]">
                        Visibility
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className={`border-b  border-[#333] ${
                          selectedProducts.includes(product.id)
                            ? "bg-[rgba(155,220,40,0.1)]"
                            : ""
                        }`}
                      >
                        <td className="p-5">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => toggleProductSelection(product.id)}
                            className="cursor-pointer"
                          />
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-2 max-w-full">
                            <div className="w-10 h-10 bg-[#333] rounded flex-shrink-0"></div>
                            <span className="p-5">{product.name}</span>
                            {/* <span
                              className={`flex-shrink-0 ${
                                product.starred
                                  ? "text-[#f8d64e]"
                                  : "text-[#666]"
                              }`}
                            >
                              {product.starred ? "★" : "☆"}
                            </span> */}
                          </div>
                        </td>
                        <td className="p-5 truncate">{product.sku}</td>
                        <td className="p-5">{product.categories}</td>
                        {/* <td className="p-5 flex justify-center items-center truncate">
                          {product.stock}
                        </td> */}
                        <td className="p-5 truncate">{product.price}</td>
                        {/* <td className="p-5">
                          <div className="flex justify-center items-center">
                            {product.channels}
                            <span className="text-xs ml-1 text-[#666]">▼</span>
                          </div>
                        </td> */}
                        <td className="p-5">
                          {/* <span
                            className={`px-2.5 py-1 rounded text-xs font-medium ${
                              product.visibility.toLowerCase() === "enabled"
                                ? "bg-[#28a745] text-white"
                                : "bg-[#dc3545] text-white"
                            }`}
                          >
                            {product.visibility}
                          </span> */}

                          <button onClick={() => toggleVisibility(product.id)}>
                            <span
                              className={`px-2.5 py-1 rounded text-xs font-medium ${
                                product.visibility.toLowerCase() === "enabled"
                                  ? "bg-[#28a745] text-white"
                                  : "bg-[#dc3545] text-white"
                              }`}
                            >
                              {product.visibility}
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
