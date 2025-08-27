
'use client';

import { useState, useEffect, useCallback, memo } from 'react';
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
  Palette,
  Check,
  Edit,
  Save,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
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
  Contact,
} from '@/services/firestore';
import { cn } from '@/lib/utils';

const themes = [
  { name: 'Guardian', id: 'theme-dark' },
  { name: 'Daylight', id: 'theme-light' },
  { name: 'Oceanic', id: 'theme-oceanic' },
  { name: 'Forest', id: 'theme-forest' },
];

const SettingsCard = ({ icon: Icon, title, description, children, onAdd, addText }: { icon: React.ElementType, title: string, description: string, children: React.ReactNode, onAdd?: () => void, addText?: string }) => (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Icon className="h-6 w-6" />
                <CardTitle>{title}</CardTitle>
            </div>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {children}
            {onAdd && addText && (
                 <Button variant="outline" className="w-full gap-2" onClick={onAdd}>
                    <PlusCircle />
                    {addText}
                </Button>
            )}
        </CardContent>
    </Card>
);

const VehicleCard = memo(({ vehicle, onSave, onDelete }: { vehicle: Vehicle; onSave: (v: Vehicle) => Promise<void>; onDelete: (id: string) => Promise<void>; }) => {
  const [isEditing, setIsEditing] = useState(vehicle.id.startsWith('temp-'));
  const [name, setName] = useState(vehicle.name);
  const [model, setModel] = useState(vehicle.model);
  const [numberPlate, setNumberPlate] = useState(vehicle.numberPlate);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ ...vehicle, name, model, numberPlate });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
      setIsDeleting(true);
      try {
        await onDelete(vehicle.id);
      } finally {
        setIsDeleting(false);
      }
  }
  
  return (
      <div className="p-4 border rounded-lg space-y-4">
          <div className="space-y-2">
              <Label htmlFor={`vehicle-name-${vehicle.id}`}>Vehicle Name</Label>
              <Input id={`vehicle-name-${vehicle.id}`} value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing || isSaving} />
          </div>
          <div className="space-y-2">
              <Label htmlFor={`vehicle-model-${vehicle.id}`}>Model</Label>
              <Input id={`vehicle-model-${vehicle.id}`} value={model} onChange={(e) => setModel(e.target.value)} disabled={!isEditing || isSaving} />
          </div>
          <div className="space-y-2">
              <Label htmlFor={`vehicle-plate-${vehicle.id}`}>Number Plate</Label>
              <Input id={`vehicle-plate-${vehicle.id}`} value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} disabled={!isEditing || isSaving} />
          </div>
          <div className="flex justify-between">
            {isEditing ? (
                 <Button size="sm" className="gap-2" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
                    {isSaving ? 'Saving...' : 'Save'}
                 </Button>
            ) : (
                <Button variant="secondary" size="sm" className="gap-2" onClick={() => setIsEditing(true)}><Edit /> Edit</Button>
            )}
            <Button variant="destructive" size="sm" className="gap-2" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
                {isDeleting ? 'Removing...' : 'Remove'}
            </Button>
          </div>
      </div>
  );
});
VehicleCard.displayName = 'VehicleCard';

const ContactCard = memo(({ contact, onSave, onDelete }: { contact: Contact; onSave: (c: Contact) => Promise<void>; onDelete: (id: string) => Promise<void>; }) => {
  const [isEditing, setIsEditing] = useState(contact.id.startsWith('temp-'));
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({ ...contact, name, phone });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
      setIsDeleting(true);
      try {
        await onDelete(contact.id);
      } finally {
        setIsDeleting(false);
      }
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`contact-name-${contact.id}`}>Contact Name</Label>
        <Input id={`contact-name-${contact.id}`} value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing || isSaving} />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`contact-phone-${contact.id}`}>Phone Number</Label>
        <Input id={`contact-phone-${contact.id}`} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing || isSaving} />
      </div>
      <div className="flex justify-between">
        {isEditing ? (
            <Button size="sm" className="gap-2" onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
                {isSaving ? 'Saving...' : 'Save'}
            </Button>
        ) : (
            <Button variant="secondary" size="sm" className="gap-2" onClick={() => setIsEditing(true)}><Edit /> Edit</Button>
        )}
        <Button variant="destructive" size="sm" className="gap-2" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
            {isDeleting ? 'Removing...' : 'Remove'}
        </Button>
      </div>
    </div>
  );
});
ContactCard.displayName = 'ContactCard';


