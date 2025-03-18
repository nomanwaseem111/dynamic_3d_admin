import Image from "next/image";
import { rightArrowIcon } from "../../../public";
import { MediaUploader } from "../MediaUploader";
import { ProductCategories } from "../ProductCategories";
import { ProductDescription } from "../ProductDescription";
import StoreFront from "../StoreFront";
import Button from "../common/Button";

export const AddProductForm = () => {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="p-3 py-6 sm:p-6 max-w-full">
        <div className="flex justify-between items-center flex-wrap">
          <h1 className="text-xl flex items-center gap-[15px] sm:text-[40px]  font-medium text-white">
            <Image src={rightArrowIcon} alt="rightArrowIcon" />
            Add Product
          </h1>

          <div className="flex w-full max-w-[330px] justify-between items-center flex-wrap">
            <Button
              className="skew-x-[-30deg] flex justify-center uppercase items-center rounded-[12px] font-bold border border-[#B2D235] h-[50px] w-full max-w-[145px]"
              children={"Cancel"}
            />
            <Button
              className="skew-x-[-30deg] flex justify-center uppercase items-center rounded-[12px] font-bold btn text-[#000] h-[50px] w-full max-w-[165px]"
              children={"Save"}
            />
          </div>
        </div>
        <ProductCategories />
        <ProductDescription />
        <MediaUploader />
        <StoreFront />
      </div>
    </div>
  );
};
