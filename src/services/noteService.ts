import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;

interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}
export const fetchNotes = async (
  search: string,
  page: number = 1
): Promise<FetchNotesProps> => {
  const config = {
    params: {
      ...(search ? { search } : {}),
      page,
    },
  };
  const response = await axios.get<FetchNotesProps>(`/notes`, config);
  return response.data;
};

export const createNote = async (noteData: NewNoteData) => {
  const response = await axios.post<Note>(`/notes`, noteData);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
