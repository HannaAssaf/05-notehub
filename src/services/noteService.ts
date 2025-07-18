import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

// notehub-public.goit.study/api/notes?search=example&tag=Todo&page=1&perPage=10&sortBy=created'

interface FeatchNotesProps {
  page: number;
  results: Note[];
  total_pages: number;
  id: number;
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
