import { BaseModal } from '@/lib/util/BaseModal';
import React, { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { Application, Education } from '@/lib/types/Application';

interface Props {
    isOpen : any
    onClose : () => void

    application: Application | undefined

    setApplication: Dispatch<SetStateAction<Application | undefined>>

    dialog : RefObject<HTMLDialogElement>
    className? : string

}

const EmploymentForm: React.FC<Props> = ({ isOpen, onClose, application, setApplication, dialog, className} : Props) => {
  



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setApplication(prev => {

        if(!prev) return prev

        if(type == "file" && e.target.files) {
            return {
                ...prev,
                resume: e.target.files[0]
            }
        }
        return {
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }});
  };

  const handleEducationChange = (
    level: keyof Application['education'],
    field: keyof Education,
    value: string | boolean
  ): void => {
    setApplication(prev => {
        if(!prev) return prev;
        return {
            ...prev,
            education: {
                ...prev.education,
                [level]: {
                ...prev.education[level],
                [field]: value
                }
            }
        }
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(application);
  };

  return (
    <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        className={className}
    >
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-lg">
      <div className="text-2xl font-bold text-blue-800 border-b pb-2">
        Application for Employment
        <span className="text-sm font-normal text-gray-600 ml-4">
          PRE-EMPLOYMENT QUESTIONNAIRE
          EQUAL OPPORTUNITY EMPLOYER
        </span>
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name (Last Name, First)</label>
            <input
              type="text"
              name="name"
              value={application?.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Social Security No.</label>
            <input
              type="text"
              name="ssn"
              value={application?.ssn}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={application?.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={application?.city}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">State</label>
            <input
              type="text"
              name="state"
              value={application?.state}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Employment Desired */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Employment Desired</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Position</label>
            <input
              type="text"
              name="position"
              value={application?.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Date You Can Start</label>
            <input
              type="date"
              name="startDate"
              value={application?.startDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="currentlyEmployed"
              checked={application?.currentlyEmployed}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-600">Are you employed now?</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="canInquire"
              checked={application?.canInquire}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-600">May we inquire of your present employer?</label>
          </div>
        </div>
      </div>

      {/* Education History */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Education History</h2>
        <div className="grid grid-cols-1 gap-4">
          {(['highSchool', 'college', 'trade'] as const).map((level) => (
            <div key={level} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600">
                  {level === 'highSchool' ? 'High School' : 
                   level === 'college' ? 'College' : 
                   'Trade, Business, or Correspondence School'}
                </label>
                <input
                  type="text"
                  value={application?.education[level].name}
                  onChange={(e) => handleEducationChange(level, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Years Attended</label>
                <input
                  type="text"
                  value={application?.education[level].years}
                  onChange={(e) => handleEducationChange(level, 'years', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Graduated?</label>
                <input
                  type="checkbox"
                  checked={application?.education[level].graduated}
                  onChange={(e) => handleEducationChange(level, 'graduated', e.target.checked)}
                  className="mt-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">General Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Subject of Special Study/Research Work</label>
            <input
              type="text"
              name="specialStudy"
              value={application?.specialStudy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Special Training</label>
            <input
              type="text"
              name="specialTraining"
              value={application?.specialTraining}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Special Skills</label>
            <input
              type="text"
              name="specialSkills"
              value={application?.specialSkills}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">U.S. Military or Naval Service</label>
              <input
                type="text"
                name="militaryService"
                value={application?.militaryService}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Rank</label>
              <input
                type="text"
                name="militaryRank"
                value={application?.militaryRank}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resume upload */}
      <div className='pt-4'>
        <input
            type='file'
            name='resume'
            onChange={handleChange}
            className=''
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Application
        </button>
      </div>
    </form>
    </BaseModal>
  );
};

export default EmploymentForm;