import React, { createContext, useContext, useState } from 'react';
import type { CVData, CVSection } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CVContextType {
  cvs: CVData[];
  currentCV: CVData | null;
  setCurrentCV: (cv: CVData | null) => void;
  createCV: () => CVData;
  updateCV: (cv: CVData) => void;
  deleteCV: (id: string) => void;
  duplicateCV: (id: string) => void;
  updateSection: (sectionId: string, data: any) => void;
  reorderSections: (sections: CVSection[]) => void;
}

const CVContext = createContext<CVContextType | null>(null);

export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}

const createDefaultCV = (): CVData => ({
  id: Date.now().toString(),
  title: 'Untitled Resume',
  templateId: 'minimal',
  themeSettings: {
    accentColor: '#7C5CFF',
    fontSize: 'md',
    spacing: 'normal'
  },
  sections: [
    {
      id: 'contact',
      type: 'contact',
      title: 'Contact Information',
      visible: true,
      order: 0,
      data: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: ''
      }
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Professional Summary',
      visible: true,
      order: 1,
      data: {
        content: ''
      }
    },
    {
      id: 'experience',
      type: 'experience',
      title: 'Experience',
      visible: true,
      order: 2,
      data: {
        items: []
      }
    },
    {
      id: 'education',
      type: 'education',
      title: 'Education',
      visible: true,
      order: 3,
      data: {
        items: []
      }
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills',
      visible: true,
      order: 4,
      data: {
        items: []
      }
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export function CVProvider({ children }: { children: React.ReactNode }) {
  const [cvs, setCVs] = useLocalStorage<CVData[]>('cv-builder-cvs', []);
  const [currentCV, setCurrentCV] = useState<CVData | null>(null);

  const createCV = () => {
    const newCV = createDefaultCV();
    setCVs(prev => [...prev, newCV]);
    setCurrentCV(newCV);
    return newCV;
  };

  const updateCV = (updatedCV: CVData) => {
    const updated = { ...updatedCV, updatedAt: new Date().toISOString() };
    setCVs(prev => prev.map(cv => cv.id === updated.id ? updated : cv));
    if (currentCV?.id === updated.id) {
      setCurrentCV(updated);
    }
  };

  const deleteCV = (id: string) => {
    setCVs(prev => prev.filter(cv => cv.id !== id));
    if (currentCV?.id === id) {
      setCurrentCV(null);
    }
  };

  const duplicateCV = (id: string) => {
    const cv = cvs.find(cv => cv.id === id);
    if (cv) {
      const duplicate = {
        ...cv,
        id: Date.now().toString(),
        title: `${cv.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCVs(prev => [...prev, duplicate]);
    }
  };

  const updateSection = (sectionId: string, data: any) => {
    if (!currentCV) return;
    
    const updatedSections = currentCV.sections.map(section =>
      section.id === sectionId ? { ...section, data } : section
    );
    
    updateCV({ ...currentCV, sections: updatedSections });
  };

  const reorderSections = (sections: CVSection[]) => {
    if (!currentCV) return;
    updateCV({ ...currentCV, sections });
  };

  return (
    <CVContext.Provider
      value={{
        cvs,
        currentCV,
        setCurrentCV,
        createCV,
        updateCV,
        deleteCV,
        duplicateCV,
        updateSection,
        reorderSections,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}