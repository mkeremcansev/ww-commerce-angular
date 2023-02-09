import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../service/brand.service";
import {MessageService} from "primeng/api";
import {AlertService} from "../../../../../service/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import { RedirectService } from 'src/app/service/redirect/redirect.service';

@Component({
    selector: 'app-brand-edit',
    templateUrl: './brand-edit.component.html',
    styleUrls: ['./brand-edit.component.scss'],
    providers: [MessageService]
})
export class BrandEditComponent extends AlertService {
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
    public isLoading: boolean = false;

    /**
     * @var isSpinner
     */
    public isSpinner: boolean = true;

    public id = Number(this.route.snapshot.paramMap.get('id'));
    public selectedImages: string[] = [];

    /**
     * @param brandService
     * @param messageService
     * @param route
     * @param router
     * @param redirectService
     */
    constructor(
        public brandService: BrandService,
        public messageService: MessageService,
        public route: ActivatedRoute,
        public router: Router,
        public redirectService: RedirectService
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {
        this.setValue(this.id);
    }

    /**
     * @param id
     */
    setValue(id: number) {
        !isNaN(id) ? this.brandService.edit(id).subscribe((response: any) => {
                    this.form.patchValue({
                        title: response.data.title,
                        path: response.data.path
                    })
                    this.selectedImages.push(response.data.path);
                    this.isSpinner = false;
                },
                () => {
                    this.redirectService.redirect('/notfound', 0);
                })
            : this.redirectService.redirect('/notfound', 0);
    }

    /**
     * @method emit
     * @param event
     */
    emit(event: string[]) {
        event.length > 0 ? this.form.patchValue({path: _.first(event)}) : this.form.patchValue({path: ''});
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.brandService.update(this.form.value, this.id).subscribe((response: any) => {
                    this.messageService.add(this.success(response.message));
                    this.isLoading = false;
                },
                (error: any) => {
                    this.messageService.add(this.error(error.error.message));
                    this.isLoading = false;
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
