import React from 'react';
import { ArrowLeft, Download, Share2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCV } from '../contexts/CVContext';
import { Button } from '../components/ui/Button';
import { CVPreview } from '../components/preview/CVPreview';

export function PreviewPage() {
  const navigate = useNavigate();
  const { currentCV, setCurrentCV } = useCV();

  const exportToPDF = async () => {
    if (!currentCV) return;
    
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;
    
    const element = document.getElementById('cv-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${currentCV.title}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleEdit = () => {
    navigate('/editor');
  };

  if (!currentCV) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No CV selected for preview</p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-100">{currentCV.title}</h1>
              <p className="text-sm text-gray-400">Preview</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="ghost" className="p-2">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button onClick={exportToPDF} className="px-4">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex justify-center p-8">
        <div className="max-w-4xl w-full">
          <CVPreview cv={currentCV} />
        </div>
      </div>
    </div>
  );
}