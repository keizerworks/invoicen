"use client";
import { useState, useEffect } from "react";
import type { FC } from "react";
import Image from "next/image";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { CurrencyToggleButton } from "../currency-toggle-button";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";

const Navbar: FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      aria-label="Navbar"
      className="my-5 top-0  flex items-center md:max-w-7xl mx-auto px-4 justify-center w-full"
    >
      <div className="flex border-2 z-10 p-2 items-center justify-between w-full rounded-xl">
        <div className="flex items-center gap-1 font-bold">
          {mounted ? (
            <Link href={"/"}>
              {theme === "light" ? (
                <Image
                  src={"/assets/logos/logo-icon-light.svg"}
                  height={50}
                  width={50}
                  alt="logo"
                  aria-label="logo"
                />
              ) : (
                <Image
                  src={"/assets/logos/logo-icon-dark.svg"}
                  height={50}
                  width={50}
                  alt="logo"
                  aria-label="logo"
                />
              )}
            </Link>
          ) : (
            <Skeleton className="h-[60px] w-[60px]" />
          )}

          <div className="text-2xl hidden md:block font-extrabold">
            Keizer .
          </div>
        </div>
        <div className="flex items-center">
          <CurrencyToggleButton />
          <ThemeToggleButton />
          {pathname.startsWith("/generate") || (
            <Link href={"/generate"}>
              <Button className="ml-4 font-bold">Generate Invoice</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
