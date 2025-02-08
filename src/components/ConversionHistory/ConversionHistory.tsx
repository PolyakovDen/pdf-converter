import React from 'react';
import { ConversionRecord } from '../../types';

interface ConversionHistoryProps {
  history: ConversionRecord[];
  selectedId: string | null;
  onSelect: (record: ConversionRecord) => void;
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({
  history,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-200">
        Conversion History
      </h2>

      {history.length === 0 ? (
        <div className="flex items-center justify-center p-20 text-gray-400 border border-gray-700 rounded-lg bg-gray-800/50">
          <span>No conversions yet. Convert your first PDF!</span>
        </div>
      ) : (
        <div className="max-h-[225px] overflow-y-auto space-y-2 pr-2">
          {history.map((record) => {
            const isSelected = selectedId === record.id;

            return (
              <button
                key={record.id}
                onClick={() => !isSelected && onSelect(record)}
                className={`
                  w-full p-4 text-left rounded-lg transition-all duration-200
                  border cursor-pointer
                  ${
                    isSelected
                      ? 'bg-gray-700 border-gray-600 shadow-md'
                      : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/70 hover:border-gray-600'
                  }
                `}
              >
                <p className="font-medium text-gray-200 truncate">
                  {record.text}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(record.timestamp).toLocaleString()}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConversionHistory;
