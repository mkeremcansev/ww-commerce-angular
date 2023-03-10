import {CategoryCreateResponse} from "../../category/entity/entity";

export interface ProductCreateResponse {
    attribute_id: Attribute[];
    category_id: CategoryCreateResponse[];
    brand_id: Brand[];
    status: string[];
}

export interface ProductCreateResponseStatusFormat {
    id: number;
    title: string;
}

export interface AttributeValue {
    id: number;
    title: string;
    code: string;
    path: string;
}

export interface Attribute {
    id: number;
    title: string;
    attribute_values: AttributeValue[];
}

export interface Brand {
    id: number;
    title: string;
    slug: string;
    path: string;
}

export interface CombinationAttributeValue {
    id: number;
    title: string;
    code: string;
    path: string;
}

export interface ProductStoreRequest {
    title: string;
    content: string;
    price: number;
    brand_id: number;
    category_id: number[];
    variants: AttributeCombination[];
}

export interface ProductStoreResponse {
    message: string;
    data: {
        id: number;
    }
}

export interface Variant {
    attributes: Attribute[];
    price: number;
    stock: number;
}

export interface AttributeCombination {
    title: string;
    code: string;
    path: string;
    attribute_id: number;
    attribute_value_id: number;
}
