export interface RoleCreateResponse {
    permission_id: RoleCreatePermissionResponse[];
}

export interface RoleCreatePermissionResponse {
    id: number;
    name: string;
    group_name: string;
}

export interface RoleStoreRequest {
    title: string;
    permission_id: number[];
}

export interface RoleStoreResponse {
    message: string;
    data: {
        id: number;
    }
}
