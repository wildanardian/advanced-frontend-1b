import { useCallback, useEffect, useRef, useState } from "react"
import type { RefObject } from "react"

interface PreviewPosition {
  top: number
  left: number
  width: number
  enlargedWidth: number
}

const PREVIEW_DELAY_MS = 300
const PREVIEW_SCALE_FACTOR = 1.4
const MIN_PREVIEW_WIDTH = 406
const PREVIEW_OFFSET_Y = -32
const VIEWPORT_GUTTER = 8

export function useHoverPreviewPosition(): {
  cardRef: RefObject<HTMLDivElement | null>
  position: PreviewPosition | null
  show: () => void
  hide: () => void
} {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const showTimerRef = useRef<number | null>(null)
  const [position, setPosition] = useState<PreviewPosition | null>(null)

  const clearShowTimer = useCallback(() => {
    if (showTimerRef.current) {
      window.clearTimeout(showTimerRef.current)
      showTimerRef.current = null
    }
  }, [])

  const calculatePosition = useCallback(() => {
    const card = cardRef.current

    if (!card) return null

    const rect = card.getBoundingClientRect()
    const enlargedWidth = Math.max(rect.width * PREVIEW_SCALE_FACTOR, MIN_PREVIEW_WIDTH)
    const offsetX = (enlargedWidth - rect.width) / 2
    const unclampedLeft = rect.left - offsetX
    const maxLeft = window.innerWidth - enlargedWidth - VIEWPORT_GUTTER
    const left = Math.min(Math.max(unclampedLeft, VIEWPORT_GUTTER), maxLeft) + window.scrollX

    return {
      top: rect.top + window.scrollY + PREVIEW_OFFSET_Y,
      left,
      width: rect.width,
      enlargedWidth,
    }
  }, [])

  const show = useCallback(() => {
    clearShowTimer()

    showTimerRef.current = window.setTimeout(() => {
      setPosition(calculatePosition())
    }, PREVIEW_DELAY_MS)
  }, [calculatePosition, clearShowTimer])

  const hide = useCallback(() => {
    clearShowTimer()
    setPosition(null)
  }, [clearShowTimer])

  useEffect(() => {
    if (!position) return

    const recalculate = () => {
      setPosition(calculatePosition())
    }

    window.addEventListener("resize", recalculate)

    return () => {
      window.removeEventListener("resize", recalculate)
    }
  }, [calculatePosition, position])

  useEffect(() => {
    return () => {
      clearShowTimer()
    }
  }, [clearShowTimer])

  return { cardRef, position, show, hide }
}
