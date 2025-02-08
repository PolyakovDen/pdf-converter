import { type FC, useState } from 'react';

interface TextEditorProps {
  loading: boolean;
  onConvert: (text: string) => Promise<void>;
}

const TextEditor: FC<TextEditorProps> = ({ loading, onConvert }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      try {
        await onConvert(text);
        setText('');
      } catch (error) {
        console.error('Error converting text:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-64 p-4 border rounded-lg"
        placeholder="Enter your text here..."
      />
      <button
        type="submit"
        disabled={loading || !text.trim()}
        className={`
          w-full px-6 py-3 
          text-white font-medium tracking-wide
          bg-blue-500 hover:bg-blue-600 active:bg-blue-700
          disabled:bg-gray-300 disabled:hover:bg-gray-300
          rounded-lg
          transition-all duration-200
          shadow-sm hover:shadow-md disabled:shadow-none
          focus:outline-none focus:ring-2 focus:ring-blue-300
          disabled:cursor-not-allowed
        `}
      >
        {loading ? 'Converting...' : 'Convert to PDF'}
      </button>
    </form>
  );
};

export default TextEditor;
