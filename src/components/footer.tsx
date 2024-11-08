"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <footer className="h-fit relative overflow-hidden py-8 border-t">
        <section className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-1 font-bold">
              {mounted ? (
                <Link href={"/"}>
                  <Image
                    src={"/assets/logos/logo-icon-dark.svg"}
                    height={50}
                    width={50}
                    alt="logo"
                    aria-label="logo"
                  />
                </Link>
              ) : (
                <Skeleton className="h-[60px] w-[60px]" />
              )}

              <div className="text-2xl font-extrabold">Keizer .</div>
            </div>
            All rights reserved @ {new Date().getFullYear()}
          </div>
        </section>
      </footer>
    </>
  );
}
