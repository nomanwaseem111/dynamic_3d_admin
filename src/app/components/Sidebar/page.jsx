import Link from 'next/link'
import React from 'react'

export const Sidebar = () => {
  return (
    <div className="hidden md:block pt-[110px] w-full max-w-[350px] bg-[#111] border-r border-[#222]">
    <nav className="p-2 space-y-1 mt-2">
      <Link
        href={"/"}
        className={`flex-shrink-0  font-[600] w-full mx-auto  sm:mx-0 hover:bg-[#ffffff1f] h-[50px] relative z-10  flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity`}
      >
        <span className="skew-x-[30deg]">Dashboard</span>
      </Link>

      <Link
        href={"/"}
        className={`flex-shrink-0  font-[600] w-full mx-auto  sm:mx-0 hover:bg-[#ffffff1f] h-[50px] relative z-10  flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity`}
      >
        <span className="skew-x-[30deg]">Categories</span>
      </Link>

      <Link
        href={"/"}
        className={`flex-shrink-0  font-[600] w-full mx-auto  sm:mx-0 hover:bg-[#ffffff1f] h-[50px] relative z-10  flex justify-center items-center text-center skew-x-[-30deg] text-[18px] rounded-[12px] hover:opacity-90 transition-opacity`}
      >
        <span className="skew-x-[30deg]">Products</span>
      </Link>
    </nav>
  </div>

  )
}

