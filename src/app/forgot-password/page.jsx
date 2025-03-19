"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Ellipse, LoginLogo } from "../../../public";
import { useState } from "react";
import Button from "../../components/common/Button";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgetPasswordCodeSent, setForgetPasswordCodeSent] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (data) {
      setForgetPasswordCodeSent(true);
    }
  };

  const renderForm = () => {
    return (
      <div>
        <label htmlFor="email" className="block text-white mb-1 font-[montserrat] ">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="example@domain.com"
          {...register("email", { required: "Email is required" })}
          className="w-full bg-[#222] border border-[#333] text-white p-2 rounded font-[montserrat] "
        />
        {errors.email && (
          <p className="text-red-500 text-sm font-[montserrat] ">{errors.email.message}</p>
        )}
        <Button
          type="submit"
          className="flex-shrink-0 font-[600] mt-5 w-full h-[50px] btn flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity border border-[#B2D235] text-black"
        >
          Submit
        </Button>
      </div>
    );
  };

  const renderPasswordResetForm = () => {
    return (
      <>
        <div>
          <label htmlFor="email" className="block text-white mb-1 font-[montserrat] ">
            Code
          </label>
          <input
            type="number"
            id="code"
            placeholder="Enter Code"
            {...register("code", { required: "Code is required" })}
            className="w-full bg-[#222] border border-[#333] text-white p-2 rounded font-[montserrat]"
          />
          {errors.code && (
            <p className="text-red-500 text-sm font-[montserrat]">{errors.code.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-white mb-1 font-[montserrat]">
            New Password
          </label>
          <input
            type="text"
            id="newpassword"
            placeholder="Enter New Password"
            {...register("newpassword", {
              required: "New Password is required",
            })}
            className="w-full bg-[#222] border border-[#333] text-white p-2 rounded font-[montserrat]"
          />
          {errors.newpassword && (
            <p className="text-red-500 text-sm font-[montserrat]">{errors.newpassword.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-white mb-1 font-[montserrat]">
            Repeat Password
          </label>
          <input
            type="text"
            id="repeat_password"
            placeholder="Enter Repeat Password"
            {...register("repeat_password", {
              required: "Repeat Password is required",
            })}
            className="w-full bg-[#222] border border-[#333] text-white p-2 rounded font-[montserrat]"
          />
          {errors.repeat_password && (
            <p className="text-red-500 text-sm font-[montserrat]">
              {errors.repeat_password.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="flex-shrink-0  font-[600] w-full h-[50px] btn flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity border border-[#B2D235] text-black"
        >
          Submit
        </Button>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111] p-4">
      <Image src={LoginLogo} alt="LoginLogo" />

      <div className="relative w-full max-w-md flex justify-center items-center">
        <div className="login-container p-6 rounded-[24px] w-full max-w-sm z-10 my-12">
          {!forgetPasswordCodeSent && (
            <>
              <h3 className="text-white font-bold text-[24px] text-center font-[montserrat]">
                Forgot your password?{" "}
              </h3>
              <p className="text-white text-center mt-6 text-sm mb-6 font-[montserrat]">
                Please enter your email below and we will send you instructions
                to reset your username
              </p>
            </>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!forgetPasswordCodeSent ? renderForm() : renderPasswordResetForm()}
          </form>
          {!forgetPasswordCodeSent && (
            <Link
              href={"/"}
              className="text-[#fff] text-center mt-3 flex justify-center items-center font-[montserrat]"
            >
              Back
            </Link>
          )}
        </div>
      </div>
      <Image
        src={Ellipse}
        alt="Ellipse"
        className="absolute top-1/2 left-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2 bg-fixed bg-center bg-cover"
      />
    </div>
  );
}
