export interface PayFractionCertificate {
  guarantorSalary?: number;
  amountRemain?: number;
  includeSalary: boolean;
  includeHistory: boolean;
  attachments: Attachment[];

  lender: Lender;

  borrower: Borrower;
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}

export interface Lender {
  type: string;
  name: string;
  branchName: string;
  branchCode: string;
  loanAmount: number;
  installmentCount: number;
}

export interface Borrower {
  nationalCode: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  relation: string;
}

export class InsertRequest {
  personID!: string;
  nationalCode!: string;
  personFirstName!: string;
  personLastName!: string;
  requestDate!: Date;
  requestTypeID!: string;
  requestText!: string;
  insertUserID!: string;
  //updateUserID!: string;
  requestFrom!: number;
  /*state!: number;
  stateName!: string;
  requestTypeName!: string;
  requestTypeNameFa!: string;
  requestNO!: string;
  conditionValue!: number;
  isLocked!: boolean;
  lockedUserID!: string;
  page!: string;
  conditions!: InsertCondition[];*/
}

export class InsertCondition {
  conditionValue!: number;
  nextSate!: number;
  buttonName!: string;
}

export interface InsertRequestComplementary {
  //requestComplementaryID: string;
  requestID: string;
  personID: string;
  ceremonyDate: Date;
  insertPayAmountInCertificate?: boolean;
  insertDurationInCertificate?: boolean;
  applicantNationalCode?: string;
  applicantBirthDate?: string;
  applicantFirstName?: string;
  applicantLastName?: string;
  applicantRelationship?: string;
  prizeReceiverLookupID?: string;
  /*relatedPersonID: string;
  facilityGiverLookupID: string;*/
  facilityGiverDesc?: string;
  facilityAmount?: number;
  //facilityDiscountPercent: number;
  facilityInstalementCount?: number;
  /*needGuarantor: boolean;
  referralToCommittee: boolean;
  issueTypeLookupID: string;
  previousCardNumber: string;
  facilityReceiverFullName: string;
  facilityReceiveTypeLookupID: string;
  ceremonyTypeLookupID: string;
  ceremonyGuestCount: number;
  introducedToLookupID: string;
  requestDescription: string;*/
}

export interface InsertRequestAttachment {
  //requestAttachmentID: string;
  requestID: string;
  attachementTypeID: string;
  attachementTypeName: string;
  //attachementDesc: string;
  //attachment: string;
  //contentType: string;
  insertUserID: string;
  insertTime: string;   // ISO datetime string
  updateUserID: string;
  updateTime: string;   // ISO datetime string
}
