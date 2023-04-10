import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {
    RoleCreateResponse,
    RoleEditResponse,
    RoleStoreRequest,
    RoleStoreResponse,
    RoleUpdateRequest, RoleUpdateResponse
} from "../entity/entity";

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    /**
     * Constructor
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
        return this.httpClient.get<RoleCreateResponse>(environment.api + '/role/create');
    }

    /**
     * @method store
     * @param data
     */
    store(data: RoleStoreRequest) {
        return this.httpClient.post<RoleStoreResponse>(environment.api + '/role/store', data);
    }

    /**
     * @method edit
     */
    edit(id: number) {
        return this.httpClient.get<RoleEditResponse>(environment.api + '/role/' + id + '/edit');
    }

    /**
     * @method update
     */
    update(data: RoleUpdateRequest, id: number) {
        return this.httpClient.patch<RoleUpdateResponse>(environment.api + '/role/' + id, data);
    }
}
