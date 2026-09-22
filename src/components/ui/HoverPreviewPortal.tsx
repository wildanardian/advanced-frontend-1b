// common/HoverPreviewPortal.tsx
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface PreviewPosition {
  top: number;
  left: number;
  width: number;
  enlargedWidth: number;
}

interface HoverPreviewPortalProps {
  position: PreviewPosition | null;
  children: ReactNode;
}

export function HoverPreviewPortal({ position, children }: HoverPreviewPortalProps) {
  if (!position) return null;

  return createPortal(
    <div
      style={{
        position: 'absolute', // bukan 'fixed' — supaya ikut scroll document
        top: position.top,
        left: position.left,
        width: position.enlargedWidth,
        zIndex: 100,
      }}
    >
      {children}
    </div>,
    document.body
  );
}