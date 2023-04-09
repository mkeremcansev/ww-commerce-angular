export interface UserProfileEditResponse {
    id: number;
    name: string;
    email: string;
}

export interface UserProfileUpdateRequest {
    name: string;
    email: string;
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
}

export interface UserProfileUpdateResponse {
    message: string;
    data: {
        id: number;
    }
}
