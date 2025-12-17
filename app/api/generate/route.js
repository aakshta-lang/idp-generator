import { NextResponse } from 'next/server';
import { generateIDPAnalysis } from '@/lib/llm';

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const analysis = await generateIDPAnalysis(prompt);

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('API Route Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate IDP', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}