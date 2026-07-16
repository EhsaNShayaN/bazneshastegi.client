export interface TempPersonsResponse {
  data: TempPerson[];
}

export interface TempPerson {
  tempPersonID?: string | null;
  isNewPerson?: boolean | null;
  thisPersonID?: string | null;
  requestID?: string | null;
  isChecked?: boolean | null;
  loginedPersonID?: string | null;
  relationshipID?: string | null;
  pensionaryStatusID?: string | null;
  personNationalCode?: string | null;
  personFirstName?: string | null;
  personLastName?: string | null;
  personFatherName?: string | null;
  personCertificateNo?: string | null;
  personBirthDate?: Date | null;
  personBirthPlaceStateID?: string | null;
  personBirthPlaceCityID?: string | null;
  personCountryID?: string | null;
  personStateID?: string | null;
  personCityID?: string | null;
  personAddress?: string | null;
  personPostalCode?: string | null;
  personRegion?: number | null;
  personArea?: number | null;
  personPhone?: string | null;
  personCellPhone?: string | null;
  genderID?: string | null;
  maritalStatusID?: string | null;
  educationTypeID?: string | null;
  universityID?: string | null;
  educationTypeCaption?: string | null;
  universityCaption?: string | null;
  personDescription?: string | null;
  isUnderGauarantee?: boolean | null;
  existingPerson?: string | null;
}
