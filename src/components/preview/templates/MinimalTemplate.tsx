import React from 'react';
import type { CVData } from '../../../types';

interface MinimalTemplateProps {
  cv: CVData;
}

export function MinimalTemplate({ cv }: MinimalTemplateProps) {
  const contactSection = cv.sections.find(s => s.type === 'contact');
  const summarySection = cv.sections.find(s => s.type === 'summary');
  const experienceSection = cv.sections.find(s => s.type === 'experience');
  const educationSection = cv.sections.find(s => s.type === 'education');
  const skillsSection = cv.sections.find(s => s.type === 'skills');

  const visibleSections = cv.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div 
      className="w-full h-full p-8 text-gray-900 bg-white"
      style={{ 
        fontSize: cv.themeSettings.fontSize === 'sm' ? '12px' : cv.themeSettings.fontSize === 'lg' ? '16px' : '14px',
        lineHeight: '1.5'
      }}
    >
      {/* Header */}
      {contactSection?.visible && (
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: cv.themeSettings.accentColor }}>
            {contactSection.data.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {contactSection.data.email && (
              <span>{contactSection.data.email}</span>
            )}
            {contactSection.data.phone && (
              <span>{contactSection.data.phone}</span>
            )}
            {contactSection.data.location && (
              <span>{contactSection.data.location}</span>
            )}
            {contactSection.data.website && (
              <span>{contactSection.data.website}</span>
            )}
          </div>
        </header>
      )}

      {/* Sections */}
      <div className="space-y-6">
        {visibleSections
          .filter(section => section.type !== 'contact')
          .map(section => (
            <section key={section.id}>
              <h2 
                className="text-xl font-bold mb-3 pb-1 border-b"
                style={{ 
                  color: cv.themeSettings.accentColor,
                  borderColor: cv.themeSettings.accentColor + '40'
                }}
              >
                {section.title}
              </h2>
              
              {section.type === 'summary' && (
                <p className="text-gray-700 leading-relaxed">
                  {section.data.content}
                </p>
              )}

              {section.type === 'experience' && (
                <div className="space-y-4">
                  {section.data.items?.map((item: any, index: number) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.position}</h3>
                          <p className="text-gray-700">{item.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>{item.location}</p>
                          <p>{item.startDate} - {item.current ? 'Present' : item.endDate}</p>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mt-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'education' && (
                <div className="space-y-3">
                  {section.data.items?.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.degree}</h3>
                        <p className="text-gray-700">{item.institution}</p>
                        {item.field && <p className="text-sm text-gray-600">{item.field}</p>}
                        {item.gpa && <p className="text-sm text-gray-600">GPA: {item.gpa}</p>}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{item.location}</p>
                        <p>{item.startDate} - {item.endDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'skills' && (
                <div className="flex flex-wrap gap-2">
                  {section.data.items?.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-sm rounded-full"
                      style={{ 
                        backgroundColor: cv.themeSettings.accentColor + '20',
                        color: cv.themeSettings.accentColor
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>
          ))}
      </div>
    </div>
  );
}