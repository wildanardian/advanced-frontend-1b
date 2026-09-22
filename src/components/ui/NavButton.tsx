import { ArrowLeft, ArrowRight } from "lucide-react"

interface NavButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
  disabled: boolean
}

export function NavButton({ direction, onClick, disabled }: NavButtonProps) {
  const isLeft = direction === 'left'
  return (
    <button
      data-testid={`cw-${direction}`}
      onClick={onClick}
      aria-label={isLeft ? 'Scroll left' : 'Scroll right'}
      disabled={disabled}
      className={`absolute ${isLeft ? '-left-5' : '-right-5'} top-1/2 -translate-y-1 z-10
        hidden h-10 w-10 items-center justify-center rounded-full bg-neutral-800/90 text-white
        transition-opacity duration-300 md:flex
        ${disabled ? 'pointer-events-none opacity-40' : 'opacity-100 hover:bg-neutral-700/95'}`}
    >
      {isLeft ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
    </button>
  )
}
