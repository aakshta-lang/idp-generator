'use client';

export default function IDPReport({ data, employeeInfo }) {
  const { name, currentRole, aspirationalRole } = employeeInfo;

  const handleDownloadJSON = () => {
    const exportData = {
      employee: {
        name,
        currentRole,
        aspirationalRole,
        generatedDate: new Date().toLocaleDateString(),
      },
      ...data
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IDP_${name.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={handleDownloadJSON}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download IDP Data
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
          <h1 className="text-3xl font-bold mb-2">IDP Generated!</h1>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <p className="text-blue-200 text-sm">Employee</p>
              <p className="text-xl font-semibold">{name}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">Current Role</p>
              <p className="text-xl font-semibold">{currentRole}</p>
            </div>
            <div>
              <p className="text-blue-200 text-sm">Target Role</p>
              <p className="text-xl font-semibold">{aspirationalRole}</p>
            </div>
          </div>
        </div>

        <div className="p-8 border-b">
          <h2 className="text-xl font-bold text-gray-800">Overall Score: {data.overall_score}/5</h2>
          <p className="text-gray-600 mt-2">{data.summary}</p>
        </div>

        <div className="p-8 grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-green-700 mb-3">Strengths</h3>
            <ul className="space-y-2">
              {data.strengths.map((s, i) => (
                <li key={i} className="text-gray-700">✓ {s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-orange-700 mb-3">Development Areas</h3>
            <ul className="space-y-2">
              {data.development_areas.map((d, i) => (
                <li key={i} className="text-gray-700">→ {d}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-6 text-center text-gray-500 text-sm">
          <p>Download the JSON data to populate your designed template.</p>
        </div>
      </div>
    </div>
  );
}
