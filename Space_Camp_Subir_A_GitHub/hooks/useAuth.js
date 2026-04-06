'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUserData(null);
      }
      setUserDataLoading(false);
    }
    
    if (!loading) {
      fetchUserData();
    }
  }, [user, loading]);

  return { 
    user, 
    userData, 
    loading: loading || (user ? userDataLoading : false), 
    error 
  };
}
