import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../service/role.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import {AlertService} from "../../../../../service/alert/alert.service";
import * as lodash from "lodash";

@Component({
    selector: 'app-role-edit',
    templateUrl: './role-edit.component.html',
    styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        permission_id: new FormControl([], Validators.nullValidator)
    });

    public isLoading: boolean = false;
    public permissionsByGroupName: {} = {};
    public selectedPermissions: number[] = [];
    public isSpinner: boolean = true;
    public id = Number(this.route.snapshot.paramMap.get('id'));

    /**
     * Constructor
     * @param roleService
     * @param messageService
     * @param router
     * @param redirectService
     * @param route
     */
    constructor(
        public roleService: RoleService,
        public messageService: MessageService,
        public router: Router,
        public redirectService: RedirectService,
        public route: ActivatedRoute
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
        !isNaN(id) ? this.roleService.edit(id).subscribe((response: any) => {
                    this.permissionsByGroupName = lodash.groupBy(response.permission_id, 'group_name');
                    const permissions = response.permissions.map((item: any) => item.id);
                    this.form.patchValue({
                        name: response.name,
                        permission_id: permissions
                    })
                    this.selectedPermissions = permissions;
                    this.isSpinner = false;
                },
                (error) => {
                    this.messageService.add(this.error(error.error.message))
                    this.redirectService.redirect('/notfound', 0)
                })
            : this.redirectService.redirect('/notfound', 0);
    }

    /**
     *@method onChange
     * @param id
     */
    onChange( id: number) {
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
            this.roleService.update(this.form.value, this.id).subscribe(response => {
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
