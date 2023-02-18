import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
    AttributeStoreRequest,
    AttributeStoreResponse,
    AttributeUpdateRequest,
    AttributeUpdateResponse
} from "../entity/entity";
import {environment} from "../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AttributeService {

    /**
     * @method constructor
     * @param http
     */
    constructor(
        public http: HttpClient
    ) {
    }

    /**
     * @method store
     * @param data
     */
    public store(data: AttributeStoreRequest) {
        return this.http.post<AttributeStoreResponse>(environment.api + '/attribute/store', data);
    }

    edit(id: number) {
        return this.http.get(environment.api + '/attribute/' + id + '/edit');
    }

    /**
     * @method update
     * @param data
     * @param id
     */
    update(data: AttributeUpdateRequest, id: number) {
        return this.http.patch<AttributeUpdateResponse>(environment.api + '/attribute/' + id + '/update', data);
    }
}
