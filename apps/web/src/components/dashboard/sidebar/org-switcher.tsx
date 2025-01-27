"use client";

import { ChevronsUpDown, Plus, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "ui/components/avatar";
import { Button } from "ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "ui/components/sidebar";

export function OrgSwitcher() {
  // Static organization data
  const activeOrg = {
    id: "org-1",
    name: "Example Org",
    slug: "example-org",
    logo: "/logo-dark.svg",
  };

  const otherOrgs = [
    {
      id: "org-2",
      name: "Another Org",
      slug: "another-org",
      logo: "/logo-dark.svg",
    },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-[8px]">
                <AvatarImage src={activeOrg.logo} alt={activeOrg.slug} />
                <AvatarFallback className="rounded-lg uppercase">
                  {activeOrg.name[0]}
                  {activeOrg.name[1]}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeOrg.name}</span>
                <span className="truncate text-xs">{activeOrg.slug}</span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-full min-w-72 max-w-80 flex-1 rounded-lg"
            align="start"
            side="right"
            sideOffset={4}
          >
            <DropdownMenuItem className="gap-2 p-2">
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={activeOrg.logo} alt={activeOrg.slug} />
                <AvatarFallback className="rounded-lg uppercase">
                  {activeOrg.name[0]}
                  {activeOrg.name[1]}
                </AvatarFallback>
              </Avatar>

              <div className="mr-auto grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeOrg.name}</span>
                <span className="truncate text-xs">{activeOrg.slug}</span>
              </div>

              <Button size="icon" variant="outline">
                <Settings className="size-4" />
              </Button>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="w-full text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>

            {otherOrgs.map((org) => (
              <DropdownMenuItem key={org.id} className="gap-2 p-2">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={org.logo} alt={org.slug} />
                  <AvatarFallback className="rounded-lg uppercase">
                    {org.name[0]}
                    {org.name[1]}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{org.name}</span>
                  <span className="truncate text-xs">{org.slug}</span>
                </div>
              </DropdownMenuItem>
            ))}

            {otherOrgs.length > 0 && <DropdownMenuSeparator />}

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add Org</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
