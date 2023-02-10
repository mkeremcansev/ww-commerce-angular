export interface AttributeValueCreateResponse {
    id: number;
    title: string;
}

export interface AttributeValueStoreRequest {
    title: string;
    code: string;
    path: string;
    attribute_id: number;
}

export interface AttributeValueStoreResponse {
    message: string;
    data: {
        id: number;
    }
}

export interface AttributeValueEditResponse {
    id: number;
    title: string;
    code: string;
    path: string;
    attribute_id: number;
    attributes: AttributeValueCreateResponse[];
}

export interface AttributeValueUpdateRequest {
    title: string;
    code: string;
    path: string;
    attribute_id: number;
}


