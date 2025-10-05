import {BaseResult} from './BaseResult';

export interface InsertComplementaryResponse extends BaseResult<InsertComplementaryInfo> {
}

export class InsertComplementaryInfo {
  requestComplementaryID!: string;
  insertPayAmountInCertificate!: boolean;
  insertDurationInCertificate!: boolean;
  applicantNationalCode!: string;
  applicantBirthDate!: string; // ISO date string e.g. "1985-04-04T00:00:00"
  applicantFirstName!: string;
  applicantLastName!: string;
  applicantRelationship!: string;
  relatedPersonID!: string | null;
  prizeReceiverLookupID!: string | null;
  facilityGiverLookupID!: string | null;
  facilityGiverDesc!: string | null;
  facilityAmount!: number;
  facilityDiscountPercent!: number;
  facilityInstalementCount!: number;
  needGuarantor!: boolean;
  referralToCommittee!: boolean;
  issueTypeLookupID!: string | null;
  previousCardNumber!: string | null;
  facilityReceiverFullName!: string | null;
  facilityReceiveTypeLookupID!: string | null;
  ceremonyTypeLookupID!: string | null;
  ceremonyDate?: string | null;
  ceremonyGuestCount!: number;
  introducedToLookupID!: string | null;
  requestDescription!: string | null;
  personID!: string;
  requestTypeID!: string | null;
  requestID!: string;
}
