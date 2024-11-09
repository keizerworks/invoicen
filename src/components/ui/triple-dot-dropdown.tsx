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
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function FilePenIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

