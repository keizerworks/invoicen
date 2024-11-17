import { cn } from "@/lib/utils";
import { DollarSign, LucideIcon } from "lucide-react";

export default function InvoiceIllustration({
  className,
  CurrencyIcon = DollarSign,
}: { className?: string, CurrencyIcon?: LucideIcon }) {
  return (
    <div
      className={cn(`rounded-xl p-4 transition-all duration-300`, className)}
    >
      <div className="gap-2 grid grid-cols-2 h-full">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center bg-background/30 rounded-xl h-full">
            {/* <FileText className="w-6 h-6 text-white/80" /> */}
          </div>
          <div className="flex justify-center items-center bg-background/30 rounded-xl h-full">
            {/* <CreditCard className="w-6 h-6 text-white/80" /> */}
          </div>
        </div>
        <div className="flex justify-center items-center bg-background/30 rounded-xl h-20">
          {/* <span className="font-bold text-2xl text-white/90">INV</span> */}
        </div>
        <div className="flex items-center col-span-2 bg-background/30 px-3 rounded-xl h-8">
          <div className="bg-accent/20 rounded-full w-2/3 h-2"></div>
        </div>
        <div className="flex items-center col-span-2 bg-background/30 px-3 rounded-xl h-8">
          <div className="bg-accent/20 rounded-full w-1/2 h-2"></div>
        </div>
        <div className="flex items-center col-span-2 bg-background/30 px-3 rounded-xl h-8">
          <div className="bg-accent/20 rounded-full w-3/4 h-2"></div>
        </div>
        <div className="flex flex-col justify-between col-span-2 bg-background/30 p-3 rounded-xl h-20">
          <div className="bg-accent/20 rounded-full w-full h-2"></div>
          <div className="flex justify-between items-center">
            <CurrencyIcon className="w-5 h-5 text-white/80" />
            <div className="bg-accent/20 rounded-full w-1/3 h-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
