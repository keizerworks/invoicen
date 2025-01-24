import { Separator } from "ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  //SidebarTrigger,
} from "ui/components/sidebar";

import { AppSidebar } from "~/components/dashboard/sidebar/app-sidebar";
import DashboardHeader from "~/components/dashboard/sidebar/header";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="floating" />
      <SidebarInset className="m-2 h-[calc(100svh_-_1rem)] min-h-[calc(100svh_-_1rem)] overflow-hidden rounded-lg border shadow-lg">
        <DashboardHeader />
        <Separator className="mx-auto w-[calc(100%_-_2rem)]" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
