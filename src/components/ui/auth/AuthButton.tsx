interface AuthButtonProps {
  children: React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function AuthButton({
  children,
  iconSrc,
  iconAlt,
  className = "",
  type = "button",
  onClick,
}: AuthButtonProps) {
  return (
    <button
      type={type}
      className={`w-full bg-background-extra px-5 py-2 lg:py-3.5 rounded-3xl text-xs lg:text-base text-white border border-[#E7E3FC]/23 flex items-center justify-center gap-2 ${className}`}
      onClick={onClick}
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt={iconAlt}
          className="w-2.5 h-2.5 lg:w-5 lg:h-5"
        />
      ) : null}
      {children}
    </button>
  );
}
