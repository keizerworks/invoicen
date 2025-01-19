"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "ui/components/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { OrgSwitcher } from "./org-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrgSwitcher />
      </SidebarHeader>

      <SidebarSeparator />
      <SidebarContent>
        <NavMain />
      </SidebarContent>

      <SidebarSeparator />
      <SidebarFooter>
        {" "}
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
