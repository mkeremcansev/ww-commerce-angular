import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    public table = {
        "title": "product.list",
        "url": "/product",
        "destroy": {
            "url": "/product/",
        },
        "restore": {
            "url": "/product/restore"
        },
        "forceDestroy": {
            "url": "/product/forceDelete"
        },
        "edit": {
            "url": "/product/edit/"
        },
        "columns": [
            {
                "data": "id",
                "type": "numeric",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            },
            {
                "data": "title",
                "type": "text",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            },
            {
                "data": "slug",
                "type": "text",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            },
            {
                "data": "price",
                "type": "numeric",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            }
        ],
        "buttons": [
            {
                "icon": "pi pi-refresh",
                "className": "success",
                "action": "restore",
                "key": "id",
            },
            {
                "icon": "pi pi-pencil",
                "className": "warning",
                "action": "edit",
                "key": "id",
            },
            {
                "icon": "pi pi-times",
                "className": "danger",
                "action": "destroy",
                "key": "id",
            },
            {
                "icon": "pi pi-times",
                "className": "danger",
                "action": "forceDestroy",
                "key": "id",
            }
        ]
    }

    constructor() {
    }

    ngOnInit() {
    }
}
