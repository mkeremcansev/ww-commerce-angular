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
                                group: 'Dashboard',
                                name: 'dashboard.index'
                            }
                        },
                        routerLink: ['/']
                    },
                    {
                        label: 'product.index',
                        icon: 'pi pi-fw pi-box',
                        data: {
                            permission: {
                                group: 'Image',
                                name: 'image.index'
                            }
                        },
                        items: [
                            {
                                label: 'create',
                                icon: 'pi pi-fw pi-plus',
                                data: {
                                    permission: {
                                        group: 'Product',
                                        name: 'product.create'
                                    }
                                },
                                routerLink: ['/product/create']
                            },
                            {
                                label: 'list',
                                icon: 'pi pi-fw pi-list',
                                data: {
                                    permission: {
                                        group: 'Product',
                                        name: 'product.index'
                                    }
                                },
                                routerLink: ['/product/list']
                            }
                        ]
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
                        label: 'category.index',
                        icon: 'pi pi-fw pi-sort-amount-up-alt',
                        data: {
                            permission: {
                                group: 'Category',
                                name: 'category.index'
                            }
                        },
                        items: [
                            {
                                label: 'create',
                                icon: 'pi pi-fw pi-plus',
                                data: {
                                    permission: {
                                        group: 'Category',
                                        name: 'category.create'
                                    }
                                },
                                routerLink: ['/category/create']
                            },
                            {
                                label: 'list',
                                icon: 'pi pi-fw pi-list',
                                data: {
                                    permission: {
                                        group: 'Category',
                                        name: 'category.index'
                                    }
                                },
                                routerLink: ['/category/list']
                            }
                        ]
                    },
                    {
                        label: 'attribute.index',
                        icon: 'pi pi-fw pi-sort-alpha-up',
                        data: {
                            permission: {
                                group: 'Attribute',
                                name: 'attribute.index'
                            }
                        },
                        items: [
                            {
                                label: 'create',
                                icon: 'pi pi-fw pi-plus',
                                data: {
                                    permission: {
                                        group: 'Attribute',
                                        name: 'attribute.create'
                                    }
                                },
                                routerLink: ['/attribute/create']
                            },
                            {
                                label: 'list',
                                icon: 'pi pi-fw pi-list',
                                data: {
                                    permission: {
                                        group: 'Attribute',
                                        name: 'attribute.index'
                                    }
                                },
                                routerLink: ['/attribute/list']
                            }
                        ]
                    },
                    {
                        label: 'attribute_value.index',
                        icon: 'pi pi-fw pi-sort-alpha-up-alt',
                        data: {
                            permission: {
                                group: 'AttributeValue',
                                name: 'attribute_value.index'
                            }
                        },
                        items: [
                            {
                                label: 'create',
                                icon: 'pi pi-fw pi-plus',
                                data: {
                                    permission: {
                                        group: 'AttributeValue',
                                        name: 'attribute_value.create'
                                    }
                                },
                                routerLink: ['/attribute/value/create']
                            },
                            {
                                label: 'list',
                                icon: 'pi pi-fw pi-list',
                                data: {
                                    permission: {
                                        group: 'AttributeValue',
                                        name: 'attribute_value.index'
                                    }
                                },
                                routerLink: ['/attribute/value/list']
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
