import {Component} from '@angular/core';
import {CouponService} from "../../service/coupon.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import {AlertService} from "../../../../../service/alert/alert.service";
import {CouponTypeAndStatus} from "../../entity/entity";

@Component({
    selector: 'app-coupon-create',
    templateUrl: './coupon-create.component.html',
    styleUrls: ['./coupon-create.component.scss']
})
export class CouponCreateComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        code: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        value: new FormControl('', Validators.required),
        usage_limit: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        expired_at: new FormControl('', Validators.required),
    });

    public statuses: CouponTypeAndStatus[] = [];
    public types: CouponTypeAndStatus[] = [];
    public isLoading: boolean = false;
    public isSpinner: boolean = true;

    /**
     * @method constructor
     * @param couponService
     * @param messageService
     * @param redirectService
     */
    constructor(
        public couponService: CouponService,
        public messageService: MessageService,
        public redirectService: RedirectService
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {
        this.couponService.create().subscribe((response: any) => {
            this.statuses = response.statuses.map((status: string, index: number) => {
                return {id: index, title: status};
            });
            this.types = response.types.map((type: string, index: number) => {
                return {id: index, title: type};
            });
            this.isSpinner = false;
        });
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.couponService.store(this.form.value).subscribe((response: any) => {
                this.messageService.add(this.success(response.message))
                this.form.disable();
                this.redirectService.redirect('/coupon/edit/' + response.data.id, 3);
            }, (error: any) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message))
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
