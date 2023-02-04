import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "../../service/storage/local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
    /**
     * @param router
     * @param storageService
     */
    constructor(
        private router: Router,
        private storageService: LocalStorageService
    ) {
    }

    /**
     * @param route
     * @param state
     * @param guard
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        guard: boolean = true
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const permissions = JSON.parse(localStorage.getItem('permissions') ?? '{}');
        if (Object.keys(permissions).length > 0) {
            for (const groupName in permissions) {
                if (permissions.hasOwnProperty(groupName)) {
                    for (const permission in permissions[groupName]) {
                        if (permissions[groupName][permission]?.name === (route.data as any)?.permission?.name && groupName === (route.data as any)?.permission?.group) {
                            return true;
                        }
                    }
                }
            }
        } else {
            this.storageService.removeItems(['token', 'permissions', 'user']);
            this.router.navigate(['/auth/login']);
            return false;
        }
        guard ? this.router.navigate(['/notfound']) : false;
        return false;
    }

}
