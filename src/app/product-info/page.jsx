"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Header";
import { ProductInfo } from "../components/ProductInfo/page";
import { Sidebar } from "../components/Sidebar/page";

export default function ProductInformation() {
  const [categories, setCategories] = useState([
    { id: 1, name: "3D Scanners", checked: true, icon: "📁" },
    { id: 2, name: "3D Software", checked: false, icon: "📁" },
    { id: 3, name: "Accessories", checked: false, icon: "📁" },
    { id: 4, name: "Engineering Computers", checked: false, icon: "📁" },
    { id: 5, name: "3D Scanning Services", checked: false, icon: "📁" },
  ]);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
    <div className="flex flex-col bg-[#111] text-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <ProductInfo />
      </div>
    </div>
  );
}
