'use client';

import { useState } from 'react';
import AssessmentForm from '@/components/AssessmentForm';
import IDPReport from '@/components/IDPReport';
import { roles } from '@/lib/competencies';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [idpData, setIdpData] = useState(null);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIdpData(result.data);
        setEmployeeInfo({
          name: formData.name,
          employeeId: formData.employeeId,
          email: formData.email,
          currentRole: roles.find(r => r.id === formData.currentRole)?.label || formData.currentRole,
          function: formData.function,
        });
      } else {
        setError(result.error || 'Failed to generate IDP');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIdpData(null);
    setEmployeeInfo(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">IDP Engine</h1>
        <p className="text-xl text-gray-600">AI-Powered Individual Development Plans</p>
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      )}

      {!idpData ? (
        <AssessmentForm onSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        <>
          <div className="max-w-4xl mx-auto mb-6">
            <button onClick={handleReset} className="text-blue-600 hover:text-blue-800">
              ← Start New Assessment
            </button>
          </div>
          <IDPReport data={idpData} employeeInfo={employeeInfo} />
        </>
      )}

      <div className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm">
        <p>Built for Razorpay Hackathon 2025</p>
      </div>
    </main>
  );
}