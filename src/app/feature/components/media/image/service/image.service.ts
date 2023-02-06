import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

    /**
     * @method constructor
     * @param http
     */
  constructor(
      public http: HttpClient
  ) { }

    index() {
        return this.http.get(environment.api + '/image');
    }
}
