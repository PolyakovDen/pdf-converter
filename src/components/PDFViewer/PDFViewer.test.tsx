import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PDFViewer from './PDFViewer';

jest.mock('@react-pdf-viewer/core', () => ({
  Worker: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Viewer: () => <div data-testid="pdf-viewer">PDF Viewer</div>,
}));

describe('PDFViewer', () => {
  test('renders nothing when pdfUrl is null', () => {
    const { container } = render(<PDFViewer pdfUrl={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders PDF viewer when pdfUrl is provided', () => {
    render(<PDFViewer pdfUrl="test.pdf" />);

    expect(screen.getByTestId('pdf-viewer')).toBeInTheDocument();
    expect(screen.getByText('Download or Open')).toBeInTheDocument();
  });
});
