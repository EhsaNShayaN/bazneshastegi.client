export interface RelatedListForPortalResponse {
  data: RelatedListForPortal[];
}

export interface RelatedListForPortal {
  personID: string;
  pensionaryID: string;
  personNationalCode: string;
  personFirstName: string;
  personLastName: string;
  personBirthDate: Date;
  relationshipWithParentID: number;
  relationshipWithParentName: string;
  pensionaryIsUnderGaurantee: boolean;
  pensionaryIsUnderGauranteeText: string;
  relatedMedicalText: string;
  educationTypeID: string;
  educationTypeName: string;
  isChosen: boolean;
  isPermitted: boolean;
}
