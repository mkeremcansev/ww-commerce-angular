import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(
    ) {
    }

    /**
     * @param message
     */
    error(message: string) {
        return {
            key: 'tst',
            severity: 'error',
            summary: 'Error Message',
            detail: message
        };
    }

    /**
     * @param message
     */
    success(message: string) {
        return {
            key: 'tst',
            severity: 'success',
            summary: 'Success Message',
            detail: message
        };
    }
}
