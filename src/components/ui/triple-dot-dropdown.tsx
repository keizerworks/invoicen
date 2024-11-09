import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SVGProps } from "react";

interface TripledotDropdownProps {
  deleteInvoice: () => void;
}

export function TripledotDropdown({ deleteInvoice }: TripledotDropdownProps) {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
  <Button variant="ghost" size="icon" className="rounded-full">
    <div className="flex flex-col items-center gap-0.5"> {/* Reduced gap for compact spacing */}
      <div className="h-[4px] w-[3px] rounded-full bg-muted-foreground" /> {/* Smaller dot */}
      <div className="h-[4px] w-[3px]  rounded-full bg-muted-foreground" />
      <div className="h-[4px] w-[3px]  rounded-full bg-muted-foreground" />
    </div>
  </Button>
</DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8}>
       
        <DropdownMenuItem onClick={deleteInvoice}>
          <DeleteIcon className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DeleteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6.5" y="3" width="11" height="16" stroke="currentColor" fill="none" />
    <path d="M3 6h18" stroke="currentColor" />
    <path d="M5 6l1-4h12l1 4" stroke="currentColor" />
    <path d="M9 10h6" stroke="currentColor" />
    <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" />
  </svg>
  
  );
}




