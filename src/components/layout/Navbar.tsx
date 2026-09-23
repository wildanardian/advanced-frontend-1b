import { Link, useLocation, useNavigate } from "react-router-dom";

import { useRef, useState } from "react";

import mobileLogo from "@/assets/images/logo/logo-mobile-navbar.png";
import desktopLogo from "@/assets/images/logo/logo-new.png";
import avatarLogo from "@/assets/images/avatar/avatar-icon.png";
import { ChevronDownIcon } from "lucide-react";
import ProfileIcon from "@/assets/icons/profile.svg";
import StarIcon from "@/assets/icons/star.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import useClickOutside from "@/hooks/use-click-outside";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { logout } from "../../store/redux/authSlice";

export function Navbar() {
  const navLinkClass =
    "inline-flex h-8 items-center text-xxs leading-none text-white/85 transition hover:text-white md:h-auto md:text-base md:leading-normal lg:text-lg";

  const [isOpen, setIsOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector((state) => state.auth.user);

  useClickOutside(userMenuRef, () => setIsOpen(false))

  const handleMenuClick = () => {
    setIsOpen(false);
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsOpen(false);
  }

  return (

    <nav className={`sticky top-0 z-1000 h-14 bg-background-page-header px-6 text-white md:h-22 md:px-16 lg:px-20`}>
      <div className="mx-auto flex h-full items-center justify-between">
        <div className="flex min-w-0 items-center gap-3 md:gap-8 lg:gap-20">
          <Link to="/" className="shrink-0">
            <img src={mobileLogo} alt="CHILL" className="w-5 md:w-7 md:hidden" />
            <img src={desktopLogo} alt="CHILL" className="w-24 hidden md:block" />
          </Link>

          <ul className="flex items-center gap-3 md:gap-8 lg:gap-20">
            <li>
              <Link to="/series" className={navLinkClass}>
                Series
              </Link>
            </li>
            <li>
              <Link to="/film" className={navLinkClass}>
                Film
              </Link>
            </li>
            <li>
              <Link to="/watchlist" className={navLinkClass}>
                Daftar Saya
              </Link>
            </li>
            <li className="md:hidden">
              <Link to="/film" className={navLinkClass}>
                Genre
                <ChevronDownIcon className="ml-1 h-3 w-3 shrink-0 text-white transition-transform" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative flex items-center gap-1 md:gap-2" ref={userMenuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1 md:gap-2"
          >
            <img
              src={avatarLogo}
              alt="Avatar Icon"
              className="w-5 rounded-full md:w-10"
            />
            <ChevronDownIcon
              className={`h-4 w-4 text-white transition-transform duration-200 md:h-7 md:w-7 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-8 z-50 h-fit w-38 rounded-sm bg-background-page-header py-1 shadow-soft-card md:top-14 md:w-45 md:py-2"
            >
              <Link
                to="/profile"
                role="menuitem"
                className={`flex items-center gap-3 whitespace-nowrap rounded-t-sm px-3 py-2 text-xxs ${location.pathname === "/profile" ? "text-blue-400" : "text-white"} hover:bg-white/10 md:gap-4 md:px-5 md:py-3 md:text-[14px]`}
                onClick={handleMenuClick}
              >
                <img src={ProfileIcon} alt="Profile Icon" className="h-4 w-4 md:h-6 md:w-6" />
                Profil Saya
              </Link>
              {user?.isSubscriptionActive === false && (
                <Link
                  to="/subscription"
                  role="menuitem"
                  className="flex items-center gap-3 px-3 py-2 text-xxs text-white hover:bg-white/10 md:gap-4 md:px-5 md:py-3 md:text-[14px]"
                  onClick={handleMenuClick}
                >
                  <img src={StarIcon} alt="Star Icon" className="h-4 w-4 md:h-6 md:w-6" />
                  Ubah Premium
                </Link>
              )}
              <Link
                to="#"
                role="menuitem"
                className="flex items-center gap-3 rounded-b-sm px-3 py-2 text-xxs text-white hover:bg-white/10 md:gap-4 md:px-5 md:py-3 md:text-[14px]"
                onClick={handleLogout}
              >
                <img src={LogoutIcon} alt="Logout Icon" className="h-4 w-4 md:h-6 md:w-6" />
                Keluar
              </Link>
            </div>
          ) : null}

        </div>
      </div>
    </nav>
  )
}
