import { Timestamp } from "firebase/firestore";

export interface Education {
  name: string;
  years: string;
  graduated: boolean;
  subjects: string;
}

export interface Application {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  referredBy: string;
  startDate: string;
  currentlyEmployed: boolean;
  canInquire: boolean;
  
  submittedAt: Timestamp | null;

  status : string;
  education: {
    highSchool: Education;
    college: Education;
    trade: Education;
  };
  specialStudy: string;
  specialTraining: string;
  specialSkills: string;
  militaryService: string;
  militaryRank: string;
  resume: File | null;

  resumeUrl: string;
}