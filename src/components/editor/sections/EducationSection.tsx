import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import type { EducationItem } from '../../../types';

interface EducationSectionData {
  items: EducationItem[];
}

interface EducationSectionProps {
  data: EducationSectionData;
  onUpdate: (data: EducationSectionData) => void;
}

const createNewEducation = (): EducationItem => ({
  id: Date.now().toString(),
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  gpa: '',
  description: ''
});

export function EducationSection({ data, onUpdate }: EducationSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['0']));

  const addEducation = () => {
    const newItem = createNewEducation();
    const updatedItems = [...(data.items || []), newItem];
    onUpdate({ items: updatedItems });
    setExpandedItems(prev => new Set(prev).add(newItem.id));
  };

  const updateEducation = (index: number, updates: Partial<EducationItem>) => {
    const updatedItems = data.items.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    );
    onUpdate({ items: updatedItems });
  };

  const removeEducation = (index: number) => {
    const updatedItems = data.items.filter((_, i) => i !== index);
    onUpdate({ items: updatedItems });
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="p-4 space-y-4">
      {data.items?.map((item, index) => (
        <div key={item.id} className="border border-gray-600 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => toggleExpanded(item.id)}
              className="text-left flex-1"
            >
              <div className="font-medium text-gray-100">
                {item.degree || 'New Degree'} {item.field && `in ${item.field}`}
              </div>
              <div className="text-sm text-gray-400">
                {item.institution} {item.startDate && `• ${item.startDate} - ${item.endDate}`}
              </div>
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(index)}
              className="text-red-400 hover:text-red-300 p-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {expandedItems.has(item.id) && (
            <div className="space-y-4 pt-4 border-t border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Degree"
                  value={item.degree}
                  onChange={(e) => updateEducation(index, { degree: e.target.value })}
                  placeholder="Bachelor of Science"
                />
                <Input
                  label="Field of Study"
                  value={item.field}
                  onChange={(e) => updateEducation(index, { field: e.target.value })}
                  placeholder="Computer Science"
                />
                <Input
                  label="Institution"
                  value={item.institution}
                  onChange={(e) => updateEducation(index, { institution: e.target.value })}
                  placeholder="University of Technology"
                />
                <Input
                  label="Location"
                  value={item.location}
                  onChange={(e) => updateEducation(index, { location: e.target.value })}
                  placeholder="Boston, MA"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Start Date"
                  type="month"
                  value={item.startDate}
                  onChange={(e) => updateEducation(index, { startDate: e.target.value })}
                />
                <Input
                  label="End Date"
                  type="month"
                  value={item.endDate}
                  onChange={(e) => updateEducation(index, { endDate: e.target.value })}
                />
                <Input
                  label="GPA (Optional)"
                  value={item.gpa || ''}
                  onChange={(e) => updateEducation(index, { gpa: e.target.value })}
                  placeholder="3.8/4.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Details
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) => updateEducation(index, { description: e.target.value })}
                  placeholder="Relevant coursework, honors, activities, or achievements..."
                  className="w-full h-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <Button onClick={addEducation} variant="ghost" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}