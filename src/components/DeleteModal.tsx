interface IProps {
  closeModal: () => void;
  deleter: {
    delete: () => Promise<void>;
    type: "folder" | "note";
  };
}

export default function DeleteModal({ closeModal, deleter }: IProps) {
  return (
    <div className="h-screen w-screen bg-black/50 z-[1000] fixed flex items-center justify-center m-0">
      <div className="bg-white rounded-md p-10">
        <p className="font-semibold mb-5 text-lg">
          Are you sure delete this {deleter.type}?
        </p>
        <p className="">After deleting it the {deleter.type} will be gone</p>
        <button
          className="border border-zinc-400 text-zinc-700 py-2 px-4 rounded-sm cursor-pointer hover:bg-zing-200 mr-3 mt-8"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-sm cursor-pointer hover:bg-red-800"
          onClick={() => {
            deleter.delete();
            closeModal();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
