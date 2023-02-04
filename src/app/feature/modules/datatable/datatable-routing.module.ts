import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DatatableComponent} from "./datatable/datatable.component";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: DatatableComponent
        }
    ])],
    exports: [RouterModule]
})
export class DatatableRoutingModule {
}
