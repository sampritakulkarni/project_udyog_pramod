import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, User, Briefcase, GraduationCap, Calendar, Trophy,
  Users, TrendingUp, LogOut, Menu, X, Bell, Search, ChevronDown
} from 'lucide-react';
import { Logo } from '@/components/ui';
import { useAuth } from '@/auth';
import type { Role } from '@/types';

type NavItem = { label: string; icon: typeof User; path: string; roles?: Role[] };

const NAV: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Career Passport', icon: User, path: '/dashboard/passport' },
  { label: 'Jobs', icon: Briefcase, path: '/dashboard/jobs' },
  { label: 'Mentorship', icon: GraduationCap, path: '/dashboard/mentorship' },
  { label: 'Events & Learning', icon: Calendar, path: '/dashboard/events' },
  { label: 'Hackathons', icon: Trophy, path: '/dashboard/hackathons' },
  { label: 'Career Journey', icon: TrendingUp, path: '/dashboard/journey' },
  { label: 'Alumni & Impact', icon: Users, path: '/dashboard/alumni' },
  { label: 'Admin Dashboard', icon: LayoutDashboard, path: '/dashboard/admin', roles: ['admin'] },
];

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const visibleNav = NAV.filter((item) => !item.roles || item.roles.some((r) => user.roles.includes(r)));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar — Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <Logo />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X className="h-5 w-5 text-slate-400" /></button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {visibleNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden"><Menu className="h-5 w-5 text-slate-600" /></button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input placeholder="Search..." className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:bg-white" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="relative">
              <button onClick={() => setProfileOpen((v) => !v)} className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-100">
                <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.roles.join(', ')}</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                  <Link to="/dashboard/passport" onClick={() => setProfileOpen(false)} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">My Profile</Link>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
