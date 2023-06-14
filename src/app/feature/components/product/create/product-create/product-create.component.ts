import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {
    CombinationAttributeValue,
    ProductCreateResponse,
    ProductCreateResponseStatusFormat
} from "../../entity/entity";
import {MultiSelect} from "primeng/multiselect";
import {first} from "lodash";
import {MessageService, TreeNode} from "primeng/api";
import {CategoryCreateResponse} from "../../../category/entity/entity";
import {AlertService} from "../../../../../service/alert/alert.service";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import * as _ from "lodash";
import {ImageIndexResponse} from "../../../media/image/entity/entity";

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        brand_id: new FormControl('', Validators.required),
        category_id: new FormControl('', Validators.required),
        variants: new FormArray([]),
        status: new FormControl('', Validators.required),
        variant_status: new FormControl(true, Validators.required),
        media: new FormControl([], Validators.nullValidator)
    });

    public matchSelectedCategories: TreeNode[] = [];
    public selectedAttributes: any[] = [];
    public variationCombinations: CombinationAttributeValue[][] = [];
    public isVariation: boolean = true;
    public tree: TreeNode[] = [];
    public selectedCategories: TreeNode[] = [];
    public attributes: ProductCreateResponse['attribute_id'] = [];
    public brands: ProductCreateResponse['brand_id'] = [];
    public statuses: ProductCreateResponseStatusFormat[] = [];
    public isLoading: boolean = false;
    public isSpinner: boolean = true;
    public isVariant: boolean = true;
    public isVariationReset: boolean = false;
    public selectedImages: ImageIndexResponse[] = [];

    /**
     * @method constructor
     * @param productService
     * @param messageService
     * @param redirectService
     */
    constructor(
        public productService: ProductService,
        public messageService: MessageService,
        public redirectService: RedirectService
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {
        this.setData();
    }

    /**
     * @method setData
     */
    setData() {
        this.productService.create().subscribe((response) => {
            this.attributes = response.attribute_id;
            this.brands = response.brand_id;
            this.statuses = response.status.map((status, index) => {
                return {id: index, title: status};
            });
            this.tree = this.format(response.category_id);
            this.isSpinner = false;
        })
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
     * @method variants
     */
    get variants(): FormArray {
        return this.form.get('variants') as FormArray;
    }

    /**
     * @method resetVariant
     */
    resetVariant() {
        this.variants.controls = [];
        this.isVariationReset = true;
        this.isVariation = true;
    }

    /**
     * @method setCombination
     */
    setCombination() {
        this.variationCombinations = this.combinations(this.selectedAttributes);
        this.selectedAttributes = [];
        this.variationCombinations.forEach((item: CombinationAttributeValue[]) => {
            const modifiedItem = item.map((value: CombinationAttributeValue) => {
                const attributeValueId = {...value};
                (attributeValueId as any).attribute_value_id = attributeValueId.id;
                delete (attributeValueId as any).id;
                return attributeValueId;
            });
            (this.form.get('variants') as FormArray).push(new FormGroup({
                attributes: new FormControl(modifiedItem),
                price: new FormControl(0, Validators.required),
                stock: new FormControl(0, Validators.required),
            }));
        });
        this.isVariationReset = false;
        this.isVariation = false;
    }

    /**
     * @method onChange
     * @param event
     */
    onChange(event: MultiSelect) {
        this.selectedAttributes.push(event.value);
        const group: Record<string, any[]> = {};

        for (let attribute of this.selectedAttributes) {
            for (let item of attribute) {
                if (!group[item.attribute_id]) {
                    group[item.attribute_id] = [item];
                } else {
                    group[item.attribute_id].push(item);
                }
            }
        }
        const filter: { [key: string]: any[] } = {};
        for (const [attributeId, values] of Object.entries(group)) {
            filter[attributeId] = [...new Set(values.flat())];
        }
        this.selectedAttributes = Object.values(filter);
    }

    /**
     * @method generateCombination
     * @param data
     * @param current
     * @param result
     */
    generateCombination(data: string | any[], current: any[], result: any[][]) {
        if (!data.length) {
            result.push(current);
            return;
        }
        for (const item of first(data)) {
            this.generateCombination(data.slice(1), [...current, item], result);
        }
    }

    /**
     * @method combinations
     * @param values
     */
    combinations(values: CombinationAttributeValue[][]) {
        const result: CombinationAttributeValue[][] = [];
        this.generateCombination(values, [], result);
        return result;
    }

    /**
     * @method categoryIdSetter
     */
    categoryIdSetter() {
        let categoryId: number[] = [];
        this.selectedCategories.forEach((category: TreeNode) => {
            return categoryId.push((category as any).key);
        })
        return categoryId;
    }

    /**
     * @method submit
     */
    submit() {
        this.matchSelectedCategories = this.selectedCategories;
        if (this.form.valid) {
            this.isLoading = true;
            this.form.patchValue({
                category_id: this.categoryIdSetter(),
                media: this.selectedImages
            })
            this.productService.store(this.form.value).subscribe((response) => {
                this.messageService.add(this.success(response.message))
                this.form.disable();
                this.redirectService.redirect('/product/edit/'+response.data.id, 3);
            }, (error: any) => {
                this.isLoading = false;
                this.messageService.add(this.error(error.error.message))
                this.form.patchValue({
                    category_id: this.matchSelectedCategories
                })
            })
        } else {
            this.form.patchValue({
                category_id: this.matchSelectedCategories
            })
            this.form.markAllAsTouched();
        }
    }

    /**
     * @method emit
     * @param event
     */
    emit(event: ImageIndexResponse[]) {
        event.length > 0 ? this.selectedImages = event : this.selectedImages = [];
    }
}
