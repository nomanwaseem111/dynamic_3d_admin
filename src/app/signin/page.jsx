"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { Ellipse, LoginLogo } from "../../../public";
import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import Button from "../../components/common/Button";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    // setIsLoader("loading...");
    console.log(data);
    try {
      const res = await signIn({
        username: data?.email,
        password: data?.password,
      });

      console.log("res", res);
    } catch (error) {
      // setIsLoader(false);
      console.log(error);
      // toast.error(error.message);
    }
  };

  return (
    <div className="h-full relative flex flex-col items-center justify-center bg-[#111] p-4">
      <Image src={LoginLogo} alt="LoginLogo" />

      <div className="relative w-full max-w-md flex flex-col justify-center items-center">
        <p className="text-white text-center text-sm mt-[17px] font-[montserrat]">
          LOG IN TO YOUR STORE
        </p>
        <div className="login-container p-6 rounded-[24px] w-full max-w-sm z-10 mt-[46px]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white mb-1 font-[montserrat]">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@domain.com"
                {...register("email", { required: "Email is required" })}
                className="w-full bg-[#222] border border-[#333] text-white p-2 rounded font-[montserrat]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-1 font-[montserrat]">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full bg-[#222] border border-[#333] text-white p-2 rounded font-[montserrat]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-[#b3e142] underline text-[18px] font-[montserrat] font-[700] hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              // loading={loading}
              className="flex-shrink-0 font-[600]  w-full h-[50px] btn flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity border border-[#B2D235] text-black"
            >
              Sign In
            </Button>
          </form>
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
