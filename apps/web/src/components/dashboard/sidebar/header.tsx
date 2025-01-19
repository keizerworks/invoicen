import { SidebarTrigger } from "ui/components/sidebar";

export default function DashboardHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
    </header>
  );
}
