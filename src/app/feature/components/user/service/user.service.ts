import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {UserEditResponse, UserUpdateRequest} from "../entity/entity";

@Injectable({
    providedIn: 'root'
})
export class UserService {
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
     * @param id
     */
    edit(id: number) {
        return this.httpClient.get<UserEditResponse>(environment.api + '/user/' + id + '/edit');
    }

    /**
     * @method update
     */
    update(data: UserUpdateRequest, id: number) {
        return this.httpClient.patch(environment.api + '/user/' + id, data);
    }
}
