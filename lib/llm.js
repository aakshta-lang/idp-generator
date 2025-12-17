import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
});

const roleContext = {
  pm1: { title: 'PM I', level: 'Entry-level', focus: 'Learning fundamentals, executing with guidance' },
  pm2: { title: 'PM II', level: 'Mid-level', focus: 'Independent ownership, cross-functional collaboration' },
  senior_pm: { title: 'Senior PM', level: 'Senior', focus: 'Strategic thinking, mentoring, complex initiatives' },
  associate_director: { title: 'Associate Director', level: 'Leadership', focus: 'Multi-team strategy, organizational influence' },
};

export async function generateIDPAnalysis(userData) {
  const { 
    name, 
    currentRole, 
    function: userFunction,
    competencyRatings,
    strengthsWeaknesses,
    overallRating,
  } = userData;

  const role = roleContext[currentRole] || roleContext.pm1;

  // Build competency summary
  const competencySummary = competencyRatings
    .map(c => `- ${c.name}: ${c.score}/5`)
    .join('\n');

  const prompt = `You are an IDP (Individual Development Plan) content generator for Product Managers.

=== EMPLOYEE CONTEXT ===
Name: ${name}
Role: ${role.title} (${role.level})
Function: ${userFunction}
Role Focus: ${role.focus}

=== ASSESSMENT RESULTS ===
Overall Rating: ${overallRating.starRating.toFixed(1)}/5 stars (${overallRating.percentage.toFixed(0)}%)

Competency Scores:
${competencySummary}

Strong Areas: ${strengthsWeaknesses.strengths.join(', ') || 'None above 3.5'}
Weak Areas: ${strengthsWeaknesses.weaknesses.join(', ') || 'None below 3.0'}
Growth Areas: ${strengthsWeaknesses.opportunities.join(', ') || 'None in 3.0-3.5 range'}

=== YOUR TASK ===
Generate specific, actionable content for the IDP report. Be concise and PM-specific.
Each bullet should be 1-2 sentences max. Tailor recommendations to ${role.title} level.

OUTPUT FORMAT - Respond ONLY with valid JSON (no markdown, no explanation):

{
  "swot_analysis": {
    "strengths": [
      "<strength 1 based on high-scoring competencies>",
      "<strength 2>",
      "<strength 3>"
    ],
    "weaknesses": [
      "<weakness 1 based on low-scoring competencies>",
      "<weakness 2>",
      "<weakness 3>"
    ],
    "opportunities": [
      "<opportunity 1 for growth>",
      "<opportunity 2>",
      "<opportunity 3>"
    ],
    "threats": [
      "<threat 1 if weaknesses not addressed>",
      "<threat 2>",
      "<threat 3>"
    ]
  },
  "managers_feedback": [
    "<action 1: specific thing manager should do to support employee>",
    "<action 2: another support action>",
    "<action 3: another support action>"
  ],
  "on_the_job_projects": [
    {
      "project": "<specific project name>",
      "skill": "<competency it develops>",
      "duration": "<timeframe>",
      "description": "<what they will do>"
    },
    {
      "project": "<project 2>",
      "skill": "<competency>",
      "duration": "<timeframe>",
      "description": "<description>"
    },
    {
      "project": "<project 3>",
      "skill": "<competency>",
      "duration": "<timeframe>",
      "description": "<description>"
    }
  ],
  "self_learning": [
    {
      "type": "<course|book|podcast>",
      "name": "<actual resource name>",
      "provider": "<platform/author>",
      "skill": "<competency>",
      "why": "<why this helps>"
    },
    {
      "type": "<type>",
      "name": "<name>",
      "provider": "<provider>",
      "skill": "<skill>",
      "why": "<why>"
    },
    {
      "type": "<type>",
      "name": "<name>",
      "provider": "<provider>",
      "skill": "<skill>",
      "why": "<why>"
    }
  ]
}`;

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 4096,
    temperature: 0.7,
    messages: [{ role: "user", content: prompt }],
  };

  try {
    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const content = responseBody.content[0].text;

    const cleanedContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error('Error calling Bedrock:', error);
    throw new Error(`Failed to generate IDP analysis: ${error.message}`);
  }
}