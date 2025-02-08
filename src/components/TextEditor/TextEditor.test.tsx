import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextEditor from './TextEditor';

describe('TextEditor', () => {
  const mockOnConvert = jest.fn();

  beforeEach(() => {
    mockOnConvert.mockClear();
  });

  test('renders textarea and submit button', () => {
    render(<TextEditor onConvert={mockOnConvert} loading={false} />);

    expect(screen.getByPlaceholderText(/Enter your text/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('submit button is disabled when textarea is empty', () => {
    render(<TextEditor onConvert={mockOnConvert} loading={false} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('submit button is disabled when loading', () => {
    render(<TextEditor onConvert={mockOnConvert} loading={true} />);

    const textarea = screen.getByPlaceholderText(/Enter your text/i);
    fireEvent.change(textarea, { target: { value: 'Test text' } });

    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('calls onConvert with text when form is submitted', async () => {
    mockOnConvert.mockResolvedValueOnce(undefined);

    render(<TextEditor onConvert={mockOnConvert} loading={false} />);

    const textarea = screen.getByPlaceholderText(/Enter your text/i);
    fireEvent.change(textarea, { target: { value: 'Test text' } });

    const submitButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnConvert).toHaveBeenCalledWith('Test text');
  });

  test('clears textarea after successful submission', async () => {
    mockOnConvert.mockResolvedValueOnce(undefined);

    render(<TextEditor onConvert={mockOnConvert} loading={false} />);

    const textarea = screen.getByPlaceholderText(/Enter your text/i);
    fireEvent.change(textarea, { target: { value: 'Test text' } });

    const submitButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(submitButton);
      await Promise.resolve();
    });

    expect(textarea).toHaveValue('');
  });
});
