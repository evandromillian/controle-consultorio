import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import EditRuleModal from './EditRuleModal';

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

interface RulePanelProps {
  rules: Rule[];
  data: string[][];
  onUpdateRule: (updatedRule: Rule) => void;
  onDeleteRule: (ruleId: number) => void;
}

const RulePanel: React.FC<RulePanelProps> = ({ rules, data, onUpdateRule, onDeleteRule }) => {
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  const evaluateCondition = (condition: Condition, value: number): boolean => {
    switch (condition.comparison) {
      case 'lt':
        return value < condition.value;
      case 'lte':
        return value <= condition.value;
      case 'gt':
        return value > condition.value;
      case 'gte':
        return value >= condition.value;
      case 'eq':
        return value === condition.value;
      case 'between':
        return value > condition.value && value < (condition.value2 || 0);
      default:
        return false;
    }
  };

  const evaluateRule = (rule: Rule): boolean => {
    return rule.conditions.every((condition) => {
      const rowIndex = data.findIndex((row) => row[0] === condition.name);
      if (rowIndex === -1) return false;
      const value = parseFloat(data[rowIndex][2]);
      return !isNaN(value) && evaluateCondition(condition, value);
    });
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
  };

  const handleCloseEditModal = () => {
    setEditingRule(null);
  };

  const handleUpdateRule = (updatedRule: Rule) => {
    onUpdateRule(updatedRule);
    setEditingRule(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">Rules</h3>
        {rules.length === 0 ? (
          <p>No rules created yet.</p>
        ) : (
          <ul>
            {rules.map((rule) => {
              const isPassed = evaluateRule(rule);
              return (
                <li
                  key={rule.id}
                  className={`mb-2 p-2 rounded flex justify-between items-center ${
                    isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  <span>{rule.text}</span>
                  <div>
                    <button
                      onClick={() => handleEditRule(rule)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => onDeleteRule(rule.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {editingRule && (
        <EditRuleModal
          isOpen={true}
          onClose={handleCloseEditModal}
          onUpdateRule={handleUpdateRule}
          rule={editingRule}
          data={data}
        />
      )}
    </div>
  );
};

export default RulePanel;