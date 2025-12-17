import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateIDP(userData) {
  const { name, currentRole, aspirationalRole, situationalAnswers, selfRatings, competencies } = userData;

  const prompt = `You are an IDP (Individual Development Plan) assessment engine for Razorpay. 

CONTEXT:
- Employee: ${name}
- Current Role: ${currentRole}
- Aspirational Role: ${aspirationalRole}

COMPETENCIES BEING ASSESSED:
${JSON.stringify(competencies, null, 2)}

EMPLOYEE'S SITUATIONAL RESPONSES:
${JSON.stringify(situationalAnswers, null, 2)}

EMPLOYEE'S SELF-RATINGS (1-5):
${JSON.stringify(selfRatings, null, 2)}

TASK:
1. Evaluate each situational response against the competency it tests
2. Score each competency from 1-5 based on the response quality and self-rating
3. Identify strengths (top 2 competencies)
4. Identify development areas (bottom 2-3 competencies)
5. For each development area, recommend specific L&D resources including:
   - Online courses (Coursera, LinkedIn Learning, Udemy, etc.)
   - Books
   - Podcasts
   - Articles or blogs
   - Stretch assignments or on-the-job learning
6. Suggest manager support actions
7. Create an ANNUAL timeline with quarterly milestones (Q1, Q2, Q3, Q4)

OUTPUT FORMAT (respond ONLY with this JSON, no other text):
{
  "overall_score": <number 1-5>,
  "competency_scores": [
    {
      "competency_id": "<id>",
      "competency_name": "<name>",
      "current_score": <number 1-5>,
      "required_score": <number 1-5 based on aspirational role>,
      "gap": <number>,
      "assessment_notes": "<brief explanation>"
    }
  ],
  "strengths": ["<strength 1>", "<strength 2>"],
  "development_areas": ["<area 1>", "<area 2>", "<area 3>"],
  "recommendations": {
    "courses": [
      {"name": "<course name>", "platform": "<platform>", "skill": "<skill>", "priority": "high/medium/low"}
    ],
    "books": [
      {"title": "<book title>", "author": "<author>", "skill": "<skill>"}
    ],
    "podcasts": [
      {"name": "<podcast name>", "skill": "<skill>"}
    ],
    "stretch_assignments": [
      {"name": "<assignment>", "skill": "<skill>", "duration": "<duration>"}
    ],
    "manager_support": [
      "<action 1>",
      "<action 2>",
      "<action 3>"
    ]
  },
  "timeline": [
    {"quarter": "Q1", "milestone": "<milestone>"},
    {"quarter": "Q2", "milestone": "<milestone>"},
    {"quarter": "Q3", "milestone": "<milestone>"},
    {"quarter": "Q4", "milestone": "<milestone>"}
  ],
  "summary": "<2-3 sentence summary of the IDP>"
}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const content = response.text();
  
  const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  return JSON.parse(cleanedContent);
}
