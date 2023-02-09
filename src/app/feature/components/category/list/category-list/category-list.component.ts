import { Component } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
    table = {
        "title":"category.list",
        "url": "/category",
        "destroy": {
            "url": "/category/",
        },
        "edit": {
            "url": "/category/edit/"
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
                "url": "/category/edit"
            },
            {
                "icon": "pi pi-times",
                "className": "danger",
                "action": "destroy",
                "key": "id",
                "url": "/category/"
            }
        ]
    }
    constructor() {
    }

    ngOnInit() {

    }
}
