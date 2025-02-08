import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConversionHistory from './ConversionHistory';
import { type ConversionRecord } from '../../types';

const mockHistory: ConversionRecord[] = [
  {
    id: '1',
    text: 'Test PDF 1',
    timestamp: new Date('2024-02-08T10:00:00').getTime(),
    url: 'test1.pdf',
  },
  {
    id: '2',
    text: 'Test PDF 2',
    timestamp: new Date('2024-02-08T11:00:00').getTime(),
    url: 'test2.pdf',
  },
];

describe('ConversionHistory', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  test('renders history items correctly', () => {
    render(
      <ConversionHistory
        history={mockHistory}
        selectedId={null}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Test PDF 1')).toBeInTheDocument();
    expect(screen.getByText('Test PDF 2')).toBeInTheDocument();
  });

  test('calls onSelect when clicking an unselected item', () => {
    render(
      <ConversionHistory
        history={mockHistory}
        selectedId={null}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByText('Test PDF 1'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockHistory[0]);
  });

  test('does not call onSelect when clicking already selected item', () => {
    render(
      <ConversionHistory
        history={mockHistory}
        selectedId="1"
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByText('Test PDF 1'));
    expect(mockOnSelect).not.toHaveBeenCalled();
  });
});
