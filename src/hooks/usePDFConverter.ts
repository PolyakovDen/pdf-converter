import { useState } from 'react';
import { convertToPDF } from '../services/api';
import { IndexedDBService } from '../services/indexedDB';

export const usePDFConverter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = async (text: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);

      const pdfBlob = await convertToPDF(text);
      const id = crypto.randomUUID();

      await IndexedDBService.savePDF(id, text, pdfBlob);

      const pdfUrl = URL.createObjectURL(pdfBlob);

      return pdfUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { convert, loading, error };
};
