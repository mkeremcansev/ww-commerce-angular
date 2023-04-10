import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../../service/alert/alert.service";
import {CouponService} from "../../service/coupon.service";
import {MessageService} from "primeng/api";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import {ActivatedRoute} from "@angular/router";
import {CouponTypeAndStatus} from "../../entity/entity";

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.scss']
})
export class CouponEditComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        code: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
        usage_limit: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        expired_at: new FormControl('', Validators.required),
    });

    public id = Number(this.route.snapshot.paramMap.get('id'));
    public statuses: CouponTypeAndStatus[] = [];
    public types: CouponTypeAndStatus[] = [];
    public isLoading: boolean = false;
    public isSpinner: boolean = true;

    /**
     * @method constructor
     * @param couponService
     * @param messageService
     * @param redirectService
     * @param route
     */
    constructor(
        public couponService: CouponService,
        public messageService: MessageService,
        public redirectService: RedirectService,
        public route: ActivatedRoute
    ) {
        super();
    }

    ngOnInit() {
        this.setValue(this.id);
    }

    setValue(id: number) {
        !isNaN(id) ? this.couponService.edit(id).subscribe((response) => {
            this.statuses = response.statuses.map((status: string, index: number) => {
                return {id: index, title: status};
            });
            this.types = response.types.map((type: string, index: number) => {
                return {id: index, title: type};
            });
            this.form.patchValue({
                code: response.code,
                type: response.type,
                value: response.value,
                usage_limit: response.usage_limit,
                status: response.status,
                expired_at: response.expired_at,
            });
            this.isSpinner = false;
        }) : this.redirectService.redirect('/notfound', 0);
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.couponService.update(this.form.value, this.id).subscribe((response: any) => {
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
