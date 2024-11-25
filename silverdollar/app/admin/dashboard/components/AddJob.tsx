'use client';

import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db, auth } from '@/lib/auth/client';
import { JobPosting } from '@/lib/types/JobPosting';
import { useState } from 'react';



export default function AddJobForm() {

    //empty job
    const [formData, setFormData] = useState<JobPosting>({
        title: '',
        type: 'full-time',
        summary: '',
        keyResponsibilities: [''],
        requirements: [''],
        compensation: {
            min: 0,
            max: 0,
            period: 'yearly'
        },
        status: 'Draft'
    });
    //going to be used when I aim to close this out.
    const [success, setSuccess] = useState(true);
    const [error, setError] = useState<Error | string>();
    const [loading, setLoading] = useState(false);
    

    //handle arrays (responsibilities, requirements)
    const handleArrayChange = (
        field: 'keyResponsibilities' | 'requirements',
        index: number,
        value: string
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => (i === index ? value : item))
        }));
    };

    const addArrayItem = (field: 'keyResponsibilities' | 'requirements') => {
        setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (
        field: 'keyResponsibilities' | 'requirements',
        index: number
    ) => {
        setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try{
            e.preventDefault();
            
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdTokenResult();
                console.log('Current user:', user.uid);
                console.log('Auth claims:', token.claims);
            }


            const cleanedData = {
                ...formData,
                keyResponsibilities: formData.keyResponsibilities.filter(item => item.trim() !== ''),
                requirements: formData.requirements.filter(item => item.trim() !== ''),
            };
        
            const jobData = {
                ...cleanedData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                applications: 0, // # of apps
            };

            // Add to Firestore
            const docRef = await addDoc(collection(db, 'jobPostings'), jobData);

            console.log('Job posting created with ID:', docRef.id);
            setSuccess(true);

            //eeset form
            setFormData({
                title: '',
                type: 'full-time',
                summary: '',
                keyResponsibilities: [''],
                requirements: [''],
                compensation: {
                    min: 0,
                    max: 0,
                    period: 'yearly'
                },
                status: 'Draft'
            });
        } catch (err) {
            console.error('Error adding job posting:', err);
            setError(err instanceof Error ? err.message : 'Failed to create job posting');
        } finally {
            setLoading(false);
        }
        console.log(formData);
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Add New Job Posting</h2>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employment Type *
          </label>
          <select
            required
            value={formData.type}
            onChange={e => setFormData(prev => ({ 
              ...prev, 
              type: e.target.value as JobPosting['type']
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Job Summary *
        </label>
        <textarea
          required
          value={formData.summary}
          onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Key Responsibilities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Responsibilities *
        </label>
        {formData.keyResponsibilities.map((responsibility, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              required
              value={responsibility}
              onChange={e => handleArrayChange('keyResponsibilities', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('keyResponsibilities', index)}
              className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('keyResponsibilities')}
          className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          + Add Responsibility
        </button>
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Requirements *
        </label>
        {formData.requirements.map((requirement, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              required
              value={requirement}
              onChange={e => handleArrayChange('requirements', index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('requirements', index)}
              className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('requirements')}
          className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          + Add Requirement
        </button>
      </div>

      {/* Compensation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Compensation *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Minimum</label>
            <input
              type="number"
              required
              value={formData.compensation.min}
              onChange={e => setFormData(prev => ({
                ...prev,
                compensation: {
                  ...prev.compensation,
                  min: Number(e.target.value)
                }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Maximum</label>
            <input
              type="number"
              required
              value={formData.compensation.max}
              onChange={e => setFormData(prev => ({
                ...prev,
                compensation: {
                  ...prev.compensation,
                  max: Number(e.target.value)
                }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Period</label>
            <select
              value={formData.compensation.period}
              onChange={e => setFormData(prev => ({
                ...prev,
                compensation: {
                  ...prev.compensation,
                  period: e.target.value as 'hourly' | 'yearly'
                }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="yearly">Per Year</option>
              <option value="hourly">Per Hour</option>
            </select>
          </div>
        </div>
      </div>
      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status *
        </label>
        <select
          required
          value={formData.status}
          onChange={e => setFormData(prev => ({ 
            ...prev, 
            status: e.target.value as JobPosting['status']
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="pt-5">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Job Posting
        </button>
      </div>
    </form>
  );
}