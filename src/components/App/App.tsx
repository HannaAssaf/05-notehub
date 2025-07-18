// import { useState } from "react";

import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  // const [count, setCount] = useState(0)
  useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("/api/notes");
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox />
          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
        </header>
      </div>
    </>
  );
}

export default App;
