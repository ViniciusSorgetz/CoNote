"use client";

import { useEffect } from "react";

async function fetchData() {
  const response = await fetch("../api/v1/status");
  const responseBody = await response.json();
  console.log(responseBody.message);
}

export default function Note() {
  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <textarea
        className="container w-full mx-auto py-4 px-10 mt-3 border-1 border-solid border-gray-400 rounded-md"
        rows={10}
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer">
        Format
      </button>
    </div>
  );
}
