// ASSESSMENT QUESTIONS BY ROLE
// Each role has its own set of questions across 4 competencies
// Scoring: 1 = lowest, 5 = highest

export const questionsByRole = {
  // ============================================
  // PM I QUESTIONS (14 total)
  // ============================================
  pm1: [
    // PRODUCT SENSE & PRODUCT STRATEGY (5 questions)
    {
      id: 'pm1_ps1',
      competency: 'product_sense',
      competencyBreakdown: 'Customer/Ecosystem Empathy',
      scenario: 'You have delivered a feature that customers are using, but a vocal minority is complaining. What is your primary method for advocacy?',
      options: [
        { label: 'A', text: 'Using statistical usage data to defend the current implementation to the wider team.', score: 1 },
        { label: 'B', text: 'Initiating new qualitative research (interviews/surveys) to deeply understand the root cause of the specific complaints.', score: 2 },
        { label: 'C', text: 'Immediately building a second feature to address the complaints, without further deep research.', score: 3 },
        { label: 'D', text: 'Asking the APM on your team to handle all communication and research with the dissatisfied users.', score: 4 },
        { label: 'E', text: 'Relying entirely on a third-party analyst report to determine the severity of the complaints.', score: 5 },
      ],
    },
    {
      id: 'pm1_ps2',
      competency: 'product_sense',
      competencyBreakdown: 'Domain Knowledge (Competition, Industry)',
      scenario: 'You are reviewing your upcoming feature set against the competition. What is your core action?',
      options: [
        { label: 'A', text: 'Analyzing competing features to ensure our proposed solution is solving the customer problem in the best possible manner, not just a similar one.', score: 1 },
        { label: 'B', text: 'Ensuring the feature has more functionality than the competitor, even if it adds complexity.', score: 2 },
        { label: 'C', text: 'Only focusing on how the feature can generate more revenue than the competitor\'s offering.', score: 3 },
        { label: 'D', text: 'Delegating the competitor benchmarking entirely to the Product Marketing Manager (PMM).', score: 4 },
        { label: 'E', text: 'Assuming that your product is sufficiently different that competitor actions are irrelevant.', score: 5 },
      ],
    },
    {
      id: 'pm1_ps3',
      competency: 'product_sense',
      competencyBreakdown: 'Creative Solutioning',
      scenario: 'Your POD is looking to incrementally improve an existing product area. How do you lead the ideation process?',
      options: [
        { label: 'A', text: 'Generating ideas focused on improving existing features, with an emphasis on platform scalability and reusability.', score: 1 },
        { label: 'B', text: 'Proposing a completely new product line that solves a tangentially related problem.', score: 2 },
        { label: 'C', text: 'Limiting the ideation to what the engineering team suggests is fastest to implement.', score: 3 },
        { label: 'D', text: 'Insisting on only implementing ideas that have been previously tried and validated by other teams.', score: 4 },
        { label: 'E', text: 'Prioritizing only ideas that have an immediate and guaranteed 2x revenue impact.', score: 5 },
      ],
    },
    {
      id: 'pm1_ps4',
      competency: 'product_sense',
      competencyBreakdown: 'Product Prioritisation and Roadmapping',
      scenario: 'You are tasked with defining the quarterly roadmap for your POD. What is your method for finalization?',
      options: [
        { label: 'A', text: 'Drafting the quarterly roadmap with assistance from the lead PM, ensuring alignment with the business goal.', score: 1 },
        { label: 'B', text: 'Independently drafting the roadmap and presenting it as a finalized document to all stakeholders.', score: 2 },
        { label: 'C', text: 'Defining the roadmap primarily based on inputs from the engineering team\'s capacity.', score: 3 },
        { label: 'D', text: 'Including every requested feature from the sales and marketing teams to ensure cross-functional buy-in.', score: 4 },
        { label: 'E', text: 'Strictly using a quantitative scoring system (e.g., RICE or ICE) without incorporating strategic or qualitative input.', score: 5 },
      ],
    },
    {
      id: 'pm1_ps5',
      competency: 'product_sense',
      competencyBreakdown: 'Product Strategy (Vision)',
      scenario: 'You receive conflicting feedback from a customer (qualitative) and business leadership (quantitative data) on feature priority. How do you proceed?',
      options: [
        { label: 'A', text: 'Prioritizing the business leadership\'s request, as business impact is the primary driver.', score: 1 },
        { label: 'B', text: 'Strictly following the vision defined for the product feature, using strong independent judgment to reconcile the feedback.', score: 2 },
        { label: 'C', text: 'Deferring the decision to a majority vote from the cross-functional team.', score: 3 },
        { label: 'D', text: 'Building a quick A/B test to see which direction yields the best short-term results.', score: 4 },
        { label: 'E', text: 'Immediately accepting the qualitative customer feedback, as "the customer is always right."', score: 5 },
      ],
    },

    // PROBLEM SOLVING & EXECUTION (4 questions)
    {
      id: 'pm1_pse1',
      competency: 'problem_solving',
      competencyBreakdown: 'Data Driven Decision Making',
      scenario: 'You are defining the success metrics for your product. What is your role in this process?',
      options: [
        { label: 'A', text: 'You take ownership of defining and continuously monitoring the POD-level health metrics and using this data to drive product decisions.', score: 1 },
        { label: 'B', text: 'You rely solely on the Analytics team to define and monitor all metrics, viewing your role as purely executive.', score: 2 },
        { label: 'C', text: 'You only track metrics directly related to revenue, ignoring user engagement or cost metrics.', score: 3 },
        { label: 'D', text: 'You focus on tracking vanity metrics that make the product look successful, even if they don\'t reflect true customer value.', score: 4 },
        { label: 'E', text: 'You define the metrics and then rarely look at them, preferring to rely on your product instinct.', score: 5 },
      ],
    },
    {
      id: 'pm1_pse2',
      competency: 'problem_solving',
      competencyBreakdown: 'Product Notes, Concept Notes',
      scenario: 'You are writing a Product Spec for a complex, multi-feature release. How do you approach it?',
      options: [
        { label: 'A', text: 'You can write high-quality product specs, requiring only a few iterations after peer and lead PM review to reach final sign-off.', score: 1 },
        { label: 'B', text: 'You prefer to write brief, high-level notes and conduct all detailed communication verbally with the engineering team.', score: 2 },
        { label: 'C', text: 'You focus heavily on documenting why the product exists (the problem), but keep the what (the solution) vague.', score: 3 },
        { label: 'D', text: 'You strictly follow a template without adapting the structure to the complexity of the feature.', score: 4 },
        { label: 'E', text: 'You rely entirely on a separate technical writer to draft the product documentation for you.', score: 5 },
      ],
    },
    {
      id: 'pm1_pse3',
      competency: 'problem_solving',
      competencyBreakdown: 'Product Delivery',
      scenario: 'The cross-functional team (Engineering, Design, QA) is struggling with coordination, slowing delivery. What is your role?',
      options: [
        { label: 'A', text: 'You work closely with your immediate team to ensure swift, iterative delivery of product features, acting as the primary driver of execution flow.', score: 1 },
        { label: 'B', text: 'You delegate all communication and coordination tasks to the Engineering Manager, focusing purely on product strategy.', score: 2 },
        { label: 'C', text: 'You introduce a complex new project management methodology (e.g., Scrum/Kanban) to force better coordination.', score: 3 },
        { label: 'D', text: 'You primarily focus on blame allocation when delays occur, rather than process improvement.', score: 4 },
        { label: 'E', text: 'You accept the slower delivery speed, assuming it\'s a necessary trade-off for high quality.', score: 5 },
      ],
    },
    {
      id: 'pm1_pse4',
      competency: 'problem_solving',
      competencyBreakdown: 'GTM/Marketing Responsibilities',
      scenario: 'You are planning the launch of a significant new product feature. What do you focus on independently?',
      options: [
        { label: 'A', text: 'With help, you draft a release plan along with adoption plan. Constantly gather inputs from customers during early release to understand PMF.', score: 1 },
        { label: 'B', text: 'You rely solely on the Product Marketing Manager (PMM) to write and execute the entire GTM plan.', score: 2 },
        { label: 'C', text: 'You only focus on internal training and enablement, assuming the product will sell itself externally.', score: 3 },
        { label: 'D', text: 'You rush the launch to hit the quarterly deadline, even if the onboarding experience is complex.', score: 4 },
        { label: 'E', text: 'You spend most of your time on creating detailed pricing models rather than the adoption plan.', score: 5 },
      ],
    },

    // DELIVERING RESULTS (1 question)
    {
      id: 'pm1_dr1',
      competency: 'delivering_results',
      competencyBreakdown: 'Business Impact',
      scenario: 'What defines a successful year for you in terms of business impact?',
      options: [
        { label: 'A', text: 'Having a material impact on the POD OKRs. Example: $50k-$100k revenue impact, or $20k-$50k cost impact.', score: 1 },
        { label: 'B', text: 'Successfully shipping every single feature on the quarterly roadmap, regardless of the measured outcome.', score: 2 },
        { label: 'C', text: 'Only focusing on improving engineering efficiency metrics (e.g., faster deployment speed).', score: 3 },
        { label: 'D', text: 'Launching a high-visibility feature that generates a lot of positive social media buzz, even if the revenue impact is minimal.', score: 4 },
        { label: 'E', text: 'Only tracking the product\'s usage metrics, without translating them into a clear financial or customer experience value.', score: 5 },
      ],
    },

    // LEADERSHIP (4 questions)
    {
      id: 'pm1_ld1',
      competency: 'leadership',
      competencyBreakdown: 'Scope',
      scenario: 'A significant, unexpected business opportunity arises that requires a pivot for your POD. What is your role?',
      options: [
        { label: 'A', text: 'You manage the product work for your POD within the sub-group, adjusting the quarterly plan and clearly communicating the new prioritization to the team.', score: 1 },
        { label: 'B', text: 'You immediately escalate the pivot to the lead PM and wait for them to give explicit, step-by-step instructions.', score: 2 },
        { label: 'C', text: 'You insist on sticking to the original plan, citing the importance of commitment and stability.', score: 3 },
        { label: 'D', text: 'You only focus on the technical feasibility of the pivot, ignoring the business strategy.', score: 4 },
        { label: 'E', text: 'You let the Engineering Manager decide how to accommodate the new opportunity into the sprint.', score: 5 },
      ],
    },
    {
      id: 'pm1_ld2',
      competency: 'leadership',
      competencyBreakdown: 'Stakeholder Influence',
      scenario: 'You need a cross-product feature integration from another POD that is not on their roadmap. How do you gain alignment?',
      options: [
        { label: 'A', text: 'You are adept at influencing cross-functional teams across Product and can drive business impact by working effectively with business and marketing stakeholders.', score: 1 },
        { label: 'B', text: 'You publicly criticize the other POD\'s priorities to pressure them into helping your team.', score: 2 },
        { label: 'C', text: 'You only use formal documentation (emails, PRDs) and avoid direct negotiation.', score: 3 },
        { label: 'D', text: 'You offer to complete some of the other POD\'s roadmap items in exchange for their help.', score: 4 },
        { label: 'E', text: 'You ask your Director to mandate the integration, avoiding the need for peer-to-peer influence.', score: 5 },
      ],
    },
    {
      id: 'pm1_ld3',
      competency: 'leadership',
      competencyBreakdown: 'Communication',
      scenario: 'You are preparing an important weekly status update for your lead PM and key stakeholders. What is the focus?',
      options: [
        { label: 'A', text: 'A clear, high-level summary of the team\'s progress, key blockers, next steps, and any risks.', score: 1 },
        { label: 'B', text: 'A lengthy, detailed list of every completed ticket and engineering dependency from the past week.', score: 2 },
        { label: 'C', text: 'An update that only includes positive news, while downplaying or omitting current challenges and risks.', score: 3 },
        { label: 'D', text: 'A document focused entirely on the team\'s morale and upcoming social events.', score: 4 },
        { label: 'E', text: 'An email that forwards all relevant Slack channel conversations without additional context or summary.', score: 5 },
      ],
    },
    {
      id: 'pm1_ld4',
      competency: 'leadership',
      competencyBreakdown: 'Recruiting',
      scenario: 'Your team is actively hiring. What is your involvement?',
      options: [
        { label: 'A', text: 'You actively participate in APM/PM1 recruiting loops, providing referrals and assisting with candidate assessment.', score: 1 },
        { label: 'B', text: 'You politely decline to participate in interviews, as your focus is solely on feature delivery.', score: 2 },
        { label: 'C', text: 'You only provide negative feedback on candidates, setting an extremely high and sometimes unrealistic bar.', score: 3 },
        { label: 'D', text: 'You delegate all recruiting tasks to the HR team.', score: 4 },
        { label: 'E', text: 'You only interview candidates from certain universities or backgrounds.', score: 5 },
      ],
    },
  ],

  // ============================================
  // PM II QUESTIONS (14 total)
  // ============================================
  pm2: [
    // PRODUCT SENSE & PRODUCT STRATEGY (5 questions)
    {
      id: 'pm2_ps1',
      competency: 'product_sense',
      competencyBreakdown: 'Customer/Ecosystem Empathy',
      scenario: 'You need to pitch a major new investment to leadership. How do you prove the customer need?',
      options: [
        { label: 'A', text: 'You use a combination of deep qualitative research, quantitative data, and strong empathy to internalize the customer\'s perspective better than anyone else in the company.', score: 1 },
        { label: 'B', text: 'You rely primarily on the sales team\'s anecdotal feedback, as they are closest to the customer\'s wallet.', score: 2 },
        { label: 'C', text: 'You conduct one quick survey and present the results as conclusive proof of the customer\'s desire.', score: 3 },
        { label: 'D', text: 'You focus entirely on the solution, assuming the customer will naturally adopt any new technology you build.', score: 4 },
        { label: 'E', text: 'You benchmark a competitor\'s success and assume your customers have the same needs.', score: 5 },
      ],
    },
    {
      id: 'pm2_ps2',
      competency: 'product_sense',
      competencyBreakdown: 'Domain Knowledge (Competition, Industry)',
      scenario: 'You discover a competitor has launched a new, disruptive feature that threatens your POD\'s market share. What is your action?',
      options: [
        { label: 'A', text: 'You actively benchmark the disruptive feature against your product, analyzing it to ensure your team addresses the core customer problem better than the competition.', score: 1 },
        { label: 'B', text: 'You immediately pivot the entire quarterly roadmap to copy the competitor\'s feature without deeper analysis.', score: 2 },
        { label: 'C', text: 'You downplay the competitor\'s threat to avoid causing alarm among internal stakeholders.', score: 3 },
        { label: 'D', text: 'You rely on the assumption that the competitor lacks the domain knowledge your team possesses.', score: 4 },
        { label: 'E', text: 'You only analyze the competitor\'s stock price, ignoring the product-level threat.', score: 5 },
      ],
    },
    {
      id: 'pm2_ps3',
      competency: 'product_sense',
      competencyBreakdown: 'Creative Solutioning',
      scenario: 'Your POD has a clear business goal (e.g., 20% adoption increase). How do you approach generating solutions?',
      options: [
        { label: 'A', text: 'You independently generate and propose innovative ideas for entirely new features or significant enhancements, focusing on platform scalability.', score: 1 },
        { label: 'B', text: 'You only focus on optimizing the existing system (e.g., A/B testing copy changes) to meet the 20% goal incrementally.', score: 2 },
        { label: 'C', text: 'You solely rely on the engineering team to come up with the architectural solution, assuming product innovation is secondary.', score: 3 },
        { label: 'D', text: 'You copy a proven strategy from a completely different product line, without adapting it for your customer base.', score: 4 },
        { label: 'E', text: 'You propose a solution that is technically complex but only yields a temporary, short-term gain.', score: 5 },
      ],
    },
    {
      id: 'pm2_ps4',
      competency: 'product_sense',
      competencyBreakdown: 'Product Prioritisation and Roadmapping',
      scenario: 'You are owning the quarterly roadmap. A high-value opportunity appears that requires delaying a committed item. How do you decide?',
      options: [
        { label: 'A', text: 'You own the quarterly roadmap and apply strong, independent judgment, prioritizing the new opportunity based on its calculated business impact over the committed item.', score: 1 },
        { label: 'B', text: 'You refuse to change the roadmap mid-quarter, citing the importance of sticking to commitments.', score: 2 },
        { label: 'C', text: 'You immediately agree to the new opportunity without analyzing its impact on the committed backlog.', score: 3 },
        { label: 'D', text: 'You escalate the decision to the VP of Product, avoiding responsibility for the trade-off.', score: 4 },
        { label: 'E', text: 'You only prioritize items that directly reduce your team\'s operational load, regardless of business impact.', score: 5 },
      ],
    },
    {
      id: 'pm2_ps5',
      competency: 'product_sense',
      competencyBreakdown: 'Product Strategy (Vision)',
      scenario: 'You receive a customer request that strongly conflicts with your current product vision. How do you handle it?',
      options: [
        { label: 'A', text: 'You apply strong, independent judgment on the feedback, prioritizing items based on maximum business impact, and firmly hold the team accountable to the vision.', score: 1 },
        { label: 'B', text: 'You immediately accept the customer request and change the vision to accommodate it, pleasing the customer in the short term.', score: 2 },
        { label: 'C', text: 'You reject the request outright without conducting any research into the underlying problem.', score: 3 },
        { label: 'D', text: 'You focus only on the technical feasibility of the request, ignoring the strategic implication.', score: 4 },
        { label: 'E', text: 'You postpone the decision until the end of the quarter, hoping the problem resolves itself.', score: 5 },
      ],
    },

    // PROBLEM SOLVING & EXECUTION (4 questions)
    {
      id: 'pm2_pse1',
      competency: 'problem_solving',
      competencyBreakdown: 'Data Driven Decision Making',
      scenario: 'A core metric for your product has been stagnating for two quarters. What is your role in addressing this?',
      options: [
        { label: 'A', text: 'You act as the data champion for your product, using data to understand the root causes of problems and driving action to improve the POD\'s health metrics.', score: 1 },
        { label: 'B', text: 'You blame the engineering team for a flawed implementation and demand a full rewrite.', score: 2 },
        { label: 'C', text: 'You only focus on presenting the best-performing feature metrics, omitting the stagnating core metric in leadership updates.', score: 3 },
        { label: 'D', text: 'You commission a new market research report, believing the problem is external to your product.', score: 4 },
        { label: 'E', text: 'You assume the problem is due to an external factor (e.g., seasonality) and make no changes.', score: 5 },
      ],
    },
    {
      id: 'pm2_pse2',
      competency: 'problem_solving',
      competencyBreakdown: 'Product Notes, Concept Notes',
      scenario: 'You are preparing a complex PRD for a multi-team feature integration. How do you ensure quality?',
      options: [
        { label: 'A', text: 'You can independently write a high-quality product spec with 1-2 iterations post-peer reviews, delivering exemplary PR-FAQs (Press Release, FAQ).', score: 1 },
        { label: 'B', text: 'You rely heavily on a technical writer or APM to draft the majority of the document, only providing a high-level outline.', score: 2 },
        { label: 'C', text: 'You focus solely on the \'What\' (the feature details), assuming the \'Why\' (the problem) is already understood.', score: 3 },
        { label: 'D', text: 'You write a brief document and schedule an exhaustive, 3-hour meeting to explain the details verbally.', score: 4 },
        { label: 'E', text: 'You only write the PRD after the feature has been partially coded, using the code as the source of truth.', score: 5 },
      ],
    },
    {
      id: 'pm2_pse3',
      competency: 'problem_solving',
      competencyBreakdown: 'Product Delivery',
      scenario: 'A key cross-functional partner (e.g., Legal or Compliance) is delaying the launch of a critical feature. What do you do?',
      options: [
        { label: 'A', text: 'You work closely with your cross-functional team (Engineering, Design, etc.) to iteratively unblock and quickly deliver the feature, focusing on process efficiency.', score: 1 },
        { label: 'B', text: 'You escalate the issue immediately to your lead PM, asking them to handle the complex stakeholder management.', score: 2 },
        { label: 'C', text: 'You deprioritize the feature and move to the next item on the roadmap to maintain team speed.', score: 3 },
        { label: 'D', text: 'You create a minimal viable workaround that bypasses the need for the blocking team\'s sign-off.', score: 4 },
        { label: 'E', text: 'You publicly complain about the blocking team in internal communication channels to pressure them.', score: 5 },
      ],
    },
    {
      id: 'pm2_pse4',
      competency: 'problem_solving',
      competencyBreakdown: 'GTM/Marketing Responsibilities',
      scenario: 'You are planning the launch of a significant new product feature. What do you focus on independently?',
      options: [
        { label: 'A', text: 'You independently draft a complete release plan and adoption strategy, focusing on designing and delivering ease of integration/onboarding.', score: 1 },
        { label: 'B', text: 'You rely solely on the Product Marketing Manager (PMM) to write and execute the entire GTM plan.', score: 2 },
        { label: 'C', text: 'You only focus on internal training and enablement, assuming the product will sell itself externally.', score: 3 },
        { label: 'D', text: 'You rush the launch to hit the quarterly deadline, even if the onboarding experience is complex.', score: 4 },
        { label: 'E', text: 'You spend most of your time on creating detailed pricing models rather than the adoption plan.', score: 5 },
      ],
    },

    // DELIVERING RESULTS (1 question)
    {
      id: 'pm2_dr1',
      competency: 'delivering_results',
      competencyBreakdown: 'Business Impact',
      scenario: 'What defines a successful year for you in terms of business impact?',
      options: [
        { label: 'A', text: 'Delivering a small to medium-sized customer-facing outcome with a measurable annual impact (e.g., $50k-$100k revenue or $20k-$50k cost annualized).', score: 1 },
        { label: 'B', text: 'Successfully shipping every single feature on the quarterly roadmap, regardless of the measured outcome.', score: 2 },
        { label: 'C', text: 'Only focusing on improving engineering efficiency metrics (e.g., faster deployment speed).', score: 3 },
        { label: 'D', text: 'Launching a high-visibility feature that generates a lot of positive social media buzz, even if the revenue impact is minimal.', score: 4 },
        { label: 'E', text: 'Only tracking the product\'s usage metrics, without translating them into a clear financial or customer experience value.', score: 5 },
      ],
    },

    // LEADERSHIP (4 questions)
    {
      id: 'pm2_ld1',
      competency: 'leadership',
      competencyBreakdown: 'Scope',
      scenario: 'A significant, unexpected business opportunity arises that requires a pivot for your POD. What is your role?',
      options: [
        { label: 'A', text: 'You manage the product work for your POD within the sub-group, adjusting the quarterly plan and clearly communicating the new prioritization to the team.', score: 1 },
        { label: 'B', text: 'You immediately escalate the pivot to the lead PM and wait for them to give explicit, step-by-step instructions.', score: 2 },
        { label: 'C', text: 'You insist on sticking to the original plan, citing the importance of commitment and stability.', score: 3 },
        { label: 'D', text: 'You only focus on the technical feasibility of the pivot, ignoring the business strategy.', score: 4 },
        { label: 'E', text: 'You let the Engineering Manager decide how to accommodate the new opportunity into the sprint.', score: 5 },
      ],
    },
    {
      id: 'pm2_ld2',
      competency: 'leadership',
      competencyBreakdown: 'Stakeholder Influence',
      scenario: 'You need a cross-product feature integration from another POD that is not on their roadmap. How do you gain alignment?',
      options: [
        { label: 'A', text: 'You are adept at influencing cross-functional teams across Product and can drive business impact by working effectively with business and marketing stakeholders.', score: 1 },
        { label: 'B', text: 'You publicly criticize the other POD\'s priorities to pressure them into helping your team.', score: 2 },
        { label: 'C', text: 'You only use formal documentation (emails, PRDs) and avoid direct negotiation.', score: 3 },
        { label: 'D', text: 'You offer to complete some of the other POD\'s roadmap items in exchange for their help.', score: 4 },
        { label: 'E', text: 'You ask your Director to mandate the integration, avoiding the need for peer-to-peer influence.', score: 5 },
      ],
    },
    {
      id: 'pm2_ld3',
      competency: 'leadership',
      competencyBreakdown: 'Communication',
      scenario: 'Your team\'s work is being reviewed by executive leadership. What is your role in that communication?',
      options: [
        { label: 'A', text: 'You provide support and content for communication about the team\'s work to executives and the company at large, preparing the narrative and key metrics.', score: 1 },
        { label: 'B', text: 'You insist that only the lead PM presents the work, as you feel executives should only hear from senior staff.', score: 2 },
        { label: 'C', text: 'You focus primarily on technical implementation details, assuming executives care about the complexity.', score: 3 },
        { label: 'D', text: 'You create a visually impressive presentation that lacks substance or clear data on impact.', score: 4 },
        { label: 'E', text: 'You only share information that paints a perfect picture, hiding any challenges or trade-offs.', score: 5 },
      ],
    },
    {
      id: 'pm2_ld4',
      competency: 'leadership',
      competencyBreakdown: 'Recruiting',
      scenario: 'Your team is actively hiring. What is your involvement?',
      options: [
        { label: 'A', text: 'You actively participate in APM/PM1 recruiting loops, providing referrals and assisting with candidate assessment.', score: 1 },
        { label: 'B', text: 'You politely decline to participate in interviews, as your focus is solely on feature delivery.', score: 2 },
        { label: 'C', text: 'You only provide negative feedback on candidates, setting an extremely high and sometimes unrealistic bar.', score: 3 },
        { label: 'D', text: 'You delegate all recruiting tasks to the HR team.', score: 4 },
        { label: 'E', text: 'You only interview candidates from certain universities or backgrounds.', score: 5 },
      ],
    },
  ],

  // ============================================
  // SENIOR PM QUESTIONS (14 total)
  // ============================================
  senior_pm: [
    // PRODUCT SENSE & PRODUCT STRATEGY (5 questions)
    {
      id: 'spm_ps1',
      competency: 'product_sense',
      competencyBreakdown: 'Customer/Ecosystem Empathy',
      scenario: 'You are defining the next major product area. How do you engage your collaborators (Engineering, Design) with customer need?',
      options: [
        { label: 'A', text: 'You are the expert on the customer and her needs, and you actively \'infect\' your collaborators with empathy, making them feel and prioritize the customer pain point.', score: 1 },
        { label: 'B', text: 'You simply forward raw customer interview transcripts to the team and expect them to draw the correct conclusions.', score: 2 },
        { label: 'C', text: 'You primarily rely on the Customer Support manager to relay customer problems during standups.', score: 3 },
        { label: 'D', text: 'You focus heavily on market data (e.g., TAM, SAM), assuming that high market potential equates to customer love.', score: 4 },
        { label: 'E', text: 'You assume that because you use the product, you are the ideal proxy for the customer.', score: 5 },
      ],
    },
    {
      id: 'spm_ps2',
      competency: 'product_sense',
      competencyBreakdown: 'Domain Knowledge (Competition, Industry)',
      scenario: 'Your product is a platform that relies on integration with other internal and external systems. How do you manage this complexity?',
      options: [
        { label: 'A', text: 'You own competition benchmarking for your product and deeply understand how your product interacts with different parts of the ecosystem and adjacent product lines.', score: 1 },
        { label: 'B', text: 'You restrict your focus solely to your POD\'s immediate boundaries, ignoring how other systems impact your product.', score: 2 },
        { label: 'C', text: 'You focus only on the competitors in your immediate vertical, ignoring adjacent or tangential threats.', score: 3 },
        { label: 'D', text: 'You delegate all ecosystem analysis and competitive review to the most junior PM on the team.', score: 4 },
        { label: 'E', text: 'You assume that your product\'s strong reputation will shield it from any external ecosystem changes.', score: 5 },
      ],
    },
    {
      id: 'spm_ps3',
      competency: 'product_sense',
      competencyBreakdown: 'Creative Solutioning',
      scenario: 'You are kicking off a new annual strategy session. What is your contribution to the solution generation?',
      options: [
        { label: 'A', text: 'You generate innovative ideas for entirely new products or platform capabilities, helping build scalability and extensibility from the very beginning.', score: 1 },
        { label: 'B', text: 'You focus solely on incremental improvements to existing features, avoiding the risk associated with new product ideas.', score: 2 },
        { label: 'C', text: 'You only approve ideas brought forth by your Engineering Manager, relying on their technical expertise.', score: 3 },
        { label: 'D', text: 'You propose a product idea that is technically interesting but has a very small addressable market.', score: 4 },
        { label: 'E', text: 'You spend all your time on detailed financial modeling, leaving the creative ideation to others.', score: 5 },
      ],
    },
    {
      id: 'spm_ps4',
      competency: 'product_sense',
      competencyBreakdown: 'Product Prioritisation and Roadmapping',
      scenario: 'You are defining the annual roadmap for your POD. How do you manage the long-term strategic balance?',
      options: [
        { label: 'A', text: 'You own the annual strategy for your POD (with minimal assistance) while simultaneously defining and managing the quarterly roadmap for execution.', score: 1 },
        { label: 'B', text: 'You focus only on the next quarter\'s deliverables, believing annual planning is too uncertain to be valuable.', score: 2 },
        { label: 'C', text: 'You define a \'set-it-and-forget-it\' annual plan and refuse to make any changes or pivots during the year.', score: 3 },
        { label: 'D', text: 'You only prioritize projects that have a clear, immediate ROI, ignoring strategic or platform investments.', score: 4 },
        { label: 'E', text: 'You delegate the entire annual planning process to an analyst or business operations associate.', score: 5 },
      ],
    },
    {
      id: 'spm_ps5',
      competency: 'product_sense',
      competencyBreakdown: 'Product Strategy (Vision)',
      scenario: 'You are reviewing the annual strategy for your POD. What is the most critical element you focus on?',
      options: [
        { label: 'A', text: 'You focus the team on a clear, inspiring product vision, applying strong, independent judgment to prioritize for maximum business impact and long-term value.', score: 1 },
        { label: 'B', text: 'You rely heavily on the CEO\'s most recent public statement as the sole source of your product vision.', score: 2 },
        { label: 'C', text: 'You allow the vision to shift based on the loudest stakeholder request of the month.', score: 3 },
        { label: 'D', text: 'You focus only on internal efficiency metrics, losing sight of the external customer impact.', score: 4 },
        { label: 'E', text: 'You set a vision that is easily achievable in the next three months, prioritizing quick success over long-term ambition.', score: 5 },
      ],
    },

    // PROBLEM SOLVING & EXECUTION (4 questions)
    {
      id: 'spm_pse1',
      competency: 'problem_solving',
      competencyBreakdown: 'Data Driven Decision Making',
      scenario: 'Your team is hesitant to launch an unproven, high-potential feature. How do you proceed?',
      options: [
        { label: 'A', text: 'You drive experimentation rigor, asking the right questions to set up the product for success, ensuring the team learns fast and is comfortable failing fast.', score: 1 },
        { label: 'B', text: 'You force the team to launch the full feature immediately, believing in a "big bang" approach.', score: 2 },
        { label: 'C', text: 'You abandon the feature idea, avoiding the risk of a potential failure or negative PR.', score: 3 },
        { label: 'D', text: 'You allow the Engineering Manager to build the feature without defining clear, measurable success metrics upfront.', score: 4 },
        { label: 'E', text: 'You only agree to launch if the outcome is 100% guaranteed to be positive, paralyzing the team with risk aversion.', score: 5 },
      ],
    },
    {
      id: 'spm_pse2',
      competency: 'problem_solving',
      competencyBreakdown: 'Product Notes, Concept Notes',
      scenario: 'You are writing the vision/spec for a new, complex product with a multi-quarter implementation path. How do you ensure clarity and alignment?',
      options: [
        { label: 'A', text: 'You write complex specs (PRDs, Concept Notes) with a multi-quarter implementation path independently, setting the tone for exemplary documentation across the organization.', score: 1 },
        { label: 'B', text: 'You focus solely on high-level goals, leaving the multi-quarter implementation details to the engineering leads.', score: 2 },
        { label: 'C', text: 'You spend months refining the document to achieve theoretical perfection, delaying the start of execution.', score: 3 },
        { label: 'D', text: 'You delegate the core writing to an APM, focusing your effort on stakeholder management.', score: 4 },
        { label: 'E', text: 'You present the plan entirely via PowerPoint, avoiding the complexity of a written document.', score: 5 },
      ],
    },
    {
      id: 'spm_pse3',
      competency: 'problem_solving',
      competencyBreakdown: 'Product Delivery',
      scenario: 'The team is struggling to deliver a complex product on time due to conflicting internal dependencies. What is your core action?',
      options: [
        { label: 'A', text: 'You turn good specs into working products by leading cross-functional collaboration, helping teams operate seamlessly to deliver at a high speed.', score: 1 },
        { label: 'B', text: 'You personally micro-manage every engineer, assuming this is the only way to meet the deadline.', score: 2 },
        { label: 'C', text: 'You publicly blame the dependency teams for the delay, reducing team morale.', score: 3 },
        { label: 'D', text: 'You cut the scope of the feature by 50% without consulting the customer impact.', score: 4 },
        { label: 'E', text: 'You ask for a 100% budget increase, believing more resources will solve the coordination issue.', score: 5 },
      ],
    },
    {
      id: 'spm_pse4',
      competency: 'problem_solving',
      competencyBreakdown: 'GTM/Marketing Responsibilities',
      scenario: 'You are planning a major product launch and need to ensure high adoption. What is your leadership priority?',
      options: [
        { label: 'A', text: 'You independently draft the launch plan and continuously push teams to ensure that adoption and rapid feedback cycles are in place, raising the bar on onboarding and integration ease.', score: 1 },
        { label: 'B', text: 'You focus only on the initial press release, assuming high visibility will lead to high adoption.', score: 2 },
        { label: 'C', text: 'You delegate the entire adoption strategy to the Sales team, without providing product guidance.', score: 3 },
        { label: 'D', text: 'You insist on launching without a clear feedback loop, prioritizing speed over learning.', score: 4 },
        { label: 'E', text: 'You only focus on the next feature development, assuming the current one will succeed or fail on its own merits.', score: 5 },
      ],
    },

    // DELIVERING RESULTS (1 question)
    {
      id: 'spm_dr1',
      competency: 'delivering_results',
      competencyBreakdown: 'Business Impact',
      scenario: 'What defines a highly successful feature launch for you in terms of magnitude of impact?',
      options: [
        { label: 'A', text: 'Delivering a medium-sized customer-facing outcome with a measurable annual impact (e.g., $100k-$200k revenue or $50k-$100k cost annualized).', score: 1 },
        { label: 'B', text: 'Successfully launching an elegant, technically challenging product, regardless of the business impact achieved.', score: 2 },
        { label: 'C', text: 'Achieving a short-term vanity metric (e.g., social media mentions) that quickly fades after launch.', score: 3 },
        { label: 'D', text: 'Only measuring success based on the Engineering team\'s happiness and low bug count.', score: 4 },
        { label: 'E', text: 'Launching a feature that sets the stage for a major strategic goal in two years, with no current measurable impact.', score: 5 },
      ],
    },

    // LEADERSHIP (4 questions)
    {
      id: 'spm_ld1',
      competency: 'leadership',
      competencyBreakdown: 'Scope',
      scenario: 'You are asked to review a new project that spans two other PODs in your sub-group. What is your involvement?',
      options: [
        { label: 'A', text: 'You manage and guide the product work for your POD while also reviewing and providing input on adjacent, complex projects within the larger sub-group.', score: 1 },
        { label: 'B', text: 'You refuse to look at any project outside your immediate POD boundary, citing focus and time constraints.', score: 2 },
        { label: 'C', text: 'You immediately take over the product management responsibilities for the adjacent projects, overloading yourself.', score: 3 },
        { label: 'D', text: 'You only provide feedback on the design aesthetic of the project, ignoring the business case.', score: 4 },
        { label: 'E', text: 'You defer the entire review to your lead PM or Director.', score: 5 },
      ],
    },
    {
      id: 'spm_ld2',
      competency: 'leadership',
      competencyBreakdown: 'Stakeholder Influence',
      scenario: 'You need to change a key business process that impacts sales, marketing, and legal teams. How do you get senior buy-in?',
      options: [
        { label: 'A', text: 'You lead cross-functional collaboration to drive product execution and actively influence leaders (Director and above) in business, marketing, and other product areas.', score: 1 },
        { label: 'B', text: 'You use data to prove your case, but avoid any negotiation or compromise with the impacted leaders.', score: 2 },
        { label: 'C', text: 'You expect your Director to handle all difficult conversations and gain the necessary approvals.', score: 3 },
        { label: 'D', text: 'You only focus on technical implementation, assuming the business process will adapt naturally.', score: 4 },
        { label: 'E', text: 'You send a company-wide email announcing the change and assume people will comply.', score: 5 },
      ],
    },
    {
      id: 'spm_ld3',
      competency: 'leadership',
      competencyBreakdown: 'Communication',
      scenario: 'You need to pitch a major strategic shift to the executive team. How do you prepare and deliver the message?',
      options: [
        { label: 'A', text: 'You communicate effectively and directly with executives without support to gather feedback, generate alignment, and drive impact for your product.', score: 1 },
        { label: 'B', text: 'You rely heavily on a prepared script written by the communications team.', score: 2 },
        { label: 'C', text: 'You focus the presentation on a deep dive into customer personas, avoiding discussion of financials.', score: 3 },
        { label: 'D', text: 'You send the presentation slides ahead of time and assume they will understand the core message.', score: 4 },
        { label: 'E', text: 'You allow your Director to lead the pitch and only chime in when asked a specific question.', score: 5 },
      ],
    },
    {
      id: 'spm_ld4',
      competency: 'leadership',
      competencyBreakdown: 'Recruiting',
      scenario: 'Your team has a critical open role. What is your responsibility in the hiring process?',
      options: [
        { label: 'A', text: 'You successfully recruit for the team (including PMs, Engineering Managers, Designers, and Analysts) and focus on finding candidates who will raise the team\'s overall capability.', score: 1 },
        { label: 'B', text: 'You only recruit candidates who are currently working at competitor companies.', score: 2 },
        { label: 'C', text: 'You rely entirely on your Engineering Manager to find and vet candidates, as they know the skills needed.', score: 3 },
        { label: 'D', text: 'You only participate in the final-round interview to approve a candidate that others have already selected.', score: 4 },
        { label: 'E', text: 'You avoid giving honest feedback to candidates for fear of negative reprisal.', score: 5 },
      ],
    },
  ],

  // ============================================
  // ASSOCIATE DIRECTOR QUESTIONS (15 total)
  // ============================================
  associate_director: [
    // PRODUCT SENSE & PRODUCT STRATEGY (5 questions)
    {
      id: 'ad_ps1',
      competency: 'product_sense',
      competencyBreakdown: 'Customer/Ecosystem Empathy',
      scenario: 'Your sub-group owns multiple customer-facing products. How do you ensure continuous, high-quality customer input across all products?',
      options: [
        { label: 'A', text: 'You establish a formal, repeatable process for capturing customer inputs, triaging issues swiftly, resolving them, and including necessary feedback in the team roadmaps.', score: 1 },
        { label: 'B', text: 'You expect individual PMs to handle all customer inputs, without creating a centralized process or framework.', score: 2 },
        { label: 'C', text: 'You only listen to feedback from the top 1% of your customers (e.g., Enterprise clients).', score: 3 },
        { label: 'D', text: 'You assume that successful financial results are sufficient proof of customer love.', score: 4 },
        { label: 'E', text: 'You focus all the team\'s energy on minimizing customer complaints rather than proactively seeking feedback.', score: 5 },
      ],
    },
    {
      id: 'ad_ps2',
      competency: 'product_sense',
      competencyBreakdown: 'Domain Knowledge (Competition, Industry)',
      scenario: 'A major shift in industry regulation or technology threatens your entire product line. How do you respond strategically?',
      options: [
        { label: 'A', text: 'You analyze broad industry trends and global signals related to your product line, drawing inferences to define a long-term strategy that navigates the change.', score: 1 },
        { label: 'B', text: 'You insist on maintaining the status quo, believing the regulatory/tech change will eventually be reversed.', score: 2 },
        { label: 'C', text: 'You focus solely on short-term tactical fixes to address the most immediate symptom of the change.', score: 3 },
        { label: 'D', text: 'You delegate the entire problem to the Legal department, avoiding any product strategy involvement.', score: 4 },
        { label: 'E', text: 'You commission a massive, multi-year research project, delaying any action until all data is collected.', score: 5 },
      ],
    },
    {
      id: 'ad_ps3',
      competency: 'product_sense',
      competencyBreakdown: 'Creative Solutioning',
      scenario: 'Your sub-group needs to find ways to leverage platform capabilities across multiple PODs. What is your approach?',
      options: [
        { label: 'A', text: 'You generate innovative ideas for new, complex product areas and provide frameworks and guidance for developing scalability, reusability, and extensibility across platform products.', score: 1 },
        { label: 'B', text: 'You only allow individual PODs to build whatever they need, even if it creates redundant, non-reusable code.', score: 2 },
        { label: 'C', text: 'You only focus on enforcing the most basic architectural rules, avoiding complex platform strategies.', score: 3 },
        { label: 'D', text: 'You delegate all platform vision to the Head of Engineering, stepping back from product ownership.', score: 4 },
        { label: 'E', text: 'You mandate that all new products must be built from scratch, avoiding the complexity of existing platform integration.', score: 5 },
      ],
    },
    {
      id: 'ad_ps4',
      competency: 'product_sense',
      competencyBreakdown: 'Product Prioritisation and Roadmapping',
      scenario: 'You own the annual strategy for your sub-group (multiple PODs). How do you manage prioritization against company-wide goals?',
      options: [
        { label: 'A', text: 'You own the annual strategy for your sub-group (with assistance), defining clear frameworks on what the team prioritizes as problems to solve, creating the 12-month plan.', score: 1 },
        { label: 'B', text: 'You demand that your sub-group gets the majority of the company\'s resources, regardless of other team needs.', score: 2 },
        { label: 'C', text: 'You allow individual PMs to prioritize based on their personal interests, leading to misalignment across PODs.', score: 3 },
        { label: 'D', text: 'You focus only on projects that will yield a short-term publicity win, ignoring long-term strategic investments.', score: 4 },
        { label: 'E', text: 'You rely entirely on a quantitative formula (e.g., ROI) without applying strategic judgment to high-risk, high-reward projects.', score: 5 },
      ],
    },
    {
      id: 'ad_ps5',
      competency: 'product_sense',
      competencyBreakdown: 'Product Strategy (Vision)',
      scenario: 'A significant merger or acquisition is proposed that impacts your product line. How do you ensure product success?',
      options: [
        { label: 'A', text: 'You are responsible for the 12-month and 3-year plan for your sub-group, ensuring the vision adapts to significant corporate shifts while maintaining focus on core customer value.', score: 1 },
        { label: 'B', text: 'You insist that the M&A decision should not impact your product line or strategy at all.', score: 2 },
        { label: 'C', text: 'You only focus on the integration timeline, ignoring the strategic product fit or potential customer fallout.', score: 3 },
        { label: 'D', text: 'You publicly object to the merger, believing any external change is detrimental to your product\'s success.', score: 4 },
        { label: 'E', text: 'You halt all current product development until the M&A is fully completed, wasting valuable time.', score: 5 },
      ],
    },

    // PROBLEM SOLVING & EXECUTION (4 questions)
    {
      id: 'ad_pse1',
      competency: 'problem_solving',
      competencyBreakdown: 'Data Driven Decision Making',
      scenario: 'You manage metrics across multiple PODs. How do you foster a data-driven culture?',
      options: [
        { label: 'A', text: 'You own the definition of multiple POD-level health metrics and push cross-functional teams to continuously monitor these metrics and drive a data-driven decision-making culture.', score: 1 },
        { label: 'B', text: 'You simply review the metrics at the end of the quarter, providing only high-level commentary.', score: 2 },
        { label: 'C', text: 'You only focus on metrics that show linear growth, challenging any metric that shows volatility or flatlining.', score: 3 },
        { label: 'D', text: 'You mandate that every decision must be backed by a P-value of p<0.05, slowing down the execution pace significantly.', score: 4 },
        { label: 'E', text: 'You punish teams that report poor-performing metrics, incentivizing them to manage up and hide problems.', score: 5 },
      ],
    },
    {
      id: 'ad_pse2',
      competency: 'problem_solving',
      competencyBreakdown: 'Product Notes, Concept Notes',
      scenario: 'You are communicating a complex, org-wide strategic initiative to executives and external partners. How do you ensure clarity?',
      options: [
        { label: 'A', text: 'You write complex specs (PRDs, Concept Notes) that include very clear impacts beyond your own sub-group, setting an exemplary tone for executive communication across the organization.', score: 1 },
        { label: 'B', text: 'You rely entirely on your direct reports to write all necessary documentation, only signing off on the final version.', score: 2 },
        { label: 'C', text: 'You focus only on the internal goals of the initiative, ignoring how it impacts external stakeholders or partners.', score: 3 },
        { label: 'D', text: 'You use overly technical language, assuming executives are familiar with the internal jargon of your sub-group.', score: 4 },
        { label: 'E', text: 'You delay the communication until all the technical details are 100% finalized, missing the window for early alignment.', score: 5 },
      ],
    },
    {
      id: 'ad_pse3',
      competency: 'problem_solving',
      competencyBreakdown: 'Product Delivery',
      scenario: 'A major product launch by your sub-group is consistently facing delays due to process friction across multiple teams. What is your main responsibility?',
      options: [
        { label: 'A', text: 'You focus on helping cross-functional teams raise the bar on iteratively and quickly delivering products by removing process friction and advocating for speed.', score: 1 },
        { label: 'B', text: 'You escalate the issue to the CEO, asking for intervention at the highest level.', score: 2 },
        { label: 'C', text: 'You accept the delays, believing that high quality is fundamentally incompatible with high speed.', score: 3 },
        { label: 'D', text: 'You personally dive into the individual ticket backlogs of the lowest-level contributors to troubleshoot.', score: 4 },
        { label: 'E', text: 'You introduce a new, complex review step that further bottlenecks the delivery process.', score: 5 },
      ],
    },
    {
      id: 'ad_pse4',
      competency: 'problem_solving',
      competencyBreakdown: 'GTM/Marketing Responsibilities',
      scenario: 'Your sub-group is launching a new platform capability intended for internal adoption by other product teams. What is your GTM focus?',
      options: [
        { label: 'A', text: 'You drive the success of platform products by ensuring organization-wide adoption of capabilities, defining the end-to-end plan, and aggressively pushing for adoption and feedback loops.', score: 1 },
        { label: 'B', text: 'You only announce the capability and assume other product teams will naturally find and integrate it themselves.', score: 2 },
        { label: 'C', text: 'You delegate all adoption responsibility to the Engineering team that built the capability.', score: 3 },
        { label: 'D', text: 'You mandate the use of the new platform capability, without providing sufficient documentation or training.', score: 4 },
        { label: 'E', text: 'You focus only on the external marketing of the capability, ignoring the internal product team stakeholders.', score: 5 },
      ],
    },

    // DELIVERING RESULTS (1 question)
    {
      id: 'ad_dr1',
      competency: 'delivering_results',
      competencyBreakdown: 'Business Impact',
      scenario: 'At the end of the year, how do you define the success of your sub-group\'s output to leadership?',
      options: [
        { label: 'A', text: 'Delivery of a large-sized customer-facing outcome across multiple products, achieving significant annual revenue impact (e.g., $500k+) or major cost reduction (e.g., $100k+).', score: 1 },
        { label: 'B', text: 'Whether all individual PMs on your team successfully shipped their features, regardless of the overall combined business impact.', score: 2 },
        { label: 'C', text: 'Focus solely on the total number of features shipped by the sub-group that year.', score: 3 },
        { label: 'D', text: 'Only reporting on the technical efficiency gains, avoiding discussion of revenue or customer-facing metrics.', score: 4 },
        { label: 'E', text: 'Using future projections (e.g., potential future market size) instead of actual, realized annual impact.', score: 5 },
      ],
    },

    // LEADERSHIP (5 questions)
    {
      id: 'ad_ld1',
      competency: 'leadership',
      competencyBreakdown: 'Scope',
      scenario: 'You are defining the product strategy for your entire sub-group (multiple PODs). What is your primary focus?',
      options: [
        { label: 'A', text: 'You manage and define the product strategy for multiple PODs, ensuring alignment, and act as the IC owner of the entire sub-group\'s execution.', score: 1 },
        { label: 'B', text: 'You only manage the product work of the highest-performing POD and ignore the rest of the sub-group.', score: 2 },
        { label: 'C', text: 'You spend the majority of your time doing the work of a PM-1, avoiding the strategic complexity of the entire sub-group.', score: 3 },
        { label: 'D', text: 'You focus only on resolving technical bugs and operational issues across the sub-group.', score: 4 },
        { label: 'E', text: 'You redefine the sub-group\'s scope to be smaller, making the job less complex.', score: 5 },
      ],
    },
    {
      id: 'ad_ld2',
      competency: 'leadership',
      competencyBreakdown: 'Stakeholder Influence',
      scenario: 'You need alignment on a strategic priority from several senior leaders (Director/VP level) across Operations and Finance. How do you achieve this?',
      options: [
        { label: 'A', text: 'You actively collaborate with business and operations leaders (VP/Director level) to influence decisions and generate organizational alignment on complex product trade-offs.', score: 1 },
        { label: 'B', text: 'You rely solely on the CEO\'s sponsorship to push the priority through without personal engagement with the leaders.', score: 2 },
        { label: 'C', text: 'You communicate the priority only in writing, avoiding face-to-face meetings that might lead to debate.', score: 3 },
        { label: 'D', text: 'You focus primarily on influencing the junior analysts on the Finance/Ops teams, hoping they influence their leaders.', score: 4 },
        { label: 'E', text: 'You present the priority as non-negotiable, avoiding any trade-off discussion.', score: 5 },
      ],
    },
    {
      id: 'ad_ld3',
      competency: 'leadership',
      competencyBreakdown: 'Communication',
      scenario: 'You need to communicate a major pivot in product direction to the entire company. How do you handle this high-stakes message?',
      options: [
        { label: 'A', text: 'You communicate effectively and directly with executives and the entire company without support, gathering feedback, and generating crucial alignment to drive impact.', score: 1 },
        { label: 'B', text: 'You delegate the writing and presentation entirely to the Product Marketing team.', score: 2 },
        { label: 'C', text: 'You only send the pivot decision via an internal memo, avoiding a public announcement.', score: 3 },
        { label: 'D', text: 'You focus the communication entirely on the technical reasons for the pivot, ignoring the business or customer impact.', score: 4 },
        { label: 'E', text: 'You only inform the Engineering team, assuming other departments will catch up later.', score: 5 },
      ],
    },
    {
      id: 'ad_ld4',
      competency: 'leadership',
      competencyBreakdown: 'People Management, Coaching and Mentorship',
      scenario: 'A junior PM (PM-1) is struggling with a complex prioritization issue and seeks your advice. What is your primary action?',
      options: [
        { label: 'A', text: 'You actively mentor junior PMs, sharing frameworks and insights from your outstanding product execution skills, thereby influencing the product-building DNA of the organization.', score: 1 },
        { label: 'B', text: 'You tell the junior PM to follow the advice of their direct manager and offer no personal guidance.', score: 2 },
        { label: 'C', text: 'You take over the prioritization issue entirely and complete the work for them.', score: 3 },
        { label: 'D', text: 'You critique their past work without providing a constructive path forward.', score: 4 },
        { label: 'E', text: 'You suggest they find a different product area that is less complex to manage.', score: 5 },
      ],
    },
    {
      id: 'ad_ld5',
      competency: 'leadership',
      competencyBreakdown: 'Recruiting',
      scenario: 'You are asked to participate in the \'Product Thinking\' rounds for senior-level candidates outside your sub-group. What is your role?',
      options: [
        { label: 'A', text: 'You successfully recruit for the team (PMs, EMs, Designers) and are specifically sought after for the Product Thinking rounds by teams outside of Product, raising the hiring bar org-wide.', score: 1 },
        { label: 'B', text: 'You decline to participate, citing that your time is too valuable for general recruiting.', score: 2 },
        { label: 'C', text: 'You only focus on asking tactical, execution-focused questions, avoiding high-level product strategy.', score: 3 },
        { label: 'D', text: 'You rely entirely on a standardized question list without adapting your approach to the candidate\'s background.', score: 4 },
        { label: 'E', text: 'You only recruit for your specific sub-group and offer no support to other teams.', score: 5 },
      ],
    },
  ],
};

