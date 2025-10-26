export interface CeremonyIntroRequest {
  applicantRelationship: string;
  facilityDiscountPercent?: number;
  ceremonyTypeLookupID: string;
  ceremonyDate: Date;
  ceremonyGuestCount: number;
  introducedToLookupID: string;
  requestDescription: string;

  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
