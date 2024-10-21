import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Condition {
  name: string;
  comparison: 'lt' | 'lte' | 'gt' | 'gte' | 'eq' | 'between';
  value: number;
  value2?: number;
}

interface Rule {
  id: number;
  conditions: Condition[];
  text: string;
}

interface RuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRule: (rule: Rule) => void;
  data: string[][];
}

const RuleModal: React.FC<RuleModalProps> = ({ isOpen, onClose, onAddRule, data }) => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [ruleText, setRuleText] = useState('');

  const addCondition = () => {
    setConditions([...conditions, { name: '', comparison: 'lt', value: 0 }]);
  };

  const updateCondition = (index: number, field: keyof Condition, value: string | number) => {
    const newConditions = [...conditions];
    if (field === 'comparison') {
      newConditions[index][field] = value as Condition['comparison'];
    } else {
      newConditions[index][field] = value as string | number;
    }
    setConditions(newConditions);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRule({
      id: Date.now(),
      conditions,
      text: ruleText,
    });
    setConditions([]);
    setRuleText('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Create Rule</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {conditions.map((condition, index) => (
            <div key={index} className="mb-4 flex items-center flex-wrap">
              <select
                value={condition.name}
                onChange={(e) => updateCondition(index, 'name', e.target.value)}
                className="mr-2 p-2 border rounded"
              >
                <option value="">Select row</option>
                {data.map((row, i) => (
                  <option key={i} value={row[0]}>
                    {row[0] || `Row ${i + 1}`}
                  </option>
                ))}
              </select>
              <select
                value={condition.comparison}
                onChange={(e) => updateCondition(index, 'comparison', e.target.value)}
                className="mr-2 p-2 border rounded"
              >
                <option value="lt">Less than</option>
                <option value="lte">Less than or equal to</option>
                <option value="gt">Greater than</option>
                <option value="gte">Greater than or equal to</option>
                <option value="eq">Equal to</option>
                <option value="between">Between</option>
              </select>
              <input
                type="number"
                value={condition.value}
                onChange={(e) => updateCondition(index, 'value', parseFloat(e.target.value))}
                placeholder="Value"
                className="mr-2 p-2 border rounded w-24"
              />
              {condition.comparison === 'between' && (
                <input
                  type="number"
                  value={condition.value2 || ''}
                  onChange={(e) => updateCondition(index, 'value2', parseFloat(e.target.value))}
                  placeholder="Value 2"
                  className="mr-2 p-2 border rounded w-24"
                />
              )}
              <button
                type="button"
                onClick={() => removeCondition(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCondition}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Condition
          </button>
          <textarea
            value={ruleText}
            onChange={(e) => setRuleText(e.target.value)}
            placeholder="Enter rule text"
            className="w-full p-2 border rounded mb-4"
            rows={3}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Rule
          </button>
        </form>
      </div>
    </div>
  );
};

export default RuleModal;