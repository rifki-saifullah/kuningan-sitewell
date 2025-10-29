export type PagingRequest = {
    page: number;
    size: number;
}

export type PagingResponse<T> = {
    data: T[];
    meta: {
        total: number;
        page: number;
        size: number;
        total_pages: number;
    }
}