"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import {
  Ellipse,
  LeftVectorIcon,
  LoginLogo,
  RightVectorIcon,
} from "../../../public";
import { useState } from "react";
import { fetchAuthSession, signIn, signOut } from "aws-amplify/auth";
import Button from "../../components/common/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";
export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { actions } = useAuth();

  const router = useRouter();
  const [isLoader, setIsLoader] = useState(false);

  const onSubmit = async (data) => {
    if (isLoader) return; // Prevent multiple clicks

    setIsLoader(true); // Disable button immediately

    try {
      const res = await signIn({
        username: data?.email,
        password: data?.password,
      });

      const { tokens } = await fetchAuthSession();
      const payload = tokens?.idToken?.payload;
      const userType = payload["cognito:groups"]?.[0];

      if (userType === "admin") {
        await actions.fetchAuthData();
        toast.success("Login successful!", { id: "login_success" });
        router.push("/products");
      } else {
        signOut();
        toast.error("Not Authorized", { id: "not_authorized" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "login_error" });
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className="h-full relative flex flex-col items-center justify-center bg-[#111] p-4">
      <Image
        src={LeftVectorIcon}
        alt="LeftVectorIcon"
        className="absolute top-0 left-0 opacity-[8%]"
      />
      <Image
        src={RightVectorIcon}
        alt="RightVectorIcon"
        className="absolute bottom-0 right-0 opacity-[8%]"
      />

      <Image src={LoginLogo} alt="LoginLogo" />

      <div className="relative w-full max-w-md flex flex-col justify-center items-center">
        <div className="login-container relative z-20 p-6 rounded-[24px] w-full max-w-sm  mt-[46px]">
          <p className="text-white text-center min-h-[50px]  flex justify-center items-center font-bold text-[16px] font-[montserrat]">
            LOG IN TO YOUR STORE
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-[24px]"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-white mb-1 font-bold font-[montserrat]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@domain.com"
                {...register("email", { required: "Email is required" })}
                className="w-full  border border-[#333] text-white p-2 h-[43px] font-[montserrat] rounded-[8px]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white mb-1 font-bold  font-[montserrat]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full  border border-[#333] text-white p-2 rounded-[8px] h-[43px] font-[montserrat]"
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
              disabled={isLoader}
              className={`flex-shrink-0 font-[600] ${
                isLoader && "opacity-50 cursor-not-allowed"
              }  w-full h-[50px] btn flex justify-center items-center font-bold text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity border border-[#B2D235] text-black`}
            >
              {isLoader ? <Loader /> : "Sign In"}
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
