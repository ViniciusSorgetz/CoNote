import { Note } from "@/types/types";
import NoteIcon from "@/public/note.svg";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useRef, useState } from "react";

interface IParams {
  note: Note;
}

export default function NoteComp({ note }: IParams) {
  const [renameMode, setRenameMode] = useState(false);
  const noteInputRef = useRef<HTMLInputElement>(null);

  function handleRename() {
    setRenameMode(true);
    noteInputRef.current?.focus();
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex my-2 ml-6">
          <img
            src={NoteIcon.src}
            alt="icon note"
            className="mr-1 scale-[0.9]"
          ></img>
          <input
            className={`${!renameMode && "hidden"} border border-zinc-800 py-0.5 px-2 rounded-sm w-[85%]`}
            type="text"
            defaultValue={note.title}
            ref={noteInputRef}
            onBlur={() => setRenameMode(false)}
          />
          <span className={`${renameMode && "hidden"}`}>{note.title}</span>
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
