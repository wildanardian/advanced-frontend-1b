import logo from '@/assets/images/logo/logo-new.png';
import SidebarItem from './SidebarItem';
import { FilmIcon, IdCardIcon, LayoutIcon, UserIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 h-screen w-full bg-background-paper p-6">
      <img src={logo} alt="logo" className="w-40 h-auto" />

      <div className="mt-6 space-y-2">
        <SidebarItem active={location.pathname === '/admin'} onClick={() => navigate('/admin')}>
          <SidebarItem.Icon><LayoutIcon /></SidebarItem.Icon>
          <SidebarItem.Label>Dashboard</SidebarItem.Label>
        </SidebarItem>

        <SidebarItem active={location.pathname === '/admin/manage-film'} onClick={() => navigate('/admin/manage-film')}>
          <SidebarItem.Icon><FilmIcon /></SidebarItem.Icon>
          <SidebarItem.Label>Kelola Film</SidebarItem.Label>
        </SidebarItem>

        <SidebarItem active={location.pathname === '/admin/manage-series'} onClick={() => navigate('/admin/manage-series')}>
          <SidebarItem.Icon><FilmIcon /></SidebarItem.Icon>
          <SidebarItem.Label>Kelola Series</SidebarItem.Label>
        </SidebarItem>

        <SidebarItem active={location.pathname === '/admin/manage-user'} onClick={() => navigate('/admin/manage-user')}>
          <SidebarItem.Icon><UserIcon /></SidebarItem.Icon>
          <SidebarItem.Label>Kelola User</SidebarItem.Label>
        </SidebarItem>

        <SidebarItem active={location.pathname === '/admin/manage-subscription'} onClick={() => navigate('/admin/manage-subscription')}>
          <SidebarItem.Icon><IdCardIcon /></SidebarItem.Icon>
          <SidebarItem.Label>Kelola Subscription</SidebarItem.Label>
        </SidebarItem>
      </div>

    </div>
  )
}