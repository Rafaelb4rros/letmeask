import firebase from "firebase/compat";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../../services/firebase";

type User = {
  id: string;
  avatar: string;
  name: string;
};

type AuthContextData = {
  signInWithGoogle: () => Promise<void>;
  user: User | undefined;
  setUser?: (user: User) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
          throw new Error("Missing information from google account");
        }
        setUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error("Missing information from google account");
      }
      setUser({
        id: uid,
        avatar: photoURL,
        name: displayName,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ signInWithGoogle, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}
