import {Component} from '@angular/core';
import {SettingService} from "../../service/setting.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as lodash from "lodash";
import {AlertService} from "../../../../../service/alert/alert.service";
import {MessageService} from "primeng/api";
import {ImageIndexResponse} from "../../../media/image/entity/entity";

@Component({
    selector: 'app-setting-update',
    templateUrl: './setting-update.component.html',
    styleUrls: ['./setting-update.component.scss']
})
export class SettingUpdateComponent extends AlertService {

    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        keywords: new FormControl('', Validators.required),
        default_image_mime_type: new FormControl('', Validators.required),
        logo: new FormControl('', Validators.required),
        favicon: new FormControl('', Validators.required),
    });
    public mimeTypes: { value: number; title: string }[] = [];
    public isLoading: boolean = false;
    public isSpinner: boolean = true;
    public selectedLogo: ImageIndexResponse[] = [];
    public selectedFavicon: ImageIndexResponse[] = [];

    /**
     * @method constructor
     */
    constructor(public settingService: SettingService, public messageService: MessageService,) {
        super();
    }

    ngOnInit(): void {
        this.setData();
    }

    setData() {
        this.settingService.edit().subscribe((res) => {
            this.form.patchValue({
                title: res.data.title,
                description: res.data.description,
                keywords: res.data.keywords,
                default_image_mime_type: res.data.default_image_mime_type,
                logo: res.data.logo,
                favicon: res.data.favicon,
            })
            this.mimeTypes = lodash.map(res.mime_types, (value, key) => {
                return {
                    value: key,
                    title: value
                }
            });
            this.selectedLogo = res.data.logo ? [res.data.logo] : [];
            this.selectedFavicon = res.data.favicon ? [res.data.favicon] : [];
            this.isSpinner = false;
        });
    }

    /**
     * @method logoEmit
     * @param event
     */
    logoEmit(event: ImageIndexResponse[]) {
        event.length > 0 ? this.form.patchValue({logo: lodash.first(event)}) : this.form.patchValue({logo: ''});
    }

    /**
     * @method faviconEmit
     * @param event
     */
    faviconEmit(event: ImageIndexResponse[]) {
        event.length > 0 ? this.form.patchValue({favicon: lodash.first(event)}) : this.form.patchValue({favicon: ''});
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.settingService.update(this.form.value).subscribe((response) => {
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
