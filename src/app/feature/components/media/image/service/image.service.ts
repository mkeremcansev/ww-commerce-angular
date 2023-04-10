import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {ImageDestroyRequest, ImageDestroyResponse} from "../entity/entity";

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    /**
     * @method constructor
     * @param httpClient
     */
    constructor(
        public httpClient: HttpClient
    ) {
    }

    /**
     * @method index
     */
    index() {
        return this.httpClient.get(environment.api + '/image');
    }

    /**
     * @method destroy
     * @param paths
     */
    destroy(paths: ImageDestroyRequest) {
        return this.httpClient.post<ImageDestroyResponse>(environment.api + '/image/destroy', paths);
    }
}
