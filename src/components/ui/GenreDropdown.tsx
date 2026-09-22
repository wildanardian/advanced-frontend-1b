import { ChevronDownIcon } from "lucide-react"
import type { CSSProperties } from "react"
import { useEffect, useId, useRef, useState } from "react"

import { useClickOutside } from "@/hooks/use-click-outside";

export interface GenreOption {
  id: string
  label: string
}

export interface GenreDropdownProps {
  label?: string
  options: GenreOption[]
  selected?: GenreOption | null
  onSelect: (option: GenreOption) => void
  columns?: number
  className?: string
  variant?: "inline" | "sheet" | "responsive"
  triggerClassName?: string
}

const GRID_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
}

export function GenreDropdown({
  label = "Genre",
  options,
  selected = null,
  onSelect,
  columns = 2,
  className = "",
  variant = "inline",
  triggerClassName = "",
}: GenreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const columnClassName = GRID_COLUMNS[columns] ?? GRID_COLUMNS[2]
  const showInlinePanel = variant === "inline" || variant === "responsive"
  const showSheetPanel = variant === "sheet" || variant === "responsive"
  const inlinePanelDisplayClassName = variant === "responsive" ? "hidden md:grid" : "grid"
  const sheetPanelDisplayClassName = variant === "responsive" ? "md:hidden" : "block"
  const sheetUsesDialogRole = variant === "sheet" || variant === "responsive"
  const rowCount = Math.ceil(options.length / columns)
  const columnFlowStyle: CSSProperties = {
    gridAutoFlow: "column",
    gridTemplateRows: `repeat(${rowCount}, minmax(0, auto))`,
  }

  useClickOutside(dropdownRef, () => setIsOpen(false))

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleSelect = (option: GenreOption) => {
    onSelect(option)
    setIsOpen(false)
  }

  const optionButtons = options.map((option) => {
    const isSelected = selected?.id === option.id

    return (
      <button
        key={option.id}
        type="button"
        role="option"
        aria-selected={isSelected}
        onClick={() => handleSelect(option)}
        className={`rounded-none px-3 py-2 text-left text-sm text-white transition hover:bg-background-extra ${isSelected ? "bg-background-extra" : "font-normal"
          }`}
      >
        {option.label}
      </button>
    )
  })

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-auto flex items-center gap-2 rounded-lg bg-background-paper font-medium text-white transition justify-center text-base whitespace-nowrap ${triggerClassName}`}
      >
        <span>{selected?.label ?? label}</span>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <>
          {showInlinePanel ? (
            <div
              id={variant === "responsive" ? undefined : listboxId}
              role="listbox"
              style={columnFlowStyle}
              className={`absolute text-sm left-0 top-full z-50 w-[392px] ${columnClassName} ${inlinePanelDisplayClassName} gap-y-1 rounded-lg bg-background-paper shadow-xl overflow-hidden`}
            >
              {optionButtons}
            </div>
          ) : null}

          {showSheetPanel ? (
            <>
              <button
                type="button"
                aria-label="Tutup pilihan genre"
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 ${sheetPanelDisplayClassName}`}
              />
              <div
                id={listboxId}
                role={sheetUsesDialogRole ? "dialog" : "listbox"}
                aria-modal={sheetUsesDialogRole ? true : undefined}
                className={`fixed left-0 right-0 top-14 z-50 max-h-[70vh] overflow-y-auto rounded-b-lg bg-background-paper p-4 shadow-xl ${sheetPanelDisplayClassName}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-white text-sm">{selected?.label ?? label}</p>
                  <button
                    type="button"
                    aria-label="Tutup genre"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center hover:bg-white/10 rounded-full w-8 h-8 text-white text-xl leading-none transition"
                  >
                    x
                  </button>
                </div>

                <div
                  role="listbox"
                  style={columnFlowStyle}
                  className={`grid ${columnClassName} gap-y-1`}
                >
                  {optionButtons}
                </div>
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

/*
const genreOptions: GenreOption[] = [
  { id: "aksi", label: "Aksi" },
  { id: "anak-anak", label: "Anak-anak" },
  { id: "anime", label: "Anime" },
  { id: "britania", label: "Britania" },
  { id: "drama", label: "Drama" },
  { id: "fantasi-ilmiah-fantasi", label: "Fantasi Ilmiah & Fantasi" },
  { id: "kejahatan", label: "Kejahatan" },
  { id: "kdrama", label: "KDrama" },
  { id: "komedi", label: "Komedi" },
  { id: "petualangan", label: "Petualangan" },
  { id: "perang", label: "Perang" },
  { id: "romantis", label: "Romantis" },
  { id: "sains-alam", label: "Sains & Alam" },
  { id: "thriller", label: "Thriller" },
]

<GenreDropdown
  options={genreOptions}
  selected={selectedGenre}
  onSelect={setSelectedGenre}
/>
*/
