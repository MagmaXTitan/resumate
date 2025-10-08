import React from 'react';
import type { CVData } from '../../types';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';

interface CVPreviewProps {
  cv: CVData;
  className?: string;
}

export function CVPreview({ cv, className = '' }: CVPreviewProps) {
  const renderTemplate = () => {
    switch (cv.templateId) {
      case 'minimal':
        return <MinimalTemplate cv={cv} />;
      case 'modern':
        return <ModernTemplate cv={cv} />;
      case 'creative':
        return <CreativeTemplate cv={cv} />;
      default:
        return <MinimalTemplate cv={cv} />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-2xl overflow-hidden ${className}`}>
      <div id="cv-preview" className="aspect-[210/297] overflow-hidden">
        {renderTemplate()}
      </div>
    </div>
  );
}