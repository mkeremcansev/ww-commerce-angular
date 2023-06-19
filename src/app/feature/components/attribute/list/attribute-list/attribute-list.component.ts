import {Component} from '@angular/core';

@Component({
    selector: 'app-attribute-list',
    templateUrl: './attribute-list.component.html',
    styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent {
    public table = {
        "title": "attribute.list",
        "url": "/attribute",
        "destroy": {
            "url": "/attribute/",
        },
        "restore": {
            "url": "/attribute/restore"
        },
        "forceDestroy": {
            "url": "/attribute/forceDelete"
        },
        "edit": {
            "url": "/attribute/edit/"
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
