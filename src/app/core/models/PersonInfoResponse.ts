import {BaseResult} from './BaseResult';

export interface PersonInfoResponse extends BaseResult<PersonInfo> {
}

export class PersonInfo0 {
  personID!: string;
  pensionaryID!: string | null;
  personNationalCode!: string;
  personFirstName!: string;
  personLastName!: string;
  personFatherName!: string;
  personCertificateNo!: string;
  personBirthDate!: Date;
  personAddress!: string;
  personPostalCode!: string;
  personRegion!: number | null;
  personArea!: number | null;
  personPhone!: string;
  personCellPhone!: string;
  personCellPhone2!: string | null;
  retiredID!: number;
  retiredRealDuration?: number;
  retiredRealDurationYEAR?: number;
  retiredRealDurationMONTH?: number;
  retiredRealDurationDAY?: number;
  parentPersonID!: string | null;
  pensionaryStatusID!: string;
  pensionaryStatusName!: string;
  genderID!: string;
  relationshipWithParentID!: string | null;
  relationshipWithParentName!: string | null;
  retirementDate?: string;
  payAmount!: number;
  educationTypeID!: string;
  educationTypeName!: string;
  educationTypeCaption!: string;
  basketReceiveTypeID!: string;
  basketReceiveTypeName!: string;
  remainedAmountForCertificate?: number;
  employmentTypeID!: string;
  employmentTypeName!: string;
}

export interface PersonInfo {
  personID: string;
  tempPersonID: string;
  requestID: string;
  loginedPersonID: string;
  thisPersonID: string;
  personNationalCode: string;
  personFirstName: string;
  personLastName: string;
  personFatherName: string;
  personCertificateNo: string;
  personBirthDate: Date;
  personBirthPlaceStateID: string;
  personBirthPlaceCityID: string;
  personCountryID: string;
  personStateID: string;
  personCityID: string;
  personAddress: string;
  personPostalCode: string;
  personRegion: number;
  personArea: number;
  personPhone: string;
  personCellPhone: string;
  longitude: number;
  latitude: number;
  backupFirstName: string;
  backupLastName: string;
  backupNationalCode: string;
  backupRelation: string;
  backupPhone: string;
  backupCellphone: string;
  backupAddress: string;
  genderID: string;
  maritalStatusID: string;
  educationTypeID: string;
  personDescription: string;
  picture: string;
  /**********************/
  pensionaryID: string | null;
  personCellPhone2: string | null;
  retiredID: number;
  retiredRealDuration?: number;
  retiredRealDurationYEAR?: number;
  retiredRealDurationMONTH?: number;
  retiredRealDurationDAY?: number;
  parentPersonID: string | null;
  pensionaryStatusID: string;
  pensionaryStatusName: string;
  relationshipWithParentID: string | null;
  relationshipWithParentName: string | null;
  retirementDate?: string;
  payAmount: number;
  educationTypeName: string;
  educationTypeCaption: string;
  basketReceiveTypeID: string;
  basketReceiveTypeName: string;
  remainedAmountForCertificate?: number;
  employmentTypeID: string;
  employmentTypeName: string;
}
