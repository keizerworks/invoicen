import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Euro, Heart, IndianRupee } from "lucide-react";
import InvoiceIillustration from "./invoice-illustration";
import { Badge } from "./ui/badge";

export default function Hero() {
  return (
    <>
      <section className="py-20 min-h-[calc(100vh-13rem)] max-h-fit ">
        <div className="relative flex flex-col space-y-6 items-center">
          <Badge
            variant="secondary"
            className="rounded-full bg-secondary/40 dark:bg-secondary hover:bg-secondary/50 py-1 px-4"
          >
            Trusted by{" "}
            <Heart className="fill-primary w-3 h-3 mx-1 bg-clip-text text-primary" />{" "}
            10,000+ freelancers
          </Badge>
          <div className="absolute z-[-1] transition-all duration-700 ease-out opacity-35 left-[50%] translate-x-[-50%] rounded-xl bg-gradient-to-t from-primary to-blue-500 blur-[8em] top-[-35rem] md:-top-[55rem] size-[20rem] md:size-[40rem]"></div>
          <div className="absolute z-[-1] transition-all duration-700 ease-out opacity-35 -left-[50%rem] rotate-[50deg] bg-gradient-to-t from-primary to-blue-500 blur-[4em] md:blur-[8em] rounded-full top-[13rem] h-[20rem] w-[10rem]  md:h-[40rem] md:w-[30rem]"></div>

          <div className="dark:text-neutral-200 z-20 flex flex-col text-center items-center font-bold text-neutral-900 text-5xl md:text-6xl">
            <div>
              Create Invoices in{" "}
              <span className="bg-gradient-to-tr from-primary via-blue-500 to-blue-200 bg-clip-text text-transparent font-extrabold">
                minutes
              </span>
            </div>
            <span>not in hours.</span>
          </div>
          <div className="my-4 font-medium z-20 text-center flex flex-col items-center justify-center">
            <div>
              A Simple Invoice Generator for Freelancers and Businesses and
              enterprises.
            </div>
            <div className="hidden md:block">
              Effortlessly{" "}
              <span className="font-semibold">create, manage,</span> and send
              <span className="font-semibold"> professional</span> invoices.
            </div>
          </div>
          <div className="flex items-center mt-4 gap-4">
            <Button
              className="font-bold w-32 h-10"
              Icon={ArrowRight}
              iconPlacement="right"
            >
              Get Started
            </Button>
            <Button
              variant={"linkHover2"}
              className="font-bold hover:-translate-y-1 transition-all duration-500 hover:rounded-xl"
            >
              Try for free
            </Button>
          </div>
        </div>
        <section className="my-20 flex -space-x-4 items-center relative justify-center">
          <InvoiceIillustration className="h-80 w-44 md:h-80 md:w-60 bg-gradient-to-tr rotate-[-10deg] from-blue-500/10 via-blue-500/40 to-blue-300/10" />
          <InvoiceIillustration className="h-80 w-60 md:h-80 md:w-60 absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%] bg-gradient-to-tr from-primary via-blue-500 to-blue-400" />
          <InvoiceIillustration className="h-80 w-44 md:h-80 md:w-60 bg-gradient-to-tr rotate-[10deg] from-blue-500/10 via-blue-500/40 to-blue-300/10" />
        </section>

        <section className="flex flex-col gap-4 items-center justify-center">
          <div className="font-bold">Multi-Currency Support</div>
          <div className="flex items-center gap-4">
            <Badge className="py-2 px-6 bg-blue-700/20 hover:bg-blue-700/20">
              <DollarSign className="w-4 h-4 text-primary" />
            </Badge>
            <Badge className="py-2 px-6 bg-blue-700/20 hover:bg-blue-700/20">
              <IndianRupee className="w-4 h-4 text-primary" />
            </Badge>
            <Badge className="py-2 px-6 bg-blue-700/20 hover:bg-blue-700/20">
              <Euro className="w-4 h-4 text-primary" />
            </Badge>
          </div>
        </section>
      </section>
    </>
  );
}
