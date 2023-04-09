export interface UserEditResponse {
    id: number;
    name: string;
    email: string;
    roles: UserEditRoleResponse[];
    role_id: UserEditRoleResponse[];
}

export interface UserEditRoleResponse {
    id: number;
    name: string;
}

export interface UserUpdateRequest {
    name: string;
    email: string;
    role_id: number[];
}

export interface UserUpdateResponse {
    message: string;
    data: {
        id: number;
    }
}
