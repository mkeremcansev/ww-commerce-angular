import {Component, ElementRef, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {LayoutService} from "./service/app.layout.service";
import {UserService} from "../service/user/user.service";
import {Router} from "@angular/router";
import {ThemeService} from "../service/theme/theme.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    public isSpinner: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    /**
     * @method constructor
     * @param userService
     * @param router
     * @param themeService
     * @param layoutService
     */
    constructor(
        public userService: UserService,
        public router: Router,
        public themeService: ThemeService,
        public layoutService: LayoutService,
    ) { }

    /**
     * @method ngOnInit
     */
    logout(){
        this.isSpinner = true;
        this.userService.logout();
    }

    profile(){
        this.router.navigate(['/user/profile']);
    }
    changeTheme(theme: string, colorScheme: string) {
        this.themeService.changeTheme(theme, colorScheme);
    }

    checkTheme() {
        return localStorage.getItem('colorScheme') ?? 'light';
    }
}
