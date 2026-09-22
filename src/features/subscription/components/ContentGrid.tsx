interface ContentGridProps {
  image: string;
  title: string;
}

export default function ContentGrid({ image, title }: ContentGridProps) {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center gap-6 text-center lg:min-h-[110px]"
      >
        <img src={image} alt={title} className="h-10 w-10" />
        <p className="max-w-[220px] text-xl font-700 leading-tight text-light-secondary">
          {title}
        </p>
      </div>
    </>
  )
}
