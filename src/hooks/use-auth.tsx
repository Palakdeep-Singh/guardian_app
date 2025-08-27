
'use client';

import { 
  useState, 
  useEffect, 
  createContext, 
  useContext, 
  ReactNode,
  useCallback
} from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { updateUserProfile } from '@/services/firestore';

const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicRoutes = ['/login', '/signup'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = publicRoutes.includes(pathname);

    if (!user && !isAuthPage) {
      router.push('/login');
    }
    if (user && isAuthPage) {
      router.push('/');
    }
  }, [user, loading, router, pathname]);

  const login = useCallback((email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  }, []);

  const signup = useCallback(async (email: string, pass:string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    if (user) {
      await updateUserProfile(user.uid, { email: user.email || '', name: user.email?.split('@')[0] || '' });
    }
    return userCredential;
  }, []);

  const logout = useCallback(() => {
    return signOut(auth);
  }, []);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
