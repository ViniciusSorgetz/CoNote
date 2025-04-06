"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import { Guest } from "@/types/types";

export default function Note() {
  const [userData, setUserData] = useState<Guest | undefined>();

  async function getUserData() {
    const response = await fetch("/api/v1/guests/67f29082988d98c6c4a53b06");
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
