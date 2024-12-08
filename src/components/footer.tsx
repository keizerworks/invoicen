"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useTheme } from "next-themes";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <footer className="relative py-8 border-t h-fit overflow-hidden">
        <section className="mx-auto px-4 max-w-7xl">
          <div className="flex md:flex-row flex-col justify-between items-center gap-4">
            <div className="flex items-center gap-1 font-bold">
              {mounted ? (
                <Link href={"/"}>
                  <Image
                    src={
                      theme === "light"
                        ? "/assets/logos/logo-light.svg"
                        : "/assets/logos/logo-dark.svg"
                    }
                    height={50}
                    width={100}
                    alt="logo"
                    aria-label="logo"
                  />
                </Link>
              ) : (
                <Skeleton className="w-[120px] h-[60px]" />
              )}
            </div>
            All rights reserved @ {new Date().getFullYear()}
          </div>
        </section>
      </footer>
    </>
  );
}
