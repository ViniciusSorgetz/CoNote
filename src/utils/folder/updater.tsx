import { Folder, Note } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

interface IParams {
  updatedItem: Folder | Note;
  action: "rename" | "delete";
  subFolders?: Folder[];
  setSubFolders?: Dispatch<SetStateAction<Folder[]>>;
  notes?: Note[];
  setNotes?: Dispatch<SetStateAction<Note[]>>;
}

export default function updater({
  updatedItem,
  action,
  subFolders,
  setSubFolders,
  notes,
  setNotes,
}: IParams) {
  if ("name" in updatedItem && subFolders && setSubFolders) {
    const index = subFolders.findIndex((f: Folder) => f.id === updatedItem.id);
    const subFoldersCopy = [...subFolders];
    if (action == "rename") {
      subFoldersCopy[index] = updatedItem;
    } else {
      subFoldersCopy.splice(index, 1);
    }
    setSubFolders(subFoldersCopy);
  } else if (notes && setNotes) {
    const index = notes.findIndex((n: Note) => n.id === updatedItem.id);
    const notesCopy = [...notes];
    if (action === "rename") {
      notesCopy[index] = updatedItem as Note;
    } else {
      notesCopy.splice(index, 1);
    }
    setNotes(notesCopy);
  }
}
