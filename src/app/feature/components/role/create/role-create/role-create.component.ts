import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../service/role.service";
import * as lodash from "lodash";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import {AlertService} from "../../../../../service/alert/alert.service";

@Component({
    selector: 'app-role-create',
    templateUrl: './role-create.component.html',
    styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        permission_id: new FormControl([], Validators.nullValidator)
    });

    public isLoading: boolean = false;
    public permissionsByGroupName: {} = {};
    public selectedPermissions: number[] = [];
    public isSpinner: boolean = true;

    /**
     * Constructor
     * @param roleService
     * @param messageService
     * @param router
     * @param redirectService
     */
    constructor(
        public roleService: RoleService,
        public messageService: MessageService,
        public router: Router,
        public redirectService: RedirectService
    ) {
        super();
    }

    ngOnInit() {
        this.roleService.create().subscribe(response => {
            this.permissionsByGroupName = lodash.groupBy(response.permission_id, 'group_name');
            this.isSpinner = false;
        });
    }

    /**
     *@method onChange
     * @param id
     */
    onChange(id: number) {
        if (lodash.includes(this.selectedPermissions, id)) {
            lodash.pull(this.selectedPermissions, id);
        } else {
            this.selectedPermissions.push(id);
        }
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.form.patchValue({
                permission_id: this.selectedPermissions
            });
            this.roleService.store(this.form.value).subscribe(response => {
                this.messageService.add(this.success(response.message))
                this.form.disable();
                this.redirectService.redirect('/role/edit/' + response.data.id, 3);
            }, (error: any) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message))
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
