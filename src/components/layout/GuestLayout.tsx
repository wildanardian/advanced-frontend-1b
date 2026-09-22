import { Outlet } from "react-router";

export default function GuestLayout() {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
}