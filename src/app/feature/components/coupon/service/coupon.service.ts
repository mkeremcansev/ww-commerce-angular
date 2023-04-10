import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {
    CouponCreateResponse,
    CouponEditResponse,
    CouponStoreRequest,
    CouponStoreResponse,
    CouponUpdateRequest, CouponUpdateResponse
} from "../entity/entity";

@Injectable({
    providedIn: 'root'
})
export class CouponService {

    /**
     * @method constructor
     * @param httpClient
     */
    constructor(
        public httpClient: HttpClient
    ) {
    }

    /**
     * @method create
     */
    create() {
        return this.httpClient.get<CouponCreateResponse>(environment.api + '/coupon/create');
    }

    /**
     * @method store
     */
    store(data: CouponStoreRequest) {
        return this.httpClient.post<CouponStoreResponse>(environment.api + '/coupon/store', data);
    }

    /**
     * @method edit
     */
    edit(id: number) {
        return this.httpClient.get<CouponEditResponse>(environment.api + '/coupon/' + id + '/edit');
    }

    /**
     * @method update
     */
    update(data: CouponUpdateRequest, id: number) {
        return this.httpClient.patch<CouponUpdateResponse>(environment.api + '/coupon/' + id, data);
    }
}
