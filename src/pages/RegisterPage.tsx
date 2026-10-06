import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, User, Briefcase, GraduationCap, Calendar, Shield, Award } from 'lucide-react';
import { Logo, Button, Card } from '@/components/ui';
import { ROLES } from '@/data';
import type { Role } from '@/types';
import { useAuth } from '@/auth';

const roleIcons: Record<string, typeof User> = {
  candidate: User, mentor: GraduationCap, job_poster: Briefcase, organizer: Calendar, admin: Shield, alumni: Award,
};

export function RegisterPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const { register } = useAuth();
  const navigate = useNavigate();

  const toggleRole = (id: string) => {
    const role = id as Role;
    setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name || 'New User', email || 'new@email.com', selectedRoles.length > 0 ? selectedRoles : ['candidate']);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-teal-50 px-4 py-8">
      <div className="w-full max-w-lg">
        <Link to="/" className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
        <Card className="p-8 shadow-xl shadow-slate-200/50">
          <div className="mb-6 flex justify-center"><Logo showText={false} /></div>

          {/* Progress */}
          <div className="mb-6 flex items-center justify-center gap-2">
            {[1, 2].map((s) => (
              <div key={s} className={`h-2 rounded-full transition-all ${s <= step ? 'w-8 bg-blue-600' : 'w-8 bg-slate-200'}`} />
            ))}
          </div>

          {step === 1 && (
            <>
              <h1 className="text-center font-display text-2xl font-bold text-slate-900">Create your account</h1>
              <p className="mt-1 text-center text-sm text-slate-500">Step 1 of 2 — Your details</p>
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Priya Sharma" className="w-full rounded-xl border border-slate-300 py-2.5 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full rounded-xl border border-slate-300 py-2.5 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-300 py-2.5 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                </div>
                <Button type="submit" className="w-full" size="lg">Continue</Button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-center font-display text-2xl font-bold text-slate-900">Choose your roles</h1>
              <p className="mt-1 text-center text-sm text-slate-500">Select all that apply — you can have multiple roles</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {ROLES.map((role) => {
                  const Icon = roleIcons[role.icon] || User;
                  const selected = selectedRoles.includes(role.id as Role);
                  return (
                    <button
                      key={role.id}
                      onClick={() => toggleRole(role.id)}
                      className={`flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all ${selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <Icon className={`h-5 w-5 ${selected ? 'text-blue-600' : 'text-slate-400'}`} />
                        {selected && <Check className="h-4 w-4 text-blue-600" />}
                      </div>
                      <p className="mt-2 font-semibold text-slate-900">{role.label}</p>
                      <p className="text-xs text-slate-500">{role.description}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={handleSubmit} className="flex-1" size="lg">Create Account</Button>
              </div>
            </>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
