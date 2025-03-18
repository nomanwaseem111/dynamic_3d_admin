"use client"

import  { useEffect, useRef, useState } from "react";

export const ProductDescription = () => {
  const editorRef = useRef(null);
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [font, setFont] = useState("Montserrat");
  const [fontSize, setFontSize] = useState("16");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);

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

  return (
    <div className="w-full bg-[#141414] p-[35px] rounded-[20px] ">
      <h2 className="text-white text-2xl font-medium mb-6">Description</h2>

      <div className=" text-white">
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
  );
};
