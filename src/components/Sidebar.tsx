import { Guest } from "@/types/types";
import FolderIcon from "@/public/folder.svg";
import NoteIcon from "@/public/note.svg";

interface IProps {
  userData: Guest | undefined;
}

export default function Sidebar({ userData }: IProps) {
  return (
    <div className="w-64 bg-gray-200 py-4 px-6">
      {userData?.folders.map((folder) => {
        return (
          <>
            <div className="flex my-2">
              <img
                src={FolderIcon.src}
                alt="icon folder"
                className="mr-1"
              ></img>
              {folder.name}
            </div>
            {folder.notes.map((note) => {
              return (
                <div className="flex ml-3 my-2">
                  <img
                    src={NoteIcon.src}
                    alt="icon folder"
                    className="mr-1"
                  ></img>
                  {note.title}
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
}
