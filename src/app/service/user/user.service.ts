import {Injectable} from '@angular/core';
import {LocalStorageService} from "../storage/local-storage.service";
import {Router} from "@angular/router";
import {RedirectService} from "../redirect/redirect.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    /**
     * @param storageService
     * @param redirectService
     */
    constructor(
        public storageService: LocalStorageService,
        public redirectService: RedirectService
    ) {
    }

    /**
     * @method logout
     */
    logout() {
        this.redirectService.redirect('/login/auth', 0);
        this.storageService.removeItems(['token', 'permissions', 'user']);
    }
}
