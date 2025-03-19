import Image from "next/image";
import Link from "next/link";
import { Ellipse, ErrorImage } from "../../public";

export default function NotFound() {
  return (
    <div className="flex relative  w-full h-[100vh] bg-[#111] overflow-y-hidden">
      <div className="flex w-full h-full justify-center items-center  ">
        <div>
          <Image
            src={ErrorImage}
            alt="ErrorImage"
            className="w-full relative top-[-100px] lg:top-0 left-0 h-full object-cover"
          />
        </div>
        <div
          className="flex  w-full lg-min-h-[442px] min-h-[346px] absolute justify-center items-center
       translate-y-[-50%] top-[50%] left-[0%] "
        >
          <Image
            src={Ellipse}
            alt="Ellipse"
            className=" w-full h-full object-cover relative z-10"
          />
        </div>
      </div>
      <div
        className=" flex  flex-col gap-[13px] w-full h-full absolute justify-center items-center
       translate-y-[-50%] top-[50%] left-[0%]"
      >
        <div>
          {" "}
          <h1 className=" text-white font-[Montserrat] text-[18.17px] sm:text-[20px] font-[400]  leading-[39px]">
            This page could not be found
          </h1>
        </div>
        <div>
          <Link
            href={"/"}
            className="mt-2  px-6  h-[50px] text-[14px] flex justify-center items-center skew-x-[-30deg] font-medium text-[#000] btn hover:bg-opacity-90 rounded-md"
          >
            <div className="skew-x-[30deg] font-bold uppercase">
              Back to Homepage
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
