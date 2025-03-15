import Image from "next/image";
import { rightArrowIcon } from "../../../../public";
import { MediaUploader } from "../MediaUploader";
import { ProductCategories } from "../ProductCategories";
import { ProductDescription } from "../ProductDescription";
import StoreFront from "../StoreFront";

export const ProductInfo = () => {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="p-3 sm:p-6 max-w-6xl">
        <h1 className="text-xl flex items-center gap-[15px] sm:text-[40px]  font-medium text-white">
          <Image src={rightArrowIcon} alt="rightArrowIcon" />
          Product Information
        </h1>
        <ProductCategories />
        <ProductDescription />
        <MediaUploader />
        <StoreFront/>
      </div>
    </div>
  );
};
