"use client";

import { Guest, Note } from "@/types/types";
import { createContext, SetStateAction, useEffect, useState } from "react";

interface IUser {
  userData: Guest | undefined;
  openedNotes: Note[];
  setOpenedNotes: React.Dispatch<SetStateAction<Note[]>>;
  currentNote: Note | undefined;
  setCurrentNote: React.Dispatch<SetStateAction<Note | undefined>>;
}

export const UserContext = createContext<IUser | undefined>(undefined);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<Guest | undefined>();
  const [openedNotes, setOpenedNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | undefined>();

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
    <UserContext.Provider
      value={{
        userData,
        openedNotes,
        setOpenedNotes,
        currentNote,
        setCurrentNote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
