import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BoxIcon } from "../../../public";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/products", label: "Products", icon: BoxIcon },
];

const SidebarLink = ({ href, label, icon, isActive }) => {
  return (
    <Link
      href={href}
      className={`flex-shrink-0  ${
        isActive && "bg-[#ffffff1f] border-l-[3px] border-[#b2d235]"
      } font-[600] w-[90%] mx-auto sm:mx-0 hover:bg-[#ffffff1f] hover:border-l-[3px] hover:border-[#b2d235] h-[50px] relative z-10 !gap-x-[17.97px] flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity`}
    >
      <div className="flex !w-[60%] items-center">
        <Image src={icon} alt={`${label} icon`} className="skew-x-[30deg]" />
        <span className="skew-x-[30deg] ml-5">{label}</span>
      </div>
    </Link>
  );
};

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block  w-full max-w-[350px] min-h-screen bg-[#111] border-r border-[#222]">
      <nav className="p-2 space-y-1 mt-6 flex flex-col !gap-[11px] justify-center items-center">
        {navItems.map((item) => {
          // const isActive = pathname === item.href;
          const isActive = pathname;

          return <SidebarLink key={item.label} {...item} isActive={isActive} />;
        })}
      </nav>
    </aside>
  );
};
