'use client';

import { useState, useEffect } from 'react';
import CompanyCard from './components/CompanyCard';
import CompanyModal from './components/CompanyModal';
import NoteForm from './components/NoteForm';
import FilterBar from './components/FilterBar';
import api, { Company } from './utils/api';
import { toast } from 'react-toastify';

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [noteCompany, setNoteCompany] = useState<Company | null>(null);
  const [filters, setFilters] = useState({});


  const fetchCompanies = async (params = {}) => {
    setLoading(true);
    try {
      const data = await api.getCompanies(params);
      setCompanies(data);
    } catch (error) {
      toast.error('Failed to fetch companies');
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(); 
  }, []);
  


  const handleFilterChange = (newFilters: object) => {
    setFilters(newFilters);
    fetchCompanies(newFilters);
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
    } catch (error) {
      toast.error('Failed to add note');
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="min-h-screen font-serif bg-gray-100">
      <div className="m-8">
        <div className="p-4"></div>
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      {loading ? (
        <div className="flex justify-center font-serif items-center h-64">
          <p className="text-xl text-gray-500">Loading companies...</p>
        </div>
      ) : companies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-lg font-serif text-gray-600">No companies found matching your criteria.</p>
          <button 
            onClick={() => {
              setFilters({});
              fetchCompanies({});
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-10">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onViewMore={handleViewMore}
              onAddNote={handleAddNote}
            />
          ))}
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