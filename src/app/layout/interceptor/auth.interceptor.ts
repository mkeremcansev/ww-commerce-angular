import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../service/storage/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * @param router
     * @param storageService
     */
    constructor(
        private router: Router,
        public storageService: LocalStorageService
    ) {}

    /**
     * @param request
     * @param next
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    this.router.navigate(['/login/auth']);
                } else if (error.status === 403) {
                    this.router.navigate(['/404']);
                }
                return throwError(error);
            })
        ) as Observable<HttpEvent<any>>;
    }
}
