"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { FC, ReactNode } from "react";

interface TanstackProviderProps {
  children: ReactNode;
}

const TanstackProvider: FC<TanstackProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
