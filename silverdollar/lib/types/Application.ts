export interface Education {
  name: string;
  years: string;
  graduated: boolean;
  subjects: string;
}

export interface Application {
  name: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  referredBy: string;
  position: string;
  startDate: string;
  currentlyEmployed: boolean;
  canInquire: boolean;
  appliedBefore: boolean;
  appliedWhere: string;
  appliedWhen: string;
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
}