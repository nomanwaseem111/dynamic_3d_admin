import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Button from "../common/Button";
import { rightArrowIcon, starIcon } from "../../../public";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader } from "../Loader";

export const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      sku: "",
      productType: "",
      brand: "",
      defaultPrice: "",
      weight: "",
      categoriesType: "",
      description: "",
      visibleOnStorefront: true,
      showConditionOnStorefront: false,
      searchKeywords: "",
      availability: "",
      sortOrder: 0,
      template: "Default",
      condition: "New",
      warranty: "",
      images: [],
    },
  });
  const images = watch("images", []);

  const { states } = useAuth();
  const router = useRouter();

  const [content, setContent] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [font, setFont] = useState("Montserrat");
  const [fontSize, setFontSize] = useState("16");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

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

  const textareaRef = useRef(null);
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

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsDragging(false);
  //   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
  //     handleFiles(e.dataTransfer.files);
  //   }
  // };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData(); // Clear dragged files to allow re-uploading the same file
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };
  // const handleFileInputChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     handleFiles(e.target.files);
  //   }
  // };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = ""; // Reset file input to allow re-selecting the same file
    }
  };

  const handleFiles = (files) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/bmp",
      "image/webp",
      "image/xbm",
      "image/wbmp",
      "image/svg+xml",
    ];
    const validFiles = Array.from(files).filter(
      (file) => validTypes.includes(file.type) && file.size <= 8 * 1024 * 1024
    );
    if (validFiles.length === 0) {
      alert(
        "Please upload valid image files under 8MB (bmp, jpeg, png, wbmp, xbm, webp)"
      );
      return;
    }

    const newImages = validFiles.map((file, index) => {
      const maxId =
        images.length > 0 ? Math.max(...images.map((img) => img.id)) : 0;
      return {
        id: maxId + index + 1,
        name: file.name,
        selected: false,
        thumbnail: false,
        file,
        preview: URL.createObjectURL(file),
      };
    });

    setValue("images", [...images, ...newImages]);
  };

  const toggleSelect = (id) => {
    const updated = images.map((img) =>
      img.id === id ? { ...img, selected: !img.selected } : img
    );
    setValue("images", updated);
  };

  const toggleThumbnail = (id) => {
    const updated = images.map((img) =>
      img.id === id ? { ...img, thumbnail: true } : { ...img, thumbnail: false }
    );
    setValue("images", updated);
  };

  const handleDelete = (id) => {
    const updated = images.filter((img) => img.id !== id);
    setValue("images", updated);
  };

  const onSubmit = async (data) => {
    setIsLoader(true);

    const payload = {
      productName: data.productName,
      sku: data.sku,
      description: content,
      defaultPrice: Number(data.defaultPrice),
      weight: Number(data.weight),
      searchKeyword: data.searchKeywords,
      availabilityTest: data.availability,
      sortOrder: data.sortOrder,
      warrantyInformation: data.warranty,
      brand: data.brand,
      categories: data.categoriesType,
      condition: data.condition,
      templateLayout: data.template,
      productType: data.productType,
      images: data.images ? data.images.map((img) => img.name) : [],
    };

    try {
      const response = await fetch(
        "https://s51b3gg2hh.execute-api.us-east-1.amazonaws.com/dev/create-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${states.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      const presignedUrls = responseData?.presignedUrls;

      for (let i = 0; i < data.images.length; i++) {
        const file = data.images[i].file;
        const url = presignedUrls[i];

        if (!file || !url) {
          console.warn(`No file or presigned URL for index ${i}`);
          continue;
        }

        const putResp = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
          mode: "cors",
        });

        if (!putResp.ok) {
          const errorText = await putResp.text();
          throw new Error(
            `Failed to upload image #${i} (${file.name}). Status: ${putResp.status}. ${errorText}`
          );
        }
      }

      reset();
      setContent("");
      router.push("/products");
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex h-full flex-col overflow-auto"
    >
      <div className="p-3 py-6 sm:p-6 max-w-full">
        <div className="flex justify-between items-center flex-wrap">
          <h1 className="text-xl flex items-center gap-[15px] sm:text-[40px] font-medium text-white">
            <Link href={"/products"}>
              <Image src={rightArrowIcon} alt="rightArrowIcon" />
            </Link>
            Add Product
          </h1>
          <Button
            type="submit"
            className="skew-x-[-30deg] flex justify-center uppercase items-center rounded-[12px] font-bold btn text-[#000] h-[50px] w-full max-w-[165px]"
          >
            {isLoader ? <Loader /> : "Save"}
          </Button>
        </div>

        <div className="mb-8 mt-[37.5px] bg-[#141414] rounded-[20px] p-[35px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[28px] font-[700]">Basic Information</h2>
            {/* <div className="flex items-center">
              <Controller
                control={control}
                name="visibleOnStorefront"
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded border ${
                        value
                          ? "bg-blue-500 border-blue-500"
                          : "bg-transparent border-gray-500"
                      } flex items-center justify-center mr-2 cursor-pointer`}
                      onClick={() => onChange(!value)}
                    >
                      {value && (
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
                      onClick={() => onChange(!value)}
                    >
                      Visible on Storefront
                    </label>
                  </div>
                )}
              />
            </div> */}
          </div>

          <div className="grid grid-cols-1 mt-[41.5px] sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block mb-2 text-[18px] font-[700]">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("productName", { required: true })}
                className="w-full px-3 h-[50px] bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
              />
              {errors.productName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-[18px] font-[700]">SKU</label>
              <input
                type="text"
                {...register("sku", { required: true })}
                className="w-full px-3 h-[50px] bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
              />
              {errors.sku && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-[18px] font-[700]">
                Product Type
              </label>
              <select
                {...register("productType", { required: true })}
                className="w-full h-[50px] px-3 py-2 bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
              >
                <option value="">Select</option>
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
                <option value="Service">Service</option>
              </select>
              {errors.productType && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-[18px] font-[700]">Brand</label>
              <select
                {...register("brand", { required: true })}
                className="w-full h-[50px] px-3 py-2 bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
              >
                <option value="">Select</option>
                <option value="Creaform">Creaform</option>
                <option value="Other Brands">Other Brands</option>
              </select>
              {errors.brand && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-[18px] font-[700]">
                Default Price <span className="text-red-500">*</span>
                <span className="text-gray-400 ml-1">(excluding tax)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3.5">$</span>
                <input
                  type="number"
                  {...register("defaultPrice", { required: true })}
                  className="w-full pl-6 pr-3 h-[50px] bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
                />
                {errors.defaultPrice && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[18px] font-[700]">
                Weight <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("weight", { required: true })}
                  className="w-full px-3 h-[50px] pr-12 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
                />
                <span className="absolute right-3 top-3.5 text-gray-400">
                  LBS
                </span>
                {errors.weight && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[18px] font-[700]">
                Categories
              </label>
              <select
                {...register("categoriesType", { required: true })}
                className="w-full h-[50px] px-3 py-2 bg-[#111] border border-[#333] rounded-[8px] text-white focus:outline-none focus:ring-1 focus:ring-[#9ACD32] focus:border-[#9ACD32]"
              >
                <option value="">Select</option>
                <option value="3D Scanners">3D Scanners</option>
                <option value="3D Software">3D Software</option>
                <option value="Accessories">Accessories</option>
                <option value="Engineering Computers">
                  Engineering Computers
                </option>
                <option value="3D Scanning Services">
                  3D Scanning Services
                </option>
              </select>
              {errors.categoriesType && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full bg-[#141414] p-[35px] rounded-[20px]">
          <h2 className="text-white text-2xl font-medium mb-6">Description</h2>
          <div className="text-white">
            <div
              className="w-full mx-auto relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative border border-[#333] rounded-xl mt-2">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[211px] p-[30px] bg-transparent text-gray-300 text-sm md:text-base resize-none focus:outline-none"
                  style={{ lineHeight: "1.6" }}
                  placeholder="Enter Description..."
                />
                <div
                  className={`absolute top-0 flex items-center gap-2 p-2 bg-[#1e1e1e] border border-[#333] rounded-md transition-all duration-200 ${
                    isHovering
                      ? "opacity-100 top-[-40px]"
                      : "opacity-0 top-[-40px] pointer-events-none"
                  }`}
                >
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center justify-between w-[140px] h-9 px-3 bg-[#1e1e1e] border border-[#333] rounded-md text-sm text-gray-300"
                      onClick={() => {
                        setFontDropdownOpen(!fontDropdownOpen);
                        setSizeDropdownOpen(false);
                      }}
                    >
                      <span style={{ fontFamily: font }}>{font}</span>
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
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center justify-between w-[70px] h-9 px-3 bg-[#1e1e1e] border border-[#333] rounded-md text-sm text-gray-300"
                      onClick={() => {
                        setSizeDropdownOpen(!sizeDropdownOpen);
                        setFontDropdownOpen(false);
                      }}
                    >
                      <span>{fontSize}</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-[110px] bg-[#141414] mt-[35px] rounded-[20px] text-white">
          <div className="max-w-full mx-auto">
            <div className="flex flex-col">
              <div className="flex flex-col flex-wrap p-4 md:p-6 border-b border-b-[#44444466] md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-[28px] font-medium">Images</h1>
                  <p className="text-sm text-[#fff]">
                    Add images and videos of your product to engage customers.
                  </p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="mx-4 md:mx-6 mt-6">
                  <h2 className="text-[24px] font-[700] flex items-center gap-4 border-b border-b-[#44444466] py-[19.5px]">
                    Images
                    <div className="text-xs text-gray-400 flex items-center gap-[11px]">
                      <input
                        type="checkbox"
                        className="h-4 rounded-sm border-gray-600 cursor-pointer"
                      />
                      {images.length} images
                    </div>
                  </h2>

                  <div className="flex gap-4 border-b border-b-[#44444466] py-[15.5px]">
                    <div className="max-w-[100px] w-full"></div>
                    <div className="text-sm !max-w-[90px] w-full font-bold">
                      Image
                    </div>
                    <div className="text-sm max-w-[612px] w-full ml-[50px] font-bold">
                      Description (image alt text)
                    </div>
                    <div className="text-sm w-[76px] font-bold">Thumbnail</div>
                    <div className="w-20"></div>
                  </div>

                  <div className="space-y-2">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="flex gap-4 px-4 md:px-6 items-center border-b border-b-[#44444466] py-[30px]"
                      >
                        <div className="flex justify-center items-center gap-3 max-w-[100px] w-full">
                          <input
                            type="checkbox"
                            checked={image.selected}
                            onChange={() => toggleSelect(image.id)}
                            className="h-4 rounded-sm border-gray-600 cursor-pointer"
                          />
                        </div>
                        <div className="max-w-[90px] w-full h-12 bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                          {image.preview ? (
                            <Image
                              src={image.preview || "/placeholder.svg"}
                              alt=""
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt=""
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="text-sm max-w-[612px] font-bold w-full ml-[50px]">
                          {image.name}
                        </div>
                        <div className="!w-[76px] flex justify-center items-center">
                          <input
                            type="radio"
                            checked={image.thumbnail}
                            onChange={() => toggleThumbnail(image.id)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                        <div
                          className="w-20 cursor-pointer flex justify-center items-center"
                          onClick={() => handleDelete(image.id)}
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
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`mx-4 md:mx-6 border-2 border-dashed ${
                  isDragging ? "border-[#B2D235]" : "border-[#444444]"
                } rounded-lg min-h-[169px] mt-[49px] hover:border-[#B2D235] cursor-pointer p-6 flex items-center gap-x-[52px]`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleUploadClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="90"
                  height="90"
                  viewBox="0 0 90 90"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    d="M9.675 71.2875L9.6 71.3625C8.5875 69.15 7.95 66.6375 7.6875 63.8625C7.95 66.6 8.6625 69.075 9.675 71.2875Z"
                    fill="#81BF41"
                  />
                  <path
                    d="M33.7502 38.925C38.6793 38.925 42.6752 34.9291 42.6752 30C42.6752 25.0708 38.6793 21.075 33.7502 21.075C28.8211 21.075 24.8252 25.0708 24.8252 30C24.8252 34.9291 28.8211 38.925 33.7502 38.925Z"
                    fill="#81BF41"
                  />
                  <path
                    d="M60.7125 7.5H29.2875C15.6375 7.5 7.5 15.6375 7.5 29.2875V60.7125C7.5 64.8 8.2125 68.3625 9.6 71.3625C12.825 78.4875 19.725 82.5 29.2875 82.5H60.7125C74.3625 82.5 82.5 74.3625 82.5 60.7125V52.125V29.2875C82.5 15.6375 74.3625 7.5 60.7125 7.5ZM76.3875 46.875C73.4625 44.3625 68.7375 44.3625 65.8125 46.875L50.2125 60.2625C47.2875 62.775 42.5625 62.775 39.6375 60.2625L38.3625 59.2125C35.7 56.8875 31.4625 56.6625 28.4625 58.6875L14.4375 68.1C13.6125 66 13.125 63.5625 13.125 60.7125V29.2875C13.125 18.7125 18.7125 13.125 29.2875 13.125H60.7125C71.2875 13.125 76.875 18.7125 76.875 29.2875V47.2875L76.3875 46.875Z"
                    fill="#81BF41"
                  />
                </svg>
                <div>
                  <h3 className="text-[14px] lg:text-[40px] font-medium mb-1">
                    Drag & Drop images here to upload.
                  </h3>
                  <p className="text-[12px] lg:text-[16.8px] text-gray-400">
                    bmp, jpeg, png, wbmp, xbm or webp. Maximum 8 MB
                  </p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-auto text-white mt-[35px]">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1">Storefront</h1>
            <p className="text-sm text-[#fff]">
              Setup what customers will see on the storefront
            </p>
          </div>
          <div className="bg-[#141414] rounded-[20px] p-4 md:p-6 mb-8 relative">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[14px] flex items-center gap-[21px] font-[400]">
                  <Image src={starIcon} alt="starIcon" />
                  Set as a Featured Product on my Storefront
                </h2>
                {/* <Controller
                  control={control}
                  name="showConditionOnStorefront"
                  render={({ field: { value, onChange } }) => (
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded border ${
                          value
                            ? "bg-blue-500 border-blue-500"
                            : "bg-transparent border-gray-500"
                        } flex items-center justify-center mr-2 cursor-pointer`}
                        onClick={() => onChange(!value)}
                      >
                        {value && (
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
                        onClick={() => onChange(!value)}
                      >
                        Show condition on storefront
                      </label>
                    </div>
                  )}
                /> */}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="search-keywords"
                  className="block mb-2 font-medium"
                >
                  Search Keywords
                </label>
                <input
                  type="text"
                  id="search-keywords"
                  {...register("searchKeywords", { required: true })}
                  className="w-full border border-[#5f5f5f] rounded-md p-2 text-sm"
                  placeholder="most accurate, black, elite, limited, 12 microns, automations, robot, cobot, automatic, quality"
                />
                {errors.searchKeywords && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="availability"
                  className="block mb-2 font-medium"
                >
                  Availability Test
                </label>
                <input
                  type="text"
                  id="availability"
                  {...register("availability", { required: true })}
                  className="w-full border border-[#5f5f5f] rounded-md p-2 text-sm"
                  placeholder="usually ships within 1-2 weeks"
                />
                {errors.availability && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="sort-order"
                    className="block mb-2 font-medium"
                  >
                    Sort Order
                  </label>
                  <input
                    type="number"
                    id="sort-order"
                    {...register("sortOrder", { required: true })}
                    className="w-full border border-[#5f5f5f] rounded-md p-2 text-sm"
                    placeholder="0"
                  />
                  {errors.sortOrder && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>

                <div>
                  <label htmlFor="template" className="block mb-2 font-medium">
                    Template Layout File
                  </label>
                  <div className="relative">
                    <select
                      id="template"
                      {...register("template")}
                      className="w-full border border-[#5f5f5f] rounded-md p-2 text-sm appearance-none"
                    >
                      <option>Default</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="condition" className="block mb-2 font-medium">
                    Condition
                  </label>
                  <div className="relative">
                    <select
                      id="condition"
                      {...register("condition")}
                      className="w-full border border-[#5f5f5f] rounded-md p-2 text-sm appearance-none"
                    >
                      <option>New</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="warranty" className="block mb-2 font-medium">
                  Warranty Information
                </label>
                <textarea
                  id="warranty"
                  {...register("warranty", { required: true })}
                  className="w-full border border-[#5f5f5f] rounded-md p-2 text-sm min-h-[100px]"
                  placeholder="Warranty Coverage: 12 Months Parts & Labor + 24/5 Tech Support (Extended Warranty Options Available)"
                ></textarea>
                {errors.warranty && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProductForm;
