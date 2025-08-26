
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Car,
  Users,
  PlusCircle,
  Trash2,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { 
  getUserProfile, 
  updateUserProfile,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicles,
  addContact,
  updateContact,
  deleteContact,
  getContacts,
  UserProfile,
  Vehicle,
  Contact
} from '@/services/firestore';

export default function SettingsPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Partial<UserProfile>>({ name: '' });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setProfile(userProfile);
        }

        const userVehicles = await getVehicles(user.uid);
        setVehicles(userVehicles);

        const userContacts = await getContacts(user.uid);
        setContacts(userContacts);
      };
      fetchData();
    }
  }, [user]);

  const handleProfileSave = async () => {
    if (!user) return;
    try {
      await updateUserProfile(user.uid, profile);
      toast({ title: 'Profile Updated', description: 'Your profile has been saved.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update profile.' });
    }
  };

  const handleAddVehicle = async () => {
    if (!user) return;
    const newVehicle: Omit<Vehicle, 'id'> = { name: 'New Vehicle', model: '' };
    try {
      const addedVehicle = await addVehicle(user.uid, newVehicle);
      setVehicles([...vehicles, addedVehicle]);
      toast({ title: 'Vehicle Added' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not add vehicle.' });
    }
  };

  const handleVehicleChange = (id: string, field: keyof Vehicle, value: string) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, [field]: value } : v));
  };
  
  const handleVehicleSave = async (vehicle: Vehicle) => {
    if(!user) return;
    try {
      await updateVehicle(user.uid, vehicle.id, vehicle);
      toast({ title: 'Vehicle Updated' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update vehicle.' });
    }
  };

  const handleVehicleDelete = async (id: string) => {
    if (!user) return;
    try {
      await deleteVehicle(user.uid, id);
      setVehicles(vehicles.filter(v => v.id !== id));
      toast({ title: 'Vehicle Removed' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not remove vehicle.' });
    }
  };

  const handleAddContact = async () => {
    if (!user) return;
    const newContact: Omit<Contact, 'id'> = { name: 'New Contact', phone: '' };
     try {
      const addedContact = await addContact(user.uid, newContact);
      setContacts([...contacts, addedContact]);
      toast({ title: 'Contact Added' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not add contact.' });
    }
  };
  
  const handleContactChange = (id: string, field: keyof Contact, value: string) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleContactSave = async (contact: Contact) => {
    if(!user) return;
    try {
      await updateContact(user.uid, contact.id, contact);
      toast({ title: 'Contact Updated' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update contact.' });
    }
  };

  const handleContactDelete = async (id: string) => {
    if (!user) return;
    try {
      await deleteContact(user.uid, id);
      setContacts(contacts.filter(c => c.id !== id));
      toast({ title: 'Contact Removed' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not remove contact.' });
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    // This case is handled by useAuth, but as a fallback
    return null;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-left">
        <h2 className="text-2xl font-bold font-headline">Settings</h2>
        <p className="text-muted-foreground">
          Manage your profile, vehicles, and contacts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <User className="h-6 w-6" />
            <CardTitle>My Profile</CardTitle>
          </div>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="e.g., Tony Stark" 
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email ?? ''} disabled />
          </div>
          <Button onClick={handleProfileSave}>Save Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Car className="h-6 w-6" />
            <CardTitle>My Vehicles</CardTitle>
          </div>
          <CardDescription>
            Manage your registered vehicle information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="p-4 border rounded-lg space-y-4">
               <div className="space-y-2">
                  <Label htmlFor={`vehicle-name-${vehicle.id}`}>Vehicle Name</Label>
                  <Input 
                    id={`vehicle-name-${vehicle.id}`} 
                    placeholder="e.g., Mark II Bike" 
                    value={vehicle.name}
                    onChange={(e) => handleVehicleChange(vehicle.id, 'name', e.target.value)}
                    onBlur={() => handleVehicleSave(vehicle)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`vehicle-model-${vehicle.id}`}>Model</Label>
                  <Input 
                    id={`vehicle-model-${vehicle.id}`} 
                    placeholder="e.g., Stark Industries EV" 
                    value={vehicle.model}
                    onChange={(e) => handleVehicleChange(vehicle.id, 'model', e.target.value)}
                    onBlur={() => handleVehicleSave(vehicle)}
                  />
                </div>
                <Button variant="destructive" size="sm" className="gap-2" onClick={() => handleVehicleDelete(vehicle.id)}>
                  <Trash2 /> Remove
                </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full gap-2" onClick={handleAddVehicle}>
            <PlusCircle />
            Add Vehicle
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
           <div className="flex items-center gap-4">
            <Users className="h-6 w-6" />
            <CardTitle>Emergency Contacts</CardTitle>
          </div>
          <CardDescription>
            These contacts will be notified in an emergency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {contacts.map(contact => (
              <div key={contact.id} className="p-4 border rounded-lg space-y-4">
                   <div className="space-y-2">
                      <Label htmlFor={`contact-name-${contact.id}`}>Contact Name</Label>
                      <Input 
                        id={`contact-name-${contact.id}`} 
                        placeholder="e.g., Pepper Potts" 
                        value={contact.name}
                        onChange={(e) => handleContactChange(contact.id, 'name', e.target.value)}
                        onBlur={() => handleContactSave(contact)}
                        />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`contact-phone-${contact.id}`}>Phone Number</Label>
                      <Input 
                        id={`contact-phone-${contact.id}`} 
                        type="tel" 
                        placeholder="+1 (555) 123-4567" 
                        value={contact.phone}
                        onChange={(e) => handleContactChange(contact.id, 'phone', e.target.value)}
                        onBlur={() => handleContactSave(contact)}
                      />
                    </div>
                     <Button variant="destructive" size="sm" className="gap-2" onClick={() => handleContactDelete(contact.id)}>
                      <Trash2 /> Remove
                    </Button>
              </div>
            ))}
          <Button variant="outline" className="w-full gap-2" onClick={handleAddContact}>
            <PlusCircle />
            Add Contact
          </Button>
        </CardContent>
      </Card>

      <Button variant="outline" onClick={handleLogout} className="w-full">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
