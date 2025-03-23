"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../common/Button";
import { AvatarIcon, LoginLogo, LogoutIcon } from "../../../public";
import { signOut } from "aws-amplify/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const {setters} = useAuth()

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      setters.setUser(null);
      setters.setToken(null);
      localStorage.clear();
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      router.push("/signin");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="w-full navbar z-10 text-white">
      <div className="w-[90%] mx-auto py-3 flex items-center h-[96px] justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={LoginLogo}
            alt="LoginLogo"
            className="w-[200px] md:max-w-[273px] md:w-full h-[26px]"
          />
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop navigation */}
        <div className={`hidden md:flex items-center space-x-4`}>
          <Image src={AvatarIcon} alt="AvatarIcon" />
          <div>
            <p className="font-bold text-[14px] font-[montserrat]">JASON</p>
            <p className="text-[12px] text-[#808080] font-[montserrat]">
              jason@example.com
            </p>
          </div>
          <Button onClick={handleSignOut} className={"skew-x-[-30deg]"}>
            <Image src={LogoutIcon} alt="LogoutIcon" />
          </Button>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black border-b border-gray-800 p-4 md:hidden z-50">
            {/* {user && (
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md">
                <Avatar
                  src={user.image || "/placeholder.svg?height=40&width=40"}
                  alt={user.name}
                  className="h-10 w-10 border border-gray-700"
                >
                  {user.name.charAt(0)}
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
              </div>
            )} */}
            <div className="mt-4 space-y-2">
              <Link
                href="/profile"
                className="block p-2 hover:bg-gray-800 rounded-md"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block p-2 hover:bg-gray-800 rounded-md"
              >
                Settings
              </Link>
              <Link
                href="/logout"
                className="block p-2 hover:bg-gray-800 rounded-md"
              >
                Log out
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
