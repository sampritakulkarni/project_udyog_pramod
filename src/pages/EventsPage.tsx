import { useState } from 'react';
import { Calendar, Clock, MapPin, X, User, CheckCircle2, Video, Users } from 'lucide-react';
import { Card, Badge, Button, EmptyState } from '@/components/ui';
import { events } from '@/data';
import type { EventItem } from '@/types';

const TYPE_VARIANTS = { Workshop: 'info', Webinar: 'purple', Upskilling: 'info', 'Vichara Vahini': 'warning', Expo: 'purple', 'Career Fair': 'success' } as const;

export function EventsPage() {
  const [filter, setFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registered, setRegistered] = useState<string[]>([]);

  const types = [...new Set(events.map((e) => e.type))];
  const filtered = filter ? events.filter((e) => e.type === filter) : events;

  const register = () => {
    if (selectedEvent && !registered.includes(selectedEvent.id)) {
      setRegistered([...registered, selectedEvent.id]);
    }
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Events & Learning</h1>
        <p className="mt-1 text-slate-500">Workshops, webinars, upskilling programs, and more</p>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('')} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${!filter ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>All</button>
        {types.map((t) => (
          <button key={t} onClick={() => setFilter(t)} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === t ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>{t}</button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ev) => {
          const pct = Math.round((ev.registrations / ev.capacity) * 100);
          return (
            <Card key={ev.id} hover className="cursor-pointer" >
              <div onClick={() => setSelectedEvent(ev)}>
                <div className="flex items-center justify-between">
                  <Badge variant={TYPE_VARIANTS[ev.type]}>{ev.type}</Badge>
                  <Badge>{ev.mode}</Badge>
                </div>
                <h3 className="mt-3 font-display font-bold text-slate-900">{ev.title}</h3>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(ev.date).toLocaleDateString('en', { weekday: 'short', day: 'numeric', month: 'long' })} · {ev.time}</p>
                  <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{ev.duration}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{ev.location}</p>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-400"><span>{ev.registrations} / {ev.capacity}</span><span>{pct}% full</span></div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400" style={{ width: `${pct}%` }} /></div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-sm font-semibold text-slate-700">{ev.price}</span>
                  {registered.includes(ev.id) ? <span className="flex items-center gap-1 text-sm font-semibold text-green-600"><CheckCircle2 className="h-4 w-4" /> Registered</span> : <span className="text-sm font-semibold text-blue-600">Register →</span>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && <EmptyState icon={<Calendar className="h-12 w-12" />} title="No events found" description="Check back later for new events." />}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedEvent(null)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className="flex gap-2">
                <Badge variant={TYPE_VARIANTS[selectedEvent.type]}>{selectedEvent.type}</Badge>
                <Badge>{selectedEvent.mode}</Badge>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-slate-900">{selectedEvent.title}</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-blue-500" />{new Date(selectedEvent.date).toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-500" />{selectedEvent.time} · {selectedEvent.duration}</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-500" />{selectedEvent.location}</p>
              {selectedEvent.speaker && <p className="flex items-center gap-2"><User className="h-4 w-4 text-blue-500" />Speaker: {selectedEvent.speaker}</p>}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-slate-800">About this event</h3>
              <p className="mt-1 text-sm text-slate-600">{selectedEvent.description}</p>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              {selectedEvent.mode !== 'In-person' ? <Video className="h-5 w-5 text-blue-500" /> : <Users className="h-5 w-5 text-blue-500" />}
              <p className="text-sm text-slate-600">{selectedEvent.registrations} registered · {selectedEvent.capacity - selectedEvent.registrations} spots left</p>
            </div>
            {registered.includes(selectedEvent.id) ? (
              <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-green-50 py-3 font-semibold text-green-600"><CheckCircle2 className="h-5 w-5" /> You're registered!</div>
            ) : (
              <Button className="mt-6 w-full" size="lg" onClick={register}>Register for {selectedEvent.price === 'Free' ? 'Free' : selectedEvent.price}</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
