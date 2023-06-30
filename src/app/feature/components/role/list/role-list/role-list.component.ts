import { Component } from '@angular/core';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {
    public table = {
        "title": "role.list",
        "url": "/role",
        "destroy": {
            "url": "/role/",
        },
        "restore": {
            "url": "/role/restore"
        },
        "forceDestroy": {
            "url": "/role/forceDelete"
        },
        "edit": {
            "url": "/role/edit/"
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
                "data": "name",
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

    constructor() {
    }

    ngOnInit() {
    }
}
