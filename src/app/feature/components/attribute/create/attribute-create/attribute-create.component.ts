import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AttributeService} from "../../service/attribute.service";
import {MessageService} from "primeng/api";
import {AlertService} from "../../../../../service/alert/alert.service";
import {RedirectService} from "../../../../../service/redirect/redirect.service";

@Component({
    selector: 'app-attribute-create',
    templateUrl: './attribute-create.component.html',
    styleUrls: ['./attribute-create.component.scss'],
    providers: [MessageService]
})
export class AttributeCreateComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required)
    });

    public isLoading: boolean = false;

    constructor(
        public attributeService: AttributeService,
        public messageService: MessageService,
        public redirectService: RedirectService
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {

    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.attributeService.store(this.form.value).subscribe((response: any) => {
                this.messageService.add(this.success(response.message))
                this.form.disable();
                this.redirectService.redirect('/attribute/edit/' + response.data.id, 3);
            }, (error: any) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message))
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
