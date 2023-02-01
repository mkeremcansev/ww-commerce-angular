import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    /**
     * @var form
     */
    public form : FormGroup = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    /**
     * @var appName
     */
    public appName: string = environment.appName;

    /**
     * @var isLoading
     */
    public isLoading: boolean = false;

    /**
     * @param layoutService
     * @param authService
     */
    constructor(
        public layoutService: LayoutService,
        public authService: AuthService
    ) { }

    formInit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.authService.authorization(this.form.value).subscribe((response: any) => {
                this.isLoading = false;
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
