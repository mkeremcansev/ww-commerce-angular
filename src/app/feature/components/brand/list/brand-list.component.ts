import {Component} from '@angular/core';
@Component({
    selector: 'app-brand-list',
    templateUrl: './brand-list.component.html',
    styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent {
    table = {
        "url":"/brand",
        "destroy": {
            "url": "/brand/",
        },
        "columns": [
            {
                "data": "id",
                "type":"numeric",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            },
            {
                "data": "title",
                "type":"text",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            },
            {
                "data": "slug",
                "type":"text",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            },
            {
                "data": "path",
                "type":"text",
                "name": "",
                "orderable": true,
                "search": {
                    "regex": false,
                    "value": null
                }
            }
        ],
        "order": [
            {
                "column": 0,
                "dir": "desc"
            }
        ]
    }


    constructor(
    ) {
    }

    ngOnInit() {
    }
}
