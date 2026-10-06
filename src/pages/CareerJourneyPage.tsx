import { useState } from 'react';
import { User, GraduationCap, BookOpen, Briefcase, Trophy, Award, ArrowRight, X } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { careerJourneyStages } from '@/data';

type JourneyCard = { id: string; name: string; role: string; stage: string };
type Stage = typeof careerJourneyStages[0];

const stageIcons: Record<string, typeof User> = {
  'Registered': User, 'Mentoring': GraduationCap, 'Upskilling': BookOpen,
  'Applying/Interview': Briefcase, 'Got Job': Trophy, 'Alumni': Award,
};

const initialCards: JourneyCard[] = [
  { id: 'c1', name: 'Aarav Patel', role: 'Frontend Developer', stage: 'Registered' },
  { id: 'c2', name: 'Sneha Reddy', role: 'Data Analyst', stage: 'Mentoring' },
  { id: 'c3', name: 'Rohit Kumar', role: 'Backend Engineer', stage: 'Mentoring' },
  { id: 'c4', name: 'Ananya Iyer', role: 'UX Designer', stage: 'Upskilling' },
  { id: 'c5', name: 'Vikram Singh', role: 'DevOps Engineer', stage: 'Upskilling' },
  { id: 'c6', name: 'Priya Sharma', role: 'Full-Stack Developer', stage: 'Applying/Interview' },
  { id: 'c7', name: 'Karthik Rao', role: 'Product Manager', stage: 'Applying/Interview' },
  { id: 'c8', name: 'Deepa Nair', role: 'ML Engineer', stage: 'Got Job' },
  { id: 'c9', name: 'Rohan Mehta', role: 'Senior Engineer', stage: 'Alumni' },
];

export function CareerJourneyPage() {
  const [cards, setCards] = useState<JourneyCard[]>(initialCards);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [detailCard, setDetailCard] = useState<JourneyCard | null>(null);

  const moveCard = (id: string, newStage: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, stage: newStage } : c)));
  };

  const stages = careerJourneyStages as Stage[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Career Journey</h1>
        <p className="mt-1 text-slate-500">Track candidates through their career lifecycle. Drag cards between stages.</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stages.map((s) => {
          const Icon = stageIcons[s.stage] || User;
          return (
            <div key={s.stage} className="rounded-xl border border-slate-200 bg-white p-3 text-center">
              <Icon className="mx-auto h-5 w-5 text-slate-400" />
              <p className="mt-1 font-display text-lg font-bold text-slate-900">{s.count}</p>
              <p className="text-[10px] font-medium text-slate-500">{s.stage}</p>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {stages.map((stage) => {
          const stageCards = cards.filter((c) => c.stage === stage.stage);
          return (
            <div
              key={stage.stage}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (draggedId) { moveCard(draggedId, stage.stage); setDraggedId(null); } }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">{stage.stage}</h3>
                <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">{stageCards.length}</span>
              </div>
              <div className="space-y-2">
                {stageCards.map((c) => (
                  <div
                    key={c.id}
                    draggable
                    onDragStart={() => setDraggedId(c.id)}
                    onDragEnd={() => setDraggedId(null)}
                    onClick={() => setDetailCard(c)}
                    className="cursor-grab rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md active:cursor-grabbing"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-teal-400 text-xs font-bold text-white">{c.name.split(' ').map((n) => n[0]).join('')}</div>
                      <div className="flex-1"><p className="text-sm font-semibold text-slate-800">{c.name}</p><p className="text-xs text-slate-400">{c.role}</p></div>
                    </div>
                  </div>
                ))}
                {stageCards.length === 0 && <p className="py-4 text-center text-xs text-slate-300">Drop here</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {detailCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setDetailCard(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-teal-400 text-sm font-bold text-white">{detailCard.name.split(' ').map((n) => n[0]).join('')}</div>
                <div><h2 className="font-display text-lg font-bold text-slate-900">{detailCard.name}</h2><p className="text-sm text-slate-500">{detailCard.role}</p></div>
              </div>
              <button onClick={() => setDetailCard(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-400">Current Stage</p>
              <Badge variant="info">{detailCard.stage}</Badge>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-slate-500">Move to:</p>
              <div className="flex flex-wrap gap-2">
                {stages.filter((s) => s.stage !== detailCard.stage).map((s) => (
                  <Button key={s.stage} size="sm" variant="outline" onClick={() => { moveCard(detailCard.id, s.stage); setDetailCard({ ...detailCard, stage: s.stage }); }}>{s.stage} <ArrowRight className="h-3 w-3" /></Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
