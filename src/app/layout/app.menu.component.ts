import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        public translate: TranslateService
    ) {
    }

    ngOnInit() {
        this.model = [
            {
                items: [
                    {
                        label: 'dashboard',
                        icon: 'pi pi-fw pi-home',
                        data: {
                            permission: {
                                group: 'Attribute',
                                name: 'attribute.index'
                            }
                        },
                        routerLink: ['/']
                    },
                    {
                        label: 'brand.index',
                        icon: 'pi pi-fw pi-globe',
                        data: {
                            permission: {
                                group: 'Brand',
                                name: 'brand.index'
                            }
                        },
                        items: [
                            {
                                label: 'create',
                                icon: 'pi pi-fw pi-plus',
                                data: {
                                    permission: {
                                        group: 'Brand',
                                        name: 'brand.create'
                                    }
                                },
                                routerLink: ['/brand/create']
                            },
                            {
                                label: 'list',
                                icon: 'pi pi-fw pi-list',
                                data: {
                                    permission: {
                                        group: 'Brand',
                                        name: 'brand.index'
                                    }
                                },
                                routerLink: ['/brand/list']
                            }
                        ]
                    },
                    {
                        label: 'media.index',
                        icon: 'pi pi-fw pi-book',
                        data: {
                            permission: {
                                group: 'Media',
                                name: 'media.index'
                            }
                        },
                        items: [
                            {
                                label: 'image.index',
                                icon: 'pi pi-fw pi-image',
                                data: {
                                    permission: {
                                        group: 'Image',
                                        name: 'image.index'
                                    }
                                },
                                items: [
                                    {
                                        label: 'upload',
                                        icon: 'pi pi-fw pi-plus',
                                        data: {
                                            permission: {
                                                group: 'Image',
                                                name: 'image.upload'
                                            }
                                        },
                                        routerLink: ['/media/image/upload']
                                    },
                                    {
                                        label: 'list',
                                        icon: 'pi pi-fw pi-list',
                                        data: {
                                            permission: {
                                                group: 'Image',
                                                name: 'image.index'
                                            }
                                        },
                                        routerLink: ['/media/image/list']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
