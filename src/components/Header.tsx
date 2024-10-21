import React from 'react';
import { Table } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center">
        <Table size={32} className="mr-4" />
        <h1 className="text-3xl font-bold">DataSheet Pro</h1>
      </div>
    </header>
  );
};

export default Header;