import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../service/brand.service";
import {MessageService} from "primeng/api";
import {AlertService} from "../../../../../service/alert/alert.service";
import {Router} from "@angular/router";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import * as _ from 'lodash';

@Component({
    selector: 'app-brand-create',
    templateUrl: './brand-create.component.html',
    styleUrls: ['./brand-create.component.scss']
})
export class BrandCreateComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        path: new FormControl('', Validators.required)
    });
    public isLoading: boolean = false;

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
            this.isLoading = true;
            this.brandService.store(this.form.value).subscribe((response: any) => {
                this.messageService.add(this.success(response.message))
                this.form.disable();
                this.redirectService.redirect('/brand/edit/' + response.data.id, 3);
            }, (error: any) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message))
            });
        } else {
            this.form.markAllAsTouched();
        }
    }

    /**
     * @method emit
     * @param event
     */
    emit(event: string[]) {
        event.length > 0 ? this.form.patchValue({path: _.first(event)}) : this.form.patchValue({path: ''});
    }
}
