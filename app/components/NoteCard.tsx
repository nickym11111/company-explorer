'use client';

import React from 'react';
import { Company, Note } from '../utils/api';

interface NoteCardProps {
  note: Note;
  onDeleteNote: (id: number) => void;
  onAddNote: (company: Company) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDeleteNote, onAddNote }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg font-serif shadow-md p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg text-emerald-800 font-bold">{note.company?.name || 'Unknown Company'}</h3>
        <button
          onClick={() => onDeleteNote(note.id)}
          className="text-red-500 hover:text-red-700"
          title="Delete note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <p className="text-gray-700 mb-3 whitespace-pre-wrap">{note.content}</p>
      
      <div className="text-sm text-gray-500">
        Created: {formatDate(note.created_at)}
      </div>
    </div>
  );
};

export default NoteCard;
