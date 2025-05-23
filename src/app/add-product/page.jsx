"use client";

import { useRef, useEffect } from "react";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar/page";
import { ProductForm } from "../../components/ProductForm/page";

export default function AddProduct() {
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

  return (
    <div className="flex flex-col bg-[#111] font-[montserrat] text-white">
      <Header />
      <div className="flex h-full w-full">
        <Sidebar />
        <ProductForm />
      </div>
    </div>
  );
}
