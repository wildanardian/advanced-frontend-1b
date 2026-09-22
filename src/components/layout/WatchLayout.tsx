import { Outlet } from "react-router";

export default function WatchLayout() {
  return (
    <div className="watch-container">
      <Outlet />
    </div>
  );
}