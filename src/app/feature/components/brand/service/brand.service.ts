import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
    BrandStoreResponse,
    BrandStoreRequest,
    BrandEditResponse,
    BrandUpdateRequest,
    BrandUpdateResponse
} from "../entity/entity";
import {environment} from "../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BrandService {
    /**
     * @param httpClient
     */
    constructor(
        public httpClient: HttpClient
    ) {
    }

    /**
     * @param data
     */
    store(data: BrandStoreRequest) {
        return this.httpClient.post<BrandStoreResponse>(environment.api + '/brand/store', data);
    }

    /**
     * @param id
     */
    edit(id: number) {
        return this.httpClient.get<BrandEditResponse>(environment.api + '/brand/' + id + '/edit');
    }

    /**
     * @param data
     * @param id
     */
    update(data: BrandUpdateRequest, id: number) {
        return this.httpClient.patch<BrandUpdateResponse>(environment.api + '/brand/' + id, data);
    }
}
