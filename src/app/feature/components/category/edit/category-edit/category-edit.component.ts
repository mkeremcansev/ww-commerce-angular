import {Component} from '@angular/core';
import {MessageService, TreeNode} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import {CategoryService} from "../../service/category.service";
import {AlertService} from "../../../../../service/alert/alert.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as _ from "lodash";
import {CategoryCreateResponse} from "../../entity/entity";

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.scss'],
    providers: [MessageService]
})
export class CategoryEditComponent extends AlertService {
    public isLoading: boolean = false;
    public isSpinner: boolean = true;
    public id = Number(this.route.snapshot.paramMap.get('id'));
    public selectedImages: string[] = [];
    public tree: TreeNode[] = [];
    public selected: TreeNode = {};

    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        category_id: new FormControl('', Validators.nullValidator),
        path: new FormControl('', Validators.required)
    });

    /**
     * @param categoryService
     * @param messageService
     * @param route
     * @param router
     * @param redirectService
     */
    constructor(
        public categoryService: CategoryService,
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
     * @method setValue
     * @param id
     */
    setValue(id: number) {
        !isNaN(id) ? this.categoryService.edit(id).subscribe((response: any) => {
                    this.form.patchValue({
                        title: response.data.title,
                        category_id: response.data.category_id,
                        path: response.data.path
                    })
                    this.selectedImages.push(response.data.path);
                    this.tree = this.format(response.data.categories);
                    this.isSpinner = false;
                    this.selected = this.deepSearch(this.tree, response.data.category_id);
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
     * @method deepSearch
     * @param tree
     * @param id
     */
    deepSearch(tree: any[], id: number): any {
        for (const item of tree) {
            if (item.key === id) return item;
            if (item.children) {
                const result = this.deepSearch(item.children, id);
                if (result) return result;
            }
        }
    }

    /**
     * @method submit
     */
    submit() {
        if (this.form.valid) {
            this.isLoading = true;
            this.form.patchValue({category_id: this.selected?.data?.id ?? null});
            this.categoryService.update(this.form.value, this.id).subscribe((response: any) => {
                this.messageService.add(this.success(response.message));
                this.isLoading = false;
                this.form.patchValue({category_id: this.deepSearch(this.tree, Number(this.selected) ?? null)});
            }, (error: any) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message))
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
