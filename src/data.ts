import type { User, Job, Mentor, EventItem, Hackathon, Alumni } from './types';

export const ROLES: { id: string; label: string; description: string; icon: string }[] = [
  { id: 'candidate', label: 'Candidate', description: 'Seeking jobs, mentorship, and upskilling', icon: 'User' },
  { id: 'mentor', label: 'Mentor', description: 'Guide candidates with your expertise', icon: 'GraduationCap' },
  { id: 'job_poster', label: 'Job Poster', description: 'Post jobs and hire talent', icon: 'Briefcase' },
  { id: 'organizer', label: 'Organizer', description: 'Create events, hackathons, and programs', icon: 'Calendar' },
  { id: 'admin', label: 'Admin', description: 'Manage platform, users, and approvals', icon: 'Shield' },
  { id: 'alumni', label: 'Alumni', description: 'Refer, mentor, and give back to the community', icon: 'Award' },
];

export const currentUser: User = {
  id: 'u1',
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  roles: ['candidate', 'alumni'],
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  headline: 'Full-Stack Developer | React & Node.js',
  bio: 'Passionate developer with 3 years of experience building web applications. Looking to grow into a senior role while mentoring junior developers.',
  location: 'Bengaluru, India',
  phone: '+91 98765 43210',
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Tailwind CSS'],
  experience: [
    { id: 'e1', company: 'TechSphere Solutions', role: 'Software Developer', startDate: '2023-06', endDate: null, description: 'Building customer-facing web apps with React and Node.js. Led migration to TypeScript.' },
    { id: 'e2', company: 'StartupHub India', role: 'Junior Frontend Developer', startDate: '2022-01', endDate: '2023-05', description: 'Developed responsive landing pages and admin dashboards for SaaS clients.' },
  ],
  education: [
    { id: 'ed1', institution: 'RV College of Engineering', degree: 'B.E.', field: 'Computer Science', startYear: 2018, endYear: 2022 },
  ],
  careerGoals: 'Transition into a Senior Developer role within 2 years. Contribute to open-source projects.',
  resumeUrl: '/resume.pdf',
  mentoringHours: 24,
  applications: [
    { id: 'a1', jobId: 'j1', jobTitle: 'Senior Frontend Engineer', company: 'CloudNine Tech', status: 'interview', appliedDate: '2026-09-28' },
    { id: 'a2', jobId: 'j2', jobTitle: 'Full-Stack Developer', company: 'DataFlow Systems', status: 'reviewing', appliedDate: '2026-09-20' },
    { id: 'a3', jobId: 'j3', jobTitle: 'React Developer', company: 'PixelForge Labs', status: 'submitted', appliedDate: '2026-10-01' },
  ],
  learningHistory: [
    { id: 'l1', programName: 'Advanced React Patterns', type: 'Workshop', completedDate: '2026-08-15', certificate: true },
    { id: 'l2', programName: 'System Design Fundamentals', type: 'Upskilling', completedDate: '2026-07-20', certificate: true },
    { id: 'l3', programName: 'AWS Cloud Practitioner', type: 'Webinar', completedDate: '2026-06-10', certificate: false },
  ],
  mentoringHistory: [
    { id: 'm1', mentorName: 'Dr. Rajesh Kumar', topic: 'Career Transition Strategy', date: '2026-09-15', duration: 60 },
    { id: 'm2', mentorName: 'Anita Desai', topic: 'System Design Basics', date: '2026-08-22', duration: 90 },
  ],
  referrals: 3,
  contributions: ['Mentored 4 junior developers', 'Sponsored 2 hackathons', 'Referred 3 candidates'],
  successStory: 'From a small-town graduate to a full-stack developer at a leading tech company — Udyoga Pramoda helped me find my path.',
  journeyStage: 'Applying/Interview',
};

