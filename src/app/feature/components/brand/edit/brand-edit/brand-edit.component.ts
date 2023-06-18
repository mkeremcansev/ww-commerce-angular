import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../service/brand.service";
import {MessageService} from "primeng/api";
import {AlertService} from "../../../../../service/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as lodash from "lodash";
import {RedirectService} from 'src/app/service/redirect/redirect.service';
import {ImageIndexResponse} from "../../../media/image/entity/entity";

@Component({
    selector: 'app-brand-edit',
    templateUrl: './brand-edit.component.html',
    styleUrls: ['./brand-edit.component.scss']
})
export class BrandEditComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        media: new FormControl('', Validators.required)
    });
    public isLoading: boolean = false;
    public isSpinner: boolean = true;
    public id = Number(this.route.snapshot.paramMap.get('id'));
    public selectedImages: ImageIndexResponse[] = [];

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
                        media: response.data.media
                    })
                    response.data.media && this.selectedImages.push(response.data.media);
                    this.isSpinner = false;
                },
                (error) => {
                    this.messageService.add(this.error(error.error.message))
                    this.redirectService.redirect('/notfound', 0)
                })
            : this.redirectService.redirect('/notfound', 0);
    }

    /**
     * @method emit
     * @param event
     */
    emit(event: ImageIndexResponse[]) {
        event.length > 0 ? this.form.patchValue({media: lodash.first(event)}) : this.form.patchValue({media: ''});
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
