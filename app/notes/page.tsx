'use client';

import { useState, useEffect } from 'react';
import CompanyCard from './../components/CompanyCard';
import NoteCard from './../components/NoteCard';
import CompanyModal from './../components/CompanyModal';
import api, { Company, Note } from '../utils/api';
import { toast } from 'react-toastify';
import NoteForm from '../components/NoteForm';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [noteCompany, setNoteCompany] = useState<Company | null>(null);
  

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await api.getNotes();
      setNotes(data);
    } catch (error) {
      toast.error('Failed to fetch notes');
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      toast.success('Note deleted successfully');
    } catch (error) {
      toast.error('Failed to delete note');
      console.error('Error deleting note:', error);
    }
  };

  const handleViewMore = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleAddNote = (company: Company) => {
    setNoteCompany(company);
  };

  const handleSubmitNote = async (noteData: { company_id: number; content: string }) => {
    try {
      await api.createNote(noteData);
      toast.success('Note added successfully!');
      setNoteCompany(null);
      fetchNotes();
    } catch (error) {
      toast.error('Failed to add note');
      console.error('Error adding note:', error);
    }
  };

  // Group notes by company_id
  const notesByCompany = notes.reduce((acc: Record<number, Note[]>, note) => {
    if (note.company) {
      const companyId = note.company.id;
      if (!acc[companyId]) acc[companyId] = [];
      acc[companyId].push(note);
    }
    return acc;
  }, {});

  return (
    <div className="m-8">
      <div className="mb-6 font-serif m-4">
        <h1 className="text-3xl font-bold text-emerald-800 m-4">Notes</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 ">
          <p className="text-xl text-gray-500 font-serif ">Loading notes...</p>
        </div>
      ) : Object.keys(notesByCompany).length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-lg text-gray-600 font-serif ">No notes found. Add notes to companies from the Companies page.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.values(notesByCompany).map((companyNotes) => {
            const company = companyNotes[0].company!;
            return (
              <div
                key={company.id}
                className="flex space-x-4 overflow-x-auto py-4 px-2 rounded-lg bg-gray-200 shadow-inner"
              >
                <div className="flex-shrink-0 w-80">
                  <CompanyCard
                    company={company}
                    onViewMore={() => handleViewMore(company)}
                    onAddNote={() => handleAddNote(company)}
                  />
                </div>
                {companyNotes.map((note) => (
                  <div key={note.id} className="flex-shrink-0 w-80">
                    <NoteCard
                      note={note}
                      onDeleteNote={handleDeleteNote}
                      onAddNote={() => handleAddNote(company)}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Company Modal */}
      {selectedCompany && (
        <CompanyModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}

      {/* Note Form Modal */}
      {noteCompany && (
        <NoteForm
          company={noteCompany}
          onSubmit={handleSubmitNote}
          onClose={() => setNoteCompany(null)}
        />
      )}
    </div>
  );
}
