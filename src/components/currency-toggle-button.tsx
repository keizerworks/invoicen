import { DollarSign, Euro, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { Currency, CurrencyContext } from "../providers/CurrencyProvider";

export function CurrencyToggleButton() {
  const { activeCurrency, setActiveCurrency } = useContext(CurrencyContext);

  function getCurrencyLogo() {
    switch (activeCurrency) {
      case Currency.USD:
        return <DollarSign className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />;
      case Currency.Euro:
        return <Euro className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />;
      case Currency.INR:
        return <IndianRupee className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />;
      default:
        <DollarSign className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />;
        break;
    }
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} className="mx-2">
            {getCurrencyLogo()}
            <span className="sr-only">Currency</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setActiveCurrency(Currency.USD)}>
            US Dollar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveCurrency(Currency.Euro)}>Euro</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveCurrency(Currency.INR)}>
            Indian Rupee
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
