import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/auth';

const DashboardLayout = lazy(() => import('@/pages/DashboardLayout').then((m) => ({ default: m.DashboardLayout })));
const DashboardOverview = lazy(() => import('@/pages/DashboardOverview').then((m) => ({ default: m.DashboardOverview })));
const CareerPassport = lazy(() => import('@/pages/CareerPassport').then((m) => ({ default: m.CareerPassport })));
const JobsPage = lazy(() => import('@/pages/JobsPage').then((m) => ({ default: m.JobsPage })));
const MentorshipPage = lazy(() => import('@/pages/MentorshipPage').then((m) => ({ default: m.MentorshipPage })));
const EventsPage = lazy(() => import('@/pages/EventsPage').then((m) => ({ default: m.EventsPage })));
const HackathonsPage = lazy(() => import('@/pages/HackathonsPage').then((m) => ({ default: m.HackathonsPage })));
const CareerJourneyPage = lazy(() => import('@/pages/CareerJourneyPage').then((m) => ({ default: m.CareerJourneyPage })));
const AlumniPage = lazy(() => import('@/pages/AlumniPage').then((m) => ({ default: m.AlumniPage })));
const AdminPage = lazy(() => import('@/pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const LandingPage = lazy(() => import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));

const Fallback = () => <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" /></div>;

function ProtectedRoutes() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <DashboardLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoutes />}>
              <Route index element={<DashboardOverview />} />
              <Route path="passport" element={<CareerPassport />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="mentorship" element={<MentorshipPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="hackathons" element={<HackathonsPage />} />
              <Route path="journey" element={<CareerJourneyPage />} />
              <Route path="alumni" element={<AlumniPage />} />
              <Route path="admin" element={<AdminPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
