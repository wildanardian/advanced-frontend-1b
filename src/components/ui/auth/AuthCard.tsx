interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthCard({ children, className = "" } : AuthCardProps) {
  return (
    <div className={`bg-[#181A1CD6] p-6 lg:p-10 rounded-2xl w-76.5 lg:w-132.25 ${className}`}>
      {children}
    </div>
  );
}