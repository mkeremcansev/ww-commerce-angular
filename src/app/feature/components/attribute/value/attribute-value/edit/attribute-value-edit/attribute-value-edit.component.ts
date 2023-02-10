import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AttributeValueCreateResponse} from "../../entity/entity";
import {AlertService} from "../../../../../../../service/alert/alert.service";
import {MessageService} from "primeng/api";
import {AttributeValueService} from "../../service/attribute-value.service";
import {RedirectService} from "../../../../../../../service/redirect/redirect.service";
import {ActivatedRoute} from '@angular/router';
import * as _ from "lodash";

@Component({
    selector: 'app-attribute-value-edit',
    templateUrl: './attribute-value-edit.component.html',
    styleUrls: ['./attribute-value-edit.component.scss'],
    providers: [MessageService]
})
export class AttributeValueEditComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        path: new FormControl('', Validators.required),
        attribute_id: new FormControl('', Validators.required),
    });

    public attributes: AttributeValueCreateResponse[] = [];
    public isLoading: boolean = false;
    public isSpinner: boolean = true;
    public id = Number(this.route.snapshot.paramMap.get('id'));
    public selectedImages: string[] = [];

    /**
     * @method constructor
     * @param attributeValueService
     * @param messageService
     * @param redirectService
     * @param route
     */
    constructor(
        public attributeValueService: AttributeValueService,
        public messageService: MessageService,
        public redirectService: RedirectService,
        public route: ActivatedRoute
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
     * @method setValue
     * @param id
     */
    setValue(id: number) {
        !isNaN(id) ? this.attributeValueService.edit(id).subscribe((response: any) => {
                    this.form.patchValue({
                        title: response.data.title,
                        code: response.data.code,
                        path: response.data.path,
                        attribute_id: response.data.attribute_id
                    })
                    this.attributes = response.data.attributes
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
            this.attributeValueService.update(this.form.value, this.id).subscribe((response: any) => {
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
