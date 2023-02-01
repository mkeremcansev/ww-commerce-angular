import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {AuthRequest, AuthResponse} from "./entity/auth";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public httpClient: HttpClient
    ) {
    }

    /**
     * @param data
     */
    authorization(data: AuthRequest) : Observable<AuthResponse>{
        return this.httpClient.post<AuthResponse>(environment.api + '/user/authorization', data);
    }
}
