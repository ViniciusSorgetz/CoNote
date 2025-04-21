"use client";

import { marked } from "marked";
import { useContext, useEffect, useRef } from "react";
//import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import UserContext from "@/contexts/User";
import XIcon from "@/public/x.svg";
import { Note } from "@/types/types";

export default function Main() {
  const { openedNotes, currentNote, setCurrentNote } = useContext(UserContext)!;

  const noteContentRef = useRef<HTMLDivElement>(null);

  async function insertNote() {
    setTimeout(async () => {
      if (noteContentRef.current && currentNote) {
        noteContentRef.current.innerHTML = await marked.parse(
          currentNote.content,
        );
      }
    });
  }

  useEffect(() => {
    insertNote();
    hljs.highlightAll();
  }, [currentNote]);

  function closeNote(closedNote: Note) {
    console.log(closedNote);
    /*
    let openedNotesCopy = [...openedNotes];
    const index = openedNotes.findIndex(
      (openedNote) => openedNote.id == closedNote.id,
    );
    openedNotesCopy = openedNotesCopy.slice(index, 1);
    setOpenedNotes(openedNotesCopy);

    if(openedNotes.length == 0){
      setCurrentNote(undefined);
    }
    else{ 
      setCurrentNote(undefined);
    }
    */
  }

  return (
    <div className="w-full">
      <div className="flex gap-2 w-full bg-zinc-200 pl-2 pt-1">
        {openedNotes.map((openedNote) => {
          if (openedNote.id == currentNote?.id) {
            return (
              <div
                className="cursor-pointer p-2 px-3  rounded-t-lg bg-white w-70 flex gap-2"
                onClick={() => setCurrentNote(openedNote)}
              >
                {openedNote.title}
                <img
                  src={XIcon.src}
                  alt="close-button"
                  className="scale-[0.6]"
                  onClick={() => closeNote(openedNote)}
                />
              </div>
            );
          } else {
            return (
              <div
                className="cursor-pointer p-2 px-3 w-70 flex gap-2"
                onClick={() => setCurrentNote(openedNote)}
              >
                {openedNote.title}
                <img
                  src={XIcon.src}
                  alt="close-button"
                  className="scale-[0.6]"
                  onClick={() => closeNote(openedNote)}
                />
              </div>
            );
          }
        })}
      </div>
      <div className="py-4 px-6 overflow-y-auto w-full">
        <div
          className="note-content prose figtree mt-3"
          ref={noteContentRef}
        ></div>
      </div>
    </div>
  );
}
