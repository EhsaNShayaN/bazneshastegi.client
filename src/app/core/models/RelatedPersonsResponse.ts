export interface RelatedPersonsResponse {
  data: RelatedPersons[];
}

export class RelatedPersons {
  personID!: string;
  pensionaryID!: string | null;
  personNationalCode!: string;
  personFirstName!: string;
  personLastName!: string;
  personFatherName!: string;
}
