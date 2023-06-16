import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {AppTopBarComponent} from "./layout/app.topbar.component";
import {ThemeService} from "./service/theme/theme.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        public themeService: ThemeService
    ) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        const theme = localStorage.getItem('theme');
        const colorScheme = localStorage.getItem('colorScheme');
        this.themeService.changeTheme(theme ?? 'lara-light-indigo', colorScheme ?? 'light');
    }
}
