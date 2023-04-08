import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {RoleCreateResponse, RoleStoreRequest, RoleStoreResponse} from "../entity/entity";

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
  ) { }

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
}
