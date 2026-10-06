import { useState } from 'react';
import { User, Mail, Phone, MapPin, FileText, Briefcase, GraduationCap, Star, Upload, Plus, X, Target, Award } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { useAuth } from '@/auth';

export function CareerPassport() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  if (!user) return null;

  const addSkill = () => {
    if (newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(''); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Career Passport</h1>
          <p className="mt-1 text-slate-500">Your complete career profile</p>
        </div>
        <Button variant={editing ? 'primary' : 'outline'} size="sm" onClick={() => setEditing(!editing)}>{editing ? 'Save Changes' : 'Edit Profile'}</Button>
      </div>

      {/* Profile Header */}
      <Card>
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-2xl object-cover" />
            <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"><Upload className="h-4 w-4" /></button>
          </div>
          <div className="flex-1">
            <h2 className="font-display text-2xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-slate-600">{user.headline}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" />{user.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" />{user.phone}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{user.location}</span>
            </div>
            <div className="mt-3 flex gap-2">
              {user.roles.map((r) => <Badge key={r} variant="info">{r.replace('_', ' ')}</Badge>)}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* About */}
          <Card>
            <h3 className="mb-3 font-display text-lg font-bold text-slate-900">About</h3>
            <p className="text-sm leading-relaxed text-slate-600">{user.bio}</p>
          </Card>

          {/* Experience */}
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-slate-900"><Briefcase className="h-5 w-5 text-blue-500" /> Experience</h3>
              {editing && <Button size="sm" variant="ghost"><Plus className="h-4 w-4" /></Button>}
            </div>
            <div className="space-y-4">
              {user.experience?.map((exp) => (
                <div key={exp.id} className="relative border-l-2 border-slate-200 pl-4">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-blue-500" />
                  <p className="font-semibold text-slate-800">{exp.role}</p>
                  <p className="text-sm text-blue-600">{exp.company}</p>
                  <p className="text-xs text-slate-400">{exp.startDate} — {exp.endDate || 'Present'}</p>
                  <p className="mt-1 text-sm text-slate-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Education */}
          <Card>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-900"><GraduationCap className="h-5 w-5 text-teal-500" /> Education</h3>
            <div className="space-y-3">
              {user.education?.map((ed) => (
                <div key={ed.id} className="rounded-xl border border-slate-100 p-3">
                  <p className="font-semibold text-slate-800">{ed.degree} {ed.field}</p>
                  <p className="text-sm text-slate-500">{ed.institution}</p>
                  <p className="text-xs text-slate-400">{ed.startYear} — {ed.endYear}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Learning History */}
          <Card>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-900"><Award className="h-5 w-5 text-purple-500" /> Learning History</h3>
            <div className="space-y-2">
              {user.learningHistory?.map((l) => (
                <div key={l.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{l.programName}</p>
                    <p className="text-xs text-slate-400">{l.type} · {new Date(l.completedDate).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  {l.certificate && <Badge variant="success">Certified</Badge>}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Skills */}
          <Card>
            <h3 className="mb-3 font-display text-lg font-bold text-slate-900">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {s}
                  {editing && <X className="h-3 w-3 cursor-pointer" onClick={() => setSkills(skills.filter((x) => x !== s))} />}
                </span>
              ))}
            </div>
            {editing && (
              <div className="mt-3 flex gap-2">
                <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill()} placeholder="Add skill" className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-blue-400" />
                <Button size="sm" onClick={addSkill}><Plus className="h-4 w-4" /></Button>
              </div>
            )}
          </Card>

          {/* Career Goals */}
          <Card>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-900"><Target className="h-5 w-5 text-amber-500" /> Career Goals</h3>
            <p className="text-sm text-slate-600">{user.careerGoals}</p>
          </Card>

          {/* Resume */}
          <Card>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-900"><FileText className="h-5 w-5 text-slate-500" /> Resume</h3>
            <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
              <FileText className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-2 text-sm font-medium text-slate-700">resume.pdf</p>
              <p className="text-xs text-slate-400">Uploaded 2 months ago</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">Replace</Button>
                <Button size="sm" variant="ghost" className="flex-1">Download</Button>
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-blue-50 p-3">
              <p className="text-xs font-semibold text-blue-700">✨ AI Resume Analysis</p>
              <p className="mt-0.5 text-xs text-blue-600">Get AI-powered feedback and suggestions to improve your resume.</p>
              <Button size="sm" variant="ghost" className="mt-2 w-full text-blue-600">Analyze with AI →</Button>
            </div>
          </Card>

          {/* Mentoring History */}
          <Card>
            <h3 className="mb-3 font-display text-lg font-bold text-slate-900">Mentoring History</h3>
            <div className="space-y-2">
              {user.mentoringHistory?.map((m) => (
                <div key={m.id} className="rounded-lg border border-slate-100 p-2.5">
                  <p className="text-sm font-semibold text-slate-800">{m.topic}</p>
                  <p className="text-xs text-slate-500">{m.mentorName} · {m.duration} min</p>
                  <p className="text-xs text-slate-400">{new Date(m.date).toLocaleDateString('en', { day: 'numeric', month: 'short' })}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
