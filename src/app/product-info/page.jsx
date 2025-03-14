"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { rightArrowIcon } from "../../../public";
import Button from "../components/common/Button";
import Navbar, { MainHeader, SubHeader } from "../components/Header";
// import { ChevronDown, Plus, X } from "lucide-react"

export default function ProductInformation() {
  const [categories, setCategories] = useState([
    { id: 1, name: "3D Scanners", checked: true, icon: "📁" },
    { id: 2, name: "3D Software", checked: false, icon: "📁" },
    { id: 3, name: "Accessories", checked: false, icon: "📁" },
    { id: 4, name: "Engineering Computers", checked: false, icon: "📁" },
    { id: 5, name: "3D Scanning Services", checked: false, icon: "📁" },
  ]);
  const [font, setFont] = useState("Montserrat");
  const [fontSize, setFontSize] = useState("16");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const [images, setImages] = useState([
    {
      id: 1,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      selected: false,
      thumbnail: false,
    },
    {
      id: 2,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      selected: false,
      thumbnail: false,
    },
    {
      id: 3,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      selected: false,
      thumbnail: false,
    },
    {
      id: 4,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      selected: true,
      thumbnail: false,
    },
    {
      id: 5,
      name: "HandySCAN BLACK | Elite with Automation Kit",
      selected: false,
      thumbnail: false,
    },
  ]);

  const toggleSelect = (id) => {
    setImages(
      images.map((img) =>
        img.id === id ? { ...img, selected: !img.selected } : img
      )
    );
  };

  const toggleThumbnail = (id) => {
    setImages(
      images.map((img) =>
        img.id === id ? { ...img, thumbnail: !img.thumbnail } : img
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // Handle file drop logic here
  };
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.fontFamily = font;
      textareaRef.current.style.fontSize = `${fontSize}px`;
      textareaRef.current.style.fontWeight = isBold ? "bold" : "normal";
      textareaRef.current.style.fontStyle = isItalic ? "italic" : "normal";
      textareaRef.current.style.textDecoration = isUnderline
        ? "underline"
        : "none";
    }
  }, [font, fontSize, isBold, isItalic, isUnderline]);

  const fonts = [
    "Montserrat",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Verdana",
  ];

  const fontSizes = [
    "12",
    "14",
    "16",
    "18",
    "20",
    "24",
    "28",
    "32",
    "36",
    "40",
    "48",
    "56",
    "64",
  ];
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [productType, setProductType] = useState("Physical");
  const [brand, setBrand] = useState("Creaform");
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isVisibleOnStorefront, setIsVisibleOnStorefront] = useState(true);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);

  const [content, setContent] = useState("");
  const productTypeRef = useRef(null);
  const brandRef = useRef(null);

  const toggleCategory = (id) => {
    setCategories(
      categories.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

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
    <div className="flex h-screen  bg-black text-white">
      <div className="hidden md:block pt-[110px] w-full max-w-[350px] bg-[#111] border-r border-[#222]">
        <nav className="p-2 space-y-1 mt-2">
          {/* <SidebarItem icon="🏠" label="Dashboard" />
          <SidebarItem icon="📂" label="Categories" />
          <SidebarItem icon="📦" label="Products" active /> */}
          <Link
            href={"/"}
            className={`flex-shrink-0  font-[600] w-full mx-auto  sm:mx-0 hover:bg-[#ffffff1f] h-[50px] relative z-10  flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity`}
          >
            <span className="skew-x-[30deg]">Dashboard</span>
          </Link>

          <Link
            href={"/"}
            className={`flex-shrink-0  font-[600] w-full mx-auto  sm:mx-0 hover:bg-[#ffffff1f] h-[50px] relative z-10  flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity`}
          >
            <span className="skew-x-[30deg]">Categories</span>
          </Link>

          <Link
            href={"/"}
            className={`flex-shrink-0  font-[600] w-full mx-auto  sm:mx-0 hover:bg-[#ffffff1f] h-[50px] relative z-10  flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity`}
          >
            <span className="skew-x-[30deg]">Products</span>
          </Link>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          mobileSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={toggleMobileSidebar}
        ></div>

        <div className="fixed top-0 left-0 h-full w-[240px] bg-[#111] border-r border-[#222] overflow-y-auto">
          <div className="flex items-center justify-end p-4 border-b border-[#222]">
            {/* <button onClick={toggleMobileSidebar} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button> */}
          </div>

          {/* <nav className="p-2 space-y-1">
            <SidebarItem icon="🏠" label="Dashboard" />
            <SidebarItem icon="📂" label="Categories" />
            <SidebarItem icon="📦" label="Products" active />
          </nav> */}
        </div>
      </div>
      <Navbar />
      <div className="flex-1 flex pt-[110px] flex-col overflow-auto">
        <div className="p-3 sm:p-6 max-w-6xl">
          <h1 className="text-xl flex items-center gap-[15px] sm:text-[40px]  font-medium text-white">
            <Image src={rightArrowIcon} alt="rightArrowIcon" />
            Product Information
          </h1>

          <div className="mb-8 mt-[37.5px] bg-[#141414] rounded-[20px] p-[35px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[28px] font-[700]">Basic Information</h2>
              <div className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded border ${
                      isVisibleOnStorefront
                        ? "bg-blue-500 border-blue-500"
                        : "bg-transparent border-gray-500"
                    } flex items-center justify-center mr-2 cursor-pointer`}
                    onClick={() =>
                      setIsVisibleOnStorefront(!isVisibleOnStorefront)
                    }
                  >
                    {isVisibleOnStorefront && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <label
                    htmlFor="visible"
                    className="text-[16px] cursor-pointer"
                    onClick={() =>
                      setIsVisibleOnStorefront(!isVisibleOnStorefront)
                    }
                  >
                    Visible on Storefront
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1  mt-[41.5px] sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block mb-2 text-[18px] font-[700]">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
                  defaultValue="HandySCAN BLACK | Elite with automation Kit"
                />
              </div>

              <div>
                <label className="block mb-2 text-[18px] font-[700]">SKU</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
                  defaultValue="TRK-1138"
                />
              </div>

              <div ref={productTypeRef}>
                <label className="block mb-2 text-[18px] font-[700]">
                  Product Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
                    onClick={() => setIsProductTypeOpen(!isProductTypeOpen)}
                  >
                    <span>{productType}</span>
                    {/* <ChevronDown
                      size={16}
                      className={`transition-transform ${isProductTypeOpen ? "rotate-180" : ""}`}
                    /> */}
                  </button>

                  {isProductTypeOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-[#111] border border-[#333] rounded-md shadow-lg">
                      <div
                        className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                        onClick={() => {
                          setProductType("Physical");
                          setIsProductTypeOpen(false);
                        }}
                      >
                        Physical
                      </div>
                      <div
                        className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                        onClick={() => {
                          setProductType("Digital");
                          setIsProductTypeOpen(false);
                        }}
                      >
                        Digital
                      </div>
                      <div
                        className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                        onClick={() => {
                          setProductType("Service");
                          setIsProductTypeOpen(false);
                        }}
                      >
                        Service
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div ref={brandRef}>
                <label className="block mb-2 text-[18px] font-[700]">
                  Brand
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
                    onClick={() => setIsBrandOpen(!isBrandOpen)}
                  >
                    <span>{brand}</span>
                    {/* <ChevronDown size={16} className={`transition-transform ${isBrandOpen ? "rotate-180" : ""}`} /> */}
                  </button>

                  {isBrandOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-[#111] border border-[#333] rounded-md shadow-lg">
                      <div
                        className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                        onClick={() => {
                          setBrand("Creaform");
                          setIsBrandOpen(false);
                        }}
                      >
                        Creaform
                      </div>
                      <div
                        className="px-3 py-2 hover:bg-[#222] cursor-pointer"
                        onClick={() => {
                          setBrand("Other Brands");
                          setIsBrandOpen(false);
                        }}
                      >
                        Other Brands
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-[18px] font-[700]">
                  Default Price <span className="text-red-500">*</span>
                  <span className="text-gray-400 ml-1">(excluding tax)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <input
                    type="text"
                    className="w-full pl-6 pr-3 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
                    defaultValue="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-[18px] font-[700]">
                  Weight <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 pr-12 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
                    defaultValue="6.00"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">
                    LBS
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-[55px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-[700]">Categories</h2>
                <button className="flex items-center text-[12.562px] uppercase text-[#9ACD32]">
                  {/* <Plus size={14} className="mr-1 sm:hidden" />
                <Plus size={16} className="mr-1 hidden sm:block" /> */}
                  <span className="">ADD CATEGORY</span>
                  {/* <span className="xs:hidden">ADD</span> */}
                </button>
              </div>

              <div className="bg-[#111] border border-[#333] rounded-md p-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center py-2 border-b border-[#222] last:border-0"
                  >
                    <div className="w-6 text-center mr-2">
                      <div
                        className={`w-4 h-4 mx-auto rounded border ${
                          category.checked
                            ? "bg-blue-500 border-blue-500"
                            : "bg-transparent border-gray-500"
                        } flex items-center justify-center cursor-pointer`}
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.checked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="w-6 text-center mr-2 text-yellow-500">
                      {category.icon}
                    </div>
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full bg-[#141414] p-[35px] rounded-[20px] ">
            <h2 className="text-white text-2xl font-medium mb-6">
              Description
            </h2>

            <div className=" text-white">
              {/* <div className="mb-6 relative border border-[#333] rounded-xl">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[562px] p-[51px] text-start bg-transparent text-gray-300 text-sm md:text-base resize-none focus:outline-none"
                  style={{ lineHeight: "1.6" }}
                />
              </div> */}

              <div
                className="w-full mx-auto relative"
                ref={editorRef}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative border border-[#333] rounded-xl mt-2">
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[211px] p-[30px] text-start bg-transparent text-gray-300 text-sm md:text-base resize-none focus:outline-none"
                    style={{ lineHeight: "1.6" }}
                    placeholder="Enter Description..."
                  />

                  <div
                    className={`absolute top-0 flex items-center gap-2 p-2 bg-[#1e1e1e] border border-[#333] rounded-md  transition-all duration-200 ${
                      isHovering
                        ? "opacity-100 top-[-40px]"
                        : "opacity-0 top-[-40px] pointer-events-none"
                    }`}
                  >
                    {/* Custom Font Dropdown */}
                    <div className="relative">
                      <button
                        className="flex items-center justify-between w-[140px] h-9 px-3 bg-[#1e1e1e] border border-[#333] rounded-md text-sm text-gray-300"
                        onClick={() => {
                          setFontDropdownOpen(!fontDropdownOpen);
                          setSizeDropdownOpen(false);
                        }}
                      >
                        <span style={{ fontFamily: font }}>{font}</span>
                        {/* <ChevronDown className="h-4 w-4 ml-2" /> */}
                      </button>

                      {fontDropdownOpen && (
                        <div className="absolute top-full left-0 w-[140px] mt-1 bg-[#1e1e1e] border border-[#333] rounded-md shadow-lg z-20 max-h-[200px] overflow-y-auto">
                          {fonts.map((f) => (
                            <button
                              key={f}
                              className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-[#333]"
                              style={{ fontFamily: f }}
                              onClick={() => {
                                setFont(f);
                                setFontDropdownOpen(false);
                              }}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Custom Size Dropdown */}
                    <div className="relative">
                      <button
                        className="flex items-center justify-between w-[70px] h-9 px-3 bg-[#1e1e1e] border border-[#333] rounded-md text-sm text-gray-300"
                        onClick={() => {
                          setSizeDropdownOpen(!sizeDropdownOpen);
                          setFontDropdownOpen(false);
                        }}
                      >
                        <span>{fontSize}</span>
                        {/* <ChevronDown className="h-4 w-4 ml-2" /> */}
                      </button>

                      {sizeDropdownOpen && (
                        <div className="absolute top-full left-0 w-[70px] mt-1 bg-[#1e1e1e] border border-[#333] rounded-md shadow-lg z-20 max-h-[200px] overflow-y-auto">
                          {fontSizes.map((size) => (
                            <button
                              key={size}
                              className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-[#333]"
                              onClick={() => {
                                setFontSize(size);
                                setSizeDropdownOpen(false);
                              }}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Custom Format Buttons */}
                    {/* <button
                    className={`h-9 w-9 flex items-center justify-center rounded-md ${
                      isBold ? "bg-[#333]" : "bg-transparent"
                    } border border-[#333] text-gray-300 hover:bg-[#333]`}
                    onClick={() => setIsBold(!isBold)}
                  >
                    <Bold className="h-4 w-4" />
                  </button>

                  <button
                    className={`h-9 w-9 flex items-center justify-center rounded-md ${
                      isItalic ? "bg-[#333]" : "bg-transparent"
                    } border border-[#333] text-gray-300 hover:bg-[#333]`}
                    onClick={() => setIsItalic(!isItalic)}
                  >
                    <Italic className="h-4 w-4" />
                  </button>

                  <button
                    className={`h-9 w-9 flex items-center justify-center rounded-md ${
                      isUnderline ? "bg-[#333]" : "bg-transparent"
                    } border border-[#333] text-gray-300 hover:bg-[#333]`}
                    onClick={() => setIsUnderline(!isUnderline)}
                  >
                    <Underline className="h-4 w-4" />
                  </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-screen bg-[#141414] mt-[35px] rounded-[20px] text-white p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-xl font-medium">Images & Videos</h1>
                    <p className="text-sm text-gray-400">
                      Add images and videos of your product to engage customers.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 border border-gray-600 rounded px-3 py-1.5 text-sm hover:bg-gray-800 transition-colors">
                      {/* <Plus className="w-4 h-4" /> */}
                      ADD FROM URL
                    </button>
                    <button className="flex items-center gap-1 bg-white text-black rounded px-3 py-1.5 text-sm hover:bg-gray-200 transition-colors">
                      {/* <Upload className="w-4 h-4" /> */}
                      UPLOAD IMAGES
                    </button>
                  </div>
                </div>

                {/* Images Section */}
                <div>
                  <h2 className="text-lg mb-2">Images</h2>
                  <div className="text-xs text-gray-400 mb-1">
                    {images.length} images
                  </div>

                  {/* Table Header */}
                  <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 border-b border-gray-800 pb-2 mb-2">
                    <div className="text-sm">Image</div>
                    <div className="text-sm">Description (image alt text)</div>
                    <div className="text-sm">Thumbnail</div>
                    <div></div>
                  </div>

                  {/* Image List */}
                  <div className="space-y-2">
                    {images.map((image, index) => (
                      <div
                        key={image.id}
                        className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-2 ${
                          image.id === 4 ? "border border-blue-500 rounded" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={image.selected}
                            onChange={() => toggleSelect(image.id)}
                            className="w-4 h-4 rounded-sm border-gray-600"
                          />
                          <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                            <img
                              src="/placeholder.svg?height=48&width=48"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="text-sm">{image.name}</div>
                        <div>
                          <input
                            type="radio"
                            checked={image.thumbnail}
                            onChange={() => toggleThumbnail(image.id)}
                            className="w-4 h-4"
                          />
                        </div>
                        {/* <button className="text-gray-400 hover:text-white">
                      <Trash2 className="w-5 h-5" />
                    </button> */}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drag & Drop Area */}
                <div
                  className="border border-dashed border-yellow-600 rounded-md p-6 mt-4 flex flex-col items-center justify-center text-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center mb-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      {/* <Plus className="w-4 h-4 text-white" /> */}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">
                    Drag & Drop images here to upload.
                  </h3>
                  <p className="text-xs text-gray-400">
                    jpeg, jpeg, png, webp, .htm or video. Maximum 5 MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
