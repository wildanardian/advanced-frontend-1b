import Select, { type StylesConfig } from "react-select";
import { genreOptions } from "@/data/dummyGenre";

export type GenreOption = { value: string; label: string };

const selectOptions: GenreOption[] = genreOptions.map((g) => ({
  value: g.id,
  label: g.label,
}));

const selectStyles: StylesConfig<GenreOption, true> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#22282A",
    borderColor: state.isFocused ? "#E7E3FC3B" : "rgba(255,255,255,0.23)",
    borderRadius: "0.375rem",
    padding: "2px 8px",
    boxShadow: "none",
    "&:hover": { borderColor: "rgba(255,255,255,0.4)" },
  }),
  input: (base) => ({ ...base, color: "#fff" }),
  placeholder: (base) => ({ ...base, color: "rgba(255,255,255,0.5)" }),
  singleValue: (base) => ({ ...base, color: "#fff" }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e1f24",
    border: "1px solid rgba(255,255,255,0.23)",
    borderRadius: "0.375rem",
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "rgba(255,255,255,0.08)" : "transparent",
    color: "#fff",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "rgba(99,102,241,0.2)",
    borderRadius: "0.25rem",
  }),
  multiValueLabel: (base) => ({ ...base, color: "#a5b4fc" }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#a5b4fc",
    "&:hover": { backgroundColor: "rgba(99,102,241,0.3)", color: "#fff" },
  }),
  indicatorSeparator: (base) => ({ ...base, backgroundColor: "rgba(255,255,255,0.23)" }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "rgba(255,255,255,0.6)",
    "&:hover": { color: "#fff" },
  }),
};

const MAX_GENRES = 3;

export function GenreSelect({
  value,
  onChange,
  maxGenres = MAX_GENRES,
}: {
  value: string[]; // array of genre id
  onChange: (ids: string[]) => void;
  maxGenres?: number;
}) {
  const selected = selectOptions.filter((opt) => value.includes(opt.value));

  function handleChange(selected: readonly GenreOption[]) {
    if (selected.length > maxGenres) {
      alert(`Maksimal ${maxGenres} genre yang dapat dipilih.`);
      return;
    }
    onChange(selected.map((s) => s.value));
  }

  return (
    <Select
      inputId="genres"
      isMulti
      options={selectOptions}
      value={selected}
      onChange={handleChange}
      styles={selectStyles}
      classNamePrefix="react-select"
    />
  );
}