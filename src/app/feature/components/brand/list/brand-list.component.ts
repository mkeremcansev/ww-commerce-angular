import {Component} from '@angular/core';

@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html',
    styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent {
    table = {
        "url": "/brand",
        "destroy": {
            "url": "/brand/",
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
            {
                "data": "path",
                "type": "text",
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
                "url": "/brand/edit"
            },
            {
                "icon": "pi pi-times",
                "className": "danger",
                "action": "destroy",
                "key": "id",
                "url": "/brand/"
            }
        ]
    }


    constructor() {
    }

    ngOnInit() {
    }
}
