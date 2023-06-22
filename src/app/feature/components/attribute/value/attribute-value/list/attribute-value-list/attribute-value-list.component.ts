import {Component} from '@angular/core';

@Component({
    selector: 'app-attribute-value-list',
    templateUrl: './attribute-value-list.component.html',
    styleUrls: ['./attribute-value-list.component.scss']
})
export class AttributeValueListComponent {
    public table = {
        "title": "attribute_value.list",
        "url": "/attribute/value",
        "destroy": {
            "url": "/attribute/value/",
        },
        "restore": {
            "url": "/attribute/value/restore"
        },
        "forceDestroy": {
            "url": "/attribute/value/forceDelete"
        },
        "edit": {
            "url": "/attribute/value/edit/"
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
                "data": "code",
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
