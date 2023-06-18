import {Component} from '@angular/core';

@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html',
    styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent {
    public table = {
        "title": "brand.list",
        "url": "/brand",
        "destroy": {
            "url": "/brand/",
        },
        "restore": {
            "url": "/brand/restore"
        },
        "forceDestroy": {
            "url": "/brand/forceDelete"
        },
        "edit": {
            "url": "/brand/edit/"
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
                "icon": "pi pi-trash",
                "className": "danger",
                "action": "forceDestroy",
                "key": "id",
            },
            {
                "icon": "pi pi-refresh",
                "className": "success",
                "action": "restore",
                "key": "id",
            }
        ]
    }


    constructor() {
    }

    ngOnInit() {
    }
}
