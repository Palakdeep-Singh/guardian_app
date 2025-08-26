'use client';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface UserProfile {
  name: string;
  email: string;
}

export interface Vehicle {
  id: string;
  name: string;
  model: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

// User Profile
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

export const updateUserProfile = (userId: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', userId);
  return setDoc(userRef, data, { merge: true });
};

// Vehicles
export const getVehicles = async (userId: string): Promise<Vehicle[]> => {
  const vehiclesCol = collection(db, "users", userId, "vehicles");
  const snapshot = await getDocs(vehiclesCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vehicle));
};

export const addVehicle = async (userId: string, vehicleData: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
  const vehiclesCol = collection(db, "users", userId, "vehicles");
  const docRef = await addDoc(vehiclesCol, vehicleData);
  return { id: docRef.id, ...vehicleData };
};

export const updateVehicle = (userId: string, vehicleId: string, data: Partial<Vehicle>) => {
  const vehicleRef = doc(db, 'users', userId, 'vehicles', vehicleId);
  return updateDoc(vehicleRef, data);
};

export const deleteVehicle = (userId: string, vehicleId: string) => {
  const vehicleRef = doc(db, 'users', userId, 'vehicles', vehicleId);
  return deleteDoc(vehicleRef);
};


// Contacts
export const getContacts = async (userId: string): Promise<Contact[]> => {
  const contactsCol = collection(db, "users", userId, "contacts");
  const snapshot = await getDocs(contactsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
};

export const addContact = async (userId: string, contactData: Omit<Contact, 'id'>): Promise<Contact> => {
  const contactsCol = collection(db, "users", userId, "contacts");
  const docRef = await addDoc(contactsCol, contactData);
  return { id: docRef.id, ...contactData };
};

export const updateContact = (userId: string, contactId: string, data: Partial<Contact>) => {
  const contactRef = doc(db, 'users', userId, 'contacts', contactId);
  return updateDoc(contactRef, data);
};

export const deleteContact = (userId: string, contactId: string) => {
  const contactRef = doc(db, 'users', userId, 'contacts', contactId);
  return deleteDoc(contactRef);
};
