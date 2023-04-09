import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserProfileService} from "../../service/user-profile.service";
import {MessageService} from "primeng/api";
import {AlertService} from "../../../../../../../service/alert/alert.service";

@Component({
    selector: 'app-user-profile-edit',
    templateUrl: './user-profile-edit.component.html',
    styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        old_password: new FormControl('', Validators.required),
        new_password: new FormControl('', Validators.required),
        new_password_confirmation: new FormControl('', Validators.required),
    });

    public isLoading: boolean = false;
    public isSpinner: boolean = true;

    /**
     * @method constructor
     * @param userProfileService
     * @param messageService
     */
    constructor(
        public userProfileService: UserProfileService,
        public messageService: MessageService
    ) {
        super();
    }

    ngOnInit() {
        this.userProfileService.edit().subscribe(response => {
            this.form.patchValue({
                name: response.name,
                email: response.email
            });
            this.isSpinner = false;
        })
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.userProfileService.update(this.form.value).subscribe((response: any) => {
                this.messageService.add(this.success(response.message))
                this.isLoading = false;
            }, (error: any) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message))
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
