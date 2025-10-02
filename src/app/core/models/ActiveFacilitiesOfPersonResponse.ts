import {BaseResult} from './BaseResult';

export interface ActiveFacilitiesOfPersonResponse extends BaseResult<ActiveFacilitiesOfPerson[]> {
}

export interface ActiveFacilitiesOfPerson {
  facilityID: string;
  personID: string;
  mainpersonFirstName: string;
  mainpersonLastName: string;
  requestTypeID: string;
  relatedPersonID: string | null;
  relatedpersonFirstName: string | null;
  relatedpersonLastName: string | null;
  payItemTypeID: string | null;
  confirmDate: string; // ISO date string
  facilityAmount: number;
  instalementAmount: number | null;
  instalementCount: number;
  remainedAmount: number | null;
  executeYear: number | null;
  executeMonth: number | null;
  expireDate: string | null;
  expireUserID: string | null;
  requestID: string | null;
  requestComplementaryID: string;
  insertPayAmountInCertificate: boolean | null;
  insertDurationInCertificate: boolean | null;
  applicantNationalCode: string | null;
  applicantBirthDate: string | null;
  applicantFirstName: string | null;
  applicantLastName: string | null;
  applicantRelationship: string | null;
  prizeReceiverLookupID: string | null;
  facilityGiverLookupID: string | null;
  facilityGiverDesc: string | null;
  needGuarantor: boolean | null;
  referralToCommittee: boolean | null;
  issueTypeLookupID: string | null;
  previousCardNumber: string | null;
  facilityReceiverFullName: string | null;
  facilityReceiveTypeLookupID: string | null;
  ceremonyTypeLookupID: string | null;
  ceremonyDate: string | null;
  ceremonyGuestCount: number | null;
  introducedToLookupID: string | null;
  requestDescription: string | null;
  requestTypeName: string | null;
  prizeReceiverLookupName: string | null;
  facilityGiverLookupName: string | null;
  issueTypeLookupName: string | null;
  facilityReceiveTypeLookupName: string | null;
  ceremonyTypeLookupName: string | null;
  introducedToLookupName: string | null;
}
