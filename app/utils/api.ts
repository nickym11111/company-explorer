const API_BASE_URL = 'http://localhost:8000';

interface Company {
  id: number;
  name: string;
  hq_location: string;
  industry: string;
  founded_year: number;
  headcount: number;
  website?: string;
  description?: string;
  logo_url?: string;
}

interface Note {
  id: number;
  company_id: number;
  content: string;
  created_at: string;
  company?: Company;
}

interface CreateNoteData {
  company_id: number;
  content: string;
}

const api = {
  // Companies
  async getCompanies(params = {}): Promise<Company[]> {
    const queryString = new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v !== '') as [string, string][]
      ).toString();      
    
    const url = `${API_BASE_URL}/companies${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch companies: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getCompany(id: number): Promise<Company> {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch company: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getLocations(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/companies/locations`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async getFoundedYears(): Promise<number[]> {
    const response = await fetch(`${API_BASE_URL}/companies/founded-years`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch founded years: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  // Notes
  async getNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/notes`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async createNote(data: CreateNoteData): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create note: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async deleteNote(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete note: ${response.statusText}`);
    }
  },
};

export default api;
export type { Company, Note, CreateNoteData };