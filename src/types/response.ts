export type PaginatedResponse<T> = {
  data: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
};