export default function SettingsPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const [profile, setProfile] = useState<Partial<UserProfile>>({ name: '' });
  const [isProfileSaved, setIsProfileSaved] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
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
    setIsSavingProfile(true);
    const originalProfile = { ...profile };
    try {
      await updateUserProfile(user.uid, profile);
      setIsProfileSaved(true);
      toast({ title: 'Profile Updated', description: 'Your profile has been saved.' });
    } catch (error) {
      setProfile(originalProfile);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update profile.' });
    } finally {
        setIsSavingProfile(false);
    }
  };
  
  const handleProfileChange = (field: keyof UserProfile, value: string) => {
      setProfile(p => ({...p, [field]: value }));
      setIsProfileSaved(false);
  }

  const handleAddVehicle = () => {
    setVehicles(prev => [...prev, { id: `temp-${Date.now()}`, name: '', model: '', numberPlate: '' }]);
  };

  const handleVehicleSave = useCallback(async (vehicle: Vehicle) => {
    if(!user) return;
    
    if (vehicle.id.startsWith('temp-')) {
        const originalVehicles = [...vehicles];
        const tempId = vehicle.id;
        try {
            const { id: _, ...newVehicleData } = vehicle;
            setVehicles(prev => prev.map(v => v.id === tempId ? {...vehicle, id: 'saving...' } : v));
            const addedVehicle = await addVehicle(user.uid, newVehicleData);
            setVehicles(prev => prev.map(v => v.id === 'saving...' ? addedVehicle : v));
            toast({ title: 'Vehicle Added' });
        } catch (error) {
            setVehicles(originalVehicles);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not add vehicle.' });
            throw error;
        }
    } else {
        const originalVehicles = [...vehicles];
        setVehicles(prev => prev.map(v => v.id === vehicle.id ? vehicle : v));
        try {
          await updateVehicle(user.uid, vehicle.id, vehicle);
          toast({ title: 'Vehicle Updated' });
        } catch (error) {
          setVehicles(originalVehicles);
          toast({ variant: 'destructive', title: 'Error', description: 'Could not update vehicle.' });
          throw error;
        }
    }
  }, [user, vehicles, toast]);

  const handleVehicleDelete = useCallback(async (id: string) => {
    if (!user) return;

    if (id.startsWith('temp-')) {
        setVehicles(prev => prev.filter(v => v.id !== id));
        return;
    }

    const originalVehicles = [...vehicles];
    setVehicles(prev => prev.filter(v => v.id !== id));
    try {
      await deleteVehicle(user.uid, id);
      toast({ title: 'Vehicle Removed' });
    } catch (error) {
      setVehicles(originalVehicles);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not remove vehicle.' });
    }
  }, [user, vehicles, toast]);

  const handleAddContact = () => {
    setContacts(prev => [...prev, { id: `temp-${Date.now()}`, name: '', phone: '' }]);
  };
  
  const handleContactSave = useCallback(async (contact: Contact) => {
    if(!user) return;

    if (contact.id.startsWith('temp-')) {
        const originalContacts = [...contacts];
        const tempId = contact.id;
        try {
            const { id: _, ...newContactData } = contact;
            setContacts(prev => prev.map(c => c.id === tempId ? { ...contact, id: 'saving...' } : c));
            const addedContact = await addContact(user.uid, newContactData);
            setContacts(prev => prev.map(c => c.id === 'saving...' ? addedContact : c));
            toast({ title: 'Contact Added' });
        } catch (error) {
            setContacts(originalContacts);
            toast({ variant: 'destructive', title: 'Error', description: 'Could not add contact.' });
            throw error;
        }
    } else {
        const originalContacts = [...contacts];
        setContacts(prev => prev.map(c => c.id === contact.id ? contact : c));
        try {
          await updateContact(user.uid, contact.id, contact);
          toast({ title: 'Contact Updated' });
        } catch (error) {
          setContacts(originalContacts);
          toast({ variant: 'destructive', title: 'Error', description: 'Could not update contact.' });
          throw error;
        }
    }
  }, [user, contacts, toast]);

  const handleContactDelete = useCallback(async (id: string) => {
    if (!user) return;
    
    if (id.startsWith('temp-')) {
        setContacts(prev => prev.filter(c => c.id !== id));
        return;
    }

    const originalContacts = [...contacts];
    setContacts(prev => prev.filter(c => c.id !== id));
    try {
      await deleteContact(user.uid, id);
      toast({ title: 'Contact Removed' });
    } catch (error) {
      setContacts(originalContacts);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not remove contact.' });
    }
  }, [user, contacts, toast]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
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

       <SettingsCard icon={Palette} title="Appearance" description="Customize the look and feel of your interface.">
          <div className="grid grid-cols-2 gap-4">
            {themes.map((t) => (
              <div key={t.id}>
                <button
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    'w-full border-2 rounded-lg p-2 flex items-center justify-center',
                    theme === t.id ? 'border-primary' : 'border-transparent'
                  )}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-medium">{t.name}</span>
                       {theme === t.id && <Check className="h-5 w-5 text-primary" />}
                    </div>
                    <div className={cn('h-16 w-full rounded-md flex items-center justify-center p-2', t.id)}>
                      <div className="w-full h-full rounded-md bg-card/80 p-2 flex flex-col gap-1">
                          <div className="h-2 w-4/5 rounded-full bg-primary" />
                          <div className="h-2 w-full rounded-full bg-secondary" />
                          <div className="h-2 w-3/5 rounded-full bg-accent" />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
      </SettingsCard>


      <SettingsCard icon={User} title="My Profile" description="Update your personal information.">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="e.g., Tony Stark" 
              value={profile.name || ''}
              onChange={(e) => handleProfileChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email ?? ''} disabled />
          </div>
          <Button onClick={handleProfileSave} disabled={isProfileSaved || isSavingProfile}>
            {isSavingProfile ? <Loader2 className="animate-spin"/> : (isProfileSaved ? <Check /> : <Save />)}
            {isSavingProfile ? 'Saving...' : (isProfileSaved ? 'Saved' : 'Save Profile')}
          </Button>
          </div>
      </SettingsCard>
      
      <SettingsCard icon={Car} title="My Vehicles" description="Manage your registered vehicle information." onAdd={handleAddVehicle} addText="Add Vehicle">
         {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onSave={handleVehicleSave} onDelete={handleVehicleDelete} />
          ))}
      </SettingsCard>

      <SettingsCard icon={Users} title="Emergency Contacts" description="These contacts will be notified in an emergency." onAdd={handleAddContact} addText="Add Contact">
            {contacts.map(contact => (
              <ContactCard key={contact.id} contact={contact} onSave={handleContactSave} onDelete={handleContactDelete} />
            ))}
      </SettingsCard>

      <Button variant="outline" onClick={handleLogout} className="w-full">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
