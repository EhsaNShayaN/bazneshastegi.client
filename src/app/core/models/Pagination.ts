export class PagingRequest {
  pageIndex!: number;
  pageSize!: number;
  lastId?: number = 0;   // default value
  sort?: number;
  query?: string;
  fromDate?: string;
  toDate?: string;
  fromPrice?: number;
  toPrice?: number;
  url?: string;
}

export class AlborzPagingRequest extends PagingRequest {
  expired?: boolean;
}

export class SortRequest {
  active!: string;
  direction!: string;
}

export interface Paginated<T> {
  items: T[];
  hasNext: boolean;
  hasPrevious: boolean;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export class Pagination {
  constructor(public page: number,
              public perPage: number,
              public prePage: number | null,
              public nextPage: number | null,
              public total: number,
              public totalPages: number) {
  }
}
