
'use client';

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import {
  getUserProfile,
  getVehicles,
  getContacts,
  UserProfile,
  Vehicle,
  Contact,
} from '@/services/firestore';
import { User, Car, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function UserSidebar() {
  const { user } = useAuth();
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

  if (!user) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex-1 h-full flex flex-col items-center justify-center gap-1 text-muted-foreground">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.photoURL ?? ''} />
          <AvatarFallback>
            {profile?.name
              ? profile.name.charAt(0)
              : user.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
         <span className="text-xs font-medium">Profile</span>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>My Profile</SheetTitle>
          <SheetDescription>
            A quick overview of your information.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div className="flex items-center gap-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
                <p className="font-semibold">{profile?.name || 'User'}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          
          {vehicles.length > 0 && (
            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><Car className="h-5 w-5 text-muted-foreground"/> Vehicle</h3>
                {vehicles.map(v => (
                     <div key={v.id} className="text-sm pl-7">
                        <p><strong>{v.name}</strong> ({v.model})</p>
                        <p className="text-muted-foreground">{v.numberPlate}</p>
                    </div>
                ))}
            </div>
          )}

          {contacts.length > 0 && (
            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><Phone className="h-5 w-5 text-muted-foreground" /> Emergency Contacts</h3>
                {contacts.map(c => (
                     <div key={c.id} className="text-sm pl-7">
                        <p><strong>{c.name}</strong></p>
                        <p className="text-muted-foreground">{c.phone}</p>
                    </div>
                ))}
            </div>
          )}
        </div>
        <Button variant="outline" className="w-full" onClick={goToSettings}>Edit Settings</Button>
      </SheetContent>
    </Sheet>
  );
}

