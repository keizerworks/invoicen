"use client"
import {createContext, useState} from 'react'



export const CurrencyContext = createContext<any>(null);
export default function Client({children,}: Readonly<{
    children: React.ReactNode;
  }>){
    const [activeCurrency, setActiveCurrency] = useState("USD")
        return (
        
                    <CurrencyContext.Provider value={[activeCurrency, setActiveCurrency]}>
                        {children}
                    </CurrencyContext.Provider>

    )

}