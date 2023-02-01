import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './feature/components/notfound/notfound.component';
import { ProductService } from './feature/service/product.service';
import { CountryService } from './feature/service/country.service';
import { CustomerService } from './feature/service/customer.service';
import { EventService } from './feature/service/event.service';
import { IconService } from './feature/service/icon.service';
import { NodeService } from './feature/service/node.service';
import { PhotoService } from './feature/service/photo.service';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
