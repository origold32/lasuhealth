"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@lasuhealth/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@lasuhealth/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@lasuhealth/components/ui/tooltip";
import { navElements } from "./data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@lasuhealth/lib/utils";
import { useState } from "react";
import { PiCaretDown } from "react-icons/pi";
import { IconContext } from "react-icons/lib";

export function NavigationElements() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  // We need separate states for each collapsible item
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const isChildActive = (children: { href: string }[]) => {
    return children.some((child) => child.href === pathname);
  };

  const isActive = (item: { href?: string; children?: { href: string }[] }) => {
    if (item.children) {
      return isChildActive(item.children);
    }
    return item.href === pathname;
  };

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <IconContext.Provider value={{ size: "20", style: { height: 20 } }}>
      <SidebarGroup className={cn(isCollapsed ? "p-2" : "p-0")}>
        <SidebarMenu>
          {navElements.map((item) => {
            const isItemOpen = openItems[item.title] || false;

            return (
              <SidebarMenuItem key={item.title}>
                {item.children ? (
                  <Collapsible
                    open={isItemOpen}
                    onOpenChange={(open) =>
                      setOpenItems((prev) => ({ ...prev, [item.title]: open }))
                    }
                  >
                    <CollapsibleTrigger asChild>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            onClick={() => toggleItem(item.title)}
                            className={cn(
                              "h-full gap-4 text-black p-4 rounded-none font-medium hover:text-[#1ab3ffb7]",
                              isCollapsed &&
                                "hover:rounded-full hover:bg-white hover:ring-1 hover:ring-[#1AB2FF] flex items-center justify-center",
                              isCollapsed &&
                                isActive(item) &&
                                "bg-[#F4FBFF] text-[#1AB2FF] rounded-full",
                              !isCollapsed &&
                                isActive(item) &&
                                " flex items-center bg-[#F4FBFF] text-[#1AB2FF] border-r-4 border-[#1AB2FF] font-bold"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {item.icon && <item.icon />}
                              {!isCollapsed && item.title}
                            </span>
                            {!isCollapsed && (
                              <PiCaretDown
                                className={cn(
                                  "transition-transform duration-200",
                                  isItemOpen && "rotate-180"
                                )}
                              />
                            )}
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent>{item.title}</TooltipContent>
                        )}
                      </Tooltip>
                    </CollapsibleTrigger>
                    {isCollapsed && isItemOpen ? (
                      <div className="mt-2 flex flex-col items-center gap-1">
                        {item.children.map((child) => (
                          <Tooltip key={child.title}>
                            <TooltipTrigger>
                              <Link href={child.href}>
                                <div
                                  className={cn(
                                    "w-6 h-6 flex items-center justify-center bg-[#E4E7EC]/50 text-black rounded-full text-xs font-medium hover:text-[#1ab3ffb7]",
                                    child.href === pathname &&
                                      "bg-white text-black ring-1 ring-black"
                                  )}
                                >
                                  {child.title.charAt(0)}
                                </div>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>{child.title}</TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    ) : (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <Link
                                href={subItem.href}
                                className="w-full"
                                passHref
                              >
                                <SidebarMenuSubButton
                                  component="div"
                                  className={cn(
                                    "w-full px-5 rounded-none text-black font-medium cursor-pointer hover:text-[#1ab3ffb7]",
                                    subItem.href === pathname &&
                                      "bg-[#E4E7EC] py-4"
                                  )}
                                >
                                  {isCollapsed
                                    ? subItem.title[0]
                                    : subItem.title}
                                </SidebarMenuSubButton>
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                ) : (
                  <Link href={item.href} className="w-full">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            "h-full gap-4 text-black p-4 rounded-none font-medium cursor-pointer hover:text-[#1ab3ffb7]",
                            isCollapsed &&
                              "hover:rounded-full hover:bg-white hover:ring-1 hover:ring-[#1AB2FF] flex items-center justify-center",
                            isCollapsed &&
                              isActive(item) &&
                              "bg-[#F4FBFF] text-[#1AB2FF] rounded-full",
                            !isCollapsed &&
                              isActive(item) &&
                              " flex items-center bg-[#F4FBFF] text-[#1AB2FF] border-r-4 border-[#1AB2FF] font-bold"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {item.icon && <item.icon />}
                            {!isCollapsed && item.title}
                          </span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent>{item.title}</TooltipContent>
                      )}
                    </Tooltip>
                  </Link>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </IconContext.Provider>
  );
}
