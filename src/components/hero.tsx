import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Euro, Heart, IndianRupee } from "lucide-react";
import InvoiceIllustration from "./invoice-illustration";
import { Badge } from "./ui/badge";
import { MagneticWrapper } from "@/components/ui/magnetic-wrapper";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="py-20 min-h-[calc(100vh-13rem)] max-h-fit">
        <div className="relative flex flex-col items-center space-y-6">
          <Badge
            variant="secondary"
            className="bg-secondary/40 hover:bg-secondary/50 dark:bg-secondary px-4 py-1 rounded-full"
          >
            Trusted by <Heart className="bg-clip-text mx-1 w-3 h-3 text-primary fill-primary" />{" "}
            10,000+ freelancers
          </Badge>
          <div className="top-[-35rem] md:-top-[55rem] left-[50%] z-[-1] absolute bg-gradient-to-t from-primary to-blue-500 opacity-35 blur-[8em] rounded-xl transition-all translate-x-[-50%] duration-700 ease-out size-[20rem] md:size-[40rem]"></div>
          <div className="top-[13rem] -left-[50%rem] z-[-1] absolute bg-gradient-to-t from-primary to-blue-500 opacity-35 blur-[4em] md:blur-[8em] rounded-full w-[10rem] md:w-[30rem] h-[20rem] md:h-[40rem] transition-all duration-700 ease-out rotate-[50deg]"></div>

          <div className="z-20 flex flex-col items-center font-bold text-5xl text-center text-neutral-900 md:text-6xl dark:text-neutral-200">
            <div>
              Create Invoices in{" "}
              <span className="bg-clip-text bg-gradient-to-tr from-primary via-blue-500 to-blue-200 font-extrabold text-transparent">
                minutes
              </span>
            </div>
            <span>not in hours.</span>
          </div>
          <div className="z-20 flex flex-col justify-center items-center my-4 font-medium text-center">
            <div>A Simple Invoice Generator for Freelancers and Businesses and enterprises.</div>
            <div className="md:block hidden">
              Effortlessly <span className="font-semibold">create, manage,</span> and send
              <span className="font-semibold"> professional</span> invoices.
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Link href={"/generate"}>
              <Button className="w-32 h-10 font-bold" Icon={ArrowRight} iconPlacement="right">
                Get Started
              </Button>
            </Link>

            <Link href={"/generate"}>
              <Button
                variant={"linkHover2"}
                className="hover:rounded-xl font-bold transition-all hover:-translate-y-1 duration-500"
              >
                Try for free
              </Button>
            </Link>
          </div>
        </div>
        <section className="flex justify-center items-center my-20">
          <div className="relative flex justify-center items-center w-fit group">
            <InvoiceIllustration
              CurrencyIcon={DollarSign}
              className="group-hover:rotate-[-20deg] bg-gradient-to-tr from-blue-500/10 via-blue-500/40 to-blue-300/10 w-44 md:w-60 h-80 md:h-80 transition-all group-hover:-translate-x-4 duration-300 ease-in-out rotate-[-10deg]"
            />
            <InvoiceIllustration
              CurrencyIcon={IndianRupee}
              className="top-[50%] left-[50%] z-20 absolute bg-gradient-to-tr from-primary via-blue-500 to-blue-400 w-60 md:w-60 h-80 md:h-80 transition-all translate-x-[-50%] translate-y-[-50%] group-hover:translate-y-[-54%] duration-300 ease-in-out"
            />
            <InvoiceIllustration
              CurrencyIcon={Euro}
              className="group-hover:rotate-[20deg] bg-gradient-to-tr from-blue-500/10 via-blue-500/40 to-blue-300/10 w-44 md:w-60 h-80 md:h-80 transition-all group-hover:translate-x-4 duration-300 ease-in-out rotate-[10deg]"
            />
          </div>
        </section>

        <section className="flex flex-col justify-center items-center gap-4">
          <div className="font-bold">Multi-Currency Support</div>
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-700/20 hover:bg-blue-700/20 px-6 py-2">
              <MagneticWrapper>
                <DollarSign className="w-4 h-4 text-primary" />
              </MagneticWrapper>
            </Badge>
            <Badge className="bg-blue-700/20 hover:bg-blue-700/20 px-6 py-2">
              <MagneticWrapper>
                <IndianRupee className="w-4 h-4 text-primary" />
              </MagneticWrapper>
            </Badge>
            <Badge className="bg-blue-700/20 hover:bg-blue-700/20 px-6 py-2">
              <MagneticWrapper>
                <Euro className="w-4 h-4 text-primary" />
              </MagneticWrapper>
            </Badge>
          </div>
        </section>
      </section>
    </>
  );
}
