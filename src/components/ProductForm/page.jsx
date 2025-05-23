import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Button from "../common/Button";
import { addIcon, AddIcon, AddTransparentIcon, FolderIcon, rightArrowIcon, starIcon, UploadDocumentIcon } from "../../../public";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader } from "../Loader";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("../TextEditor"), {
  ssr: false,
});

export const ProductForm = ({ mode = "add", initialValues = {} }) => {
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
  const category = watch("categoriesType")
  console.log({ images });

  const { states } = useAuth();
  const router = useRouter();

  const [content, setContent] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const lastInputRef = useRef(null);

  useEffect(() => {
    if (mode === "edit" && initialValues.productId) {
      // reset all fields
      reset({
        productName: initialValues.productName || "",
        sku: initialValues.sku || "",
        productType: initialValues.productType || "",
        brand: initialValues.brand || "",
        defaultPrice: initialValues.defaultPrice ?? "",
        weight: initialValues.weight ?? "",
        categoriesType: initialValues.categories || "",
        description: initialValues.description || "",
        visibleOnStorefront: initialValues.visibility ?? true,
        showConditionOnStorefront: initialValues.showCondition ?? false,
        searchKeywords: initialValues.searchKeyword || "",
        availability: initialValues.availabilityTest || "",
        sortOrder: initialValues.sortOrder ?? 0,
        template: initialValues.template || "Default",
        condition: initialValues.condition || "New",
        warranty: initialValues.warrantyInformation || "",
        images: initialValues.images || [],
      });

      const existing = (initialValues.images || []).map((img, idx) => ({
        id: img.imageKey || `existing-${idx}`,
        imageName: img.imageName,
        imageKey: img.imageKey,
        imageUrl: img.imageUrl,
        selected: false,
        thumbnail: img.isThumbnail || false
      }));
      setValue("images", existing);

      setContent(initialValues.description || "");
      if (initialValues.categories) {
        setCategories([
          { name: initialValues.categories, isEditable: false },
        ]);
        setSelectedCategoryIndex(0);
        setIsOpenDropdown(true);
      }
    }
  }, [mode, initialValues, reset]);


  const handleDropdownOpen = () => {
    setIsOpenDropdown(true);
    setCategories([{ name: "", isEditable: true }]);
    setSelectedCategoryIndex(0);
  };

  const handleAddCategory = () => {
    setCategories((prev) => [...prev, { name: "", isEditable: true }]);
  };

  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus();
    }
  }, [categories.length]);

  const handleNameChange = (e, idx) => {
    const updated = [...categories];
    updated[idx].name = e.target.value.slice(0, 12);
    setCategories(updated);
    setValue("categoriesType", updated?.map((cat) => cat.name).join(", "));
  };

  const finalizeCategory = (idx) => {
    const updated = [...categories];
    const trimmed = updated[idx].name.trim();

    if (!trimmed) {
      updated[idx].error = "Category name cannot be empty";
      setCategories(updated);

      setTimeout(() => {
        lastInputRef.current?.focus();
      }, 0);
      return;
    }

    updated[idx].name = trimmed;
    updated[idx].isEditable = false;
    updated[idx].error = "";
    setCategories(updated);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter") {
      finalizeCategory(idx);
    }
  };

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

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = "";
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

    const uploads = validFiles.map((file, i) => ({
      id: `${file.name}-${Date.now()}-${i}`,
      imageName: file.name,
      file,
      imageUrl: URL.createObjectURL(file),
      selected: false,
      thumbnail: false
    }));
    setValue("images", [...images, ...uploads]);
  };

  const toggleSelect = id => {
    const updated = images.map(img =>
      img.id === id ? { ...img, selected: !img.selected } : img
    );
    setValue("images", updated);
  };

  const toggleThumbnail = id => {
    const updated = images.map(img =>
      img.id === id
        ? { ...img, thumbnail: true }
        : { ...img, thumbnail: false }
    );
    setValue("images", updated);
  };

  const handleDelete = (id) => {
    const toDelete = images.find(img => img.id === id);

    if (toDelete?.file) {
      URL.revokeObjectURL(toDelete.imageUrl);
    }

    const updated = images.filter(img => img.id !== id);

    if (toDelete?.thumbnail && updated.length) {
      updated[0].thumbnail = true;
    }

    setValue("images", updated);
  };

  const API_BASE = 'https://s51b3gg2hh.execute-api.us-east-1.amazonaws.com/dev';

  const onSubmit = async (data) => {
    setIsLoader(true);

    const payload = {
      productName: data.productName,
      sku: data.sku,
      description: content,
      defaultPrice: data.defaultPrice,
      weight: data.weight,
      searchKeyword: data.searchKeywords,
      availabilityTest: data.availability,
      sortOrder: data.sortOrder,
      warrantyInformation: data.warranty,
      brand: data.brand,
      categories: data.categoriesType,
      condition: data.condition,
      templateLayout: data.template,
      productType: data.productType,
      images: images.map(img => img.imageName),
    };

    try {
      const isEdit = mode === 'edit' && initialValues.productId;
      const url = isEdit
        ? `${API_BASE}/update-product/${initialValues.productId}`
        : `${API_BASE}/create-product`;
      const method = isEdit ? 'PUT' : 'POST';

      console.log('Calling URL:', url);
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`${isEdit ? 'Update' : 'Create'} failed: ${res.statusText}`);
      const { presignedUrls } = await res.json();

      for (const img of images) {
        if (!img.file) continue;

        let uploadUrl;
        if (Array.isArray(presignedUrls) && typeof presignedUrls[0] === 'string') {
          const fileUrls = presignedUrls;
          const idx = images.filter(i => i.file).findIndex(i => i === img);
          uploadUrl = fileUrls[idx];
        } else {
          const entry = presignedUrls.find(u => u.imageName === img.imageName);
          if (!entry) throw new Error(`No presigned URL for ${img.imageName}`);
          uploadUrl = entry.presignedUrl;
        }

        const putRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': img.file.type },
          body: img.file,
        });
        if (!putRes.ok) {
          const errorText = await putRes.text();
          throw new Error(`Upload failed for ${img.imageName}: ${errorText}`);
        }
      }

      toast.success(isEdit ? 'Product updated successfully!' : 'Product added successfully!');
      router.push('/products');
    } catch (err) {
      console.error('Error saving product:', err);
      toast.error(`Failed to save product: ${err.message}`);
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
            {mode === "add" ? "Add Product" : "Product Information"}
          </h1>
          <Button
            type="submit"
            className="skew-x-[-30deg] flex justify-center uppercase items-center rounded-[12px] font-bold btn text-[#000] h-[50px] w-full max-w-[165px]"
          >
            {isLoader
              ? <Loader />
              : mode === "edit"
                ? "Update"
                : "Save"
            }
          </Button>
        </div>

        <div className="mb-8 mt-[37.5px] bg-[#141414] rounded-[20px] p-[35px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[28px] font-[700]">Basic Information</h2>
            {/* <div className="flex items-center gap-3">
              <Controller
                control={control}
                name="visibleOnStorefront"
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded border ${value
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
                          className="text-black"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <label
                      htmlFor="visible"
                      className="text-[16px] transform scale-y-[0.8] cursor-pointer"
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
                  step="any"                 
                  inputMode="decimal"
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
                  type="number"
                  step="any"                 
                  inputMode="decimal"
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
          </div>

          <div className="mt-[55px]">
            <div className="flex flex-row items-center justify-between">
              <label className="block mb-2 text-[18px] font-[700]">
                Categories
              </label>

              {isOpenDropdown && (
                <Button
                  type="button"
                  onClick={handleAddCategory}
                  plusIcon={
                    <Image
                      src={AddIcon}
                      alt="addIcon"
                      className="skew-x-[30deg]"
                    />
                  }
                  className="flex-shrink-0 !skew-x-[-30deg] text-[12px] font-bold text-[#B2D235] uppercase !transform !scale-y-[0.8]"
                >
                  Add Category
                </Button>
              )}

            </div>
            <div className={`flex flex-col ${isOpenDropdown ? "pl-[17px] pt-[23px] pb-[39px] h-[318px] overflow-y-auto" : "items-center justify-center py-[104px]"} gap-y-[34px] w-full rounded-[9px] bg-transparent border border-[#FFFFFF33]`}>
              {isOpenDropdown ? (
                categories.map((category, idx) => (
                  <div key={idx} className="flex flex-col gap-y-1">
                    <div
                      className="flex flex-row items-center gap-x-[31px] cursor-pointer"
                      onClick={() => setSelectedCategoryIndex(idx)}
                    >
                      <input
                        type="radio"
                        className="accent-[#B2D235] w-[18px] h-[18px]"
                        checked={selectedCategoryIndex === idx}
                        onChange={() => setSelectedCategoryIndex(idx)}
                      />
                      <div className="flex items-center gap-x-[12px]">
                        <Image src={FolderIcon} alt="folder-icon" />
                        {category.isEditable ? (
                          <input
                            type="text"
                            ref={idx === categories.length - 1 ? lastInputRef : null}
                            className="bg-transparent text-[16px] text-white outline-none"
                            placeholder="Enter Name"
                            value={category.name}
                            onChange={(e) => handleNameChange(e, idx)}
                            onBlur={() => finalizeCategory(idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            maxLength={12}
                          />
                        ) : (
                          <span className="text-[16px] text-white">{category.name}</span>
                        )}
                      </div>
                    </div>
                    {category.error && (
                      <span className="text-red-500 text-xs pl-[48px]">
                        {category.error}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <h1 className="text-[38px] font-bold text-[#595959]">No Categories</h1>
                  <div className="flex flex-col items-center gap-y-[15px]">
                    <p className="text-sm text-[#595959] font-arial">
                      Click on Add Category to add one
                    </p>
                    <Button
                      type="button"
                      onClick={handleDropdownOpen}
                      plusIcon={
                        <Image
                          src={AddIcon}
                          alt="addIcon"
                          className="skew-x-[30deg]"
                        />
                      }
                      className="flex-shrink-0 !skew-x-[-30deg] text-[12px] font-bold text-[#B2D235] uppercase !transform !scale-y-[0.8]"
                    >
                      Add Category
                    </Button>
                  </div>
                </>
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
              <div className="relative border border-[#333] rounded-xl mt-2 bg-transparent overflow-hidden">
                <TextEditor
                  value={content}
                  onChange={setContent}
                  className="min-h-[211px] bg-transparent text-sm md:text-base text-gray-300 px-[30px] py-[30px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pb-[110px] bg-[#141414] mt-[35px] rounded-[20px] text-white">
          <div className="max-w-full mx-auto">
            <div className="flex flex-col">
              <div className="flex flex-col flex-wrap p-4 md:p-6 border-b border-b-[#44444466] md:flex-row md:items-center justify-between gap-4">

                <div className="w-full flex flex-row items-center justify-between gap-4">
                  <div>
                    <h1 className="text-[28px] font-medium">Images</h1>
                    <p className="text-sm text-[#fff]">
                      Add images of your product to engage customers.
                    </p>
                  </div>

                  <div className="flex items-center gap-7">

                    {/* <div className="flex items-center skew-x-[-30deg] bg-gradient-to-r from-[#B2D235] to-[#81BF41] p-[2px] rounded-[12px]">
                      <div className="bg-black px-[15px] rounded-[12px]">
                        <Button
                          plusIcon={
                            <Image
                              src={AddTransparentIcon}
                              alt="addIcon"
                              className="skew-x-[30deg] text-white"
                            />
                          }
                          className="flex items-center gap-x-[11.72px] rounded-[12px] py-[14px] pr-[24px] pl-[10px] !skew-x-[-10deg] text-[16px] font-bold text-white uppercase !transform !scale-y-[0.8] w-full bg-transparent"
                        >
                          Add From Url
                        </Button>
                      </div>
                    </div> */}

                    <div className="flex items-center skew-x-[-30deg] bg-gradient-to-r from-[#B2D235] to-[#81BF41] p-[2px] rounded-[12px]">
                      <div className="bg-black px-[15px] rounded-[12px]">
                        <Button
                          type="button"
                          onClick={handleUploadClick}
                          plusIcon={
                            <Image
                              src={UploadDocumentIcon}
                              alt="addIcon"
                              className="skew-x-[30deg] text-white"
                            />
                          }
                          className="flex items-center gap-x-[11.72px] rounded-[12px] py-[14px] pr-[24px] pl-[10px] !skew-x-[-10deg] text-[16px] font-bold text-white uppercase !transform !scale-y-[0.8] w-full bg-transparent"
                        >
                          Upload Images
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {images.length > 0 && (
                <div className="mx-4 md:mx-6 mt-6">
                  <h2 className="text-[24px] font-[700] flex items-center gap-4 border-b border-b-[#44444466] py-[19.5px]">
                    Images
                    <div className="text-xs text-gray-400 flex items-center gap-[11px]">
                      {/* <input
                        type="checkbox"
                        className="h-4 rounded-sm border-gray-600 cursor-pointer"
                        checked={allSelected}
                        onChange={e => {
                          const updated = images.map(img => ({
                            ...img,
                            selected: e.target.checked
                          }));
                          setValue("images", updated);
                        }}
                      /> */}
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
                    {images.map((image, i) => (
                      <div
                        key={i}
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
                          {image?.imageUrl ? (
                            <Image
                              src={image.imageUrl || "/placeholder.svg"}
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
                            name="thumbnail"
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
                className={`mx-4 md:mx-6 border-2 border-dashed ${isDragging ? "border-[#B2D235]" : "border-[#444444]"
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
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded border ${value
                          ? "bg-blue-500 border-blue-500"
                          : "bg-transparent border-gray-500"
                          } flex items-center justify-center cursor-pointer`}
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
                            className="text-black"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <label
                        htmlFor="visible"
                        className="text-[16px] cursor-pointer transform scale-y-[0.8]"
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

export default ProductForm;
