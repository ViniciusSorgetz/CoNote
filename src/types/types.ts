export interface Guest {
  id: string;
  folders: Folder[];
}

export interface Folder {
  id: string;
  name: string;
  guestId?: string | null;
  folderId?: string | null;
  folders: Folder[];
  notes: Note[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
}
