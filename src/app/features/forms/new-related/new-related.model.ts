export interface NewRelatedRequest {
  tempPersonID: string;
  relationshipID: string;
  personFirstName: string;
  personLastName: string;
  personNationalCode: string;
  personFatherName: string;
  personCertificateNo: string;
  personBirthDate: string; // ISO Date string
  personBirthPlaceStateID: string;
  personBirthPlaceCityID: string;
  genderID: string;
  maritalStatusID: string;
  educationTypeID: string;
  educationBranchID: string;
  universityID: string;
  personPhone: string;
  personCellPhone: string;
  personStateID: string;
  personCityID: string;
  personRegion: number;
  personArea: number;
  personPostalCode: string;
  personAddress: string;
  personDescription: string;
}
