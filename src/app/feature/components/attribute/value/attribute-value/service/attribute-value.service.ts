import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {
    AttributeValueCreateResponse,
    AttributeValueEditResponse,
    AttributeValueStoreRequest,
    AttributeValueStoreResponse, AttributeValueUpdateRequest
} from "../entity/entity";

@Injectable({
    providedIn: 'root'
})
export class AttributeValueService {

    constructor(
        public httpClient: HttpClient
    ) {
    }

    /**
     * @method create
     */
    create() {
        return this.httpClient.get<AttributeValueCreateResponse>(environment.api + '/attribute/value/create')
    }

    /**
     * @method store
     * @param data
     */
    store(data: AttributeValueStoreRequest) {
        return this.httpClient.post<AttributeValueStoreResponse>(environment.api + '/attribute/value/store', data)
    }

    /**
     * @method edit
     * @param id
     */
    edit(id: number) {
        return this.httpClient.get<AttributeValueEditResponse>(environment.api + '/attribute/value/' + id + '/edit')
    }

    /**
     * @method update
     * @param data
     * @param id
     */
    update(data: AttributeValueUpdateRequest, id: number) {
        return this.httpClient.patch<AttributeValueStoreResponse>(environment.api + '/attribute/value/' + id + '/update', data)
    }
}
