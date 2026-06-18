'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);

  useEffect(() => {
    // No user → clear data immediately
    if (!loading && !user) {
      setUserData(null);
      setUserDataLoading(false);
      return;
    }

    if (loading || !user) return;

    // Use onSnapshot so any setDoc (hangar, profile, etc.) is reflected immediately
    // without requiring a page reload.
    const docRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
        setUserDataLoading(false);
      },
      (err) => {
        console.error('useAuth onSnapshot error:', err);
        setUserDataLoading(false);
      }
    );

    // Cleanup listener when user changes or component unmounts
    return () => unsubscribe();
  }, [user, loading]);

  return {
    user,
    userData,
    loading: loading || (user ? userDataLoading : false),
    error,
  };
}
