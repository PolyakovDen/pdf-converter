import '@testing-library/jest-dom';

// Mock window.open for PDFViewer tests
Object.defineProperty(window, 'open', {
  value: jest.fn(),
});
