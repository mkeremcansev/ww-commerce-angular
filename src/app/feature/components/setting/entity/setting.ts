export interface SettingEditResponse {
    data: {
        title: string;
        description: string;
        keywords: string;
        default_image_mime_type: string;
    }
    mime_types: string[];
}

export interface SettingUpdateRequest {
    title: string;
    description: string;
    keywords: string;
    default_image_mime_type: string;
}

export interface SettingUpdateRequest {
    title: string;
    description: string;
    keywords: string;
    default_image_mime_type: string;
}

export interface SettingUpdateResponse {
    message: string;
}
