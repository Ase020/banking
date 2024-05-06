"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar({ user }: SiderbarProps) {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={36}
            height={36}
            className="size-9 max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>

        {sidebarLinks.map(({ imgURL, route, label }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);
          return (
            <Link
              href={route}
              key={label}
              className={cn("sidebar-link", isActive && "bg-bank-gradient")}
            >
              <div className="relative size-6">
                <Image
                  src={imgURL}
                  alt={label}
                  fill
                  className={cn(isActive && "brightness-[3] invert-0")}
                />
              </div>
              <p className={cn("sidebar-label", isActive && "!text-white")}>
                {label}
              </p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
}

export default Sidebar;
