import { useState } from "react";

import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
// import type { Note } from "../../types/note";
import { featchNotes } from "../../services/noteService";

function App() {
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
          {isSuccess && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
          <button className={css.button}>Create note +</button>
        </header>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {data && !isLoading && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}

export default App;
