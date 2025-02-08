import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PDFViewerProps {
  pdfUrl: string | null;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  if (!pdfUrl) return null;

  const handleDownload = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="relative">
      <div className="border rounded-lg max-h-[650px] overflow-hidden">
        <div className="absolute z-10 flex gap-2 top-2 right-2">
          <button
            onClick={handleDownload}
            className="p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100"
          >
            <span className="text-[#374151]">Download or Open</span>
          </button>
        </div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;
