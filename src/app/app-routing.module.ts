import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './feature/components/notfound/notfound.component';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {PermissionGuard} from "./guard/permission/permission.guard";
import {AttributeValueModule} from "./feature/components/attribute/value/attribute-value/attribute-value.module";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./feature/components/dashboard/dashboard.module').then(m => m.DashboardModule)
                    },
                    {
                        path: 'brand',
                        canActivate: [PermissionGuard],
                        data: {
                            permission: {
                                group: 'Brand',
                                name: 'brand.index'
                            }
                        },
                        loadChildren: () => import('./feature/components/brand/brand.module').then(m => m.BrandModule)
                    },
                    {
                        path: 'category',
                        canActivate: [PermissionGuard],
                        data: {
                            permission: {
                                group: 'Category',
                                name: 'category.index'
                            }
                        },
                        loadChildren: () => import('./feature/components/category/category.module').then(m => m.CategoryModule)
                    },
                    {
                        path: 'attribute',
                        canActivate: [PermissionGuard],
                        data: {
                            permission: {
                                group: 'Attribute',
                                name: 'attribute.index'
                            }
                        },
                        loadChildren: () => import('./feature/components/attribute/attribute.module').then(m => m.AttributeModule)
                    },
                    {
                        path: 'attribute/value',
                        canActivate: [PermissionGuard],
                        data: {
                            permission: {
                                group: 'AttributeValue',
                                name: 'attribute_value.index'
                            }
                        },
                        loadChildren: () => import('./feature/components/attribute/value/attribute-value/attribute-value.module').then(m => m.AttributeValueModule)
                    },
                    {
                        path: 'media',
                        canActivate: [PermissionGuard],
                        data: {
                            permission: {
                                group: 'Media',
                                name: 'media.index'
                            }
                        },
                        loadChildren: () => import('./feature/components/media/media.module').then(m => m.MediaModule)
                    }
                ]
            },
            {
                path: 'login',
                loadChildren: () => import('./feature/components/login/login.module').then(m => m.LoginModule)
            },
            {path: 'notfound', component: NotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
