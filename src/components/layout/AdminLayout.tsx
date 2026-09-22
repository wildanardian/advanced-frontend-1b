import Sidebar from "@/features/admin/components/Sidebar";
import Topbar from "@/features/admin/components/Topbar";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <div className="grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <Topbar />
          <div className="p-8 text-white">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}