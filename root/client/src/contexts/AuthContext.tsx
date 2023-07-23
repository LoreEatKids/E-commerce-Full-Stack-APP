import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { childrenType } from "../types/userTypes";

interface User {
  uid: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

const AuthProvider = ({ children }: childrenType) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((AuthUser) => {
      if (AuthUser) {
        const { uid, email } = AuthUser;
        setUser({
          uid: uid ?? "",
          email: email ?? "",
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;