import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { competencies } from '@/lib/competencies';

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Role expectations for context
const roleExpectations = {
  pm1: {
    title: 'PM I',
    level: 'Entry-level Product Manager',
    expectations: 'Expected to own features within a POD, write specs with guidance, collaborate with immediate team, and deliver incremental improvements. Should demonstrate foundational product sense and execution skills.',
    targetScores: { product_sense: 3, problem_solving: 3, delivering_results: 3, leadership: 2.5 }
  },
  pm2: {
    title: 'PM II',
    level: 'Mid-level Product Manager',
    expectations: 'Expected to independently own quarterly roadmaps, drive cross-functional collaboration, demonstrate strong product judgment, and deliver measurable business impact. Should be developing strategic thinking.',
    targetScores: { product_sense: 3.5, problem_solving: 3.5, delivering_results: 3.5, leadership: 3 }
  },
  senior_pm: {
    title: 'Senior Product Manager',
    level: 'Senior Product Manager',
    expectations: 'Expected to own annual strategy for POD, influence cross-functional leaders, drive complex multi-quarter initiatives, mentor junior PMs, and deliver significant business outcomes.',
    targetScores: { product_sense: 4, problem_solving: 4, delivering_results: 4, leadership: 3.5 }
  },
  associate_director: {
    title: 'Associate Director',
    level: 'Associate Director of Product',
    expectations: 'Expected to manage strategy across multiple PODs, influence VP/Director stakeholders, drive organizational change, build high-performing teams, and deliver large-scale business impact.',
    targetScores: { product_sense: 4.5, problem_solving: 4.5, delivering_results: 4.5, leadership: 4.5 }
  }
};

