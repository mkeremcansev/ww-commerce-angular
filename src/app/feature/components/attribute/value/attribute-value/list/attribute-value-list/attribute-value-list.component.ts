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
                "url": "/attribute/value/edit"
            },
            {
                "icon": "pi pi-times",
                "className": "danger",
                "action": "destroy",
                "key": "id",
                "url": "/attribute/value"
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
