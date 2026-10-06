import { Users, Briefcase, GraduationCap, Calendar, TrendingUp, Clock, CheckCircle2, AlertCircle, X, Shield } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, StatCard, Badge, Button } from '@/components/ui';
import { adminStats, growthData, categoryData, jobs } from '@/data';

const PIE_COLORS = ['#2563eb', '#0d9488', '#8b5cf6', '#f59e0b', '#ef4444', '#64748b'];

const pendingJobs = jobs.filter((j) => j.status === 'pending');

export function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900"><Shield className="h-6 w-6 text-blue-600" /> Admin Dashboard</h1>
          <p className="mt-1 text-slate-500">Platform overview and management</p>
        </div>
        <Button variant="outline" size="sm">Export Report</Button>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value={adminStats.totalUsers.toLocaleString()} icon={<Users className="h-6 w-6" />} trend="+480 this month" />
        <StatCard label="Jobs Posted" value={adminStats.jobsPosted} icon={<Briefcase className="h-6 w-6" />} />
        <StatCard label="Placements" value={adminStats.placements} icon={<CheckCircle2 className="h-6 w-6" />} trend="+44 this month" />
        <StatCard label="Pending Approvals" value={adminStats.pendingApprovals} icon={<AlertCircle className="h-6 w-6" />} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Mentors" value={adminStats.activeMentors} icon={<GraduationCap className="h-6 w-6" />} />
        <StatCard label="Events Hosted" value={adminStats.eventsHosted} icon={<Calendar className="h-6 w-6" />} />
        <StatCard label="Hackathons" value={adminStats.hackathons} icon={<TrendingUp className="h-6 w-6" />} />
        <StatCard label="Mentoring Hours" value={adminStats.totalMentoringHours.toLocaleString()} icon={<Clock className="h-6 w-6" />} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Growth chart */}
        <Card>
          <h3 className="mb-4 font-display text-lg font-bold text-slate-900">User Growth & Placements</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} /><stop offset="100%" stopColor="#2563eb" stopOpacity={0} /></linearGradient>
                <linearGradient id="placeGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0d9488" stopOpacity={0.3} /><stop offset="100%" stopColor="#0d9488" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} fill="url(#userGrad)" name="Users" />
              <Area type="monotone" dataKey="placements" stroke="#0d9488" strokeWidth={2} fill="url(#placeGrad)" name="Placements" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Category distribution */}
        <Card>
          <h3 className="mb-4 font-display text-lg font-bold text-slate-900">Jobs by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3}>
                {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {categoryData.map((c, i) => (
              <span key={c.name} className="flex items-center gap-1.5 text-xs text-slate-600"><span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />{c.name} ({c.value})</span>
            ))}
          </div>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-slate-900"><AlertCircle className="h-5 w-5 text-amber-500" /> Pending Job Approvals</h3>
          <Badge variant="warning">{pendingJobs.length} pending</Badge>
        </div>
        <div className="space-y-3">
          {pendingJobs.length > 0 ? pendingJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{job.logo}</div>
                <div><p className="font-semibold text-slate-800">{job.title}</p><p className="text-xs text-slate-500">{job.company} · {job.location}</p></div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">Approve</Button>
                <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">Reject</Button>
              </div>
            </div>
          )) : <p className="py-4 text-center text-sm text-slate-400">No pending approvals.</p>}
        </div>
      </Card>

      {/* Recent Users Table */}
      <Card>
        <h3 className="mb-4 font-display text-lg font-bold text-slate-900">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-left text-xs text-slate-500">
              <th className="pb-2 font-semibold">Name</th><th className="pb-2 font-semibold">Role</th><th className="pb-2 font-semibold">Joined</th><th className="pb-2 font-semibold">Status</th>
            </tr></thead>
            <tbody>
              {[
                { name: 'Aarav Patel', role: 'Candidate', joined: '2 hours ago', status: 'active' },
                { name: 'Sneha Reddy', role: 'Mentor', joined: '5 hours ago', status: 'active' },
                { name: 'CloudNine Tech', role: 'Job Poster', joined: '1 day ago', status: 'active' },
                { name: 'Rohit Kumar', role: 'Candidate', joined: '2 days ago', status: 'pending' },
                { name: 'Ananya Iyer', role: 'Alumni', joined: '3 days ago', status: 'active' },
              ].map((u) => (
                <tr key={u.name} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 font-medium text-slate-800">{u.name}</td>
                  <td className="py-3"><Badge variant="info">{u.role}</Badge></td>
                  <td className="py-3 text-slate-500">{u.joined}</td>
                  <td className="py-3"><Badge variant={u.status === 'active' ? 'success' : 'warning'}>{u.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
