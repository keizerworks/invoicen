"use client";
import { useState, useEffect } from "react";
import type { FC } from "react";
import Image from "next/image";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
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
      className="top-0 flex justify-center items-center mx-auto my-5 px-4 w-full md:max-w-7xl"
    >
      <div className="z-10 flex justify-between items-center border-2 p-2 rounded-xl w-full">
        <div className="flex items-center gap-1 font-bold">
          {mounted ? (
            <Link href={"/"}>
              {theme === "light" ? (
                <Image
                  src={"/assets/logos/logo-icon-light.svg"}
                  height={50}
                  width={100}
                  alt="logo"
                  aria-label="logo"
                />
              ) : (
                <Image
                  src={"/assets/logos/logo-icon-dark.svg"}
                  height={50}
                  width={100}
                  alt="logo"
                  aria-label="logo"
                />
              )}
            </Link>
          ) : (
            <Skeleton className="w-[60px] h-[60px]" />
          )}
        </div>
        <div className="flex items-center">
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
