import {Component} from '@angular/core';
import {AlertService} from "../../../../service/alert/alert.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {AuthService} from "../service/auth.service";
import {MessageService} from "primeng/api";
import {LocalStorageService} from "../../../../service/storage/local-storage.service";
import {RedirectService} from "../../../../service/redirect/redirect.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends AlertService {
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
     * @param redirectService
     */
    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public messageService: MessageService,
        public localStorageService: LocalStorageService,
        public redirectService: RedirectService
    ) {
        super();
    }

    ngOnInit() {
        this.localStorageService.removeItems(['token', 'permissions', 'user']);
    }

    /**
     * @method formInit
     */
    formInit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.authService.authorization(this.form.value).subscribe((response: any) => {
                this.localStorageService.setItems({
                    'token': response.data.token,
                    'permissions': JSON.stringify(response.data.permissions),
                    'user': JSON.stringify(response.data.user)
                });
                this.messageService.add(this.success(response.message));
                this.form.disable();
                this.redirectService.redirect('/', 3);
            }, (error) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message));
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
