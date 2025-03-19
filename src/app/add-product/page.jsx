"use client";

import { useState, useRef, useEffect } from "react";
import { AddProductForm } from "../../components/AddProductForm/page";
import Header from "../../components/Header";
import { Sidebar } from "../../components/Sidebar/page";

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
        <AddProductForm />
      </div>
    </div>
  );
}
