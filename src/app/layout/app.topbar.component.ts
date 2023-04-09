import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {UserService} from "../service/user/user.service";
import {Router} from "@angular/router";

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
     * @param layoutService
     * @param userService
     * @param router
     */
    constructor(
        public layoutService: LayoutService,
        public userService: UserService,
        public router: Router
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
}
