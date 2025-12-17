import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function generateIDP(userData) {
  const { name, employeeId, email, currentRole, function: userFunction, answers, competencies } = userData;

  const prompt = `You are an IDP (Individual Development Plan) assessment engine.

CONTEXT:
- Employee: ${name}
- Employee ID: ${employeeId}
- Email: ${email}
- Current Role: ${currentRole}
- Function: ${userFunction}

COMPETENCIES ASSESSED:
${JSON.stringify(competencies, null, 2)}

EMPLOYEE'S ASSESSMENT ANSWERS (Question ID -> Selected Option):
${JSON.stringify(answers, null, 2)}

SCORING: Each answer option has a score from 1-5. Calculate scores per competency and overall.

TASK:
Analyze the responses and generate a comprehensive IDP with THREE separate sections:

1. FOR THE EMPLOYEE - Personal development recommendations:
   - Key strengths identified
   - Priority development areas
   - Specific actions they can take independently
   - Recommended learning resources (courses, books, podcasts)
   - 90-day quick wins

2. FOR THE MANAGER - Coaching and support guidance:
   - Employee's strengths to leverage
   - Areas where employee needs support
   - Suggested coaching conversations
   - Stretch assignments to consider
   - How to track progress

3. FOR HR/L&D PARTNER - Organizational development insights:
   - Training program recommendations
   - Mentorship matching suggestions
   - Career pathing considerations
   - Skills gap analysis for team planning
   - Recommended interventions

OUTPUT FORMAT (respond ONLY with this JSON, no other text):
{
  "overall_score": <number 1-5>,
  "overall_percentage": <number 0-100>,
  "competency_scores": [
    {
      "competency_id": "<id>",
      "competency_name": "<name>",
      "score": <number 1-5>,
      "max_score": 5,
      "percentage": <number 0-100>,
      "level": "<Developing|Proficient|Advanced|Expert>"
    }
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "development_areas": ["<area 1>", "<area 2>"],
  "employee_section": {
    "summary": "<2-3 sentence personalized summary>",
    "key_strengths": ["<strength with context>"],
    "development_priorities": ["<priority 1>", "<priority 2>"],
    "recommended_actions": [
      {"action": "<specific action>", "timeline": "<when>", "expected_outcome": "<outcome>"}
    ],
    "learning_resources": [
      {"type": "course|book|podcast|article", "name": "<name>", "provider": "<provider>", "skill": "<skill addressed>"}
    ],
    "ninety_day_goals": ["<goal 1>", "<goal 2>", "<goal 3>"]
  },
  "manager_section": {
    "summary": "<2-3 sentence summary for manager>",
    "strengths_to_leverage": ["<how to use employee strengths>"],
    "support_areas": ["<where employee needs help>"],
    "coaching_topics": [
      {"topic": "<topic>", "suggested_questions": ["<question 1>", "<question 2>"]}
    ],
    "stretch_assignments": [
      {"assignment": "<assignment>", "skill_developed": "<skill>", "duration": "<duration>"}
    ],
    "progress_indicators": ["<how to measure progress>"]
  },
  "hr_section": {
    "summary": "<2-3 sentence summary for HR/L&D>",
    "training_recommendations": [
      {"program": "<program name>", "priority": "high|medium|low", "rationale": "<why>"}
    ],
    "mentorship_suggestions": ["<type of mentor needed>"],
    "career_path_notes": "<observations about career trajectory>",
    "skills_gap_analysis": [
      {"skill": "<skill>", "current_level": "<level>", "required_level": "<level>", "gap": "<description>"}
    ],
    "recommended_interventions": ["<intervention 1>", "<intervention 2>"]
  },
  "timeline": {
    "thirty_days": ["<milestone>"],
    "sixty_days": ["<milestone>"],
    "ninety_days": ["<milestone>"],
    "six_months": ["<milestone>"],
    "one_year": ["<milestone>"]
  }
}`;

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const command = new InvokeModelCommand({
    modelId: process.env.BEDROCK_MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(payload),
  });

  const response = await client.send(command);
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));
  const content = responseBody.content[0].text;

  // Clean and parse the JSON response
  const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  return JSON.parse(cleanedContent);
}