# PDF Converter

A modern web application that converts text to PDF files with real-time preview and conversion history management.

## Features

- Text to PDF conversion with live preview
- Conversion history with timestamps
- IndexedDB storage for offline access to previous conversions
- Responsive design for both desktop and mobile devices
- Real-time PDF preview with download capability
- Clean and intuitive user interface

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- React PDF Viewer for PDF preview
- IndexedDB for local storage
- REST API integration for PDF conversion

## Prerequisites

- Node.js (v14 or higher)
- Modern web browser with IndexedDB support

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd pdf-converter
```

2. Install dependencies:

```bash
npm install
```

3. Configure the environment:
   - Create a `.env` file in the root directory
   - Add your API key and endpoint:

```env
REACT_APP_API_KEY=your-api-key
REACT_APP_API_URL=http://your-api-endpoint
```

4. Start the development server:

```bash
npm start
```

## Project Structure

```
src/
├── components/
│   ├── ConversionHistory/
│   ├── PDFViewer/
│   └── TextEditor/
├── hooks/
│   └── usePDFConverter.ts
├── services/
│   ├── api.ts
│   └── indexedDB.ts
├── types/
│   └── index.ts
└── App.tsx
```

## Component Overview

### TextEditor

- Handles text input and conversion requests
- Manages loading states during conversion
- Implements form validation

### PDFViewer

- Displays converted PDF documents
- Provides download functionality
- Uses react-pdf-viewer for rendering

### ConversionHistory

- Shows list of previous conversions
- Manages selection and retrieval of historical conversions

## Services

### API Service

- Handles communication with the PDF conversion backend
- Implements error handling and retry logic

### IndexedDB Service

- Provides local storage for PDFs and conversion history
- Implements CRUD operations for conversion records
- Handles data persistence and retrieval

## Error Handling

The application implements comprehensive error handling:

- API errors with meaningful messages
- IndexedDB storage failures
- PDF conversion failures
- Network connectivity issues

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## API Documentation

### PDF Conversion Endpoint

```typescript
POST /create-pdf
Headers: {
  'Content-Type': 'application/json'
}
Query Parameters: {
  apiKey: string
}
Body: {
  text: string
}
Response: Blob (PDF file)
```
