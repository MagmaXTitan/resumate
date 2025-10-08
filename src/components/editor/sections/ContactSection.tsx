import React from 'react';
import { Input } from '../../ui/Input';
import type { ContactInfo } from '../../../types';

interface ContactSectionProps {
  data: ContactInfo;
  onUpdate: (data: ContactInfo) => void;
}

export function ContactSection({ data, onUpdate }: ContactSectionProps) {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={data.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="John Doe"
        />
        <Input
          label="Email"
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="john@example.com"
        />
        <Input
          label="Phone"
          type="tel"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
        <Input
          label="Location"
          value={data.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="New York, NY"
        />
        <Input
          label="Website"
          type="url"
          value={data.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="https://johndoe.com"
        />
        <Input
          label="LinkedIn"
          value={data.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          placeholder="linkedin.com/in/johndoe"
        />
      </div>
      <Input
        label="GitHub"
        value={data.github || ''}
        onChange={(e) => handleChange('github', e.target.value)}
        placeholder="github.com/johndoe"
      />
    </div>
  );
}