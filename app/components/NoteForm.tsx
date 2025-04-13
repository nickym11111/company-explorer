'use client';

import React, { useState } from 'react';
import { Company } from '../utils/api';

interface NoteFormProps {
  company: Company;
  onSubmit: (data: { company_id: number; content: string }) => void;
  onClose: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ company, onSubmit, onClose }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({
        company_id: company.id,
        content: content.trim()
      });
    }
  };

  return (
    <div className="fixed font-serif inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl text-emerald-800 font-bold">Add Note for {company.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              
              <textarea
                id="note-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full p-2 border border-gray-300  text-gray-600 rounded"
                placeholder="Enter your note here..."
                required
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;