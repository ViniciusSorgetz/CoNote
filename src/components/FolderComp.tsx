"use client";

import FolderIcon from "@/public/folder.svg";
import ArrowDown from "@/public/arrow_down.svg";
import ArrowUp from "@/public/arrow_up.svg";
import { Folder, Note } from "@/types/types";
import NoteComp from "./NoteComp";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useKeyDown from "@/utils/useKeyDown";
import updater from "@/utils/folder/updater";
import folderCreator from "@/utils/folder/folderCreator";

interface IParams {
  folder: Folder;
  updateParentFolder?: (
    updatedItem: Folder | Note,
    action: "rename" | "delete",
  ) => void;
  rename?: boolean;
  openModal: () => void;
  setDeleter: Dispatch<
    SetStateAction<{
      delete: () => Promise<void>;
      type: "folder" | "note";
    }>
  >;
}

export default function FolderComp({
  folder,
  rename,
  updateParentFolder,
  openModal,
  setDeleter,
}: IParams) {
  const [showFolders, setShowFolders] = useState(false);
  const [renameMode, setRenameMode] = useState(false);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [folderName, setFolderName] = useState("");
  const [oldFolderName, setOldFolderName] = useState("");

  const [subFolders, setSubFolders] = useState<Folder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [createdFolder, setCreatedFolder] = useState<Folder>();
  const [createdNote, setCreatedNote] = useState<Note>();

  useEffect(() => {
    setFolderName(folder.name);
    setNotes(folder.notes);
    if (folder.folders) {
      setSubFolders(folder.folders);
    }
    if (rename) {
      handleRename();
    }
  }, []);

  useKeyDown(() => {
    if (renameMode) {
      handleFolderInputBlur();
    }
  }, ["Enter"]);

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
    console.log(e.target.value);
    setFolderName(e.target.value);
  }

  // function to save the folder's rename
  async function handleFolderInputBlur() {
    setRenameMode(false);
    if (oldFolderName === folderName) return;
    try {
      const response = await fetch(`/api/v1/folders/${folder.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: folderName,
        }),
      });
      const updatedFolder = (await response.json()).updatedFolder as Folder;
      if (updateParentFolder) {
        updateParentFolder(updatedFolder, "rename");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createFolder() {
    folderCreator({
      folderId: folder.id,
      subFolders,
      setSubFolders,
      setCreatedFolder,
      setShowFolders,
    });
  }

  async function createNote() {
    const noteTitle = getNoteName();
    try {
      const response = await fetch(`/api/v1/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: noteTitle,
          folderId: folder.id,
        }),
      });
      const newNote = (await response.json()).createdNote as Note;
      setNotes((prev) => (prev ? [...prev, newNote] : [newNote]));
      setCreatedNote(newNote);
      setShowFolders(true);
    } catch (error) {
      console.log(error);
    }

    function getNoteName() {
      if (notes && notes.length > 0) {
        for (let i = 0; i < notes.length; i++) {
          const title = `New Note(${i + 1})`;
          const found = notes.find((n: Note) => n.title == title);
          if (!found) {
            return title;
          }
        }
      }
      return "New Note";
    }
  }

  // function to a subFolder update the subFolders array which it is inside
  function parentFolderUpdater(
    updatedItem: Folder | Note,
    action: "rename" | "delete",
  ) {
    updater({
      updatedItem,
      action,
      subFolders,
      setSubFolders,
      notes,
      setNotes,
    });
  }

  // function to delete a folder
  async function deleteFolder() {
    try {
      await fetch(`/api/v1/folders/${folder.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (updateParentFolder) {
        updateParentFolder(folder, "delete");
      }
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
              value={folderName}
              onChange={handleFolderNameChange}
              ref={folderInputRef}
              onBlur={handleFolderInputBlur}
              className={`${!renameMode && "hidden"} border border-zinc-800 py-0.5 px-2 rounded-sm w-[85%]`}
            />
            <span className={`${renameMode && "hidden"}`}>{folderName}</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={createNote}>
            New Note...
          </ContextMenuItem>
          <ContextMenuItem inset onClick={createFolder}>
            New Folder...
          </ContextMenuItem>
          <ContextMenuItem inset onClick={handleRename}>
            Rename
          </ContextMenuItem>
          <ContextMenuItem
            inset
            onClick={() => {
              openModal();
              setDeleter({
                delete: deleteFolder,
                type: "folder",
              });
            }}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div
        className={`transition-all duration-600 ease-in-out overflow-hidden ${
          showFolders ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        {subFolders.length > 0 &&
          subFolders.map((folder) => {
            return (
              <FolderComp
                folder={folder}
                key={folder.id}
                setDeleter={setDeleter}
                updateParentFolder={parentFolderUpdater}
                rename={folder.id === createdFolder?.id}
                openModal={openModal}
              />
            );
          })}
        {notes?.length > 0 &&
          notes.map((note) => {
            return (
              <NoteComp
                note={note}
                key={note.id}
                updateParentFolder={parentFolderUpdater}
                setDeleter={setDeleter}
                rename={note.id === createdNote?.id}
                openModal={openModal}
              />
            );
          })}
      </div>
    </div>
  );
}
