import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Edit, Copy, Trash2, Download, Share2, Eye } from 'lucide-react';
import type { CVData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface CVCardProps {
  cv: CVData;
  onEdit: (cv: CVData) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (cv: CVData) => void;
}

export function CVCard({ cv, onEdit, onDuplicate, onDelete, onPreview }: CVCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className="relative group cursor-pointer" hover>
      <div onClick={() => onEdit(cv)} className="space-y-4">
        {/* CV Preview Thumbnail */}
        <div className="aspect-[3/4] bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
          <div className="p-4 space-y-2 text-xs">
            <div className="h-2 bg-gray-600 rounded w-3/4"></div>
            <div className="h-1 bg-gray-700 rounded w-1/2"></div>
            <div className="space-y-1 mt-4">
              <div className="h-1 bg-gray-700 rounded"></div>
              <div className="h-1 bg-gray-700 rounded w-5/6"></div>
              <div className="h-1 bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-100 truncate">{cv.title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Updated {formatDate(cv.updatedAt)}</span>
            <span className="capitalize">{cv.templateId}</span>
          </div>
        </div>
      </div>

      {/* Action Menu */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-2"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>

          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1 z-10"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(cv);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(cv);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(cv.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Duplicate</span>
              </button>
              <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <hr className="border-gray-700 my-1" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Are you sure you want to delete this CV?')) {
                    onDelete(cv.id);
                  }
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
}