export interface CeremonyIntroRequest {
  ceremonyType: string;
  introduceTo: string;
  discountPercent?: number;
  ceremonyDate: string;
  inviteesCount?: number;
  forWhom: string; // خودم / وابستگان
  dependents: Dependent[];
  attachments: Attachment[];
}

export interface Dependent {
  firstName: string;
  lastName: string;
  relation: string;
  underSupport: boolean;
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
