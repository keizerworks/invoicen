import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

export default function InvoiceIllustration({
  className,
}: { className?: string }) {
  return (
    <div
      className={cn(`rounded-xl p-4 transition-all duration-300`, className)}
    >
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="flex flex-col gap-2">
          <div className="h-full bg-background/30 rounded-xl flex items-center justify-center">
            {/* <FileText className="w-6 h-6 text-white/80" /> */}
          </div>
          <div className="h-full bg-background/30 rounded-xl flex items-center justify-center">
            {/* <CreditCard className="w-6 h-6 text-white/80" /> */}
          </div>
        </div>
        <div className="h-20 bg-background/30 rounded-xl flex items-center justify-center">
          {/* <span className="text-2xl font-bold text-white/90">INV</span> */}
        </div>
        <div className="h-8 col-span-2 bg-background/30 rounded-xl flex items-center px-3">
          <div className="w-2/3 h-2 bg-accent/20 rounded-full"></div>
        </div>
        <div className="h-8 col-span-2 bg-background/30 rounded-xl flex items-center px-3">
          <div className="w-1/2 h-2 bg-accent/20 rounded-full"></div>
        </div>
        <div className="h-8 col-span-2 bg-background/30 rounded-xl flex items-center px-3">
          <div className="w-3/4 h-2 bg-accent/20 rounded-full"></div>
        </div>
        <div className="h-20 col-span-2 bg-background/30 rounded-xl p-3 flex flex-col justify-between">
          <div className="w-full h-2 bg-accent/20 rounded-full"></div>
          <div className="flex items-center justify-between">
            <DollarSign className="w-5 h-5 text-white/80" />
            <div className="w-1/3 h-4 bg-accent/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
