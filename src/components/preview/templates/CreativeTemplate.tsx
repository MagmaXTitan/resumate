import React from 'react';
import type { CVData } from '../../../types';

interface CreativeTemplateProps {
  cv: CVData;
}

export function CreativeTemplate({ cv }: CreativeTemplateProps) {
  const contactSection = cv.sections.find(s => s.type === 'contact');
  const summarySection = cv.sections.find(s => s.type === 'summary');
  const experienceSection = cv.sections.find(s => s.type === 'experience');
  const educationSection = cv.sections.find(s => s.type === 'education');
  const skillsSection = cv.sections.find(s => s.type === 'skills');

  const visibleSections = cv.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Header */}
      {contactSection?.visible && (
        <header 
          className="text-center py-12 px-8 text-white relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${cv.themeSettings.accentColor} 0%, ${cv.themeSettings.accentColor}dd 100%)`
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="20" cy="20" r="2" fill="white" />
              <circle cx="80" cy="30" r="1.5" fill="white" />
              <circle cx="60" cy="70" r="1" fill="white" />
              <circle cx="30" cy="80" r="2.5" fill="white" />
            </svg>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">
              {contactSection.data.fullName || 'Your Name'}
            </h1>
            <p className="text-xl opacity-90 mb-4">
              {summarySection?.data.content?.substring(0, 100) + '...' || 'Professional Title'}
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              {contactSection.data.email && <span>{contactSection.data.email}</span>}
              {contactSection.data.phone && <span>{contactSection.data.phone}</span>}
              {contactSection.data.location && <span>{contactSection.data.location}</span>}
            </div>
          </div>
        </header>
      )}

      <div className="p-8">
        {/* Summary */}
        {summarySection?.visible && (
          <section className="mb-8 text-center">
            <div className="max-w-4xl mx-auto">
              <div 
                className="w-16 h-1 mx-auto mb-4"
                style={{ backgroundColor: cv.themeSettings.accentColor }}
              ></div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {summarySection.data.content}
              </p>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {experienceSection?.visible && (
              <section>
                <h2 className="text-2xl font-bold mb-6 text-center relative">
                  <span 
                    className="inline-block px-6 py-2 rounded-full text-white"
                    style={{ backgroundColor: cv.themeSettings.accentColor }}
                  >
                    {experienceSection.title}
                  </span>
                </h2>
                <div className="space-y-6">
                  {experienceSection.data.items?.map((item: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{item.position}</h3>
                          <p 
                            className="font-semibold"
                            style={{ color: cv.themeSettings.accentColor }}
                          >
                            {item.company}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>{item.location}</p>
                          <p>{item.startDate} - {item.current ? 'Present' : item.endDate}</p>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            {skillsSection?.visible && (
              <section>
                <h2 
                  className="text-xl font-bold mb-4 pb-2 border-b-2"
                  style={{ 
                    color: cv.themeSettings.accentColor,
                    borderColor: cv.themeSettings.accentColor
                  }}
                >
                  {skillsSection.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skillsSection.data.items?.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full font-medium text-white"
                      style={{ backgroundColor: cv.themeSettings.accentColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {educationSection?.visible && (
              <section>
                <h2 
                  className="text-xl font-bold mb-4 pb-2 border-b-2"
                  style={{ 
                    color: cv.themeSettings.accentColor,
                    borderColor: cv.themeSettings.accentColor
                  }}
                >
                  {educationSection.title}
                </h2>
                <div className="space-y-4">
                  {educationSection.data.items?.map((item: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-gray-900">{item.degree}</h3>
                      <p className="text-gray-700">{item.institution}</p>
                      <p className="text-sm text-gray-600">
                        {item.startDate} - {item.endDate}
                        {item.gpa && ` • GPA: ${item.gpa}`}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}