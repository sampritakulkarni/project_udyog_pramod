import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, GraduationCap, Calendar, Trophy, Users, ArrowRight, Star, MapPin, Clock, TrendingUp, Quote, CheckCircle2, Sparkles } from 'lucide-react';
import { Logo, Card, Badge, Button } from '@/components/ui';
import { jobs, mentors, events, hackathons, alumni } from '@/data';

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            <a href="#jobs" className="text-sm font-medium text-slate-600 hover:text-blue-600">Jobs</a>
            <a href="#mentors" className="text-sm font-medium text-slate-600 hover:text-blue-600">Mentors</a>
            <a href="#events" className="text-sm font-medium text-slate-600 hover:text-blue-600">Events</a>
            <a href="#hackathons" className="text-sm font-medium text-slate-600 hover:text-blue-600">Hackathons</a>
            <a href="#alumni" className="text-sm font-medium text-slate-600 hover:text-blue-600">Alumni</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/register"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-teal-50/30">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info"><Sparkles className="mr-1 h-3 w-3" /> Now with AI-powered resume analysis</Badge>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your Career.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Elevated.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600 sm:text-xl">
              Connect with jobs, mentors, learning programs, events, hackathons, and alumni — all in one platform built for your growth.
            </p>

            {/* Search bar */}
            <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/50">
              <Search className="ml-2 h-5 w-5 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, mentors, events..."
                className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <Link to="/register"><Button size="sm">Search</Button></Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-blue-500" /> 1,890+ Jobs</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-teal-500" /> 342+ Mentors</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-purple-500" /> 87+ Events</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> 456 Placed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section id="jobs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900">Featured Jobs</h2>
            <p className="mt-1 text-slate-500">Hand-picked opportunities matched to your profile</p>
          </div>
          <Link to="/register"><Button variant="outline" size="sm">View all <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.filter((j) => j.featured).slice(0, 3).map((job) => (
            <Card key={job.id} hover className="cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-sm font-bold text-white">{job.logo}</div>
                {job.matchScore && <Badge variant="success">{job.matchScore}% match</Badge>}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{job.title}</h3>
              <p className="text-sm text-slate-500">{job.company}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.type}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="font-semibold text-slate-800">{job.salary}</span>
                <Link to="/register"><Button size="sm" variant="ghost">Apply →</Button></Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Mentors */}
      <section id="mentors" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900">Top Mentors</h2>
              <p className="mt-1 text-slate-500">Learn from industry leaders at Google, Microsoft, Amazon & more</p>
            </div>
            <Link to="/register"><Button variant="outline" size="sm">View all <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mentors.slice(0, 4).map((m) => (
              <Card key={m.id} hover className="text-center">
                <img src={m.avatar} alt={m.name} className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-blue-100" />
                <h3 className="mt-3 font-display font-bold text-slate-900">{m.name}</h3>
                <p className="text-xs text-slate-500">{m.title}</p>
                <p className="text-xs font-semibold text-blue-600">{m.company}</p>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-700">{m.rating}</span>
                  <span className="text-xs text-slate-400">· {m.sessions} sessions</span>
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {m.expertise.slice(0, 2).map((e) => <Badge key={e} variant="info">{e}</Badge>)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Hackathons */}
      <section id="events" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold text-slate-900">Upcoming Events & Hackathons</h2>
          <p className="mt-1 text-slate-500">Learn, compete, and grow with our community</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Events */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-800"><Calendar className="h-5 w-5 text-purple-500" /> Events</h3>
            <div className="space-y-3">
              {events.slice(0, 3).map((ev) => (
                <Card key={ev.id} hover>
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <span className="text-lg font-bold">{new Date(ev.date).getDate()}</span>
                      <span className="text-[10px] uppercase">{new Date(ev.date).toLocaleString('en', { month: 'short' })}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="purple">{ev.type}</Badge>
                        <Badge>{ev.mode}</Badge>
                      </div>
                      <h4 className="mt-1.5 font-semibold text-slate-900">{ev.title}</h4>
                      <p className="mt-0.5 text-xs text-slate-500"><Clock className="mr-1 inline h-3 w-3" />{ev.time} · {ev.duration}</p>
                      <p className="text-xs text-slate-500">{ev.location}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          {/* Hackathons */}
          <div id="hackathons">
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-slate-800"><Trophy className="h-5 w-5 text-amber-500" /> Hackathons</h3>
            <div className="space-y-3">
              {hackathons.filter((h) => h.status === 'upcoming').map((h) => (
                <Card key={h.id} hover>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="warning">{h.status}</Badge>
                      <h4 className="mt-1.5 font-semibold text-slate-900">{h.title}</h4>
                      <p className="text-sm text-slate-500">Theme: {h.theme}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span><Calendar className="mr-1 inline h-3 w-3" />{new Date(h.startDate).toLocaleDateString('en', { day: 'numeric', month: 'short' })}</span>
                        <span><Users className="mr-1 inline h-3 w-3" />{h.registrations} registered</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Prize pool</p>
                      <p className="font-display text-lg font-bold text-amber-600">{h.prize}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="alumni" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900">Success Stories</h2>
            <p className="mt-1 text-slate-500">Real journeys from our community</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alumni.slice(0, 3).map((a) => (
              <Card key={a.id} className="flex flex-col">
                <Quote className="h-8 w-8 text-blue-200" />
                <p className="mt-2 flex-1 text-sm italic text-slate-600">"{a.successStory}"</p>
                <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <img src={a.avatar} alt={a.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.currentRole} at {a.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-teal-500 px-8 py-14 text-center text-white shadow-xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/20 blur-2xl" />
          </div>
          <div className="relative">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to accelerate your career?</h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">Join 12,000+ professionals growing with Udyoga Pramoda. It's free to get started.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/register"><Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">Create Free Account</Button></Link>
              <Link to="/login"><Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">I have an account</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Logo />
            <p className="text-sm text-slate-500">© 2026 Udyoga Pramoda. Empowering careers, one connection at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
