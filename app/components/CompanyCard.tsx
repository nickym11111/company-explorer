'use client';

import React from 'react';
import { Company } from '../utils/api';

interface CompanyCardProps {
  company: Company;
  onViewMore: (company: Company) => void;
  onAddNote: (company: Company) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onViewMore, onAddNote }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-6 flex flex-col h-full">
        <div>
          <h2 className="text-xl text-emerald-800 font-serif font-bold mb-2">{company.name}</h2>
          <div className="text-gray-600 font-serif mb-4">
            <p>{company.hq_location}</p>
          </div>
          <div className="text-sm font-serif text-gray-900 mb-4">
            <p>Description: {company.description}</p>
          </div>
        </div>

        <div className="mt-auto flex justify-between">
          <button
            onClick={() => onViewMore(company)}
            className="bg-blue-600 font-serif text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            View More
          </button>
          <button
            onClick={() => onAddNote(company)}
            className="bg-green-600 font-serif text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
