import {AlborzPagingRequest, Paginated} from './Pagination';
import {ResourceCategory} from './ResourceCategoryResponse';

export interface ResourceResponse {
  data: Paginated<Resource>;
}

export class Resource {
  id!: number;
  tableId!: number;
  resourceCategoryId?: number;
  resourceCategoryTitle?: string;

  title!: string;
  abstract!: string;
  anchors!: ResourceAnchor[];
  description!: string;
  keywords!: string;

  image!: string;
  fileId?: number;

  language!: string;
  publishDate!: string;
  publishInfo!: string;
  publisher!: string;
  price?: number;
  discount?: number;
  isVip!: boolean;
  downloadCount!: number;
  ordinal?: number;
  expirationDate!: string;
  expirationTime!: string;
  expired!: boolean;
  creationDate!: string;
  registered!: boolean;

  resourceCategories: ResourceCategory[] = [];
}

export interface ResourceAnchor {
  id: string;
  name: string;
  desc: string;
}

export class ResourceRequest {
  id?: number;
  tableId?: number;
}

export class ResourcesRequest extends AlborzPagingRequest {
  id?: number;
  tableId?: number;
  categoryId?: number;
}

export interface AddResourceRequest {
  id?: number;
  tableId: number;
  title: string;
  imagePath?: string;
  mimeType: string;
  language: string;
  isVip: boolean;
  price?: number;
  discount?: number;
  description: string;
  publishInfo: string;
  publisher: string;
  category: IdTitleRequest;
  abstract: string;
  anchors: ResourceAnchor[];
  expirationDate: string;
  expirationTime: string;
  keywords: string;
  publishDate: string;
  categories: string[];
  fileId?: number;
}


export interface IdTitleRequest {
  id: number;
  title: string;
}
