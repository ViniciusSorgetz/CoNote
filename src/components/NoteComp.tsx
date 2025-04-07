import { Note } from "@/types/types";
import NoteIcon from "@/public/note.svg";

interface IParams {
  note: Note;
}

export default function NoteComp({ note }: IParams) {
  return (
    <div className="flex my-2 ml-6">
      <img
        src={NoteIcon.src}
        alt="icon note"
        className="mr-1 scale-[0.9]"
      ></img>
      {note.title}
    </div>
  );
}
