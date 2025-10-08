import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Grid, List, Filter } from 'lucide-react';
import { useCV } from '../contexts/CVContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { CVCard } from '../components/dashboard/CVCard';
import { TemplateCard } from '../components/dashboard/TemplateCard';
import { Modal } from '../components/ui/Modal';
import type { CVData, Template } from '../types';

const templates: Template[] = [
  { id: 'minimal', name: 'Minimal', previewImage: '', category: 'minimal' },
  { id: 'modern', name: 'Modern', previewImage: '', category: 'modern' },
  { id: 'creative', name: 'Creative', previewImage: '', category: 'creative' },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { cvs, createCV, duplicateCV, deleteCV, setCurrentCV } = useCV();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0]);

  const filteredCVs = cvs.filter(cv =>
    cv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCV = () => {
    const newCV = createCV();
    const updatedCV = { ...newCV, templateId: selectedTemplate.id };
    setCurrentCV(updatedCV);
    setShowTemplateModal(false);
    navigate('/editor');
  };

  const handleEditCV = (cv: CVData) => {
    setCurrentCV(cv);
    navigate('/editor');
  };

  const handlePreviewCV = (cv: CVData) => {
    setCurrentCV(cv);
    navigate('/preview');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">My Resumes</h1>
            <p className="text-gray-400">Create and manage your professional resumes</p>
          </div>
          
          <Button onClick={() => setShowTemplateModal(true)} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            New Resume
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search resumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Grid className="w-5 h-5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* CV Grid */}
        {filteredCVs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            } gap-6`}
          >
            {filteredCVs.map((cv, index) => (
              <motion.div
                key={cv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CVCard
                  cv={cv}
                  onEdit={handleEditCV}
                  onDuplicate={duplicateCV}
                  onDelete={deleteCV}
                  onPreview={handlePreviewCV}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">
              {searchQuery ? 'No resumes found' : 'No resumes yet'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchQuery 
                ? 'Try adjusting your search terms'
                : 'Create your first resume to get started'
              }
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowTemplateModal(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Create Resume
              </Button>
            )}
          </Card>
        )}
      </div>

      {/* Template Selection Modal */}
      <Modal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        title="Choose a Template"
        maxWidth="2xl"
      >
        <div className="space-y-6">
          <p className="text-gray-400">
            Select a template to start building your resume. You can change it later.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate.id === template.id}
                onSelect={setSelectedTemplate}
              />
            ))}
          </div>
          
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
            <Button variant="ghost" onClick={() => setShowTemplateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCV}>
              Create Resume
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}