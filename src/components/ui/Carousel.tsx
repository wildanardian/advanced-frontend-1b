// components/ui/Carousel.tsx
import { useRef, useState, useEffect, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { NavButton } from "./NavButton";

interface CarouselProps<T> {
  title?: string;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  itemWidth?: number; // untuk kalkulasi scroll amount
  className?: string;
}

export function Carousel<T>({
  title,
  items,
  renderItem,
  keyExtractor,
  itemWidth = 280,
  className,
}: CarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScrollability();
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = itemWidth * 3; // geser ~3 card per klik
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={cn("relative", className)}>
      {title && (
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          {title}
        </h2>
      )}

      <div className="relative group">
        {canScrollLeft && (
          <NavButton direction="left" onClick={() => scroll("left")} disabled={!canScrollLeft} />
        )}
        {canScrollRight && (
          <NavButton direction="right" onClick={() => scroll("right")} disabled={!canScrollRight} />
        )}
        {/* {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 -translate-y-1 z-10 p-2 h-10 w-10 items-center justify-center rounded-full bg-neutral-800/90 text-white
        transition-opacity duration-300 md:flex"
          >
            <ChevronLeft size={20} />
          </button>
        )} */}

        <div
          ref={scrollRef}
          onScroll={checkScrollability}
          className="flex gap-7 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {items.map((item, index) => (
            <div
              key={keyExtractor(item, index)}
              className="shrink-0"
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>

        {/* {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <ChevronRight size={20} />
          </button>
        )} */}
      </div>
    </section>
  );
}
