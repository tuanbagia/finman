import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
  query,
  orderBy,
  type DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';

export interface Transaction {
  id: string;
  category: string;
  detail: string;
  amount: number;
  icon: string;
  date: string;
  createdAt: any;
}

export interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string | null;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  streakDays: number;
  totalXP: number;
  balance: number;
  title: string;
  achievementsUnlocked: number;
  totalAchievements: number;
  bestStreak: number;
  totalTransactions: number;
  totalSaved: number;
  currency: string;
}

interface FirestoreContextType {
  transactions: Transaction[];
  userProfile: UserProfile | null;
  profileLoading: boolean;
  transactionsLoading: boolean;
  addTransaction: (data: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const defaultProfile: UserProfile = {
  displayName: 'Hero',
  email: '',
  photoURL: null,
  level: 1,
  currentXP: 0,
  xpToNextLevel: 1000,
  streakDays: 0,
  totalXP: 0,
  balance: 0,
  title: 'Finance Rookie',
  achievementsUnlocked: 0,
  totalAchievements: 15,
  bestStreak: 0,
  totalTransactions: 0,
  totalSaved: 0,
  currency: 'IDR',
};

const FirestoreContext = createContext<FirestoreContextType | undefined>(undefined);

export function FirestoreProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  // Listen to user profile
  useEffect(() => {
    if (!user) {
      setUserProfile(null);
      setProfileLoading(false);
      return;
    }

    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setUserProfile(doc.data() as UserProfile);
      } else {
        setUserProfile(defaultProfile);
      }
      setProfileLoading(false);
    });

    return unsubscribe;
  }, [user]);

  // Listen to transactions
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setTransactionsLoading(false);
      return;
    }

    const transactionsRef = collection(db, 'users', user.uid, 'transactions');
    const q = query(transactionsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txns: Transaction[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Transaction, 'id'>),
      }));
      setTransactions(txns);
      setTransactionsLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addTransaction = async (data: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (!user) return;

    const transactionsRef = collection(db, 'users', user.uid, 'transactions');
    await addDoc(transactionsRef, {
      ...data,
      createdAt: serverTimestamp(),
    });

    // Update balance and transaction count
    const userRef = doc(db, 'users', user.uid);
    const newBalance = (userProfile?.balance || 0) + data.amount;
    const newTotalTransactions = (userProfile?.totalTransactions || 0) + 1;
    const xpGain = 10;
    const newXP = (userProfile?.currentXP || 0) + xpGain;
    const newTotalXP = (userProfile?.totalXP || 0) + xpGain;

    const updates: Partial<UserProfile & { currentXP: number; totalXP: number; level: number }> = {
      balance: newBalance,
      totalSaved: newBalance > 0 ? newBalance : 0, // Ensure totalSaved mimics peak balance
      totalTransactions: newTotalTransactions,
      currentXP: newXP,
      totalXP: newTotalXP,
    };

    // Level up check
    if (newXP >= (userProfile?.xpToNextLevel || 1000)) {
      updates.level = (userProfile?.level || 1) + 1;
      updates.currentXP = newXP - (userProfile?.xpToNextLevel || 1000);
      updates.xpToNextLevel = Math.floor((userProfile?.xpToNextLevel || 1000) * 1.2);
    }

    await setDoc(userRef, updates, { merge: true });
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return;
    const txnRef = doc(db, 'users', user.uid, 'transactions', id);
    await deleteDoc(txnRef);
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, data, { merge: true });
  };

  return (
    <FirestoreContext.Provider
      value={{
        transactions,
        userProfile,
        profileLoading,
        transactionsLoading,
        addTransaction,
        deleteTransaction,
        updateProfile: updateProfileData,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
}

export function useFirestore() {
  const context = useContext(FirestoreContext);
  if (context === undefined) {
    throw new Error('useFirestore must be used within a FirestoreProvider');
  }
  return context;
}
