export interface CouponCreateResponse {
    statuses: string[];
    types: string[];
}

export interface CouponTypeAndStatus {
    id: number;
    title: string;
}

export interface CouponStoreRequest {
    code: string;
    type: number;
    value: number;
    usage_limit: number;
    status: number;
    expired_at: string;
}

export interface CouponStoreResponse {
    message: string;
    data: {
        id: number;
    }
}

export interface CouponEditResponse {
    id: number;
    code: string;
    type: number;
    value: number;
    usage_limit: number;
    status: number;
    expired_at: string;
    statuses: string[];
    types: string[];
}

export interface CouponUpdateRequest {
    code: string;
    type: number;
    value: number;
    usage_limit: number;
    status: number;
    expired_at: string;
}

export interface CouponUpdateResponse {
    message: string;
    data: {
        id: number;
    }
}
