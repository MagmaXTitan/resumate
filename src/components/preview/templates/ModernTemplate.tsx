import React from 'react';
import type { CVData } from '../../../types';

interface ModernTemplateProps {
  cv: CVData;
}

export function ModernTemplate({ cv }: ModernTemplateProps) {
  const contactSection = cv.sections.find(s => s.type === 'contact');
  const summarySection = cv.sections.find(s => s.type === 'summary');
  const experienceSection = cv.sections.find(s => s.type === 'experience');
  const educationSection = cv.sections.find(s => s.type === 'education');
  const skillsSection = cv.sections.find(s => s.type === 'skills');

  const visibleSections = cv.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="w-full h-full flex bg-white text-gray-900">
      {/* Sidebar */}
      <div 
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: cv.themeSettings.accentColor }}
      >
        {/* Profile */}
        {contactSection?.visible && (
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl font-bold">
                {contactSection.data.fullName?.charAt(0) || 'U'}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-center mb-4">
              {contactSection.data.fullName || 'Your Name'}
            </h1>
          </div>
        )}

        {/* Contact Info */}
        {contactSection?.visible && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Contact</h2>
            <div className="space-y-2 text-sm">
              {contactSection.data.email && (
                <p className="break-words">{contactSection.data.email}</p>
              )}
              {contactSection.data.phone && <p>{contactSection.data.phone}</p>}
              {contactSection.data.location && <p>{contactSection.data.location}</p>}
              {contactSection.data.website && (
                <p className="break-words">{contactSection.data.website}</p>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {skillsSection?.visible && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Skills</h2>
            <div className="space-y-2">
              {skillsSection.data.items?.map((skill: string, index: number) => (
                <div key={index} className="text-sm">
                  <p className="mb-1">{skill}</p>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {summarySection?.visible && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: cv.themeSettings.accentColor }}
            >
              {summarySection.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {summarySection.data.content}
            </p>
          </section>
        )}

        {/* Experience */}
        {experienceSection?.visible && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: cv.themeSettings.accentColor }}
            >
              {experienceSection.title}
            </h2>
            <div className="space-y-6">
              {experienceSection.data.items?.map((item: any, index: number) => (
                <div key={index} className="relative pl-6">
                  <div 
                    className="absolute left-0 top-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: cv.themeSettings.accentColor }}
                  ></div>
                  {index < experienceSection.data.items.length - 1 && (
                    <div 
                      className="absolute left-1.5 top-6 w-0.5 h-16"
                      style={{ backgroundColor: cv.themeSettings.accentColor + '40' }}
                    ></div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.position}</h3>
                    <p className="text-gray-600 font-medium">{item.company}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.startDate} - {item.current ? 'Present' : item.endDate} • {item.location}
                    </p>
                    {item.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educationSection?.visible && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: cv.themeSettings.accentColor }}
            >
              {educationSection.title}
            </h2>
            <div className="space-y-4">
              {educationSection.data.items?.map((item: any, index: number) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900">{item.degree}</h3>
                  <p className="text-gray-600">{item.institution}</p>
                  <p className="text-sm text-gray-500">
                    {item.startDate} - {item.endDate}
                    {item.gpa && ` • GPA: ${item.gpa}`}
                  </p>
                  {item.description && (
                    <p className="text-gray-700 text-sm mt-1">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}