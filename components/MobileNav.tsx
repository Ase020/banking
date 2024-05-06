"use client";

import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function MobileNav({ user }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger"
            width={28}
            height={28}
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent side="right" className="border-none bg-white">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 px-4"
          >
            <Image src="/icons/logo.svg" alt="logo" width={36} height={36} />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizon
            </h1>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex flex-col h-full pt-16 gap-6 text-white">
                {sidebarLinks.map(({ imgURL, route, label }) => {
                  const isActive =
                    pathname === route || pathname.startsWith(`${route}/`);
                  return (
                    <SheetClose asChild key={label}>
                      <Link
                        href={route}
                        className={cn(
                          "mobilenav-sheet_close w-full",
                          isActive && "bg-bank-gradient"
                        )}
                      >
                        <Image
                          src={imgURL}
                          alt={label}
                          width={20}
                          height={20}
                          className={cn(isActive && "brightness-[3] invert-0")}
                        />
                        <p
                          className={cn(
                            "text-16 font-semibold text-black-2",
                            isActive && "!text-white"
                          )}
                        >
                          {label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileNav;