export const jobs: Job[] = [
  { id: 'j1', title: 'Senior Frontend Engineer', company: 'CloudNine Tech', logo: 'CC', location: 'Bengaluru, India', type: 'Full-time', category: 'Engineering', salary: '₹18-25 LPA', description: 'Lead frontend architecture for our cloud management platform. Build scalable React applications with a focus on performance and accessibility.', requirements: ['5+ years React', 'TypeScript', 'Performance optimization', 'Team leadership'], postedBy: 'CloudNine HR', postedDate: '2026-09-25', status: 'approved', applicants: 47, featured: true, matchScore: 92 },
  { id: 'j2', title: 'Full-Stack Developer', company: 'DataFlow Systems', logo: 'DF', location: 'Remote', type: 'Remote', category: 'Engineering', salary: '₹12-18 LPA', description: 'Join our platform team to build data pipeline tools. Work across React, Node.js, and PostgreSQL.', requirements: ['React', 'Node.js', 'PostgreSQL', '3+ years experience'], postedBy: 'DataFlow Recruiter', postedDate: '2026-09-22', status: 'approved', applicants: 31, featured: true, matchScore: 88 },
  { id: 'j3', title: 'React Developer', company: 'PixelForge Labs', logo: 'PF', location: 'Hyderabad, India', type: 'Full-time', category: 'Engineering', salary: '₹8-14 LPA', description: 'Build beautiful, interactive user interfaces for our design tool used by 50,000+ creators.', requirements: ['React', 'Tailwind CSS', 'Framer Motion', '2+ years'], postedBy: 'PixelForge Team', postedDate: '2026-09-30', status: 'approved', applicants: 22, featured: false, matchScore: 85 },
  { id: 'j4', title: 'Product Manager', company: 'GrowthJet', logo: 'GJ', location: 'Mumbai, India', type: 'Full-time', category: 'Product', salary: '₹20-30 LPA', description: 'Drive product strategy for our B2B SaaS platform. Own roadmap, user research, and cross-functional execution.', requirements: ['4+ years PM experience', 'B2B SaaS', 'Analytics', 'Roadmapping'], postedBy: 'GrowthJet HR', postedDate: '2026-09-18', status: 'approved', applicants: 56, featured: true, matchScore: 65 },
  { id: 'j5', title: 'DevOps Engineer', company: 'InfraBridge', logo: 'IB', location: 'Pune, India', type: 'Full-time', category: 'DevOps', salary: '₹14-22 LPA', description: 'Manage CI/CD pipelines, Kubernetes clusters, and cloud infrastructure for enterprise clients.', requirements: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'], postedBy: 'InfraBridge', postedDate: '2026-09-15', status: 'approved', applicants: 19, featured: false, matchScore: 72 },
  { id: 'j6', title: 'UX Designer', company: 'CreativeWorks', logo: 'CW', location: 'Remote', type: 'Contract', category: 'Design', salary: '₹10-16 LPA', description: 'Design intuitive interfaces for our fintech products. Conduct user research and create high-fidelity prototypes.', requirements: ['Figma', 'User research', 'Prototyping', '3+ years'], postedBy: 'CreativeWorks', postedDate: '2026-09-28', status: 'pending', applicants: 0, featured: false },
  { id: 'j7', title: 'Data Scientist', company: 'MLForge AI', logo: 'ML', location: 'Bengaluru, India', type: 'Full-time', category: 'Data', salary: '₹16-24 LPA', description: 'Build ML models for recommendation systems. Work with large-scale data and deploy models to production.', requirements: ['Python', 'PyTorch', 'MLOps', '4+ years'], postedBy: 'MLForge', postedDate: '2026-09-20', status: 'approved', applicants: 38, featured: true, matchScore: 70 },
  { id: 'j8', title: 'Backend Engineer (Intern)', company: 'StartupHub', logo: 'SH', location: 'Remote', type: 'Internship', category: 'Engineering', salary: '₹25k-40k/month', description: 'Learn backend development with Node.js and PostgreSQL. Great opportunity for final-year students.', requirements: ['Basic Node.js', 'SQL', 'Eager to learn'], postedBy: 'StartupHub', postedDate: '2026-10-01', status: 'approved', applicants: 12, featured: false, matchScore: 80 },
];

export const mentors: Mentor[] = [
  { id: 'mt1', name: 'Dr. Rajesh Kumar', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Principal Engineer', company: 'Google', expertise: ['System Design', 'Career Growth', 'Technical Leadership'], rating: 4.9, sessions: 320, hours: 480, availability: 'Available', bio: '15+ years in tech. Passionate about helping engineers level up their careers and technical skills.', pricePerSession: 0 },
  { id: 'mt2', name: 'Anita Desai', avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Senior Product Manager', company: 'Microsoft', expertise: ['Product Management', 'Interview Prep', 'Strategy'], rating: 4.8, sessions: 210, hours: 315, availability: 'Available', bio: 'Helping aspiring PMs crack interviews and build winning product strategies.', pricePerSession: 500 },
  { id: 'mt3', name: 'Vikram Patel', avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Staff Engineer', company: 'Amazon', expertise: ['Cloud Architecture', 'DevOps', 'AWS'], rating: 4.7, sessions: 180, hours: 270, availability: 'Limited', bio: 'AWS expert. Mentoring engineers on cloud certifications and infrastructure design.', pricePerSession: 800 },
  { id: 'mt4', name: 'Sneha Reddy', avatar: 'https://images.pexels.com/photos/3760187/pexels-photo-3760187.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Engineering Manager', company: 'Netflix', expertise: ['Leadership', 'Team Building', 'Frontend Architecture'], rating: 5.0, sessions: 150, hours: 225, availability: 'Available', bio: 'From IC to manager — I help engineers navigate career transitions and leadership.', pricePerSession: 1000 },
  { id: 'mt5', name: 'Arjun Nair', avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Data Science Lead', company: 'Swiggy', expertise: ['Machine Learning', 'Python', 'Data Strategy'], rating: 4.6, sessions: 95, hours: 142, availability: 'Full', bio: 'ML practitioner helping data enthusiasts build real-world projects and portfolios.', pricePerSession: 600 },
  { id: 'mt6', name: 'Kavya Iyer', avatar: 'https://images.pexels.com/photos/38289/pexels-photo-38289.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'UX Design Director', company: 'Adobe', expertise: ['UX Research', 'Design Systems', 'Portfolio Review'], rating: 4.9, sessions: 130, hours: 195, availability: 'Available', bio: 'Design leader mentoring UX professionals on portfolios and career growth.', pricePerSession: 700 },
];

export const events: EventItem[] = [
  { id: 'ev1', title: 'Advanced React & Performance', type: 'Workshop', date: '2026-10-12', time: '10:00 AM', duration: '3 hours', location: 'Online (Zoom)', mode: 'Online', description: 'Deep dive into React performance optimization, concurrent features, and server components.', speaker: 'Sneha Reddy', registrations: 145, capacity: 200, imageUrl: '', price: 'Free' },
  { id: 'ev2', title: 'System Design Masterclass', type: 'Upskilling', date: '2026-10-15', time: '6:00 PM', duration: '2 hours', location: 'Bengaluru Hub', mode: 'Hybrid', description: 'Learn to design scalable systems. Covers caching, load balancing, and database sharding.', speaker: 'Dr. Rajesh Kumar', registrations: 89, capacity: 120, imageUrl: '', price: '₹500' },
  { id: 'ev3', title: 'Vichara Vahini: Future of AI', type: 'Vichara Vahini', date: '2026-10-18', time: '5:00 PM', duration: '1.5 hours', location: 'Online', mode: 'Online', description: 'Thought leadership panel on how AI is reshaping careers and industries in 2026.', speaker: 'Industry Leaders', registrations: 320, capacity: 500, imageUrl: '', price: 'Free' },
  { id: 'ev4', title: 'Tech Career Fair 2026', type: 'Career Fair', date: '2026-10-25', time: '9:00 AM', duration: 'Full day', location: 'Bengaluru Convention Center', mode: 'In-person', description: 'Meet 40+ hiring companies. On-spot interviews, resume reviews, and networking.', registrations: 560, capacity: 1000, imageUrl: '', price: 'Free' },
  { id: 'ev5', title: 'UX Design Expo', type: 'Expo', date: '2026-11-02', time: '11:00 AM', duration: '4 hours', location: 'Hyderabad', mode: 'In-person', description: 'Showcase your design work, get feedback from industry experts, and network with peers.', registrations: 78, capacity: 150, imageUrl: '', price: '₹300' },
  { id: 'ev6', title: 'Cracking PM Interviews', type: 'Webinar', date: '2026-10-10', time: '7:00 PM', duration: '1.5 hours', location: 'Online', mode: 'Online', description: 'Everything you need to know about product management interviews at top tech companies.', speaker: 'Anita Desai', registrations: 210, capacity: 300, imageUrl: '', price: 'Free' },
];

export const hackathons: Hackathon[] = [
  { id: 'h1', title: 'CodeBloom 2026', theme: 'AI for Social Good', startDate: '2026-10-20', endDate: '2026-10-22', location: 'Hybrid (Bengaluru + Online)', mode: 'Hybrid', prize: '₹5,00,000', teamSize: 5, registrations: 240, status: 'upcoming', problems: [
    { id: 'p1', title: 'AI-Powered Crop Disease Detection', description: 'Build a mobile app that detects crop diseases from photos and recommends treatments.', difficulty: 'Intermediate' },
    { id: 'p2', title: 'Accessible Education Platform', description: 'Create a learning platform for visually impaired students using AI voice assistance.', difficulty: 'Advanced' },
    { id: 'p3', title: 'Waste Sorting Robot', description: 'Design a computer vision system to automatically sort recyclable waste.', difficulty: 'Advanced' },
  ]},
  { id: 'h2', title: 'HackTheFuture', theme: 'Climate Tech', startDate: '2026-11-05', endDate: '2026-11-07', location: 'Online', mode: 'Online', prize: '₹3,00,000', teamSize: 4, registrations: 180, status: 'upcoming', problems: [
    { id: 'p4', title: 'Carbon Footprint Tracker', description: 'Build an app that helps individuals track and reduce their carbon footprint.', difficulty: 'Beginner' },
    { id: 'p5', title: 'Smart Energy Grid Optimizer', description: 'Design an algorithm to optimize energy distribution in smart grids.', difficulty: 'Intermediate' },
  ]},
  { id: 'h3', title: 'FinTech Sprint', theme: 'Financial Inclusion', startDate: '2026-09-15', endDate: '2026-09-17', location: 'Mumbai', mode: 'In-person', prize: '₹4,00,000', teamSize: 5, registrations: 150, status: 'completed', problems: [
    { id: 'p6', title: 'Micro-Loan Platform', description: 'Build a platform for instant micro-loans for unbanked populations.', difficulty: 'Intermediate' },
  ]},
];

export const alumni: Alumni[] = [
  { id: 'al1', name: 'Rohan Mehta', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', graduationYear: 2020, currentRole: 'Senior Engineer', company: 'Google', referrals: 12, mentoringHours: 120, contributions: ['Mentored 15 students', 'Sponsored 3 events', 'Guest speaker at 4 workshops'], successStory: 'Udyoga Pramoda connected me with my first mentor who guided me to Google. Now I give back by mentoring the next generation.', sponsorship: 50000 },
  { id: 'al2', name: 'Deepa Krishnan', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', graduationYear: 2019, currentRole: 'Product Lead', company: 'Microsoft', referrals: 8, mentoringHours: 95, contributions: ['Referred 8 candidates', 'Conducted 20 mock interviews'], successStory: 'From a small town to leading products at Microsoft. The platform gave me the network and skills I needed.', sponsorship: 25000 },
  { id: 'al3', name: 'Karthik Rao', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400', graduationYear: 2021, currentRole: 'Founder & CEO', company: 'StartupJet', referrals: 15, mentoringHours: 80, contributions: ['Hired 6 platform candidates', 'Sponsored hackathon', 'Offered internships to 10 students'], successStory: 'I found my co-founder through a Udyoga Pramoda hackathon. Today we employ 30 people.', sponsorship: 100000 },
  { id: 'al4', name: 'Lakshmi Venkat', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400', graduationYear: 2018, currentRole: 'Engineering Director', company: 'Amazon', referrals: 20, mentoringHours: 200, contributions: ['Mentored 25 engineers', 'Sponsored 5 events', 'Created mentorship program'], successStory: 'Mentoring through this platform changed my perspective on leadership. Giving back is the best investment.', sponsorship: 75000 },
];

export const adminStats = {
  totalUsers: 12480,
  activeMentors: 342,
  jobsPosted: 1890,
  placements: 456,
  eventsHosted: 87,
  hackathons: 23,
  pendingApprovals: 14,
  totalMentoringHours: 12450,
};

export const careerJourneyStages: { stage: string; count: number; color: string }[] = [
  { stage: 'Registered', count: 4200, color: 'bg-blue-500' },
  { stage: 'Mentoring', count: 1850, color: 'bg-teal-500' },
  { stage: 'Upskilling', count: 2100, color: 'bg-purple-500' },
  { stage: 'Applying/Interview', count: 1560, color: 'bg-amber-500' },
  { stage: 'Got Job', count: 456, color: 'bg-green-500' },
  { stage: 'Alumni', count: 312, color: 'bg-indigo-500' },
];

export const growthData = [
  { month: 'Apr', users: 8200, placements: 280 },
  { month: 'May', users: 9100, placements: 310 },
  { month: 'Jun', users: 9800, placements: 340 },
  { month: 'Jul', users: 10500, placements: 380 },
  { month: 'Aug', users: 11200, placements: 410 },
  { month: 'Sep', users: 12000, placements: 440 },
  { month: 'Oct', users: 12480, placements: 456 },
];

export const categoryData = [
  { name: 'Engineering', value: 720 },
  { name: 'Product', value: 280 },
  { name: 'Design', value: 190 },
  { name: 'Data', value: 340 },
  { name: 'DevOps', value: 160 },
  { name: 'Other', value: 200 },
];
