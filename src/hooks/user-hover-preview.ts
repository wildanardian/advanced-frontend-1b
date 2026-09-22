// hooks/useHoverPreview.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface PreviewPosition {
  top: number;
  left: number;
  width: number;
  enlargedWidth: number;
}

interface UseHoverPreviewOptions {
  carouselViewportRef?: RefObject<HTMLDivElement | null>;
}

const SHOW_DELAY_MS = 300;
const CLOSE_DELAY_MS = 100;
const PREVIEW_SCALE_FACTOR = 1.4;
const MIN_PREVIEW_WIDTH = 406;
const PREVIEW_OFFSET_Y = -32;
const VIEWPORT_GUTTER = 8;

export function useHoverPreview({ carouselViewportRef }: UseHoverPreviewOptions = {}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const showTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [position, setPosition] = useState<PreviewPosition | null>(null);

  const clearShowTimer = () => {
    if (showTimerRef.current) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const calculatePosition = useCallback((): PreviewPosition | null => {
    const card = cardRef.current;
    if (!card) return null;

    const rect = card.getBoundingClientRect();
    const enlargedWidth = Math.max(rect.width * PREVIEW_SCALE_FACTOR, MIN_PREVIEW_WIDTH);
    const offsetX = (enlargedWidth - rect.width) / 2;
    const unclampedLeft = rect.left - offsetX;
    const maxLeft = window.innerWidth - enlargedWidth - VIEWPORT_GUTTER;
    const left = Math.min(Math.max(unclampedLeft, VIEWPORT_GUTTER), maxLeft) + window.scrollX;

    return {
      top: rect.top + window.scrollY + PREVIEW_OFFSET_Y,
      left,
      width: rect.width,
      enlargedWidth,
    };
  }, []);

  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

  const isFullyVisibleInViewport = () => {
    const card = cardRef.current;
    const viewport = carouselViewportRef?.current;
    if (!card || !viewport) return true;

    const cardRect = card.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    const tolerance = 1;

    return (
      cardRect.left >= viewportRect.left - tolerance &&
      cardRect.right <= viewportRect.right + tolerance
    );
  };

  const close = () => {
    clearShowTimer();
    clearCloseTimer();
    setPosition(null);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(close, CLOSE_DELAY_MS);
  };

  const open = () => {
    if (!isDesktop() || !isFullyVisibleInViewport()) return;

    clearCloseTimer();
    clearShowTimer();
    showTimerRef.current = window.setTimeout(() => {
      setPosition(calculatePosition());
    }, SHOW_DELAY_MS);
  };

  // Tutup saat carousel discroll horizontal
  useEffect(() => {
    const viewport = carouselViewportRef?.current;
    if (!position || !viewport) return;

    viewport.addEventListener('scroll', close, { passive: true });
    return () => viewport.removeEventListener('scroll', close);
  }, [position, carouselViewportRef]);

  // Recalculate posisi saat resize (window scroll TIDAK perlu, karena absolute positioning otomatis ikut)
  useEffect(() => {
    if (!position) return;
    const recalculate = () => setPosition(calculatePosition());
    window.addEventListener('resize', recalculate);
    return () => window.removeEventListener('resize', recalculate);
  }, [calculatePosition, position]);

  useEffect(() => {
    return () => {
      clearShowTimer();
      clearCloseTimer();
    };
  }, []);

  return { cardRef, position, open, close, scheduleClose, clearCloseTimer };
}