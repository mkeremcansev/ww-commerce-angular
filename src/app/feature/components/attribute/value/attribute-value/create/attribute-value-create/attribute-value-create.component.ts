import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {RedirectService} from "../../../../../../../service/redirect/redirect.service";
import {AlertService} from "../../../../../../../service/alert/alert.service";
import * as lodash from "lodash";
import {AttributeValueService} from "../../service/attribute-value.service";
import {AttributeValueCreateResponse} from "../../entity/entity";
import {ImageIndexResponse} from "../../../../../media/image/entity/entity";

@Component({
    selector: 'app-attribute-value-create',
    templateUrl: './attribute-value-create.component.html',
    styleUrls: ['./attribute-value-create.component.scss']
})
export class AttributeValueCreateComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
        media: new FormControl('', Validators.required),
        attribute_id: new FormControl('', Validators.required),
    });

    public attributes: AttributeValueCreateResponse[] = [];
    public isLoading: boolean = false;
    public isSpinner: boolean = true;

    /**
     * @method constructor
     * @param attributeValueService
     * @param messageService
     * @param redirectService
     */
    constructor(
        public attributeValueService: AttributeValueService,
        public messageService: MessageService,
        public redirectService: RedirectService
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {
        this.setAttributes();
    }

    setAttributes() {
        this.attributeValueService.create().subscribe((response: any) => {
            this.isSpinner = false;
            this.attributes = response.data;
        }, (error: any) => {
            this.messageService.add(this.error(error.error.message))
        });
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.attributeValueService.store(this.form.value).subscribe((response: any) => {
                this.messageService.add(this.success(response.message))
                this.form.disable();
                this.redirectService.redirect('/attribute/value/edit/' + response.data.id, 3);
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
    emit(event: ImageIndexResponse[]) {
        event.length > 0 ? this.form.patchValue({media: lodash.first(event)}) : this.form.patchValue({media: ''});
    }
}
