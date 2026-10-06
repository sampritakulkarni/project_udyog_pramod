import { useState } from 'react';
import { Trophy, Users, Calendar, MapPin, X, Code, Plus, CheckCircle2, Zap } from 'lucide-react';
import { Card, Badge, Button, EmptyState } from '@/components/ui';
import { hackathons } from '@/data';
import type { Hackathon } from '@/types';

export function HackathonsPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<Hackathon | null>(null);
  const [registered, setRegistered] = useState<string[]>([]);

  const filtered = statusFilter ? hackathons.filter((h) => h.status === statusFilter) : hackathons;
  const statusVariant = { upcoming: 'warning', ongoing: 'success', completed: 'default' } as const;

  const register = () => {
    if (selected && !registered.includes(selected.id)) setRegistered([...registered, selected.id]);
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Hackathons</h1>
          <p className="mt-1 text-slate-500">Compete, build, and win prizes</p>
        </div>
        <Button variant="outline"><Plus className="h-4 w-4" /> Create Hackathon</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['', 'upcoming', 'ongoing', 'completed'].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${statusFilter === s ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>{s || 'All'}</button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((h) => (
          <Card key={h.id} hover className="cursor-pointer" >
            <div onClick={() => setSelected(h)}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white"><Trophy className="h-6 w-6" /></div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900">{h.title}</h3>
                    <p className="text-xs text-slate-500">Theme: {h.theme}</p>
                  </div>
                </div>
                <Badge variant={statusVariant[h.status]}>{h.status}</Badge>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(h.startDate).toLocaleDateString('en', { day: 'numeric', month: 'short' })} - {new Date(h.endDate).toLocaleDateString('en', { day: 'numeric', month: 'short' })}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{h.mode}</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />Team of up to {h.teamSize}</span>
                <span className="flex items-center gap-1.5"><Code className="h-3.5 w-3.5" />{h.problems.length} problem statements</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div><p className="text-xs text-slate-400">Prize pool</p><p className="font-display text-lg font-bold text-amber-600">{h.prize}</p></div>
                <div className="text-right"><p className="text-xs text-slate-400">{h.registrations} registered</p>{registered.includes(h.id) ? <span className="flex items-center gap-1 text-sm font-semibold text-green-600"><CheckCircle2 className="h-4 w-4" /> Registered</span> : <span className="text-sm font-semibold text-blue-600">View Details →</span>}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && <EmptyState icon={<Trophy className="h-12 w-12" />} title="No hackathons found" description="Check back soon for new challenges." />}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white"><Trophy className="h-6 w-6" /></div>
                <div><h2 className="font-display text-xl font-bold text-slate-900">{selected.title}</h2><p className="text-sm text-slate-500">Theme: {selected.theme}</p></div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-slate-50 p-3"><Calendar className="h-4 w-4 text-blue-500" /><p className="mt-1 font-semibold text-slate-800">{new Date(selected.startDate).toLocaleDateString('en', { day: 'numeric', month: 'short' })} - {new Date(selected.endDate).toLocaleDateString('en', { day: 'numeric', month: 'short' })}</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><MapPin className="h-4 w-4 text-blue-500" /><p className="mt-1 font-semibold text-slate-800">{selected.mode}</p></div>
              <div className="rounded-xl bg-amber-50 p-3"><Trophy className="h-4 w-4 text-amber-500" /><p className="mt-1 font-semibold text-amber-700">{selected.prize}</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><Users className="h-4 w-4 text-blue-500" /><p className="mt-1 font-semibold text-slate-800">Team of {selected.teamSize}</p></div>
            </div>

            <h3 className="mt-6 font-semibold text-slate-800">Problem Statements</h3>
            <div className="mt-2 space-y-3">
              {selected.problems.map((p) => {
                const diffVariant = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger' } as const;
                return (
                  <div key={p.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between"><h4 className="font-semibold text-slate-800">{p.title}</h4><Badge variant={diffVariant[p.difficulty]}>{p.difficulty}</Badge></div>
                    <p className="mt-1 text-sm text-slate-600">{p.description}</p>
                  </div>
                );
              })}
            </div>

            {registered.includes(selected.id) ? (
              <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-green-50 py-3 font-semibold text-green-600"><CheckCircle2 className="h-5 w-5" /> You're registered!</div>
            ) : (
              <Button className="mt-6 w-full" size="lg" onClick={register}><Zap className="h-4 w-4" /> Register & Form Team</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
