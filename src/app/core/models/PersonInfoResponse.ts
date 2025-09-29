import {BaseResult} from "./BaseResult";

export interface PersonInfoResponse extends BaseResult<PersonInfo> {
}

export class PersonInfo {
  personID!: string;
  pensionaryID!: string | null;
  personNationalCode!: string;
  personFirstName!: string;
  personLastName!: string;
  personFatherName!: string;
  personCertificateNo!: string;
  personBirthDate!: string;
  personAddress!: string;
  personPostalCode!: string;
  personRegion!: number | null;
  personArea!: number | null;
  personPhone!: string;
  personCellPhone!: string;
  personCellPhone2!: string | null;
  retiredID!: number;
  retiredRealDuration!: number;
  retiredRealDurationYEAR!: number;
  retiredRealDurationMONTH!: number;
  retiredRealDurationDAY!: number;
  parentPersonID!: string | null;
  pensionaryStatusID!: string;
  pensionaryStatusName!: string;
  relationshipWithParentID!: string | null;
  relationshipWithParentName!: string | null;
  retirementDate!: string;
  payAmount!: number;
  educationTypeID!: string;
  educationTypeName!: string;
  educationTypeCaption!: string;
  basketReceiveTypeID!: string;
  basketReceiveTypeName!: string;
  remainedAmountForCertificate!: number;
  employmentTypeID!: string;
  employmentTypeName!: string;
}
