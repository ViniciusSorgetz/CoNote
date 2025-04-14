"use client";

import { Folder } from "@/types/types";
import FolderComp from "@/components/FolderComp";
import { useContext, useEffect, useState } from "react";
import DeleteModal from "@/components/DeleteModal";
import UserContext from "@/contexts/User";
import updater from "@/utils/folder/updater";
import folderCreator from "@/utils/folder/folderCreator";

export default function Sidebar() {
  const [subFolders, setSubFolders] = useState<Folder[]>([]);
  const [createdFolder, setCreatedFolder] = useState<Folder>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleter, setDeleter] = useState<{
    delete: () => Promise<void>;
    type: "folder" | "note";
  }>({
    delete: async () => {},
    type: "folder",
  });

  const userData = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      setSubFolders(userData.folders);
    }
  }, [userData]);

  // function to a subFolder update the subFolders array which it is inside
  function parentFolderUpdater(
    updatedItem: Folder,
    action: "rename" | "delete",
  ) {
    updater({
      updatedItem,
      action,
      subFolders,
      setSubFolders,
    });
  }

  async function createFolder() {
    folderCreator({
      guestId: userData?.id,
      subFolders,
      setSubFolders,
      setCreatedFolder,
    });
  }

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          closeModal={() => setIsModalOpen(false)}
          deleter={deleter}
        ></DeleteModal>
      )}
      <div className="w-80 min-w-50 max-w-md bg-gray-200 py-4 pr-6 overflow-y-hidden hover:overflow-y-auto resize-x flex flex-col justify-between">
        <div>
          {subFolders.map((folder) => {
            return (
              <FolderComp
                folder={folder}
                key={folder.id}
                rename={createdFolder?.id == folder.id}
                openModal={() => setIsModalOpen(true)}
                setDeleter={setDeleter}
                updateParentFolder={parentFolderUpdater}
              />
            );
          })}
        </div>
        <div>
          <button
            className="border border-zinc-500 py-2 px-4 rounded-md cursor-pointer ml-6"
            onClick={createFolder}
          >
            + Create Folder
          </button>
        </div>
      </div>
    </>
  );
}
