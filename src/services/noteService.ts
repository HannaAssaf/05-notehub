import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

// notehub-public.goit.study/api/notes?search=example&tag=Todo&page=1&perPage=10&sortBy=created'

interface FeatchNotesProps {
  page: number;
  notes: Note[];
  totalPages: number;
  id: number;
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
export const featchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 12,
  tag?: string,
  sortBy: string = "created"
): Promise<FeatchNotesProps> => {
  const config = {
    params: {
      ...(search ? { search } : {}),
      page,
      perPage,
      ...(tag ? { tag } : {}),
      sortBy,
    },
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  };
  const response = await axios.get<FeatchNotesProps>(`/notes`, config);
  return response.data;
};

export const createNote = async (noteData: NewNoteData) => {
  const response = await axios.post<Note>(`/notes`, noteData, {
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });
};
