"use client";

//import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
//import { socket } from "@/app/socket";

export default function Note() {
  /*
  const [isConnected, setIsConnected] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }
    function onUpdate(formContent: string) {
      setNoteContent(formContent);
    }
    socket.on("connect", onConnect);
    socket.on("update", onUpdate);

    return () => {
      // removes the listener to "connect" event, 'cause it is probably already connected
      socket.off("connect", onConnect);
    };
  }, [socket]);

  function handleWrite(e: React.ChangeEvent<HTMLTextAreaElement>) {
    socket.emit("write", e.target.value);
    setNoteContent(e.target.value);
  }
  */
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Main />
    </div>
  );
}
