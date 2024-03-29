import { Component } from '@angular/core';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent {
    public table = {
        "title": "coupon.list",
        "url": "/coupon",
        "destroy": {
            "url": "/coupon/",
        },
        "restore": {
            "url": "/coupon/restore"
        },
        "forceDestroy": {
            "url": "/coupon/forceDelete"
        },
        "edit": {
            "url": "/coupon/edit/"
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
                "data": "code",
                "type": "text",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            },
            {
                "data": "value",
                "type": "numeric",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            },
            {
                "data": "usage_limit",
                "type": "numeric",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            },
            {
                "data": "expired_at",
                "type": "date",
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
                "icon": "pi pi-refresh",
                "className": "success",
                "action": "restore",
                "key": "id",
            },
            {
                "icon": "pi pi-trash",
                "className": "danger",
                "action": "forceDestroy",
                "key": "id",
            }
        ]
    }

    /**
     * @method constructor
     */
    constructor() {
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {

    }
}
