import { GraduationCap, Users, Award, Globe, BookOpen, Heart, Lightbulb, Target, School } from "lucide-react";

export const schoolInfo = {
  name: "Priya Public School",
  tagline: "Nurturing Minds, Building Futures",
  founded: 2002,
  address: " Panner, Solan, Himachal Pradesh",
  phone: "+91 9882062560 , +91 8091227060",
  email: "kakshat349@gmail.com  gurdev1014@gmail.com",
  hours: "Mon - Sat: 7:30 AM - 4:00 PM",
};

export const announcements = [
  {
    id: 1,
    title: "Admissions Open",
    date: "April 1 - June 30",
    description: "Applications are now being accepted for the upcoming academic year 2026-27. Visit the Admissions page to download the form.",
    type: "admission",
  },
  {
    id: 2,
    title: "Annual Sports Day",
    date: "March 15, 2026",
    description: "The Annual Sports Day will be held on March 15. All students are encouraged to participate in track, field, and team events.",
    type: "event",
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    date: "March 20, 2026",
    description: "PTM for Classes 6-10 is scheduled on March 20 from 9:00 AM to 1:00 PM. Parents are requested to attend.",
    type: "notice",
  },
  {
    id: 4,
    title: "Summer Vacation Notice",
    date: "May 20 - June 25, 2026",
    description: "School will remain closed for summer vacations from May 20 to June 25. Classes resume on June 26, 2026.",
    type: "notice",
  },
  {
    id: 5,
    title: "Annual Day Celebration",
    date: "April 5, 2026",
    description: "Annual Day will be celebrated on April 5 at 5:00 PM. Students from all classes will perform cultural programs. All parents are invited.",
    type: "event",
  },
  {
    id: 6,
    title: "Fee Submission Reminder",
    date: "March 10, 2026",
    description: "Last date to submit the monthly fee for March is March 10. Late submissions will attract a fine of ₹20 per day.",
    type: "notice",
  },
];

export const quickLinks: Array<{
  title: string;
  description: string;
  icon: typeof GraduationCap;
  href: string;
  color: "primary" | "accent" | "secondary";
}> = [
  {
    title: "Admissions",
    description: "Start your journey with us. ",
    icon: GraduationCap,
    href: "/admissions",
    color: "primary",
  },
  {
    title: "Academics",
    description: "Explore our comprehensive curriculum and programs.",
    icon: BookOpen,
    href: "/academics",
    color: "accent",
  },
  {
    title: "Contact Us",
    description: "Get in touch with our friendly administration team.",
    icon: Users,
    href: "/contact",
    color: "secondary",
  },
];

export const achievements = [
  
  {
    icon: Users,
    title: "100+ Happy Students",
    description: "Students making an impact in their communities",
    year: "Since 2002   ",
  },
  {
    icon: BookOpen,
    title: "100% Literacy",
    description: "Committed to educational accessibility for all",
    year: "Ongoing",
  },
  {
    icon: Award,
    title: "23+ Years of Excellence",
    description: "Delivering quality education with dedication and values",
    year: "Since 2002",
  },
  {
    icon: School,
    title: "Strong Academic Foundation",
    description: "Building confident learners through holistic development",
    year: "Every Year",
  },
  
];

export const missionVision = {
  mission: "To provide a nurturing environment where every student discovers their potential, develops critical thinking skills, and becomes a responsible global citizen committed to lifelong learning.",
  vision: "To be a beacon of educational excellence, inspiring generations of learners to lead with integrity, innovate with purpose, and contribute meaningfully to society.",
  values: [
    { icon: Heart, title: "Integrity", description: "Acting with honesty and strong moral principles" },
    { icon: Lightbulb, title: "Innovation", description: "Embracing creativity and forward-thinking approaches" },
    { icon: Users, title: "Community", description: "Building strong relationships and mutual respect" },
    { icon: Target, title: "Excellence", description: "Striving for the highest standards in all we do" },
  ],
};

export const faculty = [
  {
    id: 1,
    name: "Mr. Gurdev Singh",
    position: "Principal",
    department: "Administration",
    email: "gurdev1014@gmail.com",
    bio: "25+ years of educational leadership and dedication to student excellence.",
  },
  {
    id: 2,
    name: "Mrs. Anupama",
    position: "Vice Principal",
    department: "Administration",
    email: "anupama.devi@gmail.com",
    bio: "15+ years of experience in nurturing young minds with care and expertise.",
  },
  {
    id: 3,
    name: "Mrs. Usha Devi",
    position: "Senior Teacher",
    department: "Arts",
    email: "usha.devi@gmail.com",
    bio: "15+ years of commitment to quality education and student development.",
  },
  {
    id: 4,
    name: "Mrs. Neena Bedi",
    position: "Head of Mathematics",
    department: "Mathematics",
    email: "neena.bedi@gmail.com",
    bio: "15+ years of making mathematics engaging and understandable for all students.",
  },
  {
    id: 5,
    name: "Mrs. Sunita Devi",
    position: "Teacher",
    department: "Mentorship",
    email: "sunita.devi@gmail.com",
    bio: "8+ years of passionate teaching and student mentorship.",
  },
  {
    id: 6,
    name: "Mrs. Reena Devi",
    position: "Science Teacher",
    department: "Science",
    email: "reena.devi@gmail.com",
    bio: "3+ years of teaching science with passion and clarity.",
  },
];

export const grades = [
  { 
    name: "Pre-Kindergarten (Nursery)", 
    ages: "3-4 years", 
    description: "Foundation for early learning through play" 
  },
  { 
    name: "Kindergarten (LKG)", 
    ages: "4-5 years", 
    description: "Developing basic literacy, numeracy, and social skills" 
  },
  { 
    name: "Kindergarten (UKG)", 
    ages: "5-6 years", 
    description: "Strengthening readiness for primary school" 
  },
  { 
    name: "Primary School (Classes 1-5)", 
    ages: "6-11 years", 
    description: "Comprehensive core curriculum with enrichment" 
  },
  { 
    name: "Middle School (Classes 6-8)", 
    ages: "11-14 years", 
    description: "Advanced academics with elective exploration" 
  },
];


export const curriculum = [
  { 
    subject: "English", 
    description: "Reading, writing, grammar, literature, and communication skills" 
  },
  { 
    subject: "Mathematics", 
    description: "Arithmetic, algebra, geometry, mensuration, trigonometry, and statistics" 
  },
  { 
    subject: "Science", 
    description: "EVS for early grades; Physics, Chemistry, and Biology from middle school onward" 
  },
  { 
    subject: "Social Studies (SST)", 
    description: "History, Geography, Civics, and Economics" 
  },
  { 
    subject: "Languages", 
    description: "Hindi, English, Punjabi, and other regional or third-language options" 
  },
];

export const admissionSteps = [
  {
    step: 1,
    title: "Inquiry & Form Collection",
    description: "Parents visit the school or contact us to collect the admission form.",
  },
  {
    step: 2,
    title: "Form Submission",
    description: "Submit the filled admission form along with required documents.",
  },
  {
    step: 3,
    title: "Interaction / Test",
    description: "A simple interaction or written test is conducted based on the child's class.",
  },
  {
    step: 4,
    title: "Admission Confirmation",
    description: "Parents are notified about selection and seat availability.",
  },
  {
    step: 5,
    title: "Fee Payment",
    description: "Pay the admission fee to confirm the seat.",
  },
  {
    step: 6,
    title: "Enrollment Complete",
    description: "The student is officially enrolled and assigned to their class.",
  },
  
];

export const importantDates = [
  { date: "January 15", event: "Applications Open", type: "deadline" },
  { date: "March 1", event: "Early Decision Deadline", type: "deadline" },
  { date: "April 15", event: "Regular Decision Deadline", type: "deadline" },
  { date: "May 1", event: "Admission Decisions Released", type: "announcement" },
  { date: "May 15", event: "Enrollment Confirmation Due", type: "deadline" },
  { date: "August 20", event: "New Student Orientation", type: "event" },
];

export const galleryImages = [
  { id: 1, title: "Science Lab Activity", category: "Facilities" },
  { id: 2, title: "School Library", category: "Facilities" },

  { id: 3, title: "Sports Day", category: "Events" },
  { id: 4, title: "Annual Day Celebration", category: "Events" },
  { id: 5, title: "Independence Day Program", category: "Events" },
  
  { id: 6, title: "Art & Craft Exhibition", category: "Activities" },
  { id: 7, title: "Music & Dance Performance", category: "Activities" },
  { id: 8, title: "Yoga Session", category: "Activities" },

  { id: 9, title: "Classroom Teaching", category: "Academics" },
  { id: 10, title: "Smart Classroom Learning", category: "Academics" },

  { id: 11, title: "Morning Assembly", category: "Campus Life" },
  { id: 12, title: "Outdoor Games & Activities", category: "Campus Life" },
];

export const feeStructure = [
  {
    class: "Nursery – UKG",
    admission: "₹2,000",
    tuition: "₹500 / month",
    
  },
  {
    class: "CLASS - 1ST",
    admission: "₹2,000",
    tuition: "₹520 / month",
    
  },
  {
    class: "CLASS - 2ND",
    admission: "₹2,000",
    tuition: "₹540 / month",
    
  },
  {
    class: "CLASS - 3RD",
    admission: "₹2,000",
    tuition: "₹560 / month",
    
  },
  {
    class: "CLASS - 4TH",
    admission: "₹2,000",
    tuition: "₹580 / month",
    
  },
  {
    class: "CLASS - 5TH",
    admission: "₹2,000",
    tuition: "₹600 / month",
    
  },
];
export const busTimings = [
  {
    place: "Serdi",
    morning: "7:35 AM",
    afternoon: "4:10 PM",
  },
  {
    place: "Pahadi Chikni",
    morning: "7:45 AM",
    afternoon: "3:55 PM",
  },
  {
    place: "Kolka ",
    morning: "8:30 AM",
    afternoon: "2:30 PM",
  },
  {
    place: "Goela",
    morning: "9:05 AM",
    afternoon: "3:20 PM",
  },
  
];
export interface BusFee {
  place: string;
  monthly: string;
  yearly: string;
}

export const busFees: BusFee[] = [
  {
    place: "Pahadi Chikni / Serdi",
    monthly: "₹600",
    yearly: "₹7,200",
  },
  {
    place: "Kolka",
    monthly: "₹800",
    yearly: "₹9,600",
  },
  {
    place: "Goela",
    monthly: "₹350",
    yearly: "₹4,200",
  },
];
