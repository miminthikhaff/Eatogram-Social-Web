import { createContext, useContext, useState } from "react";

const authContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [social, setSocial] = useState(null);

  function login(user, social) {
    setUser(user);
    setSocial(social);
  }

  function logout() {
    setUser(null);
    setSocial(null);
  }

  return (
    <authContext.Provider value={{ user, social, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
