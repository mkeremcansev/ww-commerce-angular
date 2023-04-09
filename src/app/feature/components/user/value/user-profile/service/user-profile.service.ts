import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../../environments/environment";
import {UserProfileEditResponse, UserProfileUpdateRequest, UserProfileUpdateResponse} from "../entity/entity";

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    /**
     * @method constructor
     * @param httpClient
     */
    constructor(
        public httpClient: HttpClient
    ) {
    }

    /**
     * @method edit
     */
    edit() {
        return this.httpClient.get<UserProfileEditResponse>(environment.api + '/user/profile');
    }

    /**
     * @method update
     */
    update(data: UserProfileUpdateRequest) {
        return this.httpClient.patch<UserProfileUpdateResponse>(environment.api + '/user/profile', data);
    }
}
