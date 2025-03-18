// import { useState } from "react";
// import Button from "../common/Button";
// import Link from "next/link";

// export const MediaUploader = () => {
//   const [images, setImages] = useState([
//     {
//       id: 1,
//       name: "HandySCAN BLACK | Elite with Automation Kit",
//       selected: false,
//       thumbnail: false,
//     },
//     {
//       id: 2,
//       name: "HandySCAN BLACK | Elite with Automation Kit",
//       selected: false,
//       thumbnail: false,
//     },
//     {
//       id: 3,
//       name: "HandySCAN BLACK | Elite with Automation Kit",
//       selected: false,
//       thumbnail: false,
//     },
//     {
//       id: 4,
//       name: "HandySCAN BLACK | Elite with Automation Kit",
//       selected: true,
//       thumbnail: false,
//     },
//     {
//       id: 5,
//       name: "HandySCAN BLACK | Elite with Automation Kit",
//       selected: false,
//       thumbnail: false,
//     },
//   ]);

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//   };

//   const toggleSelect = (id) => {
//     setImages(
//       images.map((img) =>
//         img.id === id ? { ...img, selected: !img.selected } : img
//       )
//     );
//   };

//   const toggleThumbnail = (id) => {
//     setImages(
//       images.map((img) =>
//         img.id === id ? { ...img, thumbnail: !img.thumbnail } : img
//       )
//     );
//   };
//   return (
//     <div className="pb-[110px] bg-[#141414]  mt-[35px] rounded-[20px] text-white">
//       <div className="max-w-full mx-auto">
//         <div className="flex flex-col">
//           <div className="flex flex-col flex-wrap p-4 md:p-6 border-b border-b-[#44444466] md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-[28px] font-medium">Images</h1>
//               <p className="text-sm text-[#fff]">
//                 Add images and videos of your product to engage customers.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row flex-wrap text-center gap-5">
//               <Link
//                 href="/"
//                 className="skew-x-[-30deg]  flex justify-center items-center  border font-bold rounded-[12px] border-[#B2D235] px-[24px] py-[12px]"
//               >
//                 <span className="skew-x-[30deg] flex !gap-x-[11.72px]">
//                   {" "}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="23"
//                     height="23"
//                     viewBox="0 0 23 23"
//                     fill="none"
//                   >
//                     <path
//                       d="M16.7314 12.1875H5.73145C5.35561 12.1875 5.04395 11.8758 5.04395 11.5C5.04395 11.1242 5.35561 10.8125 5.73145 10.8125H16.7314C17.1073 10.8125 17.4189 11.1242 17.4189 11.5C17.4189 11.8758 17.1073 12.1875 16.7314 12.1875Z"
//                       fill="white"
//                     />
//                     <path
//                       d="M11.2314 17.6875C10.8556 17.6875 10.5439 17.3758 10.5439 17L10.5439 6C10.5439 5.62417 10.8556 5.3125 11.2314 5.3125C11.6073 5.3125 11.9189 5.62417 11.9189 6L11.9189 17C11.9189 17.3758 11.6073 17.6875 11.2314 17.6875Z"
//                       fill="white"
//                     />
//                   </svg>
//                   ADD FROM URL
//                 </span>
//               </Link>
//               <Link
//                 href="/"
//                 className="skew-x-[-30deg]  flex justify-center items-center  border font-bold rounded-[12px] border-[#B2D235] px-[24px] py-[12px]"
//               >
//                 <span className="skew-x-[30deg] flex !gap-x-[11.72px] uppercase">
//                   {" "}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="23"
//                     height="23"
//                     viewBox="0 0 23 23"
//                     fill="none"
//                   >
//                     <path
//                       d="M18.958 9.84087H16.3088C14.1363 9.84087 12.3672 8.07171 12.3672 5.89921L12.3672 3.25004C12.3672 2.74587 11.9547 2.33337 11.4505 2.33337H7.56384C4.74051 2.33337 2.45801 4.16671 2.45801 7.43921L2.45801 15.5609C2.45801 18.8334 4.74051 20.6667 7.56384 20.6667H14.7688C17.5922 20.6667 19.8747 18.8334 19.8747 15.5609L19.8747 10.7575C19.8747 10.2534 19.4622 9.84087 18.958 9.84087ZM10.7355 12.9025C10.598 13.04 10.4238 13.1042 10.2497 13.1042C10.0755 13.1042 9.90134 13.04 9.76384 12.9025L9.10384 12.2425L9.10384 16.0834C9.10384 16.4592 8.79218 16.7709 8.41634 16.7709C8.04051 16.7709 7.72884 16.4592 7.72884 16.0834L7.72884 12.2425L7.06884 12.9025C6.80301 13.1684 6.36301 13.1684 6.09717 12.9025C5.83134 12.6367 5.83134 12.1967 6.09717 11.9309L7.93051 10.0975C7.99468 10.0425 8.05884 9.99671 8.13217 9.96004C8.15051 9.95087 8.17801 9.94171 8.19634 9.93254C8.25134 9.91421 8.30634 9.90504 8.37051 9.89587C8.39801 9.89587 8.41634 9.89587 8.44384 9.89587C8.51717 9.89587 8.59051 9.91421 8.66384 9.94171C8.67301 9.94171 8.67301 9.94171 8.68218 9.94171C8.75551 9.96921 8.82884 10.0242 8.88384 10.0792C8.89301 10.0884 8.90218 10.0884 8.90218 10.0975L10.7355 11.9309C11.0013 12.1967 11.0013 12.6367 10.7355 12.9025Z"
//                       fill="white"
//                     />
//                     <path
//                       d="M16.1439 8.57579C17.0147 8.58495 18.2247 8.58495 19.2605 8.58495C19.783 8.58495 20.058 7.97079 19.6914 7.60412C18.3714 6.27495 16.0064 3.88245 14.6497 2.52579C14.2739 2.14995 13.623 2.40662 13.623 2.92912L13.623 6.12829C13.623 7.46662 14.7597 8.57579 16.1439 8.57579Z"
//                       fill="white"
//                     />
//                   </svg>
//                   upload images
//                 </span>
//               </Link>
//             </div>
//           </div>

