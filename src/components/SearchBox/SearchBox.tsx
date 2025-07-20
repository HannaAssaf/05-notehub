import css from "./SearchBox.module.css";
import type { DebouncedState } from "use-debounce";

interface SearchBoxProps {
  value: string;
  onSearch: DebouncedState<(newSearchNote: string) => void>;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={value}
      onChange={handleSearchChange}
    />
  );
}
