import Image from "next/image";
import Link from "next/link";
import { LoginLogo } from "../../../public";
import Button from "../components/common/Button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111] p-4">
      <Image src={LoginLogo} alt="LoginLogo" />

      <div className="relative w-full max-w-md flex justify-center items-center">
        <div className="login-container p-6 rounded-[24px] w-full max-w-sm z-10 my-12">
          <p className="text-white text-center text-sm mb-6">
            LOG IN TO YOUR STORE
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@domain.com"
                className="w-full bg-[#222] border border-[#333] text-white p-2 rounded"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="w-full bg-[#222] border border-[#333] text-white p-2 rounded"
              />
            </div>

            <div className="text-right">
              <Link
                href="#"
                className="text-[#b3e142] underline text-[18px] font-[700] self-stretch
 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              className={`flex-shrink-0  font-[600] w-full mx-auto sm:mx-0  h-[50px] relative z-10 btn flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity border border-[#B2D235] text-black`}
              children={"Sign In"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
