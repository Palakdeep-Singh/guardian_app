
'use client';

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import {
  getUserProfile,
  getVehicles,
  getContacts,
  UserProfile,
  Vehicle,
  Contact,
} from '@/services/firestore';
import { User, Car, Phone, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      const fetchData = async () => {
        const userProfile = await getUserProfile(user.uid);
        setProfile(userProfile);

        const userVehicles = await getVehicles(user.uid);
        setVehicles(userVehicles);

        const userContacts = await getContacts(user.uid);
        setContacts(userContacts);
      };
      fetchData();
    }
  }, [isOpen, user]);
  
  const goToSettings = () => {
    router.push('/settings');
    setIsOpen(false);
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex h-full flex-1 flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary", isOpen && "text-primary text-glow")}>
            <User className="h-6 w-6" />
            <span className="text-xs font-medium">Profile</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {vehicles.length > 0 && (
          <>
            <DropdownMenuLabel className="flex items-center gap-2 text-muted-foreground"><Car className="h-4 w-4" /> Vehicle</DropdownMenuLabel>
            {vehicles.map(v => (
                <DropdownMenuItem key={v.id} className="flex flex-col items-start gap-1 cursor-default hover:bg-transparent focus:bg-transparent">
                     <p className="font-semibold">{v.name} ({v.model})</p>
                     <p className="text-xs text-muted-foreground">{v.numberPlate}</p>
                </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}
         {contacts.length > 0 && (
          <>
            <DropdownMenuLabel className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> Contacts</DropdownMenuLabel>
            {contacts.map(c => (
                <DropdownMenuItem key={c.id} className="flex flex-col items-start gap-1 cursor-default hover:bg-transparent focus:bg-transparent">
                     <p className="font-semibold">{c.name}</p>
                     <p className="text-xs text-muted-foreground">{c.phone}</p>
                </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={goToSettings}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
