import React, { useState } from 'react';
import { PlusCircle, Save, Trash2, BookOpen } from 'lucide-react';
import SpreadsheetTable from './components/SpreadsheetTable';
import Header from './components/Header';
import RuleModal from './components/RuleModal';
import RulePanel from './components/RulePanel';

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

const App: React.FC = () => {
  const [data, setData] = useState<string[][]>([['', '', '']]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);

  const addRow = () => {
    setData([...data, ['', '', '']]);
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const deleteRow = (rowIndex: number) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  const saveData = () => {
    console.log('Saving data:', data);
    alert('Data saved successfully!');
  };

  const openRuleModal = () => {
    setIsModalOpen(true);
  };

  const closeRuleModal = () => {
    setIsModalOpen(false);
  };

  const addRule = (rule: Rule) => {
    setRules([...rules, rule]);
    closeRuleModal();
  };

  const updateRule = (updatedRule: Rule) => {
    setRules(rules.map(rule => rule.id === updatedRule.id ? updatedRule : rule));
  };

  const deleteRule = (ruleId: number) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Data Input Spreadsheet</h2>
            <SpreadsheetTable
              data={data}
              updateCell={updateCell}
              deleteRow={deleteRow}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={addRow}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                <PlusCircle className="mr-2" size={20} />
                Add Row
              </button>
              <button
                onClick={openRuleModal}
                className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors mx-2"
              >
                <BookOpen className="mr-2" size={20} />
                Create Rule
              </button>
              <button
                onClick={saveData}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <Save className="mr-2" size={20} />
                Save Data
              </button>
            </div>
          </div>
        </div>
        <RulePanel
          rules={rules}
          data={data}
          onUpdateRule={updateRule}
          onDeleteRule={deleteRule}
        />
      </main>
      <RuleModal isOpen={isModalOpen} onClose={closeRuleModal} onAddRule={addRule} data={data} />
    </div>
  );
};

export default App;