export interface ResourceCategoriesResponse {
  data: ResourceCategory[];
}

export interface ResourceCategory {
  id: number;
  title: string;
  description: string;
  count: number;
  parentId: number;
  parentTitle: string;
  creationDate: string;
}
