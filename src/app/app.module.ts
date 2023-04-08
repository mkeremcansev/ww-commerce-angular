import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {NotfoundComponent} from './feature/components/notfound/notfound.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthInterceptor} from './layout/interceptor/auth.interceptor';
import {BrandCreateComponent} from './feature/components/brand/create/brand-create/brand-create.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import {MediaModule} from "./feature/components/media/media.module";

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
        ToastModule,
        TableModule,
        RippleModule,
        MediaModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
