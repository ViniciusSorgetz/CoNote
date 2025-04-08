import FolderIcon from "@/public/folder.svg";
import ArrowDown from "@/public/arrow_down.svg";
import ArrowUp from "@/public/arrow_up.svg";
import { Folder } from "@/types/types";
import NoteComp from "./NoteComp";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface IParams {
  folder: Folder;
}

export default function FolderItem({ folder }: IParams) {
  const [showFolders, setShowFolders] = useState(false);

  return (
    <div className="ml-4">
      <ContextMenu>
        <ContextMenuTrigger>
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
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>New Note...</ContextMenuItem>
          <ContextMenuItem inset>New Folder...</ContextMenuItem>
          <ContextMenuItem inset>Rename</ContextMenuItem>
          <ContextMenuItem inset>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div
        className={`transition-all duration-600 ease-in-out overflow-hidden ${
          showFolders ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
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
