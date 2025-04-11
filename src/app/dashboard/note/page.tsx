"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import { Guest } from "@/types/types";

export default function Note() {
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
    <div className="flex h-screen">
      <Sidebar userData={userData} />
      <Main />
    </div>
  );
}
