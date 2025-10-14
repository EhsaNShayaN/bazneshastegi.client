export interface RelatedPersonsResponse {
  data: RelatedPersons[];
}

export interface RelatedPersons {
  pensionaryID: string;
  personFatherName: string;
  personFirstName: string;
  personID: string;
  personLastName: string;
  personNationalCode: string;
}
