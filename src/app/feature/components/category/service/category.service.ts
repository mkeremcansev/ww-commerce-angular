import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {
    CategoryCreateResponse,
    CategoryEditResponse,
    CategoryStoreRequest,
    CategoryStoreResponse,
    CategoryUpdateRequest,
    CategoryUpdateResponse
} from "../entity/entity";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        public httpClient: HttpClient
    ) {
    }

    /**
     * @method create
     */
    create() {
        return this.httpClient.get<CategoryCreateResponse>(environment.api + '/category/create');
    }

    /**
     * @method store
     * @param data
     */
    store(data: CategoryStoreRequest) {
        return this.httpClient.post<CategoryStoreResponse>(environment.api + '/category/store', data);
    }

    /**
     * @method edit
     * @param id
     */
    edit(id: number) {
        return this.httpClient.get<CategoryEditResponse>(environment.api + '/category/' + id + '/edit');
    }

    /**
     * @method update
     * @param data
     * @param id
     */
    update(data: CategoryUpdateRequest, id: number) {
        return this.httpClient.patch<CategoryUpdateResponse>(environment.api + '/category/' + id + '/update', data);
    }
}
