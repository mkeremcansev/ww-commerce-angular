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
                "url": "/attribute/edit"
            },
            {
                "icon": "pi pi-times",
                "className": "danger",
                "action": "destroy",
                "key": "id",
                "url": "/attribute/"
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
