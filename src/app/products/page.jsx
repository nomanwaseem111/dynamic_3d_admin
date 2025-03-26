"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar/page";
import Button from "../../components/common/Button";
import Link from "next/link";
import Header from "../../components/Header";
import { Loader } from "../../components/Loader";

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
  const [products, setProducts] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoader(true);
      // clear out any existing error
      setFetchError(null);

      try {
        const res = await fetch(
          "https://s51b3gg2hh.execute-api.us-east-1.amazonaws.com/dev/get-products"
        );
        const data = await res.json();

        if (data.error) {
          // set an error state
          setFetchError(data.error);
          // optionally setProducts([]) if you want an empty array
          setProducts([]);
          return;
        }

        // otherwise set your products
        setProducts(Array.isArray(data) ? data : [data]);
      } catch (error) {
        // if the request fails entirely, set an error message
        console.error("Error fetching products:", error);
        setFetchError(error.message);
      } finally {
        setIsLoader(false);
      }
    }
    fetchProducts();
  }, []);

  const tabs = ["All", "Visible", "Not Visible"];

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

          {products.length > 0 && (
            <div className="bg-[#141414] w-full rounded-[20px]">
              <div className="flex  no-scrollbar  p-[20px]  mb-2 overflow-x-auto whitespace-nowrap">
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

              <div className="w-full rounded overflow-hidden">
                <div className="max-h-[400px] overflow-auto no-scrollbar">
                  <table className="w-full border-collapse">
                    <thead className="sticky -top-1 bg-[#141414] z-10">
                      <tr className="border-b border-t  border-[#333]">
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
                      {products.map((product, i) => (
                        <tr
                          key={product.productId}
                          className={`border-b border-[#333] ${
                            selectedProducts.includes(product.productId)
                              ? "bg-[rgba(155,220,40,0.1)]"
                              : ""
                          }`}
                        >
                          <td className="p-5">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(
                                product.productId
                              )}
                              onChange={() =>
                                toggleProductSelection(product.productId)
                              }
                              className="cursor-pointer"
                            />
                          </td>

                          <td className="p-5 flex items-center gap-[20px]">
                            <div className="w-10 h-10 flex items-center  rounded">
                              <img
                                src={products[i]?.images[0]?.imageUrl}
                                alt=""
                                className="w-10 h-10 object-cover"
                              />
                            </div>

                            {product.productName}
                          </td>
                          <td className="p-5 truncate">{product.sku}</td>
                          <td className="p-5">{product.categories}</td>
                          <td className="p-5">${product.defaultPrice}.00</td>

                          <td className="p-5">
                            <button
                            // onClick={() => toggleVisibility(product.id)}
                            >
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
            </div>
          )}

          {fetchError && (
            <div className="text-red-400 text-2xl text-center mb-4">
              {fetchError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
