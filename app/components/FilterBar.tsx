'use client';

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import {CompanyFilter} from '../utils/api';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [locations, setLocations] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [filters, setFilters] = useState<CompanyFilter>({
    search: '',
    hq_location: '',
    min_year: '',
    max_year: '',
    min_headcount: '',
    max_headcount: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [locationsData, yearsData] = await Promise.all([
          api.getLocations(),
          api.getFoundedYears()
        ]);
        setLocations(locationsData);
        setYearOptions(yearsData);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      hq_location: '',
      min_year: '',
      max_year: '',
      min_headcount: '',
      max_headcount: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-cente">
          <h2 className="text-xl font-bold m-2 text-emerald-800 font-serif">Find More Companies</h2>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 font-serif hover:text-blue-800"
          >
            {isExpanded ? 'Collapse Filters' : 'Expand Filters'}
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleInputChange}
            
              placeholder="Search companies..."
              className="w-full p-2 border border-gray-300  font-serif text-gray-600 rounded"
            />
          </div>
          
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 font-serif lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HQ Location
                </label>
                <select
                  name="hq_location"
                  value={filters.hq_location}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300  text-gray-400 rounded"
                >
                  <option value="text-gray-600">All Locations</option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Earliest Founding Year 
                </label>
                <select
                  name="min_year"
                  value={filters.min_year}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 text-gray-400 rounded"
                >
                  <option value="">Any</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latest Founding Year
                </label>
                <select
                  name="max_year"
                  value={filters.max_year}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300  text-gray-400 rounded"
                >
                  <option value="">Any</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Employees
                </label>
                <input
                  type="number"
                  name="min_headcount"
                  value={filters.min_headcount}
                  onChange={handleInputChange}
                  placeholder="Min employees"
                  className="w-full p-2 border border-gray-300 text-gray-700 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Employees
                </label>
                <input
                  type="number"
                  name="max_headcount"
                  value={filters.max_headcount}
                  onChange={handleInputChange}
                  placeholder="Max employees"
                  className="w-full p-2 border border-gray-300  text-gray-700 rounded"
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end font-serif gap-2 mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterBar;