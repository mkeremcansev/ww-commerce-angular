export interface ImageDestroyRequest {
    paths: string[];
}

export interface ImageDestroyResponse {
    message: string;
    data: {}
}

export interface ImageIndexResponse {
    id: number;
    full_path: string;
    extension: string;
    mime_type: string;
    size: number;
}
