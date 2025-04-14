"use client";

import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import { UserContextProvider } from "@/contexts/User";

export default function Note() {
  return (
    <div className="flex h-screen">
      <UserContextProvider>
        <Sidebar />
        <Main />
      </UserContextProvider>
    </div>
  );
}
