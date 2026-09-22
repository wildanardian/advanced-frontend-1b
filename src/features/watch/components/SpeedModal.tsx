export default function SpeedModal({show}: {show: boolean}) {
  if (!show) return null;

  return (
    <div className="absolute bottom-20 right-10 w-[196px] bg-background-paper rounded-lg">
      <SpeedTitle text="Kecepatan" />
      <SpeedItemTitle text="0.5x" onClick={() => { }} />
      <SpeedItemTitle text="0.75" onClick={() => { }} />
      <SpeedItemTitle text="1x (Normal)" onClick={() => { }} />
      <SpeedItemTitle text="1.25x" onClick={() => { }} />
      <SpeedItemTitle text="1.5x" onClick={() => { }} />      
    </div>
  )
}

export function SpeedTitle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 py-2 px-3">
      <span className="text-md font-bold text-light-main">{text}</span>
    </div>
  )
}

export function SpeedItemTitle({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2 rounded px-3 py-2 text-left transition-colors hover:bg-background-page-header focus-visible:bg-background-page-header focus-visible:outline-none"
    >
      <span className="text-sm text-light-main">{text}</span>
    </button>

  )
}