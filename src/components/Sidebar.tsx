import { Guest } from "@/types/types";
import FolderComp from "@/components/FolderComp";
import { useState } from "react";
import DeleteModal from "@/components/DeleteModal";

interface IProps {
  userData: Guest | undefined;
}

export default function Sidebar({ userData }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteFolder, setDeleteFolder] = useState<{
    delete: () => Promise<void>;
  }>({
    delete: async () => {},
  });

  return (
    <>
      {isModalOpen && (
        <DeleteModal
          closeModal={() => setIsModalOpen(false)}
          deleteFolder={deleteFolder}
        ></DeleteModal>
      )}
      <div className="w-80 min-w-50 max-w-md bg-gray-200 py-4 pr-6 overflow-y-hidden hover:overflow-y-auto resize-x">
        {userData?.folders.map((folder) => {
          return (
            <FolderComp
              folder={folder}
              key={folder.id}
              openModal={() => setIsModalOpen(true)}
              setDeleteFolder={setDeleteFolder}
            />
          );
        })}
      </div>
    </>
  );
}
