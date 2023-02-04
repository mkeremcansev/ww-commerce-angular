import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RedirectService {

    /**
     * @param router
     */
    constructor(
        public router: Router
    ) {
    }

    /**
     * @param path
     * @param time
     */
    redirect(path: string, time: number){
        setTimeout(() => {
            this.router.navigate([path]);
        }, time * 1000);

    }
}
