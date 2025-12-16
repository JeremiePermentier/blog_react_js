import React from "react";
import type { IUserBase as User } from "../types/User.types";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
