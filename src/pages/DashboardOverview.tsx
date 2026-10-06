import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Calendar, Trophy, Users, TrendingUp, FileText, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, StatCard, Badge, Button } from '@/components/ui';
import { useAuth } from '@/auth';
import { jobs, events, hackathons, careerJourneyStages } from '@/data';

export function DashboardOverview() {
  const { user } = useAuth();
  if (!user) return null;

  const applications = user.applications || [];
  const upcomingEvents = events.slice(0, 3);
  const featuredJobs = jobs.filter((j) => j.featured).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="mt-1 text-slate-500">Here's what's happening with your career journey.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value={applications.length} icon={<Briefcase className="h-6 w-6" />} trend="2 active interviews" />
        <StatCard label="Mentoring Hours" value={user.mentoringHours || 0} icon={<Clock className="h-6 w-6" />} />
        <StatCard label="Learning Programs" value={user.learningHistory?.length || 0} icon={<GraduationCap className="h-6 w-6" />} />
        <StatCard label="Referrals" value={user.referrals || 0} icon={<Users className="h-6 w-6" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Applications */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900">My Applications</h2>
            <Link to="/dashboard/jobs"><Button variant="ghost" size="sm">View all <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
          <div className="space-y-3">
            {applications.map((app) => {
              const statusVariant = { submitted: 'info', reviewing: 'warning', interview: 'purple', offered: 'success', rejected: 'danger' } as const;
              return (
                <div key={app.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 hover:bg-slate-50">
                  <div>
                    <p className="font-semibold text-slate-800">{app.jobTitle}</p>
                    <p className="text-sm text-slate-500">{app.company} · Applied {new Date(app.appliedDate).toLocaleDateString('en', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <Badge variant={statusVariant[app.status]}>{app.status}</Badge>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Career Journey Stage */}
        <Card>
          <h2 className="mb-4 font-display text-lg font-bold text-slate-900">Career Journey</h2>
          <div className="space-y-2">
            {careerJourneyStages.map((s) => (
              <div key={s.stage} className={`flex items-center gap-3 rounded-lg p-2 ${s.stage === user.journeyStage ? 'bg-blue-50' : ''}`}>
                <div className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                <span className={`flex-1 text-sm ${s.stage === user.journeyStage ? 'font-semibold text-blue-700' : 'text-slate-600'}`}>{s.stage}</span>
                {s.stage === user.journeyStage && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
              </div>
            ))}
          </div>
          <Link to="/dashboard/journey"><Button variant="outline" size="sm" className="mt-4 w-full">View Kanban Board</Button></Link>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900">Upcoming Events</h2>
            <Link to="/dashboard/events"><Button variant="ghost" size="sm">View all</Button></Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((ev) => (
              <div key={ev.id} className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <span className="text-sm font-bold">{new Date(ev.date).getDate()}</span>
                  <span className="text-[9px] uppercase">{new Date(ev.date).toLocaleString('en', { month: 'short' })}</span>
                </div>
                <div className="flex-1">
                  <Badge variant="purple">{ev.type}</Badge>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{ev.title}</p>
                  <p className="text-xs text-slate-500">{ev.time} · {ev.mode}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Featured Jobs */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900">Recommended Jobs</h2>
            <Link to="/dashboard/jobs"><Button variant="ghost" size="sm">View all</Button></Link>
          </div>
          <div className="space-y-3">
            {featuredJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 text-xs font-bold text-white">{job.logo}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{job.title}</p>
                    <p className="text-xs text-slate-500">{job.company} · {job.salary}</p>
                  </div>
                </div>
                {job.matchScore && <Badge variant="success">{job.matchScore}%</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
