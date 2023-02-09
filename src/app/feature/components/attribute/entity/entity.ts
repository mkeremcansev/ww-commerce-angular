export interface AttributeStoreRequest {
    title: string;
}

export interface AttributeStoreResponse {
    message: string;
    data: {
        id: number;
    }
}

export interface AttributeUpdateRequest {
    title: string;
}
export interface AttributeUpdateResponse {
    message: string;
    data: {
        id: number;
    }
}
