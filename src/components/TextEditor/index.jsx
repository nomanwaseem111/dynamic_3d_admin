import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import { Bold, Italic, Underline } from "lucide-react";
import Quill from "quill";

const Font = Quill.import("formats/font");
Font.whitelist = ["montserrat", "arial", "helvetica", "times-new-roman"];
Quill.register(Font, true);

const Size = Quill.import("attributors/style/size");
Size.whitelist = ["12px", "14px", "16px", "18px", "24px", "30px", "36px", "40px", "48px"];
Quill.register(Size, true);

const TextEditor = ({ value, onChange, className }) => {
  const [font, setFont] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [showToolbar, setShowToolbar] = useState(false);
  const [selection, setSelection] = useState(null);
  const [activeFormats, setActiveFormats] = useState({});
  const quillRef = useRef(null);
  const toolbarRef = useRef(null);
  const toolbarFrozenPosition = useRef(null);
  const editorContainerRef = useRef(null);
  const isMouseOverToolbar = useRef(false);

  const updateToolbarPosition = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    if (range && range.length > 0) {
      const bounds = quill.getBounds(range.index, range.length);
      const formats = quill.getFormat(range);

      const top = bounds.top + bounds.height + 30;
      const left = bounds.left + bounds.width / 2;

      toolbarFrozenPosition.current = { top, left, height: bounds.height };
      setSelection({ top, left, height: bounds.height });
      setActiveFormats(formats);
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
      setActiveFormats({});
    }
  };

  const handleFormat = (format) => {
    const quill = quillRef.current?.getEditor();
    const range = quill?.getSelection();

    if (quill && range && range.length > 0) {
      const currentFormat = quill.getFormat(range);
      quill.format(format, !currentFormat[format]);

      setTimeout(() => {
        updateToolbarPosition();
      }, 0);
    }
  };

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    setFont(newFont);
    const quill = quillRef.current?.getEditor();
    const range = quill?.getSelection();
    if (range && range.length > 0) {
      quill.format("font", newFont);
      setTimeout(updateToolbarPosition, 0);
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = e.target.value;
    setFontSize(newSize);
    const quill = quillRef.current?.getEditor();
    const range = quill?.getSelection();
    if (range && range.length > 0) {
      quill.format("size", newSize);
      setTimeout(updateToolbarPosition, 0);
    }
  };

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    const editorEl = quillRef.current?.editor?.root;
    if (!quill || !editorEl) return;

    quill.on("selection-change", updateToolbarPosition);
    quill.on("text-change", updateToolbarPosition);
    editorEl.addEventListener("mouseup", updateToolbarPosition);
    editorEl.addEventListener("keyup", updateToolbarPosition);

    return () => {
      quill.off("selection-change", updateToolbarPosition);
      quill.off("text-change", updateToolbarPosition);
      editorEl.removeEventListener("mouseup", updateToolbarPosition);
      editorEl.removeEventListener("keyup", updateToolbarPosition);
    };
  }, []);

  useLayoutEffect(() => {
    if (!showToolbar || !toolbarRef.current || !toolbarFrozenPosition.current) return;

    const toolbarEl = toolbarRef.current;
    const editorRect = quillRef.current?.editor?.scroll?.domNode?.getBoundingClientRect();
    if (!editorRect) return;

    const { top, left } = toolbarFrozenPosition.current;
    const toolbarWidth = toolbarEl.offsetWidth;

    let adjustedLeft = left - toolbarWidth / 2;
    const maxLeft = editorRect.width - toolbarWidth - 30;
    if (adjustedLeft < 30) adjustedLeft = 30;
    else if (adjustedLeft > maxLeft) adjustedLeft = maxLeft;

    toolbarEl.style.top = `${top}px`;
    toolbarEl.style.left = `${adjustedLeft}px`;
  }, [showToolbar, selection]);


  const FloatingToolbar = ({
    toolbarRef,
    activeFormats,
    font, handleFontChange,
    fontSize, handleFontSizeChange,
    handleFormat
  }) => (
    <div
      ref={toolbarRef}
      className="absolute shadow-md flex items-center p-1.5 rounded-md z-50 border border-gray-200"
      style={{ minWidth: "180px", backgroundColor: "white" }}
    >
      <div className="flex items-center space-x-2">
        <select
          className="appearance-none outline-none px-1.5 py-1 text-xs rounded bg-white text-black border border-gray-300"
          value={font}
          onChange={handleFontChange}
          style={{ width: "182px" }}
        >
          <option value="montserrat">Montserrat</option>
          <option value="arial">Arial</option>
          <option value="helvetica">Helvetica</option>
          <option value="times-new-roman">Times New Roman</option>
        </select>

        <select
          className="appearance-none outline-none px-1.5 py-1 text-xs rounded bg-white text-black border border-gray-300"
          value={fontSize}
          onChange={handleFontSizeChange}
          style={{ width: "71px" }}
        >
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="24px">24</option>
          <option value="30px">30</option>
          <option value="36px">36</option>
          <option value="40px">40</option>
          <option value="48px">48</option>
        </select>

        <div className="flex items-center space-x-1 ml-1">
          <button
            className={`p-1 rounded text-black ${activeFormats.bold ? "bg-gray-300" : "hover:bg-gray-100"}`}
            onClick={() => handleFormat("bold")}
          >
            <Bold className="h-3.5 w-3.5" />
          </button>

          <button
            className={`p-1 rounded text-black ${activeFormats.italic ? "bg-gray-300" : "hover:bg-gray-100"}`}
            onClick={() => handleFormat("italic")}
          >
            <Italic className="h-3.5 w-3.5" />
          </button>

          <button
            className={`p-1 rounded text-black ${activeFormats.underline ? "bg-gray-300" : "hover:bg-gray-100"}`}
            onClick={() => handleFormat("underline")}
          >
            <Underline className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  const modules = {
    toolbar: false,
    clipboard: { matchVisual: false },
  };

  const formats = ["font", "size", "bold", "italic", "underline"];

  return (
    <div
      className={`relative ${className}`}
      ref={editorContainerRef}
      onMouseLeave={() => {
        if (!isMouseOverToolbar.current) {
          setShowToolbar(false);
        }
      }}
    >
      {showToolbar && (
        <FloatingToolbar
          toolbarRef={toolbarRef}
          activeFormats={activeFormats}
          font={font}
          handleFontChange={handleFontChange}
          fontSize={fontSize}
          handleFontSizeChange={handleFontSizeChange}
          handleFormat={handleFormat}

        />
      )}

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="custom-quill dark-theme"
      />
    </div>
  );
};

export default TextEditor;