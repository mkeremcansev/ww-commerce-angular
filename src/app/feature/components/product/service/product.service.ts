import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {
    ProductCreateResponse,
    ProductEditResponse,
    ProductStoreRequest,
    ProductStoreResponse,
    ProductUpdateRequest, ProductUpdateResponse
} from "../entity/entity";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    /**
     * @method constructor
     * @param httpClient
     */
    constructor(
        public httpClient: HttpClient,
    ) {
    }

    /**
     * @method create
     */
    create() {
        return this.httpClient.get<ProductCreateResponse>(environment.api + '/product/create');
    }

    /**
     * @method store
     * @param data
     */
    store(data: ProductStoreRequest) {
        return this.httpClient.post<ProductStoreResponse>(environment.api + '/product/store', data);
    }

    /**
     * @method edit
     * @param id
     */
    edit(id: number) {
        return this.httpClient.get<ProductEditResponse>(environment.api + '/product/' + id + '/edit');
    }

    /**
     * @method update
     */
    update(id: number, data: ProductUpdateRequest) {
        return this.httpClient.patch<ProductUpdateResponse>(environment.api + '/product/' + id, data);
    }
}
