"use client";

import { Note } from "@/types/types";
import NoteIcon from "@/public/note.svg";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useEffect, useRef, useState } from "react";

interface IParams {
  note: Note;
  rename?: boolean;
}

export default function NoteComp({ note, rename }: IParams) {
  const [noteTitle, setNoteTitle] = useState("");
  const [oldNoteTitle, setOldNoteTitle] = useState("");
  const [renameMode, setRenameMode] = useState(false);
  const noteInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNoteTitle(note.title);
    if (rename) {
      handleRename();
    }
  }, []);

  function handleRename() {
    setRenameMode(true);
    setOldNoteTitle(noteTitle);
    setTimeout(() => noteInputRef.current?.focus(), 250);
  }

  function handleNoteTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNoteTitle(e.target.value);
  }

  async function handleNoteInputBlur() {
    setRenameMode(false);
    if (oldNoteTitle === noteTitle) return;
    try {
      await fetch(`/api/v1/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: noteTitle,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex my-2 ml-6 cursor-pointer">
          <img
            src={NoteIcon.src}
            alt="icon note"
            className="mr-1 scale-[0.9]"
          ></img>
          <input
            className={`${!renameMode && "hidden"} border border-zinc-800 py-0.5 px-2 rounded-sm w-[85%]`}
            type="text"
            defaultValue={noteTitle}
            ref={noteInputRef}
            onChange={handleNoteTitleChange}
            onBlur={handleNoteInputBlur}
          />
          <span className={`${renameMode && "hidden"}`}>{noteTitle}</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleRename}>
          Rename
        </ContextMenuItem>
        <ContextMenuItem inset>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
