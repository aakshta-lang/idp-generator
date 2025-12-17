'use client';

import { useState, useMemo } from 'react';
import { roles, competencies } from '@/lib/competencies';
import { getQuestionsForRole, calculateScores } from '@/lib/questions';

// Functions list
const functions = [
  'Analytics',
  'Banking',
  'Business Development',
  'Business Engineering & Sales Enablement Team',
  'Business Management',
  'Business Operations',
  'Business Strategy',
  'COO Office',
  'Corporate Real Estate & Workplace Services',
  'Customer Success',
  'Design',
  'Emerging Business',
  'Engineering',
  'Enterprise Sales',
  'Finance',
  'Founder\'s Office',
  'Group Compliance',
  'GTM - Online First',
  'GTM - Offline First',
  'GTM - SME',
  'GTM - Startups',
  'Key Account Management',
  'Learning and Development',
  'Legal',
  'Marketing',
  'Mid Market',
  'New Initiatives Team',
  'Online Payments Sales',
  'Operations',
  'Partnerships',
  'People Operations',
  'Product',
  'Risk & Compliance',
  'Risk Management',
  'Sales',
  'SME',
  'Solutions',
  'Strategy',
  'Underwriting & Risk',
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

  // Group questions by competency (only when role is selected)
  const questionsByCompetency = useMemo(() => {
    if (!formData.currentRole) return [];
    return competencies.map(comp => ({
      ...comp,
      questions: assessmentQuestions.filter(q => q.competency === comp.id)
    })).filter(comp => comp.questions.length > 0); // Only show competencies that have questions
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

  // Calculate progress
  const progressPercentage = totalCompetencies > 0 
    ? ((currentCompetencyIndex) / totalCompetencies) * 100 
    : 0;

  // Check if all questions in current competency are answered
  const isCurrentCompetencyComplete = () => {
    if (!currentCompetency) return false;
    return currentCompetency.questions.every(q => formData.answers[q.id]);
  };

  // Check if all questions are answered
  const isAllComplete = () => {
    return assessmentQuestions.length > 0 && assessmentQuestions.every(q => formData.answers[q.id]);
  };

  // Handle option selection
  const handleOptionSelect = (questionId, label) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: label }
    }));
  };

  // Navigate competencies
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

  // Handle designation selection
  const selectDesignation = (role) => {
    setFormData(prev => ({ 
      ...prev, 
      currentRole: role.id,
      answers: {} // Reset answers when role changes
    }));
    setDesignationSearch(role.label);
    setShowDesignationDropdown(false);
  };

  // Handle form submission with scores
  const handleSubmit = () => {
    const scores = calculateScores(formData.answers, formData.currentRole);
    onSubmit({
      ...formData,
      scores,
      questions: assessmentQuestions,
    });
  };

  // Intro Screen
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
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Begin Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Details Screen
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your employee ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your work email"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Designation</label>
              <input
                type="text"
                value={designationSearch}
                onChange={(e) => {
                  setDesignationSearch(e.target.value);
                  setShowDesignationDropdown(true);
                  if (e.target.value.length < 2) {
                    setFormData(prev => ({ ...prev, currentRole: '', answers: {} }));
                  }
                }}
                onFocus={() => designationSearch.length >= 2 && setShowDesignationDropdown(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Start typing your designation (min 2 characters)"
              />
              {showDesignationDropdown && filteredRoles.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                  {filteredRoles.map(role => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => selectDesignation(role)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              )}
              {designationSearch.length >= 2 && filteredRoles.length === 0 && showDesignationDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-gray-500 text-sm">
                  No matching designations found
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Function</label>
              <select
                value={formData.function}
                onChange={(e) => setFormData(prev => ({ ...prev, function: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Select your function</option>
                {functions.map(func => (
                  <option key={func} value={func}>{func}</option>
                ))}
              </select>
            </div>

            {/* Show selected role info */}
            {formData.currentRole && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-800 text-sm">
                  <span className="font-semibold">Selected:</span> {roles.find(r => r.id === formData.currentRole)?.label}
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  {assessmentQuestions.length} questions will be tailored for your role
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep('intro')}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => {
                setStep('assessment');
                setCurrentCompetencyIndex(0);
              }}
              disabled={!isDetailsComplete}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Assessment Screen (All questions per competency)
  if (step === 'assessment') {
    const answeredInCurrentCompetency = currentCompetency?.questions.filter(q => formData.answers[q.id]).length || 0;
    const totalInCurrentCompetency = currentCompetency?.questions.length || 0;

    return (
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{currentCompetency?.name}</h2>
              <p className="text-sm text-gray-500">{currentCompetency?.description}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Section {currentCompetencyIndex + 1} of {totalCompetencies}
              </span>
              <p className="text-xs text-gray-400 mt-1">
                {answeredInCurrentCompetency}/{totalInCurrentCompetency} answered
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentCompetencyIndex + (answeredInCurrentCompetency / totalInCurrentCompetency)) / totalCompetencies) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions Card */}
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
          <div className="p-8">
            <div className="space-y-8">
              {currentCompetency?.questions.map((question, qIndex) => (
                <div key={question.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                  {/* Question Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${formData.answers[question.id] ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {formData.answers[question.id] ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-bold">{qIndex + 1}</span>
                      )}
                    </div>
                    <div>
                      {question.competencyBreakdown && (
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-2 inline-block">
                          {question.competencyBreakdown}
                        </span>
                      )}
                      <p className="text-gray-800 font-medium leading-relaxed">{question.scenario}</p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="ml-12 space-y-2">
                    {question.options.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleOptionSelect(question.id, option.label)}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-start gap-3 group
                          ${formData.answers[question.id] === option.label 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-semibold text-xs flex-shrink-0 transition-colors
                          ${formData.answers[question.id] === option.label 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                          {option.label}
                        </span>
                        <span className={`text-sm leading-relaxed ${formData.answers[question.id] === option.label ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                          {option.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="px-8 py-6 bg-gray-50 flex justify-between items-center">
            <button
              onClick={prevCompetency}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous Section
            </button>

            <button
              onClick={nextCompetency}
              disabled={!isCurrentCompetencyComplete()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {currentCompetencyIndex === totalCompetencies - 1 ? 'Review Answers' : 'Next Section'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Review Screen
  if (step === 'review') {
    const answeredCount = Object.keys(formData.answers).length;
    const totalQuestions = assessmentQuestions.length;
    const allAnswered = answeredCount === totalQuestions;
    const scores = calculateScores(formData.answers, formData.currentRole);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.Check />
            </div>
            <h2 className="text-2xl font-bold mb-2">Assessment Complete!</h2>
            <p className="text-green-100">Review your progress before generating your IDP</p>
          </div>

          <div className="p-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-800">{answeredCount}/{totalQuestions}</p>
                <p className="text-sm text-gray-500">Questions</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-800">{totalCompetencies}</p>
                <p className="text-sm text-gray-500">Competencies</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">{scores.percentageScore}%</p>
                <p className="text-sm text-gray-500">Score</p>
              </div>
            </div>

            {/* Competency Breakdown */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Competency Scores</h3>
              <div className="space-y-3">
                {questionsByCompetency.map((comp, index) => {
                  const answeredForComp = comp.questions.filter(q => formData.answers[q.id]).length;
                  const isComplete = answeredForComp === comp.questions.length;
                  const compScore = scores.competencyScores[comp.id] || 0;
                  const scorePercentage = (compScore / 5) * 100;
                  
                  return (
                    <button
                      key={comp.id}
                      onClick={() => {
                        setCurrentCompetencyIndex(index);
                        setStep('assessment');
                      }}
                      className="w-full p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{comp.name}</span>
                        <span className={`text-sm font-medium ${isComplete ? 'text-green-600' : 'text-orange-500'}`}>
                          {compScore.toFixed(1)}/5
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                          style={{ width: `${scorePercentage}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {!allAnswered && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <p className="text-orange-700 text-sm">
                  ⚠️ You have {totalQuestions - answeredCount} unanswered question(s). Complete them for an accurate IDP.
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setCurrentCompetencyIndex(0);
                  setStep('assessment');
                }}
                className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                ← Review Answers
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !allAnswered}
                className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating IDP...
                  </span>
                ) : (
                  'Generate My IDP →'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}