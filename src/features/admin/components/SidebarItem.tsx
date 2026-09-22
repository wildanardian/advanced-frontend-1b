import { createContext, useContext } from "react";


interface SidebarItemContext {
  active: boolean;
}
const ItemContext = createContext<SidebarItemContext | null>(null);

function useItemContext() {
  const ctx = useContext(ItemContext);
  if (!ctx) throw new Error("Sub-component harus di dalam SidebarItem");
  return ctx;
}

interface SidebarItemProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function SidebarItem({
  active = false,
  onClick,
  children,
}: SidebarItemProps) {
  return (
    <ItemContext.Provider value={{ active }}>
      <div onClick={onClick}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${active ? "bg-primary-main text-white" : "text-gray-300 hover:bg-gray-800"}`}>
        {children}
      </div>
    </ItemContext.Provider>
  )
}

function Icon({ children }: { children: React.ReactNode }) {
  const { active } = useItemContext();
  return <span className={active ? "opacity-100" : "opacity-70"}>{children}</span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-medium">{children}</span>;
}

SidebarItem.Icon = Icon;
SidebarItem.Label = Label;

export { SidebarItem };