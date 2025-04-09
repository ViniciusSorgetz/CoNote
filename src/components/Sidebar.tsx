import { Guest } from "@/types/types";
import FolderComp from "@/components/FolderComp";

interface IProps {
  userData: Guest | undefined;
}

export default function Sidebar({ userData }: IProps) {
  return (
    <div className="w-80 bg-gray-200 py-4 pr-6">
      {userData?.folders.map((folder) => {
        return <FolderComp folder={folder} key={folder.id} />;
      })}
    </div>
  );
}
