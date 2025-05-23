"use client";

import { useRef, useEffect, useState } from "react";
import Header from "../../../../components/Header";
import { Sidebar } from "../../../../components/Sidebar/page";
import { ProductForm } from "../../../../components/ProductForm/page";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const { slug, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log({ product })

  const productTypeRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://s51b3gg2hh.execute-api.us-east-1.amazonaws.com/dev/get-product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (productTypeRef.current && !productTypeRef.current.contains(event.target)) {
        setIsProductTypeOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setIsBrandOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <p className="p-4 text-white">Loading…</p>;
  if (error) return <p className="p-4 text-red-400">Error: {error}</p>;

  return (
    <div className="flex flex-col bg-[#111] font-[montserrat] text-white min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <ProductForm
            mode="edit"
            initialValues={product}
          />
        </div>
      </div>
    </div>
  );
}
