// lib/scoring.js
// Deterministic scoring logic - calculates all scores from answers

import { competencies } from '@/lib/competencies';

/**
 * Calculate scores from assessment answers
 * Score of 5 is best, 1 is worst
 */
export function calculateDetailedScores(answers, questions) {
  const results = {
    overall: {
      totalScore: 0,
      maxScore: 0,
      percentage: 0,
      starRating: 0,
    },
    competencies: {},
  };

  // Initialize competency scores
  competencies.forEach(comp => {
    results.competencies[comp.id] = {
      id: comp.id,
      name: comp.name,
      totalScore: 0,
      questionCount: 0,
      averageScore: 0,
    };
  });

  // Calculate scores for each question
  questions.forEach(question => {
    const selectedLabel = answers[question.id];
    const selectedOption = question.options.find(o => o.label === selectedLabel);
    const score = selectedOption?.score || 0;

    // Add to competency totals
    if (results.competencies[question.competency]) {
      results.competencies[question.competency].totalScore += score;
      results.competencies[question.competency].questionCount += 1;
    }

    // Add to overall totals
    results.overall.totalScore += score;
    results.overall.maxScore += 5;
  });

  // Calculate averages for each competency
  Object.keys(results.competencies).forEach(compId => {
    const comp = results.competencies[compId];
    if (comp.questionCount > 0) {
      comp.averageScore = comp.totalScore / comp.questionCount;
    }
  });

  // Calculate overall percentage and star rating
  if (results.overall.maxScore > 0) {
    results.overall.percentage = (results.overall.totalScore / results.overall.maxScore) * 100;
    results.overall.starRating = (results.overall.totalScore / results.overall.maxScore) * 5;
  }

  return results;
}

/**
 * Get competency ratings for the report
 * Returns array of { name, score } for each competency
 */
export function getCompetencyRatings(detailedScores) {
  return Object.values(detailedScores.competencies)
    .filter(comp => comp.questionCount > 0)
    .map(comp => ({
      name: comp.name,
      score: parseFloat(comp.averageScore.toFixed(1)),
    }));
}

/**
 * Identify top strengths and weaknesses based on scores
 * Used to guide SWOT analysis
 */
export function identifyStrengthsAndWeaknesses(detailedScores) {
  const validCompetencies = Object.values(detailedScores.competencies)
    .filter(comp => comp.questionCount > 0);

  // Sort by average score (highest first)
  const sorted = [...validCompetencies].sort((a, b) => b.averageScore - a.averageScore);

  // Top scoring competencies are strengths
  const strengths = sorted
    .filter(c => c.averageScore >= 3.5)
    .map(c => c.name);

  // Low scoring competencies are weaknesses
  const weaknesses = sorted
    .filter(c => c.averageScore < 3)
    .map(c => c.name);

  // Mid-range are opportunities
  const opportunities = sorted
    .filter(c => c.averageScore >= 3 && c.averageScore < 3.5)
    .map(c => c.name);

  return { strengths, weaknesses, opportunities };
}