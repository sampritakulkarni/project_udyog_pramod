import { useState } from 'react';
import { Search, Star, Clock, X, MessageSquare, Calendar, CheckCircle2 } from 'lucide-react';
import { Card, Badge, Button, EmptyState } from '@/components/ui';
import { mentors } from '@/data';
import type { Mentor } from '@/types';

export function MentorshipPage() {
  const [search, setSearch] = useState('');
  const [expertise, setExpertise] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [requestedMentors, setRequestedMentors] = useState<string[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);

  const allExpertise = [...new Set(mentors.flatMap((m) => m.expertise))];

  const filtered = mentors.filter((m) => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (expertise && !m.expertise.includes(expertise)) return false;
    return true;
  });

  const availVariant = { Available: 'success', Limited: 'warning', Full: 'danger' } as const;

  const sendRequest = () => {
    if (selectedMentor && !requestedMentors.includes(selectedMentor.id)) {
      setRequestedMentors([...requestedMentors, selectedMentor.id]);
    }
    setShowRequestForm(false);
    setSelectedMentor(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Mentorship</h1>
        <p className="mt-1 text-slate-500">Learn from {mentors.length}+ industry mentors</p>
      </div>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or title" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400" />
          </div>
          <select value={expertise} onChange={(e) => setExpertise(e.target.value)} className="rounded-xl border border-slate-200 py-2.5 px-3 text-sm outline-none focus:border-blue-400">
            <option value="">All Expertise</option>
            {allExpertise.map((e) => <option key={e}>{e}</option>)}
          </select>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <Card key={m.id} hover>
            <div className="flex items-start gap-4">
              <img src={m.avatar} alt={m.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-100" />
              <div className="flex-1">
                <h3 className="font-display font-bold text-slate-900">{m.name}</h3>
                <p className="text-xs text-slate-500">{m.title}</p>
                <p className="text-xs font-semibold text-blue-600">{m.company}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /><span className="text-sm font-semibold text-slate-700">{m.rating}</span></span>
              <span className="text-xs text-slate-400">{m.sessions} sessions · {m.hours}h</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {m.expertise.slice(0, 3).map((e) => <Badge key={e} variant="info">{e}</Badge>)}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <Badge variant={availVariant[m.availability]}>{m.availability}</Badge>
              <Button size="sm" variant="outline" onClick={() => setSelectedMentor(m)}>View Profile</Button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && <EmptyState icon={<Search className="h-12 w-12" />} title="No mentors found" description="Try a different search or expertise filter." />}

      {/* Mentor Detail Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { setSelectedMentor(null); setShowRequestForm(false); }}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img src={selectedMentor.avatar} alt={selectedMentor.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-100" />
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900">{selectedMentor.name}</h2>
                  <p className="text-sm text-slate-500">{selectedMentor.title} at {selectedMentor.company}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedMentor(null); setShowRequestForm(false); }} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-slate-50 p-3"><Star className="mx-auto h-5 w-5 fill-amber-400 text-amber-400" /><p className="mt-1 font-bold text-slate-800">{selectedMentor.rating}</p><p className="text-xs text-slate-400">Rating</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><Calendar className="mx-auto h-5 w-5 text-blue-500" /><p className="mt-1 font-bold text-slate-800">{selectedMentor.sessions}</p><p className="text-xs text-slate-400">Sessions</p></div>
              <div className="rounded-xl bg-slate-50 p-3"><Clock className="mx-auto h-5 w-5 text-teal-500" /><p className="mt-1 font-bold text-slate-800">{selectedMentor.hours}h</p><p className="text-xs text-slate-400">Hours</p></div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-slate-800">About</h3>
              <p className="mt-1 text-sm text-slate-600">{selectedMentor.bio}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-slate-800">Expertise</h3>
              <div className="mt-2 flex flex-wrap gap-2">{selectedMentor.expertise.map((e) => <Badge key={e} variant="info">{e}</Badge>)}</div>
            </div>

            {!showRequestForm ? (
              requestedMentors.includes(selectedMentor.id) ? (
                <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-green-50 py-3 font-semibold text-green-600"><CheckCircle2 className="h-5 w-5" /> Request Sent</div>
              ) : (
                <Button className="mt-6 w-full" size="lg" onClick={() => setShowRequestForm(true)}><MessageSquare className="h-4 w-4" /> Request a Session</Button>
              )
            ) : (
              <div className="mt-6 space-y-3 rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-800">Request a Mentoring Session</h3>
                <select className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-400">
                  {selectedMentor.expertise.map((e) => <option key={e}>{e}</option>)}
                </select>
                <textarea placeholder="Tell the mentor what you'd like to discuss..." rows={3} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-400" />
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowRequestForm(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={sendRequest}>Send Request</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
