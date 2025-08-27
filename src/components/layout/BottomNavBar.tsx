
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Map,
  Bell,
  ShieldAlert,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import UserMenu from './UserMenu';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/camera', label: 'Camera', icon: Video },
  { href: '/gps', label: 'GPS', icon: Map },
  { href: '/alerts', label: 'Alerts', icon: Bell },
  { href: '/emergency', label: 'Emergency', icon: ShieldAlert },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-10 border-t bg-card">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            (item.href === '/' && pathname === '/') ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-full flex-1 flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary',
                isActive && 'text-primary text-glow'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
        <UserMenu />
      </div>
    </nav>
  );
}
