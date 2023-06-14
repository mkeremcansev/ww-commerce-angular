import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {ImageDestroyResponse, ImageIndexResponse} from "../entity/entity";

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
        return this.httpClient.get<ImageIndexResponse[]>(environment.api + '/media');
    }

    /**
     * @method destroy
     * @param media
     */
    destroy(media: ImageIndexResponse[]) {
        return this.httpClient.post<ImageDestroyResponse>(environment.api + '/media/destroy', {media: media});
    }
}
