import {Injectable} from '@angular/core';
import {LocalStorageService} from "../storage/local-storage.service";
import {Router} from "@angular/router";
import {RedirectService} from "../redirect/redirect.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    /**
     * @param storageService
     * @param redirectService
     * @param httpClient
     */
    constructor(
        public storageService: LocalStorageService,
        public redirectService: RedirectService,
        public httpClient: HttpClient
    ) {
    }

    /**
     * @method logout
     */
    logout() {
        this.httpClient.get(environment.api + '/user/logout').subscribe(response => {
                this.redirectService.redirect('/login/auth', 3);
            },
            error => {
                this.redirectService.redirect('/login/auth', 3);
            });

    }
}
