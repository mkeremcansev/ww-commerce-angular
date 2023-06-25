import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductCreateResponse} from "../../product/entity/entity";
import {environment} from "../../../../../environments/environment";
import {SettingEditResponse, SettingUpdateRequest, SettingUpdateResponse} from "../entity/setting";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

    /**
     * @method constructor
     * @param httpClient
     */
    constructor(
        public httpClient: HttpClient,
    ) {
    }

    /**
     * @method edit
     */
    edit() {
        return this.httpClient.get<SettingEditResponse>(environment.api + '/setting/edit');
    }

    /**
     * @method update
     */
    update(data: SettingUpdateRequest) {
        return this.httpClient.patch<SettingUpdateResponse>(environment.api + '/setting', data);
    }
}
