import { API_URL, API_KEY } from '../environment ';

export const convertToPDF = async (text: string): Promise<Blob> => {
  const response = await fetch(`${API_URL}?apiKey=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('PDF conversion failed');
  }

  return await response.blob();
};
