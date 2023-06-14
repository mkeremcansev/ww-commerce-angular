import {ImageIndexResponse} from "../../media/image/entity/entity";

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
        media: ImageIndexResponse[];
    }
}
export interface BrandUpdateRequest{
    title: string;
    media: ImageIndexResponse;
}

export interface BrandUpdateResponse{
    message: string;
    data: {
        id: number;
    }
}

