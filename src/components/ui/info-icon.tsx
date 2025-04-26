"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface InfoIconProps {
  content: string;
  className?: string;
  iconClassName?: string;
}

export function InfoIcon({ content, className, iconClassName }: InfoIconProps) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <InfoCircledIcon
            className={cn(
              "h-4 w-4 text-muted-foreground cursor-help transition-colors hover:text-foreground",
              iconClassName,
            )}
            onClick={() => setOpen(!open)}
          />
        </TooltipTrigger>
        <TooltipContent className={className}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
