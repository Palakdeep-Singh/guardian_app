
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Bell,
  ShieldAlert,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import UserSidebar from "./UserSidebar";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/camera", label: "Camera", icon: Video },
  { href: "/gps", label: "GPS", icon: Map },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/emergency", label: "Emergency", icon: ShieldAlert },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-card border-t z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive =
            (item.href === "/" && pathname === "/") ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 text-muted-foreground hover:text-primary transition-colors h-full",
                isActive && "text-primary text-glow"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
        <UserSidebar />
      </div>
    </nav>
  );
}
