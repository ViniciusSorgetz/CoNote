"use client";

import { useEffect, useState } from "react";
import { socket } from "@/app/socket";

export default function Note() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
    }
    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
    };
  }, [socket]);

  return (
    <div>
      <textarea
        className="container w-full mx-auto py-4 px-10 mt-3 border-1 border-solid border-gray-400 rounded-md"
        rows={10}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer"
        onClick={() => {
          socket.emit("write");
        }}
      >
        Write
      </button>
      {isConnected && <div>Connected!</div>}
    </div>
  );
}
