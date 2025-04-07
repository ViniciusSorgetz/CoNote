import FolderIcon from "@/public/folder.svg";
import ArrowDown from "@/public/arrow_down.svg";
import ArrowUp from "@/public/arrow_up.svg";
import { Folder } from "@/types/types";
import NoteComp from "./NoteComp";
import { useState } from "react";

interface IParams {
  folder: Folder;
}

export default function FolderItem({ folder }: IParams) {
  const [showFolders, setShowFolders] = useState(false);

  return (
    <div className="ml-4">
      <div
        className="flex my-2 cursor-pointer"
        onClick={() => setShowFolders((prev) => !prev)}
      >
        <img
          src={showFolders ? ArrowDown.src : ArrowUp.src}
          alt="icon folder"
          className="scale-[0.9]"
        ></img>
        <img
          src={FolderIcon.src}
          alt="icon folder"
          className="mr-1 scale-[0.9]"
        ></img>
        {folder.name}
      </div>
      <div className={showFolders ? "" : "hidden"}>
        {folder.folders.length > 0 &&
          folder.folders.map((folder) => {
            return <FolderItem folder={folder} />;
          })}
        {folder.notes?.length > 0 &&
          folder.notes.map((note) => {
            return <NoteComp note={note} />;
          })}
      </div>
    </div>
  );
}
