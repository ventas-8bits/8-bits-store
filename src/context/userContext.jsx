import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firabese.config.js';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const { email, photoURL, displayName, uid, emailVerified, providerData } = user;
        setUser({
          email,
          photoURL,
          displayName,
          uid,
          emailVerified,
          providerData,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  // useEffect(() => {}, [user]);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        email: res.user.email,
        photoURL: res.user.photoURL,
        displayName: res.user.displayName,
        uid: res.user.uid,
      });
    } catch (error) {
      throw error.code;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const data = { user, loginUser, logoutUser, loading };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserProvider;
