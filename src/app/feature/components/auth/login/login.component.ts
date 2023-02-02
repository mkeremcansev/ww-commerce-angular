import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../auth.service";
import {MessageService} from "primeng/api";
import {LocalStorageService} from "../../../../service/storage/local-storage.service";
import {AlertService} from "../../../../service/alert/alert.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService]

})
export class LoginComponent extends AlertService{

    /**
     * @var form
     */
    public form: FormGroup = new FormGroup({
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
     * @param messageService
     * @param localStorageService
     */
    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public messageService: MessageService,
        public localStorageService: LocalStorageService
    ) {
        super();
    }

    formInit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.authService.authorization(this.form.value).subscribe((response: any) => {
                this.isLoading = false;
                this.localStorageService.setItems({
                    'token': response.data.token,
                    'permissions': JSON.stringify(response.data.permissions),
                    'user': JSON.stringify(response.data.user)
                });
                this.messageService.add(this.success(response.message));
            }, (error) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message));
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
