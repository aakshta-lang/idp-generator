import { NextResponse } from 'next/server';
import { generateIDP } from '@/lib/llm';
import { competencies } from '@/lib/competencies';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const userData = {
      ...body,
      competencies,
    };

    const idpResult = await generateIDP(userData);

    return NextResponse.json({ success: true, data: idpResult });

  } catch (error) {
    console.error('Error generating IDP:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
