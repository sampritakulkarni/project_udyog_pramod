export type Role = 'candidate' | 'mentor' | 'job_poster' | 'organizer' | 'admin' | 'alumni';

export type User = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  avatar: string;
  headline?: string;
  bio?: string;
  location?: string;
  phone?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  careerGoals?: string;
  resumeUrl?: string;
  mentoringHours?: number;
  applications?: Application[];
  learningHistory?: LearningRecord[];
  mentoringHistory?: MentoringRecord[];
  expertise?: string[];
  availability?: string;
  sponsorships?: number;
  referrals?: number;
  contributions?: string[];
  successStory?: string;
  jobApplications?: string[];
  journeyStage?: JourneyStage;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  category: string;
  salary: string;
  description: string;
  requirements: string[];
  postedBy: string;
  postedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  applicants: number;
  featured: boolean;
  matchScore?: number;
};

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'submitted' | 'reviewing' | 'interview' | 'offered' | 'rejected';
  appliedDate: string;
};

export type Mentor = {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  sessions: number;
  hours: number;
  availability: 'Available' | 'Limited' | 'Full';
  bio: string;
  pricePerSession: number;
};

export type EventItem = {
  id: string;
  title: string;
  type: 'Workshop' | 'Webinar' | 'Upskilling' | 'Vichara Vahini' | 'Expo' | 'Career Fair';
  date: string;
  time: string;
  duration: string;
  location: string;
  mode: 'Online' | 'In-person' | 'Hybrid';
  description: string;
  speaker?: string;
  registrations: number;
  capacity: number;
  imageUrl: string;
  price: string;
};

export type Hackathon = {
  id: string;
  title: string;
  theme: string;
  startDate: string;
  endDate: string;
  location: string;
  mode: 'Online' | 'In-person' | 'Hybrid';
  prize: string;
  teamSize: number;
  registrations: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  problems: ProblemStatement[];
};

export type ProblemStatement = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
};

export type Alumni = {
  id: string;
  name: string;
  avatar: string;
  graduationYear: number;
  currentRole: string;
  company: string;
  referrals: number;
  mentoringHours: number;
  contributions: string[];
  successStory: string;
  sponsorship: number;
};

export type LearningRecord = {
  id: string;
  programName: string;
  type: string;
  completedDate: string;
  certificate: boolean;
};

export type MentoringRecord = {
  id: string;
  mentorName: string;
  topic: string;
  date: string;
  duration: number;
};

export type JourneyStage =
  | 'Registered'
  | 'Mentoring'
  | 'Upskilling'
  | 'Applying/Interview'
  | 'Got Job'
  | 'Alumni';
