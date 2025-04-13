const API_BASE_URL = 'http://localhost:8000';

interface Company {
    id: number;
    name: string;
    domain?: string;
    headcount?: number;
    year_founded?: number;
    hq_location?: string;
    description?: string;
    linkedin_url?: string;
    keywords?: string;
    entity_id?: number;
    headcount_change_3m?: number;
    headcount_change_6m?: number;
    headcount_change_1y?: number;
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

export interface CompanyFilter {
    search?: string;
    hq_location?: string;
    min_year?: string;
    max_year?: string;
    min_headcount?: string;
    max_headcount?: string;
  }
  

const api = {
  // Companies
  async getCompanies(filters: CompanyFilter = {}): Promise<Company[]> {
    const params = new URLSearchParams();
  
    // Optional filters
    if (filters.search) params.append("search", filters.search);
    if (filters.hq_location) params.append("hq_location", filters.hq_location);
    if (filters.min_year) params.append("min_year", filters.min_year);
    if (filters.max_year) params.append("max_year", filters.max_year);
    if (filters.min_headcount) params.append("min_headcount", filters.min_headcount);
    if (filters.max_headcount) params.append("max_headcount", filters.max_headcount);
  
    // params (optional: can be made dynamic too)
    params.append("skip", "0");
    params.append("limit", "54");
  
    const url = `${API_BASE_URL}/companies?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch companies: ${response.statusText}`);
    }
  
    return response.json();
  }
  ,
  
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