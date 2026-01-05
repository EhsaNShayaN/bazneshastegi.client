export interface RelationshipResponse {
  data: Relationship[];
}

export interface Relationship {
  relationshipID: string;
  relationshipName: string;
  relationshipTypeID: string;
  relationshipGetsChildRight: boolean;
}
