import React from 'react';

interface SummarySectionData {
  content: string;
}

interface SummarySectionProps {
  data: SummarySectionData;
  onUpdate: (data: SummarySectionData) => void;
}

export function SummarySection({ data, onUpdate }: SummarySectionProps) {
  return (
    <div className="p-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Professional Summary
        </label>
        <textarea
          value={data.content || ''}
          onChange={(e) => onUpdate({ ...data, content: e.target.value })}
          placeholder="Write a compelling summary of your professional background, key skills, and career objectives..."
          className="w-full h-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
        />
      </div>
    </div>
  );
}