import { useEffect } from "react"
import type { RefObject } from "react"

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const element = ref.current

      if (!element || element.contains(event.target as Node)) return

      callback()
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [callback, ref])
}

export default useClickOutside
export { useClickOutside }
