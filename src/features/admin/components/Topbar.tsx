import { useLocation } from "react-router-dom";

const titleMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/manage-film": "Kelola Film",
  "/admin/manage-series": "Kelola Series",
  "/admin/manage-user": "Kelola User",
  "/admin/manage-subscription": "Kelola Subscription",
};


export default function Topbar() {
  const {pathname} = useLocation();
  const title = titleMap[pathname] || "Admin Panel";

  return (
    <div className="w-full h-16 bg-background-paper flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-light-main">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors">
          Logout
        </button>
      </div>
    </div>
  )
}