import { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, X, Plus, Upload, Star, Clock, CheckCircle2 } from 'lucide-react';
import { Card, Badge, Button, EmptyState } from '@/components/ui';
import { jobs as allJobs } from '@/data';
import type { Job } from '@/types';
import { useAuth } from '@/auth';

const CATEGORIES = ['Engineering', 'Product', 'Design', 'Data', 'DevOps', 'Other'];
const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

export function JobsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(user?.applications?.map((a) => a.jobId) || []);

  const filtered = allJobs.filter((j) => {
    if (j.status !== 'approved') return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (category && j.category !== category) return false;
    if (type && j.type !== type) return false;
    return true;
  });

  const apply = (job: Job) => {
    if (!appliedJobs.includes(job.id)) {
      setAppliedJobs([...appliedJobs, job.id]);
      setSelectedJob(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Jobs</h1>
          <p className="mt-1 text-slate-500">{filtered.length} open positions matched to you</p>
        </div>
        {(user?.roles.includes('job_poster') || user?.roles.includes('admin')) && (
          <Button onClick={() => setShowPostForm(true)}><Plus className="h-4 w-4" /> Post a Job</Button>
        )}
      </div>

      {/* Search & Filters */}
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or company" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400" />
          </div>
          <div className="flex gap-3">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-slate-200 py-2.5 px-3 text-sm outline-none focus:border-blue-400">
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border border-slate-200 py-2.5 px-3 text-sm outline-none focus:border-blue-400">
              <option value="">All Types</option>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </Card>

      {/* Jobs grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((job) => (
          <Card key={job.id} hover className="cursor-pointer" >
            <div onClick={() => setSelectedJob(job)}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-sm font-bold text-white">{job.logo}</div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900">{job.title}</h3>
                    <p className="text-sm text-slate-500">{job.company}</p>
                  </div>
                </div>
                {job.matchScore && <Badge variant="success">{job.matchScore}% match</Badge>}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge><MapPin className="mr-1 h-3 w-3" />{job.location}</Badge>
                <Badge variant="info"><Briefcase className="mr-1 h-3 w-3" />{job.type}</Badge>
                <Badge variant="purple">{job.category}</Badge>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-slate-600">{job.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="font-semibold text-slate-800">{job.salary}</span>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span><Clock className="mr-1 inline h-3 w-3" />{new Date(job.postedDate).toLocaleDateString('en', { day: 'numeric', month: 'short' })}</span>
                  <span>{job.applicants} applicants</span>
                </div>
              </div>
              {appliedJobs.includes(job.id) && (
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-green-600"><CheckCircle2 className="h-4 w-4" /> Applied</div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && <EmptyState icon={<Briefcase className="h-12 w-12" />} title="No jobs found" description="Try adjusting your search or filters to find more opportunities." />}

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedJob(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 text-lg font-bold text-white">{selectedJob.logo}</div>
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900">{selectedJob.title}</h2>
                  <p className="text-slate-500">{selectedJob.company}</p>
                </div>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge><MapPin className="mr-1 h-3 w-3" />{selectedJob.location}</Badge>
              <Badge variant="info"><Briefcase className="mr-1 h-3 w-3" />{selectedJob.type}</Badge>
              <Badge variant="purple">{selectedJob.category}</Badge>
              {selectedJob.matchScore && <Badge variant="success">{selectedJob.matchScore}% match</Badge>}
            </div>
            <p className="mt-2 text-lg font-semibold text-slate-800">{selectedJob.salary}</p>
            <div className="mt-6">
              <h3 className="font-display font-bold text-slate-900">Description</h3>
              <p className="mt-2 text-sm text-slate-600">{selectedJob.description}</p>
            </div>
            <div className="mt-6">
              <h3 className="font-display font-bold text-slate-900">Requirements</h3>
              <ul className="mt-2 space-y-1.5">
                {selectedJob.requirements.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-green-500" />{r}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex gap-3">
              {appliedJobs.includes(selectedJob.id) ? (
                <Button disabled className="flex-1"><CheckCircle2 className="h-4 w-4" /> Application Submitted</Button>
              ) : (
                <Button onClick={() => apply(selectedJob)} className="flex-1"><Upload className="h-4 w-4" /> Apply with Resume</Button>
              )}
              <Button variant="outline"><Star className="h-4 w-4" /> Save</Button>
            </div>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowPostForm(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-slate-900">Post a New Job</h2>
              <button onClick={() => setShowPostForm(false)} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setShowPostForm(false); }} className="mt-4 space-y-3">
              <input required placeholder="Job Title" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
              <input required placeholder="Company Name" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Location" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
                <input required placeholder="Salary Range" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
              </div>
              <select className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-400">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <textarea required placeholder="Job Description" rows={4} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-400" />
              <p className="text-xs text-slate-400">Jobs are reviewed by admin before going live.</p>
              <Button type="submit" className="w-full" size="lg">Submit for Approval</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
