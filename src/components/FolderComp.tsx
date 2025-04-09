"use client";

import FolderIcon from "@/public/folder.svg";
import ArrowDown from "@/public/arrow_down.svg";
import ArrowUp from "@/public/arrow_up.svg";
import { Folder } from "@/types/types";
import NoteComp from "./NoteComp";
import { useRef, useState } from "react";
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
  const [renameMode, setRenameMode] = useState(false);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [folderName, setFolderName] = useState(folder.name);
  const [oldFolderName, setOldFolderName] = useState("");

  function handleFolderClick() {
    if (!renameMode) {
      setShowFolders((prev) => !prev);
    }
  }

  function handleRename() {
    setRenameMode(true);
    setOldFolderName(folderName);
    setTimeout(() => {
      folderInputRef.current?.focus();
    }, 250);
  }

  function handleFolderNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFolderName(e.target.value);
  }

  async function handleFolderInputBlur() {
    setRenameMode(false);
    if (oldFolderName === folderName) return;
    try {
      await fetch(`/api/v1/folders/${folder.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: folderName,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="ml-4">
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="flex my-2 cursor-pointer" onClick={handleFolderClick}>
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
            <input
              type="text"
              defaultValue={folderName}
              onChange={handleFolderNameChange}
              ref={folderInputRef}
              onBlur={handleFolderInputBlur}
              className={`${!renameMode && "hidden"} border border-zinc-800 py-0.5 px-2 rounded-sm w-[85%]`}
            />
            <span className={`${renameMode && "hidden"}`}>{folderName}</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>New Note...</ContextMenuItem>
          <ContextMenuItem inset>New Folder...</ContextMenuItem>
          <ContextMenuItem inset onClick={handleRename}>
            Rename
          </ContextMenuItem>
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
            return <FolderItem folder={folder} key={folder.id} />;
          })}
        {folder.notes?.length > 0 &&
          folder.notes.map((note) => {
            return <NoteComp note={note} key={note.id} />;
          })}
      </div>
    </div>
  );
}
