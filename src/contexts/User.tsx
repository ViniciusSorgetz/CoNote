"use client";

import { Guest } from "@/types/types";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<Guest | undefined>(undefined);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<Guest | undefined>();

  async function getUserData() {
    const response = await fetch(
      "/api/v1/guests/d26fcf3e-3ab2-4a2f-8bb0-3cba5bed19ac",
    );
    const data = await response.json();
    setUserData(data.guest as Guest);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}

export default UserContext;
