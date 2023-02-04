import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../service/brand.service";
import {MessageService} from "primeng/api";
import {AlertService} from "../../../../../service/alert/alert.service";
import {Router} from "@angular/router";
import {RedirectService} from "../../../../../service/redirect/redirect.service";

@Component({
    selector: 'app-brand-create',
    templateUrl: './brand-create.component.html',
    styleUrls: ['./brand-create.component.scss'],
    providers: [MessageService]
})
export class BrandCreateComponent extends AlertService {
    /**
     * @var form
     */
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        path: new FormControl('', Validators.required)
    });

    /**
     * @var isLoading
     */
    public isButton: boolean = false;

    /**
     * @param brandService
     * @param messageService
     * @param router
     * @param redirectService
     */
    constructor(
        public brandService: BrandService,
        public messageService: MessageService,
        public router: Router,
        public redirectService: RedirectService
    ) {
        super();
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isButton = true;
            this.brandService.store(this.form.value).subscribe((response: any) => {
                this.messageService.add(this.success(response.message))
                this.form.disable();
                this.redirectService.redirect('/brand/edit/' + response.data.id, 3);
            }, (error: any) => {
                this.isButton = false;
                this.messageService.add(this.error(error.error.message))
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
