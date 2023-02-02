import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

    setItems(values: any) {
        Object.entries(values).forEach(([key, value]) => {
            if (typeof value === "string") {
                localStorage.setItem(key, value);
            }
        });
    }
}
