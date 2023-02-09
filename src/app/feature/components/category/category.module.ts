import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryRoutingModule} from './category-routing.module';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {CategoryCreateComponent} from "./create/category-create/category-create.component";
import {DropdownModule} from "primeng/dropdown";
import {TreeModule} from "primeng/tree";
import {TreeSelectModule} from "primeng/treeselect";
import {MediaModule} from "../media/media.module";
import { CategoryEditComponent } from './edit/category-edit/category-edit.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { CategoryListComponent } from './list/category-list/category-list.component';
import {DatatableModule} from "../../modules/datatable/datatable.module";


@NgModule({
    declarations: [
        CategoryCreateComponent,
        CategoryEditComponent,
        CategoryListComponent
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        ToastModule,
        ButtonModule,
        InputTextModule,
        ReactiveFormsModule,
        TranslateModule,
        DropdownModule,
        TreeModule,
        TreeSelectModule,
        FormsModule,
        MediaModule,
        ProgressSpinnerModule,
        DatatableModule
    ]
})
export class CategoryModule {
}
