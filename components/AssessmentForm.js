'use client';

import { useState, useMemo } from 'react';
import { roles, competencies } from '@/lib/competencies';
import { getQuestionsForRole, calculateScores } from '@/lib/questions';

// Functions list
const functions = [
  'Analytics', 'Banking', 'Business Development', 'Business Engineering & Sales Enablement Team',
  'Business Management', 'Business Operations', 'Business Strategy', 'COO Office',
  'Corporate Real Estate & Workplace Services', 'Customer Success', 'Design',
  'Emerging Business', 'Engineering', 'Enterprise Sales', 'Finance', "Founder's Office",
  'Group Compliance', 'GTM - Online First', 'GTM - Offline First', 'GTM - SME',
  'GTM - Startups', 'Key Account Management', 'Learning and Development', 'Legal',
  'Marketing', 'Mid Market', 'New Initiatives Team', 'Online Payments Sales',
  'Operations', 'Partnerships', 'People Operations', 'Product', 'Risk & Compliance',
  'Risk Management', 'Sales', 'SME', 'Solutions', 'Strategy', 'Underwriting & Risk',
  'Vigilance',
];

// SVG Icons
const Icons = {
  Scenarios: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  Compass: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Rocket: () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
};

export default function AssessmentForm({ onSubmit, isLoading }) {
  const [step, setStep] = useState('intro');
  const [currentCompetencyIndex, setCurrentCompetencyIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    currentRole: '',
    function: '',
    answers: {},
  });
  const [designationSearch, setDesignationSearch] = useState('');
  const [showDesignationDropdown, setShowDesignationDropdown] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get questions for the selected role
  const assessmentQuestions = useMemo(() => {
    return getQuestionsForRole(formData.currentRole);
  }, [formData.currentRole]);

  // Group questions by competency
  const questionsByCompetency = useMemo(() => {
    if (!formData.currentRole) return [];
    return competencies.map(comp => ({
      ...comp,
      questions: assessmentQuestions.filter(q => q.competency === comp.id)
    })).filter(comp => comp.questions.length > 0);
  }, [formData.currentRole, assessmentQuestions]);

  const currentCompetency = questionsByCompetency[currentCompetencyIndex];
  const totalCompetencies = questionsByCompetency.length;

  // Filter designations based on search
  const filteredRoles = useMemo(() => {
    if (designationSearch.length < 2) return [];
    return roles.filter(role => 
      role.label.toLowerCase().includes(designationSearch.toLowerCase())
    );
  }, [designationSearch]);

  const isCurrentCompetencyComplete = () => {
    if (!currentCompetency) return false;
    return currentCompetency.questions.every(q => formData.answers[q.id]);
  };

  const isAllComplete = () => {
    return assessmentQuestions.length > 0 && assessmentQuestions.every(q => formData.answers[q.id]);
  };

  const handleOptionSelect = (questionId, label) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: label }
    }));
  };

  const nextCompetency = () => {
    if (!isCurrentCompetencyComplete()) return;
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentCompetencyIndex < totalCompetencies - 1) {
        setCurrentCompetencyIndex(prev => prev + 1);
      } else {
        setStep('review');
      }
      setIsTransitioning(false);
    }, 300);
  };

  const prevCompetency = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentCompetencyIndex > 0) {
        setCurrentCompetencyIndex(prev => prev - 1);
      } else {
        setStep('details');
      }
      setIsTransitioning(false);
    }, 300);
  };

  const selectDesignation = (role) => {
    setFormData(prev => ({ 
      ...prev, 
      currentRole: role.id,
      answers: {} 
    }));
    setDesignationSearch(role.label);
    setShowDesignationDropdown(false);
  };

  // UPDATED HANDLE SUBMIT: Builds the prompt for the LLM
  const handleSubmit = () => {
    const scores = calculateScores(formData.answers, formData.currentRole);
    const roleLabel = roles.find(r => r.id === formData.currentRole)?.label;

    // Constructing a detailed prompt for Bedrock
    const promptString = `
      Please act as an expert Career Development Coach. Generate a highly personalized Individual Development Plan (IDP) for:
      
      - Name: ${formData.name}
      - Role: ${roleLabel}
      - Function: ${formData.function}
      - Assessment Score: ${scores.percentageScore}%

      Competency Performance Breakdown:
      ${questionsByCompetency.map(comp => {
        const score = scores.competencyScores[comp.id] || 0;
        return `- ${comp.name}: ${score.toFixed(1)}/5`;
      }).join('\n')}

      Specific Scenario Responses:
      ${assessmentQuestions.map(q => {
        const answerLabel = formData.answers[q.id];
        const fullAnswerText = q.options.find(o => o.label === answerLabel)?.text;
        return `Situation: ${q.scenario}\nUser chose: [${answerLabel}] ${fullAnswerText}`;
      }).join('\n\n')}

      Based on this data, provide:
      1. A detailed analysis of their current strengths.
      2. Priority focus areas for growth in a ${roleLabel} role.
      3. A 70-20-10 learning roadmap with specific actions tailored to their answers.
    `;

    onSubmit({
      ...formData,
      prompt: promptString, // Sending the generated prompt to the parent
      scores,
      questions: assessmentQuestions,
    });
  };

  // --- Screens ---

  if (step === 'intro') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 text-white text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icons.Rocket />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Personalised IDP Journey Starts Here</h1>
            <p className="text-blue-100 text-lg">Discover where you stand and where to grow</p>
          </div>
          <div className="p-8">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Icons.Scenarios />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Day-in-the-Life Situations</p>
                  <p className="text-sm text-gray-500">Real workplace scenarios you'll relate to</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <Icons.Compass />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Know If You're On Track</p>
                  <p className="text-sm text-gray-500">See how your approach aligns with expectations at your level</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <Icons.Clock />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">20-25 Minutes</p>
                  <p className="text-sm text-gray-500">Take your time, answer thoughtfully</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep('details')}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              Begin Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'details') {
    const isDetailsComplete = formData.name && formData.employeeId && formData.email && formData.currentRole && formData.function;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Let's get to know you</h2>
            <p className="text-gray-500">This helps us personalize your development plan</p>
          </div>
          <div className="space-y-6">
            <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 border rounded-xl" />
            <input type="text" placeholder="Employee ID" value={formData.employeeId} onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))} className="w-full px-4 py-3 border rounded-xl" />
            <input type="email" placeholder="Email ID" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 border rounded-xl" />
            <div className="relative">
              <input 
                type="text" 
                placeholder="Start typing your designation" 
                value={designationSearch} 
                onChange={(e) => { setDesignationSearch(e.target.value); setShowDesignationDropdown(true); }} 
                className="w-full px-4 py-3 border rounded-xl" 
              />
              {showDesignationDropdown && filteredRoles.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">
                  {filteredRoles.map(role => (
                    <button key={role.id} onClick={() => selectDesignation(role)} className="w-full px-4 py-3 text-left hover:bg-blue-50">
                      {role.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <select value={formData.function} onChange={(e) => setFormData(prev => ({ ...prev, function: e.target.value }))} className="w-full px-4 py-3 border rounded-xl bg-white">
              <option value="">Select your function</option>
              {functions.map(func => <option key={func} value={func}>{func}</option>)}
            </select>
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={() => setStep('intro')} className="text-gray-600">← Back</button>
            <button onClick={() => setStep('assessment')} disabled={!isDetailsComplete} className="px-8 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50">Start Assessment →</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'assessment') {
    const answeredInCurrentCompetency = currentCompetency?.questions.filter(q => formData.answers[q.id]).length || 0;
    const totalInCurrentCompetency = currentCompetency?.questions.length || 0;
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold">{currentCompetency?.name}</h2>
          <div className="h-2 bg-gray-100 rounded-full mt-4">
            <div className="h-full bg-blue-500 transition-all" style={{ width: `${((currentCompetencyIndex + (answeredInCurrentCompetency / totalInCurrentCompetency)) / totalCompetencies) * 100}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            {currentCompetency?.questions.map((question, qIndex) => (
              <div key={question.id} className="border-b pb-8 last:border-0">
                <p className="font-medium mb-4">{qIndex + 1}. {question.scenario}</p>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <button 
                      key={option.label} 
                      onClick={() => handleOptionSelect(question.id, option.label)} 
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all ${formData.answers[question.id] === option.label ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={prevCompetency} className="text-gray-600">Previous</button>
            <button onClick={nextCompetency} disabled={!isCurrentCompetencyComplete()} className="px-6 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50">
              {currentCompetencyIndex === totalCompetencies - 1 ? 'Review' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'review') {
    const totalQuestions = assessmentQuestions.length;
    const answeredCount = Object.keys(formData.answers).length;
    const allAnswered = answeredCount === totalQuestions;
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Icons.Check />
          <h2 className="text-2xl font-bold mt-4">Ready to Generate Your IDP?</h2>
          <p className="text-gray-500 mt-2 mb-8">You've completed {answeredCount} of {totalQuestions} questions.</p>
          <div className="flex gap-4">
            <button onClick={() => setStep('assessment')} className="flex-1 py-4 border-2 rounded-xl">Edit Answers</button>
            <button onClick={handleSubmit} disabled={isLoading || !allAnswered} className="flex-1 py-4 bg-green-600 text-white rounded-xl disabled:opacity-50">
              {isLoading ? 'Processing...' : 'Generate My IDP →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}