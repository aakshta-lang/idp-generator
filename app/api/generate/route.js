import { NextResponse } from 'next/server';
import { generateIDP } from '@/lib/llm';
import { competencies } from '@/lib/competencies';
import { getQuestionsForRole, calculateScores } from '@/lib/questions';

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
      scores: clientScores,
      questions: clientQuestions 
    } = body;

    // Get questions for the role (server-side verification)
    const questions = clientQuestions || getQuestionsForRole(currentRole);
    
    // Calculate scores (server-side verification)
    const scores = clientScores || calculateScores(answers, currentRole);

    // Prepare user data for LLM
    const userData = {
      name,
      employeeId,
      email,
      currentRole,
      function: userFunction,
      answers,
      scores,
      questions,
      competencies,
    };

    // Generate IDP using Claude
    const idpResult = await generateIDP(userData);

    // Add metadata to response
    const response = {
      ...idpResult,
      metadata: {
        employeeName: name,
        employeeId,
        email,
        role: currentRole,
        function: userFunction,
        assessmentDate: new Date().toISOString(),
        totalQuestions: questions.length,
        questionsAnswered: Object.keys(answers).length,
        rawScores: scores,
      }
    };

    return NextResponse.json({ success: true, data: response });

  } catch (error) {
    console.error('Error generating IDP:', error);
    
    // More detailed error response
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}