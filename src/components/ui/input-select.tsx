import * as React from "react";

import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
    activeCurrency: string;
    setActiveCurrency: (activeCurrency: string) => void;
  }

const InputSelect = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, setActiveCurrency, activeCurrency, ...props }, ref) => {
    const onChangeHandler = (value:string)=>{
      setActiveCurrency(value)
    }    
    return (
      <select
        className={cn(
          "flex h-10 w-full !text-left rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        onChange={(e)=>onChangeHandler(e.target.value)}
        {...props}
        >
          <option value="USD">US Dollars</option>
          <option value="EUR">Euro</option>
          <option value="GBP">British Pound</option>
          <option value="INR">Indian Rupee</option>
          <option value="IRR">Iranian Rials</option>
          <option value="AUD">Australian Dollar</option>
          <option value="AZN">Azerbaijanian Manat</option>
          <option value="BHD">Bahraini Dinar</option>
          <option value="CNY">Yuan Renminbi</option>
          <option value="AED">UAE Dirham</option>
          <option value="RUB">Russian Ruble</option>
          <option value="OMR">Rial Omani</option>
        </select>
    );
  },
);
InputSelect.displayName = "InputSelect";

export { InputSelect };
