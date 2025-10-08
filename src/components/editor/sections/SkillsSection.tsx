import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface SkillsSectionData {
  items: string[];
}

interface SkillsSectionProps {
  data: SkillsSectionData;
  onUpdate: (data: SkillsSectionData) => void;
}

export function SkillsSection({ data, onUpdate }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedItems = [...(data.items || []), newSkill.trim()];
      onUpdate({ items: updatedItems });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    const updatedItems = data.items.filter((_, i) => i !== index);
    onUpdate({ items: updatedItems });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        {data.items?.map((skill, index) => (
          <div
            key={index}
            className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(index)}
              className="text-purple-400 hover:text-purple-300"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill (e.g., JavaScript, Leadership, etc.)"
          className="flex-1"
        />
        <Button onClick={addSkill} disabled={!newSkill.trim()}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-sm text-gray-400">
        <p>Add technical skills, soft skills, languages, or any other relevant abilities.</p>
      </div>
    </div>
  );
}