import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Searchdata from "@/pages/Search";

const Navbar = () => {
  return (
    <div className="p-4 border-b mx-2 bg-slate-200 text-slate-800 font-bold flex justify-between items-center md:mx-3 rounded-lg md:p-6 mt-2 font-roboto sticky top-1 ">
      
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <div className="flex items-center md:gap-15">
                  <div>App name</div>
                 
                  </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

  
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex justify-between gap-10">
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/record">Report</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

  
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-slate-600 text-slate-800 w-64">
            <nav className="flex flex-col gap-6 mt-8 text-lg ml-5">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-col gap-6">
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/">Home</NavigationMenuLink>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/report">Report</NavigationMenuLink>
                  </NavigationMenuItem>
                  
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
