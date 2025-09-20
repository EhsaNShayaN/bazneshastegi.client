export interface ScholarshipRequest {
  firstName: string;
  lastName: string;
  relation: string;
  grade: string;
  scholarshipAmount: number;
  requestType: string; // محصل / دانشجو
  dependents: ScholarshipDependent[];
  attachments: Attachment[];
}

export interface ScholarshipDependent {
  firstName: string;
  lastName: string;
  relation: string;
  grade: string;
  scholarshipAmount?: number;
  dateReceived?: string;
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
