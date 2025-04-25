export enum SortOrder {
    ASC = 'asc',
    DESC = 'desk',
}

export interface ISearchParams {
    sortBy: string;
    sortOrder: SortOrder;
    search: string;
    searchBy: string;
    filter: string;
    limit: string;
}