import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService, TreeNode} from "primeng/api";
import {Router} from "@angular/router";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import {CategoryService} from "../../service/category.service";
import {AlertService} from "../../../../../service/alert/alert.service";
import {CategoryCreateResponse, CategorySelectedItem} from "../../entity/entity";
import * as lodash from "lodash";
import {ImageIndexResponse} from "../../../media/image/entity/entity";

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.scss']
})

export class CategoryCreateComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        category_id: new FormControl('', Validators.nullValidator),
        media: new FormControl('', Validators.required)
    });
    public isLoading: boolean = false;
    public isSpinner: boolean = true;
    public tree: TreeNode[] = [];
    public selected: TreeNode = {};

    /**
     * @param categoryService
     * @param messageService
     * @param router
     * @param redirectService
     */
    constructor(
        public categoryService: CategoryService,
        public messageService: MessageService,
        public router: Router,
        public redirectService: RedirectService
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {
        this.setTree();
    }

    /**
     * @method setTree
     */
    setTree() {
        this.categoryService.create().subscribe((response: any) => {
            this.isSpinner = false;
            this.tree = this.format(response.data);
        });
    }

    /**
     * @method format
     * @param categories
     */
    format(categories: CategoryCreateResponse[]): any {
        return categories.map((category: CategoryCreateResponse) => {
            return {
                key: category.id,
                label: category.title,
                data: category,
                children: this.format(category.parents)
            }
        });
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
            this.form.patchValue({category_id: this.selected?.data?.id ?? null});
            this.categoryService.store(this.form.value).subscribe((response: any) => {
                this.messageService.add(this.success(response.message))
                this.form.disable();
                this.redirectService.redirect('/category/edit/' + response.data.id, 3);
            }, (error: any) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message))
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
