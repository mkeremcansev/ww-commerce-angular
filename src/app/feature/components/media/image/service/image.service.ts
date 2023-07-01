import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";
import {
    ImageDestroyResponse,
    ImageForceDestroyResponse,
    ImageIndexResponse,
    ImageRestoreResponse
} from "../entity/entity";

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
    index(trashed: boolean) {
        return this.httpClient.get<ImageIndexResponse[]>(environment.api + `/media?trashed=${trashed ? '1' : '0'}`);
    }

    /**
     * @method forceDestroy
     * @param ids
     */
    forceDestroy(ids: number[]) {
        return this.httpClient.post<ImageForceDestroyResponse>(environment.api + '/media/forceDelete', {ids: ids});
    }

    /**
     * @method restore
     * @param ids
     */
    restore(ids: number[]) {
        return this.httpClient.post<ImageRestoreResponse>(environment.api + '/media/restore', {ids: ids});
    }

    /**
     * @method destroy
     * @param media
     */
    destroy(media: ImageIndexResponse[]) {
        return this.httpClient.post<ImageDestroyResponse>(environment.api + '/media/destroy', {media: media});
    }
}
