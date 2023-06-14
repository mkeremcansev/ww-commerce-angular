import {ImageIndexResponse} from "../../media/image/entity/entity";

export interface CategoryCreateResponse {
    id: number;
    title: string;
    slug: string;
    parent_id: number;
    parents: Category[];
}

export interface Category {
    id: number;
    title: string;
    slug: string;
    parent_id: number;
    parents: Category[];
}

export interface CategorySelectedItem {
    key: number;
    label: string;
    data: Category[];
    children: CategorySelectedItem[];
}

export interface CategoryStoreRequest {
    title: string;
    category_id: number;
    media: ImageIndexResponse;
}

export interface CategoryUpdateRequest {
    title: string;
    category_id: number | null;
    media: ImageIndexResponse;
}

export interface CategoryStoreResponse {
    message: string;
    data: {
        id: number;
    }
}

export interface CategoryUpdateResponse {
    message: string;
    data: {
        id: number;
    }
}

export interface CategoryEditResponse {
    id: number;
    title: string;
    slug: string;
    path: string;
    category_id: number | null;
    categories: Category[];
}
