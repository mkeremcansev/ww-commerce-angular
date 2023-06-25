import {ImageIndexResponse} from "../../media/image/entity/entity";

export interface SettingEditResponse {
    data: {
        title: string;
        description: string;
        keywords: string;
        default_image_mime_type: string;
        logo: ImageIndexResponse;
        favicon: ImageIndexResponse;
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
