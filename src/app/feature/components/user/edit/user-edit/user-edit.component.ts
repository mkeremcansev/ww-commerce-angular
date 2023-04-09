import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import {UserService} from "../../service/user.service";
import {UserEditRoleResponse} from "../../entity/entity";
import {AlertService} from "../../../../../service/alert/alert.service";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        name: new FormControl('', Validators.required),
        role_id: new FormControl([], Validators.required),
    });
    public isLoading: boolean = false;
    public isSpinner: boolean = false;
    public id = Number(this.route.snapshot.paramMap.get('id'));
    public roles: UserEditRoleResponse[] = [];


    /**
     * @method constructor
     * @param userService
     * @param messageService
     * @param route
     * @param router
     * @param redirectService
     */
    constructor(
        public userService: UserService,
        public messageService: MessageService,
        public route: ActivatedRoute,
        public router: Router,
        public redirectService: RedirectService
    ) {
        super();
    }

    ngOnInit() {
        this.setValue(this.id);
    }

    /**
     * @param id
     */
    setValue(id: number) {
        !isNaN(id) ? this.userService.edit(id).subscribe((response: any) => {
                    this.roles = response.role_id;
                    this.form.patchValue({
                        name: response.name,
                        email: response.email,
                        role_id: response.roles
                    });
                    this.isSpinner = false;
                },
                () => {
                    this.redirectService.redirect('/notfound', 0);
                })
            : this.redirectService.redirect('/notfound', 0);
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            const role_id = this.form.value.role_id;
            this.form.patchValue({
                role_id: this.form.value.role_id.map((item: UserEditRoleResponse) => item.id)
            });
            this.userService.update(this.form.value, this.id).subscribe((response: any) => {
                    this.form.patchValue({
                        role_id: role_id
                    });
                    this.messageService.add(this.success(response.message));
                    this.isLoading = false;
                },
                (error: any) => {
                    this.form.patchValue({
                        role_id: role_id
                    });
                    this.messageService.add(this.error(error.error.message));
                    this.isLoading = false;
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
