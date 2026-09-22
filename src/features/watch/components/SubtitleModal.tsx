interface SubtitleModalProps {
  show: boolean;
}

export default function SubtitleModal({ show }: SubtitleModalProps) {
  if (!show) return null;

  return (
    <div className="absolute bottom-20 right-10 w-[392px] h-fit bg-background-paper rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <ItemTitle text="Audio" />
          <ItemSubtitle text="Bahasa Indonesia" selected={true} />
        </div>
        <div className="flex flex-col">
          <ItemTitle text="Terjemahan" />
          <ItemSubtitle text="Bahasa Indonesia" selected={true} />
          <ItemSubtitle text="Bahasa Indonesia" selected={false} />
        </div>
      </div>
    </div>
  )
}

export function ItemTitle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 py-2 px-3">
      <span className="text-md font-bold text-light-main">{text}</span>
    </div>
  )
}

import { Check } from "lucide-react";

interface ItemSubtitleProps {
  text: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ItemSubtitle({ text, selected, onClick }: ItemSubtitleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2 rounded px-3 py-2 text-left transition-colors hover:bg-background-page-header focus-visible:bg-background-page-header focus-visible:outline-none"
    >
      {selected ? (
        <Check className="h-4 w-4 text-light-main" />
      ) : <div className="w-4 h-4 bg-transparent"></div>}
      <span className="text-sm text-light-main">{text}</span>
    </button>
  )
}
