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
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptor } from './layout/interceptor/auth.interceptor';
import { BrandCreateComponent } from './feature/components/brand/create/brand-create/brand-create.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";

/**
 * @param httpClient
 * @constructor
 */
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, BrandCreateComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
        ToastModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