// Helper function to get questions for a specific role
export function getQuestionsForRole(roleId) {
  return questionsByRole[roleId] || [];
}

// Helper function to calculate scores
export function calculateScores(answers, roleId) {
  const questions = getQuestionsForRole(roleId);
  const competencyScores = {};
  let totalScore = 0;

  const competencyQuestionCount = {};

  questions.forEach((question) => {
    const selectedOption = answers[question.id];
    if (selectedOption) {
      const option = question.options.find((o) => o.label === selectedOption);
      if (option) {
        totalScore += option.score;

        if (!competencyScores[question.competency]) {
          competencyScores[question.competency] = 0;
          competencyQuestionCount[question.competency] = 0;
        }
        competencyScores[question.competency] += option.score;
        competencyQuestionCount[question.competency] += 1;
      }
    }
  });

  // Calculate average score per competency (out of 5)
  const competencyAverages = {};
  Object.keys(competencyScores).forEach((competency) => {
    competencyAverages[competency] =
      competencyScores[competency] / competencyQuestionCount[competency];
  });

  return {
    totalScore,
    maxScore: questions.length * 5,
    percentageScore: Math.round((totalScore / (questions.length * 5)) * 100),
    competencyScores: competencyAverages,
    rawCompetencyScores: competencyScores,
  };
}