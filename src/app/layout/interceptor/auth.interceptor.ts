import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpStatusCode
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NavigationExtras, Router} from '@angular/router';
import {LocalStorageService} from "../../service/storage/local-storage.service";
import {MessageService} from "primeng/api";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * @param router
     * @param storageService
     */
    constructor(
        private router: Router,
        public storageService: LocalStorageService
    ) {
    }

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
                switch (error.status) {
                    case HttpStatusCode.Unauthorized:
                        this.router.navigate(['/login/auth']);
                        break;
                    case HttpStatusCode.Forbidden:
                        break;
                    default:
                        break;
                }
                return throwError(error);
            })
        ) as Observable<HttpEvent<any>>;
    }
}
