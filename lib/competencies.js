export const roles = [
  { id: 'pm1', label: 'PM I', level: 1 },
  { id: 'pm2', label: 'PM II', level: 2 },
  { id: 'senior_pm', label: 'Senior Product Manager', level: 3 },
  { id: 'associate_director', label: 'Associate Director', level: 4 },
];

export const competencies = [
  {
    id: 'product_sense',
    name: 'Product Sense & Product Strategy',
    description: 'Ability to identify user needs, define product vision, and create strategic roadmaps',
    questionCount: 5,
  },
  {
    id: 'problem_solving',
    name: 'Problem Solving & Execution',
    description: 'Analytical thinking, breaking down complex problems, and driving execution',
    questionCount: 4,
  },
  {
    id: 'delivering_results',
    name: 'Delivering Results',
    description: 'Accountability, meeting commitments, and driving outcomes',
    questionCount: 1,
  },
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Influencing others, mentoring, and driving team success',
    questionCount: 5,
  },
];

// Calculate max possible score
export const MAX_SCORE_PER_QUESTION = 5;
export const TOTAL_QUESTIONS = 15;
export const MAX_TOTAL_SCORE = TOTAL_QUESTIONS * MAX_SCORE_PER_QUESTION; // 75