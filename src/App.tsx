import React, { useState, useEffect, useCallback } from 'react';
import { usePDFConverter } from './hooks/usePDFConverter';
import { IndexedDBService } from './services/indexedDB';
import { ConversionRecord } from './types';
import TextEditor from './components/TextEditor/TextEditor';
import PDFViewer from './components/PDFViewer/PDFViewer';
import ConversionHistory from './components/ConversionHistory/ConversionHistory';

const App: React.FC = () => {
  const { convert, loading, error } = usePDFConverter();
  const [currentPDF, setCurrentPDF] = useState<string | null>(null);
  const [selectedConversion, setSelectedConversion] =
    useState<ConversionRecord | null>(null);
  const [history, setHistory] = useState<ConversionRecord[]>([]);

  const loadHistory = useCallback(async () => {
    try {
      const storedHistory = await IndexedDBService.getAllHistory();
      setHistory(storedHistory);
    } catch (err) {
      console.error('Loading history failed:', err);
    }
  }, []);

  const handleConvert = useCallback(
    async (text: string) => {
      try {
        const pdfUrl = await convert(text);

        if (pdfUrl) {
          if (currentPDF) URL.revokeObjectURL(currentPDF);
          setCurrentPDF(pdfUrl);

          const updatedHistory = await IndexedDBService.getAllHistory();
          setHistory(updatedHistory);
          if (updatedHistory[0]) setSelectedConversion(updatedHistory[0]);
        }
      } catch (err) {
        console.error('Conversion failed:', err);
      }
    },
    [convert, currentPDF]
  );

  const handleHistorySelect = useCallback(
    async (record: ConversionRecord) => {
      try {
        if (currentPDF) URL.revokeObjectURL(currentPDF);

        setSelectedConversion(record);

        const pdfBlob = await IndexedDBService.getPDF(record.id);
        if (!pdfBlob) return;

        setCurrentPDF(URL.createObjectURL(pdfBlob));
      } catch (err) {
        console.error('History selection failed:', err);
      }
    },
    [currentPDF]
  );

  useEffect(() => {
    loadHistory();
    return () => {
      if (currentPDF) URL.revokeObjectURL(currentPDF);
    };
  }, [loadHistory, currentPDF]);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">PDF Converter</h1>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <TextEditor onConvert={handleConvert} loading={loading} />
          <div className="md:hidden">
            <PDFViewer pdfUrl={currentPDF} />
          </div>
          <ConversionHistory
            history={history}
            selectedId={selectedConversion?.id || null}
            onSelect={handleHistorySelect}
          />
        </div>

        <div className="hidden md:block">
          <PDFViewer pdfUrl={currentPDF} />
        </div>
      </div>
    </div>
  );
};

export default App;
