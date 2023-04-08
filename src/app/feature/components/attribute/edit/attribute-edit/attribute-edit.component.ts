import {Component} from '@angular/core';
import {BrandService} from "../../../brand/service/brand.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import {AttributeService} from "../../service/attribute.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../../service/alert/alert.service";

@Component({
    selector: 'app-attribute-edit',
    templateUrl: './attribute-edit.component.html',
    styleUrls: ['./attribute-edit.component.scss']
})
export class AttributeEditComponent extends AlertService {

    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required)
    });
    public isLoading: boolean = false;
    public isSpinner: boolean = true;
    public id = Number(this.route.snapshot.paramMap.get('id'));

    /**
     * @method constructor
     * @param attributeService
     * @param messageService
     * @param route
     * @param router
     * @param redirectService
     */
    constructor(
        public attributeService: AttributeService,
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
        !isNaN(id) ? this.attributeService.edit(id).subscribe((response: any) => {
                    this.form.patchValue({
                        title: response.data.title
                    })
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
            this.attributeService.update(this.form.value, this.id).subscribe((response: any) => {
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
