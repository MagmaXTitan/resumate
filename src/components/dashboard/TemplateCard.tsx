import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Template } from '../../types';
import { Card } from '../ui/Card';

interface TemplateCardProps {
  template: Template;
  isSelected?: boolean;
  onSelect: (template: Template) => void;
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <Card 
      className={`relative cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900' : ''
      }`}
      hover
    >
      <div onClick={() => onSelect(template)} className="space-y-4">
        {/* Template Preview */}
        <div className="aspect-[3/4] bg-gray-900 rounded-lg border border-gray-600 overflow-hidden relative">
          <div className="p-4 space-y-2 text-xs">
            {template.id === 'minimal' && (
              <>
                <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                <div className="h-1 bg-gray-700 rounded w-1/2"></div>
                <div className="border-b border-gray-700 my-3"></div>
                <div className="space-y-1">
                  <div className="h-1 bg-gray-700 rounded"></div>
                  <div className="h-1 bg-gray-700 rounded w-4/5"></div>
                </div>
              </>
            )}
            {template.id === 'modern' && (
              <>
                <div className="flex space-x-2">
                  <div className="flex-1 space-y-1">
                    <div className="h-2 bg-gray-600 rounded"></div>
                    <div className="h-1 bg-gray-700 rounded w-3/4"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="space-y-1">
                    <div className="h-1 bg-purple-500 rounded w-1/2"></div>
                    <div className="h-1 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </>
            )}
            {template.id === 'creative' && (
              <>
                <div className="bg-purple-600 h-6 rounded-t-lg -mx-4 -mt-4 mb-2"></div>
                <div className="h-2 bg-gray-600 rounded w-1/2 mx-auto text-center"></div>
                <div className="space-y-1 mt-3">
                  <div className="h-1 bg-purple-500 rounded w-1/3"></div>
                  <div className="h-1 bg-gray-700 rounded"></div>
                  <div className="h-1 bg-gray-700 rounded w-4/5"></div>
                </div>
              </>
            )}
          </div>
          
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-100">{template.name}</h3>
          <span className="inline-block px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full capitalize">
            {template.category}
          </span>
        </div>
      </div>
    </Card>
  );
}