export async function generateIDP(userData) {
  const { 
    name, 
    employeeId, 
    email, 
    currentRole, 
    function: userFunction, 
    answers, 
    scores,
    questions 
  } = userData;

  const roleInfo = roleExpectations[currentRole] || roleExpectations.pm1;
  
  // Build detailed answer analysis
  const answerDetails = questions.map(q => {
    const selectedOption = q.options.find(o => o.label === answers[q.id]);
    return {
      competency: q.competency,
      competencyBreakdown: q.competencyBreakdown,
      scenario: q.scenario,
      selectedAnswer: selectedOption?.text || 'Not answered',
      score: selectedOption?.score || 0,
      maxScore: 5
    };
  });

  // Group answers by competency for analysis
  const answersByCompetency = {};
  answerDetails.forEach(a => {
    if (!answersByCompetency[a.competency]) {
      answersByCompetency[a.competency] = [];
    }
    answersByCompetency[a.competency].push(a);
  });

  // Build competency analysis with gaps
  const competencyAnalysis = competencies.map(comp => {
    const compAnswers = answersByCompetency[comp.id] || [];
    const avgScore = scores.competencyScores[comp.id] || 0;
    const targetScore = roleInfo.targetScores[comp.id] || 3;
    const gap = targetScore - avgScore;
    
    return {
      id: comp.id,
      name: comp.name,
      description: comp.description,
      averageScore: avgScore.toFixed(2),
      targetScore: targetScore,
      gap: gap.toFixed(2),
      status: gap <= 0 ? 'Meeting/Exceeding' : gap < 1 ? 'Slightly Below' : 'Needs Development',
      responses: compAnswers
    };
  });

  const prompt = `You are an expert IDP (Individual Development Plan) assessment engine for a Product Management organization. Your task is to analyze assessment responses and generate a comprehensive, actionable development plan.

=== EMPLOYEE CONTEXT ===
Name: ${name}
Employee ID: ${employeeId}
Email: ${email}
Current Role: ${roleInfo.title} (${roleInfo.level})
Function: ${userFunction}

=== ROLE EXPECTATIONS ===
${roleInfo.expectations}

=== ASSESSMENT RESULTS ===
Overall Score: ${scores.totalScore}/${scores.maxScore} (${scores.percentageScore}%)

=== COMPETENCY FRAMEWORK ===
The assessment evaluates 4 core competencies:

1. PRODUCT SENSE & PRODUCT STRATEGY
   - Customer/Ecosystem Empathy: Understanding customer needs deeply
   - Domain Knowledge: Competition and industry awareness
   - Creative Solutioning: Generating innovative ideas
   - Product Prioritization: Roadmap and backlog management
   - Product Strategy: Vision and long-term thinking

2. PROBLEM SOLVING & EXECUTION
   - Data-Driven Decision Making: Using metrics to guide decisions
   - Product Documentation: Writing specs, PRDs, concept notes
   - Product Delivery: Driving execution and removing blockers
   - GTM/Marketing: Launch planning and adoption strategy

3. DELIVERING RESULTS
   - Business Impact: Measurable outcomes and value creation

4. LEADERSHIP
   - Scope: Managing breadth of responsibility
   - Stakeholder Influence: Cross-functional alignment
   - Communication: Executive and team communication
   - Recruiting/Mentoring: Building and developing talent

=== DETAILED COMPETENCY ANALYSIS ===
${JSON.stringify(competencyAnalysis, null, 2)}

=== SCORING INTERPRETATION ===
- Score 1: Needs significant development - Response indicates gaps in understanding
- Score 2: Below expectations - Response shows partial understanding
- Score 3: Meets expectations - Response demonstrates competent approach
- Score 4: Exceeds expectations - Response shows strong judgment
- Score 5: Exemplary - Response demonstrates mastery

=== YOUR TASK ===
Analyze the responses holistically and generate a personalized IDP. Consider:
1. Patterns across responses (not just individual scores)
2. The gap between current performance and role expectations
3. Specific behaviors demonstrated in the responses
4. Actionable, realistic recommendations

Generate THREE distinct sections tailored for different audiences:

SECTION 1 - FOR THE EMPLOYEE:
- Write in second person ("You demonstrated...", "Your strength in...")
- Be encouraging but honest about development areas
- Provide specific, self-driven actions they can take
- Recommend actual courses, books, podcasts (use real names)
- Set achievable 90-day goals

SECTION 2 - FOR THE MANAGER:
- Write in third person about the employee
- Focus on how to support and develop this person
- Provide specific coaching conversation starters
- Suggest stretch assignments aligned to gaps
- Define observable progress indicators

SECTION 3 - FOR HR/L&D:
- Write from organizational development perspective
- Identify training program needs
- Suggest mentorship matching criteria
- Note career trajectory observations
- Highlight skills gaps for workforce planning

=== OUTPUT FORMAT ===
Respond ONLY with valid JSON (no markdown, no code blocks, no explanation):

{
  "overall_score": ${scores.percentageScore / 20},
  "overall_percentage": ${scores.percentageScore},
  "performance_band": "<Developing|Proficient|Advanced|Expert>",
  "competency_scores": [
    {
      "competency_id": "<id>",
      "competency_name": "<name>",
      "score": <number>,
      "target_score": <number>,
      "gap": <number>,
      "status": "<Meeting/Exceeding|Slightly Below|Needs Development>",
      "key_observation": "<1 sentence insight from their responses>"
    }
  ],
  "top_strengths": [
    {
      "strength": "<strength name>",
      "evidence": "<specific behavior from responses>",
      "business_value": "<why this matters>"
    }
  ],
  "development_areas": [
    {
      "area": "<area name>",
      "current_behavior": "<what responses revealed>",
      "target_behavior": "<what good looks like>",
      "priority": "<high|medium|low>"
    }
  ],
  "employee_section": {
    "personalized_summary": "<3-4 sentence summary written TO the employee, encouraging but honest>",
    "key_strengths": [
      {
        "strength": "<strength>",
        "how_to_leverage": "<specific advice>"
      }
    ],
    "development_priorities": [
      {
        "priority": "<area>",
        "why_it_matters": "<impact on their growth>",
        "current_gap": "<honest assessment>"
      }
    ],
    "recommended_actions": [
      {
        "action": "<specific, actionable step>",
        "timeline": "<week 1-2, month 1, etc.>",
        "expected_outcome": "<what success looks like>",
        "difficulty": "<easy|moderate|challenging>"
      }
    ],
    "learning_resources": [
      {
        "type": "<course|book|podcast|article|video>",
        "name": "<actual real resource name>",
        "provider": "<platform/author>",
        "skill_addressed": "<competency>",
        "time_commitment": "<hours/weeks>",
        "link_hint": "<where to find it>"
      }
    ],
    "ninety_day_goals": [
      {
        "goal": "<specific, measurable goal>",
        "success_metric": "<how to know it's achieved>",
        "competency_impacted": "<which competency>"
      }
    ],
    "motivational_note": "<1-2 sentence encouraging closing>"
  },
  "manager_section": {
    "executive_summary": "<3-4 sentence summary FOR the manager about this employee>",
    "strengths_to_leverage": [
      {
        "strength": "<strength>",
        "how_to_leverage": "<specific management action>",
        "project_suggestion": "<type of work to assign>"
      }
    ],
    "support_areas": [
      {
        "area": "<development area>",
        "current_challenge": "<what they struggle with>",
        "support_needed": "<what manager should do>"
      }
    ],
    "coaching_conversations": [
      {
        "topic": "<conversation topic>",
        "timing": "<when to have this conversation>",
        "opening_questions": ["<question 1>", "<question 2>"],
        "desired_outcome": "<what to achieve>"
      }
    ],
    "stretch_assignments": [
      {
        "assignment": "<specific project/task>",
        "skill_developed": "<competency>",
        "duration": "<timeframe>",
        "success_criteria": "<how to evaluate>",
        "support_required": "<what manager needs to provide>"
      }
    ],
    "progress_indicators": [
      {
        "indicator": "<observable behavior>",
        "timeframe": "<when to expect>",
        "measurement": "<how to assess>"
      }
    ],
    "risk_flags": ["<any concerns to monitor>"]
  },
  "hr_section": {
    "organizational_summary": "<3-4 sentence summary for HR/L&D perspective>",
    "training_recommendations": [
      {
        "program": "<program name/type>",
        "priority": "<high|medium|low>",
        "rationale": "<why needed>",
        "timing": "<when to enroll>",
        "expected_roi": "<business benefit>"
      }
    ],
    "mentorship_suggestions": [
      {
        "mentor_profile": "<type of mentor needed>",
        "focus_area": "<what to work on>",
        "duration": "<recommended length>",
        "matching_criteria": "<what to look for in mentor>"
      }
    ],
    "career_path_observations": {
      "current_trajectory": "<where they're headed>",
      "potential_paths": ["<path 1>", "<path 2>"],
      "readiness_for_next_level": "<assessment>",
      "timeline_to_promotion": "<estimate if applicable>"
    },
    "skills_gap_analysis": [
      {
        "skill": "<skill name>",
        "current_level": "<1-5 or description>",
        "required_level": "<for current role>",
        "gap_severity": "<critical|moderate|minor>",
        "intervention_needed": "<type of development>"
      }
    ],
    "recommended_interventions": [
      {
        "intervention": "<specific action>",
        "owner": "<HR|Manager|Employee>",
        "timeline": "<when>",
        "success_metric": "<how to measure>"
      }
    ],
    "retention_considerations": "<any notes on engagement/retention>",
    "succession_planning_notes": "<relevant observations>"
  },
  "development_timeline": {
    "immediate": {
      "timeframe": "Week 1-2",
      "focus": "<primary focus>",
      "milestones": ["<milestone 1>", "<milestone 2>"]
    },
    "short_term": {
      "timeframe": "Month 1-2",
      "focus": "<primary focus>",
      "milestones": ["<milestone 1>", "<milestone 2>"]
    },
    "medium_term": {
      "timeframe": "Month 3-6",
      "focus": "<primary focus>",
      "milestones": ["<milestone 1>", "<milestone 2>"]
    },
    "long_term": {
      "timeframe": "Month 6-12",
      "focus": "<primary focus>",
      "milestones": ["<milestone 1>", "<milestone 2>"]
    }
  },
  "generated_date": "${new Date().toISOString().split('T')[0]}",
  "assessment_version": "1.0"
}`;

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 8192,
    temperature: 0.7,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
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

    // Clean and parse the JSON response
    const cleanedContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error('Error calling Bedrock:', error);
    throw new Error(`Failed to generate IDP: ${error.message}`);
  }
}