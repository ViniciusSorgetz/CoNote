import { Folder } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

interface IParams {
  folderId?: string;
  guestId?: string;
  subFolders: Folder[];
  setSubFolders: Dispatch<SetStateAction<Folder[]>>;
  setCreatedFolder: Dispatch<SetStateAction<Folder>>;
  setShowFolders?: Dispatch<SetStateAction<boolean>>;
}

export default async function folderCreator({
  folderId,
  guestId,
  subFolders,
  setSubFolders,
  setCreatedFolder,
  setShowFolders,
}: IParams) {
  const folderName = getFolderName();

  const body = folderId
    ? {
        name: folderName,
        folderId: folderId,
      }
    : {
        name: folderName,
        guestId: guestId,
      };

  try {
    const response = await fetch(`/api/v1/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const newFolder = (await response.json()).createdFolder as Folder;
    setSubFolders((prev) => [...prev, newFolder]);
    setCreatedFolder(newFolder);
    if (setShowFolders) {
      setShowFolders(true);
    }
  } catch (error) {
    console.log(error);
  }

  function getFolderName() {
    if (subFolders.length > 0) {
      for (let i = 0; i < subFolders.length; i++) {
        const name = `New Folder(${i + 1})`;
        const found = subFolders.find((f: Folder) => f.name == name);
        if (!found) {
          return name;
        }
      }
    }
    return "New Folder";
  }
}
