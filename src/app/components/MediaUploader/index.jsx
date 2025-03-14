import { useState } from "react";
import Button from "../common/Button";

export const MediaUploader = () => {
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
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
        img.id === id ? { ...img, thumbnail: !img.thumbnail } : img
      )
    );
  };
  return (
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
              <Button className="skew-x-[-30deg] border font-bold rounded-[12px] border-[#B2D235] px-[24px] py-[12px]">
                {/* <Plus className="w-4 h-4" /> */}
                ADD FROM URL
              </Button>
              <Button className="skew-x-[-30deg] border font-bold rounded-[12px] border-[#B2D235] px-[24px] py-[12px]">
                {/* <Plus className="w-4 h-4" /> */}
                UPLOAD IMAGES
              </Button>
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
  );
};
