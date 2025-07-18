import { useState } from "react";

import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
// import type { Note } from "../../types/note";
import { featchNotes } from "../../services/noteService";
import Loader from "../Loader/Loader";
import NoteList from "../NoteList/NoteList";

function App() {
  // const [count, setCount] = useState(0)

  const [page, setPage] = useState<number>(1);
  const [searchNote, setSearchNote] = useState<string>("");
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", searchNote, page],
    queryFn: () => featchNotes(searchNote, page),
    placeholderData: keepPreviousData,
  });
  console.log("data", data);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox />
          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
          {isLoading && <Loader />}
          {data && !isLoading && (
            <NoteList
              notes={{ results: data.results, total_pages: data.total_pages }}
            />
          )}
        </header>
      </div>
    </>
  );
}

export default App;
