
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
    });
  }, []);

  const authInfo = {
    isAuthenticated: Boolean(currentUser),
    email: currentUser?.email,
    uid: currentUser?.uid
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};