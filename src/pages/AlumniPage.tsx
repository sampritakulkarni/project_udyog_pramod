import { Users, TrendingUp, Award, Heart, ArrowRight, Star } from 'lucide-react';
import { Card, Badge, Button, StatCard } from '@/components/ui';
import { alumni } from '@/data';

export function AlumniPage() {
  const totalReferrals = alumni.reduce((sum, a) => sum + a.referrals, 0);
  const totalMentoring = alumni.reduce((sum, a) => sum + a.mentoringHours, 0);
  const totalSponsorship = alumni.reduce((sum, a) => sum + a.sponsorship, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Alumni & Impact</h1>
        <p className="mt-1 text-slate-500">Our alumni giving back to the community</p>
      </div>

      {/* Impact Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Alumni Network" value={alumni.length * 78} icon={<Users className="h-6 w-6" />} />
        <StatCard label="Total Referrals" value={totalReferrals} icon={<TrendingUp className="h-6 w-6" />} trend="+12 this month" />
        <StatCard label="Mentoring Hours" value={`${totalMentoring}h`} icon={<Heart className="h-6 w-6" />} />
        <StatCard label="Sponsorships" value={`₹${(totalSponsorship / 1000).toFixed(0)}k`} icon={<Award className="h-6 w-6" />} />
      </div>

      {/* Alumni Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {alumni.map((a) => (
          <Card key={a.id} hover>
            <div className="flex items-start gap-4">
              <img src={a.avatar} alt={a.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-100" />
              <div className="flex-1">
                <h3 className="font-display font-bold text-slate-900">{a.name}</h3>
                <p className="text-xs text-slate-500">{a.currentRole} at {a.company}</p>
                <p className="text-xs text-slate-400">Class of {a.graduationYear}</p>
              </div>
            </div>

            <p className="mt-3 text-sm italic text-slate-600">"{a.successStory}"</p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-blue-50 p-2"><TrendingUp className="mx-auto h-4 w-4 text-blue-500" /><p className="mt-0.5 font-bold text-slate-800">{a.referrals}</p><p className="text-[10px] text-slate-400">Referrals</p></div>
              <div className="rounded-lg bg-teal-50 p-2"><Heart className="mx-auto h-4 w-4 text-teal-500" /><p className="mt-0.5 font-bold text-slate-800">{a.mentoringHours}h</p><p className="text-[10px] text-slate-400">Mentoring</p></div>
              <div className="rounded-lg bg-amber-50 p-2"><Award className="mx-auto h-4 w-4 text-amber-500" /><p className="mt-0.5 font-bold text-slate-800">₹{(a.sponsorship / 1000).toFixed(0)}k</p><p className="text-[10px] text-slate-400">Sponsored</p></div>
            </div>

            <div className="mt-3 border-t border-slate-100 pt-3">
              <p className="text-xs font-semibold text-slate-500">Contributions</p>
              <ul className="mt-1 space-y-1">
                {a.contributions.map((c) => <li key={c} className="flex items-center gap-1.5 text-xs text-slate-600"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{c}</li>)}
              </ul>
            </div>

            <Button variant="outline" size="sm" className="mt-4 w-full">Connect <ArrowRight className="h-4 w-4" /></Button>
          </Card>
        ))}
      </div>

      {/* Become Alumni CTA */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-white"><Award className="h-7 w-7" /></div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-slate-900">Are you an alumni?</h3>
            <p className="mt-1 text-sm text-slate-600">Give back to the community by mentoring, referring, or sponsoring. Your experience can change someone's career.</p>
          </div>
          <Button>Join Alumni Network</Button>
        </div>
      </Card>
    </div>
  );
}
