export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CVSection {
  id: string;
  type: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'hobbies';
  title: string;
  visible: boolean;
  order: number;
  data: any;
}

export interface CVData {
  id: string;
  title: string;
  sections: CVSection[];
  templateId: string;
  themeSettings: ThemeSettings;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeSettings {
  accentColor: string;
  fontSize: 'sm' | 'md' | 'lg';
  spacing: 'compact' | 'normal' | 'relaxed';
}

export interface Template {
  id: string;
  name: string;
  previewImage: string;
  category: 'minimal' | 'modern' | 'creative';
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate: string;
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}