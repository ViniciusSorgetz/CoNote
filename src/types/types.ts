export interface Guest {
  id: string;
  folders: Folder[];
}

export interface Folder {
  id: number;
  name: string;
  guestId?: string | null;
  folderId?: number | null;
  folders: Folder[];
  notes: Note[];
}

export interface Note {
  id: number;
  title: string;
  content: string;
  folderId: number;
}
