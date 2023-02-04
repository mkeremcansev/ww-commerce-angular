export interface BrandStoreRequest{
    title: string;
    path: string;
}
export interface BrandStoreResponse{
    message: string;
    data: {
        id: number;
    }
}

export interface BrandEditResponse{
    data: {
        id: number;
        title: string;
        slug: string;
        path: string;
    }
}
export interface BrandUpdateRequest{
    title: string;
    path: string;
}

export interface BrandUpdateResponse{
    message: string;
    data: {
        id: number;
    }
}