//           <div className="">
//             <h2 className="text-[24px] font-[700] flex items-center !gap-[71px] border-b border-b-[#44444466] px-4 md:px-6 py-[19.5px]">
//               Images
//               <div className="text-xs text-gray-400 flex items-center gap-[11px]">
//                 <input
//                   type="checkbox"
//                   checked={false}
//                   className="max-w-[100px] h-4 font-[400] rounded-sm border-gray-600 cursor-pointer "
//                 />
//                 {images.length} images
//               </div>
//             </h2>

//             <div className="flex gap-4 border-b border-b-[#44444466] px-4 md:px-6 py-[15.5px]">
//               <div className="max-w-[100px] w-full"></div>

//               <div className="text-sm !max-w-[90px] w-full font-bold">
//                 Image
//               </div>
//               <div className="text-sm max-w-[612px] w-full ml-[50px] font-bold">
//                 Description (image alt text)
//               </div>
//               <div className="text-sm w-[76px] font-bold">Thumbnail</div>
//               <div className="w-20"></div>
//             </div>

//             <div className="space-y-2">
//               {images.map((image, index) => (
//                 <div
//                   key={image.id}
//                   className={`flex gap-4 px-4 md:px-6 items-center border-b border-b-[#44444466] py-[30px] ${
//                     image.id === 4 ? " rounded" : ""
//                   }`}
//                 >
//                   <div className="flex justify-center items-center gap-3  max-w-[100px] w-full">
//                     <input
//                       type="checkbox"
//                       checked={image.selected}
//                       onChange={() => toggleSelect(image.id)}
//                       className="max-w-[100px] h-4 rounded-sm border-gray-600 cursor-pointer "
//                     />
//                   </div>
//                   <div className="max-w-[90px] w-full  h-12 bg-gray-800 rounded flex items-center justify-center overflow-hidden">
//                     <img
//                       src="/placeholder.svg?height=48&width=48"
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="text-sm max-w-[612px] font-bold w-full ml-[50px]">
//                     {image.name}
//                   </div>
//                   <div className="!w-[76px] flex justify-center items-center">
//                     <input
//                       type="radio"
//                       checked={image.thumbnail}
//                       onChange={() => toggleThumbnail(image.id)}
//                       className="w-4 h-4 cursor-pointer "
//                     />
//                   </div>
//                   <div className="w-20 cursor-pointer flex justify-center items-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                     >
//                       <path
//                         d="M21.0702 5.23C19.4602 5.07 17.8502 4.95 16.2302 4.86V4.85L16.0102 3.55C15.8602 2.63 15.6402 1.25 13.3002 1.25H10.6802C8.35016 1.25 8.13016 2.57 7.97016 3.54L7.76016 4.82C6.83016 4.88 5.90016 4.94 4.97016 5.03L2.93016 5.23C2.51016 5.27 2.21016 5.64 2.25016 6.05C2.29016 6.46 2.65016 6.76 3.07016 6.72L5.11016 6.52C10.3502 6 15.6302 6.2 20.9302 6.73C20.9602 6.73 20.9802 6.73 21.0102 6.73C21.3902 6.73 21.7202 6.44 21.7602 6.05C21.7902 5.64 21.4902 5.27 21.0702 5.23Z"
//                         fill="#C2C2C2"
//                         fill-opacity="0.9"
//                       />
//                       <path
//                         d="M19.2302 8.14C18.9902 7.89 18.6602 7.75 18.3202 7.75H5.68024C5.34024 7.75 5.00024 7.89 4.77024 8.14C4.54024 8.39 4.41024 8.73 4.43024 9.08L5.05024 19.34C5.16024 20.86 5.30024 22.76 8.79024 22.76H15.2102C18.7002 22.76 18.8402 20.87 18.9502 19.34L19.5702 9.09C19.5902 8.73 19.4602 8.39 19.2302 8.14ZM13.6602 17.75H10.3302C9.92024 17.75 9.58024 17.41 9.58024 17C9.58024 16.59 9.92024 16.25 10.3302 16.25H13.6602C14.0702 16.25 14.4102 16.59 14.4102 17C14.4102 17.41 14.0702 17.75 13.6602 17.75ZM14.5002 13.75H9.50024C9.09024 13.75 8.75024 13.41 8.75024 13C8.75024 12.59 9.09024 12.25 9.50024 12.25H14.5002C14.9102 12.25 15.2502 12.59 15.2502 13C15.2502 13.41 14.9102 13.75 14.5002 13.75Z"
//                         fill="#C2C2C2"
//                         fill-opacity="0.9"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div
//             className="mx-4 md:mx-6 drag-and-drop min-h-[169px] mt-[49px] cursor-pointer  p-6  flex items-center gap-x-[52px]"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="90"
//               height="90"
//               viewBox="0 0 90 90"
//               fill="none"
//             >
//               <path
//                 d="M9.675 71.2875L9.6 71.3625C8.5875 69.15 7.95 66.6375 7.6875 63.8625C7.95 66.6 8.6625 69.075 9.675 71.2875Z"
//                 fill="#81BF41"
//               />
//               <path
//                 d="M33.7502 38.925C38.6793 38.925 42.6752 34.9291 42.6752 30C42.6752 25.0708 38.6793 21.075 33.7502 21.075C28.8211 21.075 24.8252 25.0708 24.8252 30C24.8252 34.9291 28.8211 38.925 33.7502 38.925Z"
//                 fill="#81BF41"
//               />
//               <path
//                 d="M60.7125 7.5H29.2875C15.6375 7.5 7.5 15.6375 7.5 29.2875V60.7125C7.5 64.8 8.2125 68.3625 9.6 71.3625C12.825 78.4875 19.725 82.5 29.2875 82.5H60.7125C74.3625 82.5 82.5 74.3625 82.5 60.7125V52.125V29.2875C82.5 15.6375 74.3625 7.5 60.7125 7.5ZM76.3875 46.875C73.4625 44.3625 68.7375 44.3625 65.8125 46.875L50.2125 60.2625C47.2875 62.775 42.5625 62.775 39.6375 60.2625L38.3625 59.2125C35.7 56.8875 31.4625 56.6625 28.4625 58.6875L14.4375 68.1C13.6125 66 13.125 63.5625 13.125 60.7125V29.2875C13.125 18.7125 18.7125 13.125 29.2875 13.125H60.7125C71.2875 13.125 76.875 18.7125 76.875 29.2875V47.2875L76.3875 46.875Z"
//                 fill="#81BF41"
//               />
//             </svg>
//             <div>
//               <h3 className="text-[14px] lg:text-[40px] font-medium mb-1">
//                 Drag & Drop images here to upload.
//               </h3>
//               <p className="text-[12px] lg:text-[16.8px] text-gray-400">
//                 bmp, jpeg, png, wbmp, xbm or webp. Maximum 8 MB
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export const MediaUploader = () => {
  const [images, setImages] = useState([]);
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
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/bmp",
        "image/webp",
        "image/xbm",
        "image/wbmp",
      ];
      return validTypes.includes(file.type) && file.size <= 8 * 1024 * 1024; // 8MB max
    });

    if (validFiles.length === 0) {
      alert(
        "Please upload valid image files (bmp, jpeg, png, wbmp, xbm or webp) under 8MB"
      );
      return;
    }

    const newImages = validFiles.map((file, index) => {
      const newId = Math.max(...images.map((img) => img.id), 0) + index + 1;
      return {
        id: newId,
        name: file.name,
        selected: false,
        thumbnail: false,
        file: file,
        preview: URL.createObjectURL(file),
      };
    });

    setImages([...images, ...newImages]);
  };

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
        img.id === id
          ? { ...img, thumbnail: true }
          : { ...img, thumbnail: false }
      )
    );
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
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
            <div className="flex flex-col sm:flex-row flex-wrap text-center gap-5">
              <Link
                href="/"
                className="skew-x-[-30deg] flex justify-center items-center border font-bold rounded-[12px] border-[#B2D235] px-[24px] py-[12px]"
              >
                <span className="skew-x-[30deg] flex !gap-x-[11.72px]">
                  <svg
                    xmlns="http:www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                  >
                    <path
                      d="M16.7314 12.1875H5.73145C5.35561 12.1875 5.04395 11.8758 5.04395 11.5C5.04395 11.1242 5.35561 10.8125 5.73145 10.8125H16.7314C17.1073 10.8125 17.4189 11.1242 17.4189 11.5C17.4189 11.8758 17.1073 12.1875 16.7314 12.1875Z"
                      fill="white"
                    />
                    <path
                      d="M11.2314 17.6875C10.8556 17.6875 10.5439 17.3758 10.5439 17L10.5439 6C10.5439 5.62417 10.8556 5.3125 11.2314 5.3125C11.6073 5.3125 11.9189 5.62417 11.9189 6L11.9189 17C11.9189 17.3758 11.6073 17.6875 11.2314 17.6875Z"
                      fill="white"
                    />
                  </svg>
                  ADD FROM URL
                </span>
              </Link>
              <button
                onClick={handleUploadClick}
                className="skew-x-[-30deg] flex justify-center items-center border font-bold rounded-[12px] border-[#B2D235] px-[24px] py-[12px]"
              >
                <span className="skew-x-[30deg] flex !gap-x-[11.72px] uppercase">
                  <svg
                    xmlns="http:www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                  >
                    <path
                      d="M18.958 9.84087H16.3088C14.1363 9.84087 12.3672 8.07171 12.3672 5.89921L12.3672 3.25004C12.3672 2.74587 11.9547 2.33337 11.4505 2.33337H7.56384C4.74051 2.33337 2.45801 4.16671 2.45801 7.43921L2.45801 15.5609C2.45801 18.8334 4.74051 20.6667 7.56384 20.6667H14.7688C17.5922 20.6667 19.8747 18.8334 19.8747 15.5609L19.8747 10.7575C19.8747 10.2534 19.4622 9.84087 18.958 9.84087ZM10.7355 12.9025C10.598 13.04 10.4238 13.1042 10.2497 13.1042C10.0755 13.1042 9.90134 13.04 9.76384 12.9025L9.10384 12.2425L9.10384 16.0834C9.10384 16.4592 8.79218 16.7709 8.41634 16.7709C8.04051 16.7709 7.72884 16.4592 7.72884 16.0834L7.72884 12.2425L7.06884 12.9025C6.80301 13.1684 6.36301 13.1684 6.09717 12.9025C5.83134 12.6367 5.83134 12.1967 6.09717 11.9309L7.93051 10.0975C7.99468 10.0425 8.05884 9.99671 8.13217 9.96004C8.15051 9.95087 8.17801 9.94171 8.19634 9.93254C8.25134 9.91421 8.30634 9.90504 8.37051 9.89587C8.39801 9.89587 8.41634 9.89587 8.44384 9.89587C8.51717 9.89587 8.59051 9.91421 8.66384 9.94171C8.67301 9.94171 8.67301 9.94171 8.68218 9.94171C8.75551 9.96921 8.82884 10.0242 8.88384 10.0792C8.89301 10.0884 8.90218 10.0884 8.90218 10.0975L10.7355 11.9309C11.0013 12.1967 11.0013 12.6367 10.7355 12.9025Z"
                      fill="white"
                    />
                    <path
                      d="M16.1439 8.57579C17.0147 8.58495 18.2247 8.58495 19.2605 8.58495C19.783 8.58495 20.058 7.97079 19.6914 7.60412C18.3714 6.27495 16.0064 3.88245 14.6497 2.52579C14.2739 2.14995 13.623 2.40662 13.623 2.92912L13.623 6.12829C13.623 7.46662 14.7597 8.57579 16.1439 8.57579Z"
                      fill="white"
                    />
                  </svg>
                  upload images
                </span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/jpeg,image/png,image/bmp,image/webp,image/xbm,image/wbmp"
                multiple
                className="hidden"
              />
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
            } rounded-lg min-h-[169px] mt-[49px] cursor-pointer p-6 flex items-center gap-x-[52px]`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploader;
