import { NextResponse } from 'next/server';
import { generateIDPAnalysis } from '@/lib/llm';
import { calculateDetailedScores, getCompetencyRatings, identifyStrengthsAndWeaknesses } from '@/lib/scoring';
import { getQuestionsForRole } from '@/lib/questions';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const { 
      name, 
      employeeId, 
      email, 
      currentRole, 
      function: userFunction, 
      answers,
    } = body;

    // Get questions for the role
    const questions = getQuestionsForRole(currentRole);

    // STEP 1: Calculate all scores (deterministic)
    const detailedScores = calculateDetailedScores(answers, questions);

    // STEP 2: Get competency ratings (deterministic)
    const competencyRatings = getCompetencyRatings(detailedScores);

    // STEP 3: Identify strengths/weaknesses (deterministic)
    const strengthsWeaknesses = identifyStrengthsAndWeaknesses(detailedScores);

    // STEP 4: Generate qualitative analysis (LLM)
    const llmAnalysis = await generateIDPAnalysis({
      name,
      currentRole,
      function: userFunction,
      competencyRatings,
      strengthsWeaknesses,
      overallRating: detailedScores.overall,
    });

    // Final report structure matching your template
    const report = {
      // Employee Info
      employee: {
        name,
        employeeId,
        email,
        role: currentRole,
        function: userFunction,
      },
      
      // Overall Rating (star rating out of 5)
      overallRating: parseFloat(detailedScores.overall.starRating.toFixed(1)),
      
      // Competency Wise Rating (4 competencies with average scores)
      competencyRatings: competencyRatings,
      
      // SWOT Analysis
      swotAnalysis: llmAnalysis.swot_analysis,
      
      // Manager's Feedback
      managersFeedback: llmAnalysis.managers_feedback,
      
      // On The Job Projects
      onTheJobProjects: llmAnalysis.on_the_job_projects,
      
      // Self Learning
      selfLearning: llmAnalysis.self_learning,
      
      // Metadata
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: report });

  } catch (error) {
    console.error('Error generating IDP:', error);
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}