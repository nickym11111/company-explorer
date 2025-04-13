"use client";

import React from "react";
import { Company } from "../utils/api";

interface CompanyModalProps {
  company: Company;
  onClose: () => void;
}

const CompanyModal: React.FC<CompanyModalProps> = ({ company, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl text-emerald-800 font-serif font-bold">{company.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold  font-serif text-emerald-800 mb-2">Company Details</h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-serif">
                  <span className="font-medium font-serif">HQ Location:</span>{" "}
                  {company.hq_location}
                  
                </p>
                <p className="font-serif">
                  <span className="font-medium font-serif">Founded:</span>{" "}
                  {company.year_founded}
                </p>
                <p className="font-serif">
                  <span className="font-medium font-serif">Headcount:</span>{" "}
                  {company.headcount}
                </p>

                {company.domain && (
                  <p>
                    <span className="font-medium font-serif">Website:</span>{" "}
                    <a
                      href={company.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-serif hover:underline"
                    >
                      {company.domain}
                    </a>
                  </p>
                )}

                {company.linkedin_url && (
                  <p>
                    <span className="font-medium font-serif ">LinkedIn:</span>{" "}
                    <a
                      href={company.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-serif hover:underline"
                    >
                      {company.linkedin_url}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-emerald-800 font-serif mb-2">Description</h3>
              <p className="text-gray-700 font-serif">
                {company.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
