export const roles = [
  { id: 'intern', label: 'Intern', level: 1 },
  { id: 'junior', label: 'Junior Analyst / Junior Associate', level: 2 },
  { id: 'analyst', label: 'Analyst / Associate', level: 3 },
  { id: 'senior_analyst', label: 'Senior Analyst / Senior Associate', level: 4 },
  { id: 'lead', label: 'Lead / Team Lead', level: 5 },
  { id: 'manager', label: 'Manager / Associate Manager', level: 6 },
  { id: 'senior_manager', label: 'Senior Manager / Associate Director', level: 7 },
  { id: 'director', label: 'Director', level: 8 },
  { id: 'senior_director', label: 'Senior Director', level: 9 },
  { id: 'vp', label: 'Vice President', level: 10 },
  { id: 'svp', label: 'Senior Vice President', level: 11 },
];

// COMPETENCIES - Edit these based on your team/function
// You can add, remove, or modify competencies here
export const competencies = [
  {
    id: 'technical_skills',
    name: 'Technical / Functional Skills',
    description: 'Core skills required for the role',
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Ability to communicate clearly and effectively',
  },
  {
    id: 'problem_solving',
    name: 'Problem Solving',
    description: 'Analytical thinking and creative solutions',
  },
  {
    id: 'collaboration',
    name: 'Collaboration & Teamwork',
    description: 'Working effectively with others',
  },
  {
    id: 'ownership',
    name: 'Ownership & Accountability',
    description: 'Taking ownership and delivering results',
  },
  {
    id: 'leadership',
    name: 'Leadership & Influence',
    description: 'Leading, mentoring, and influencing others',
  },
];

// L&D Resources - Left empty, LLM will generate recommendations
// (courses, books, podcasts, articles, mentorship, stretch assignments)
export const ldResources = [];
