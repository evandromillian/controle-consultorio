import React from 'react';
import { Trash2 } from 'lucide-react';

interface SpreadsheetTableProps {
  data: string[][];
  updateCell: (rowIndex: number, colIndex: number, value: string) => void;
  deleteRow: (rowIndex: number) => void;
}

const SpreadsheetTable: React.FC<SpreadsheetTableProps> = ({ data, updateCell, deleteRow }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-100">Column A</th>
            <th className="border px-4 py-2 bg-gray-100">Column B</th>
            <th className="border px-4 py-2 bg-gray-100">Column C</th>
            <th className="border px-4 py-2 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                  />
                </td>
              ))}
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteRow(rowIndex)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpreadsheetTable;