import {Component} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {CategoryCreateResponse} from "../../../category/entity/entity";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {
    CombinationAttributeValue,
    ProductCreateResponse,
    ProductCreateResponseStatusFormat,
    ProductEditVariantGroup
} from "../../entity/entity";
import {MultiSelect} from "primeng/multiselect";
import {first} from "lodash";
import {MessageService, TreeNode} from "primeng/api";
import {RedirectService} from "../../../../../service/redirect/redirect.service";
import {AlertService} from "../../../../../service/alert/alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends AlertService {
    public form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        brand_id: new FormControl('', Validators.required),
        category_id: new FormControl('', Validators.required),
        variants: new FormArray([]),
        status: new FormControl('', Validators.required),
        variant_status: new FormControl(true, Validators.required),
        images: new FormControl([], Validators.nullValidator)
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
    public id = Number(this.route.snapshot.paramMap.get('id'));
    public isVariationReset: boolean = false;
    public selectedImages: string[] = [];

    /**
     * @method constructor
     * @param productService
     * @param messageService
     * @param redirectService
     * @param route
     */
    constructor(
        public productService: ProductService,
        public messageService: MessageService,
        public redirectService: RedirectService,
        public route: ActivatedRoute
    ) {
        super();
    }

    ngOnInit() {
        this.setValue(this.id);
    }


    /**
     * @method setData
     */
    setValue(id: number) {
        !isNaN(id) ? this.productService.edit(id).subscribe((response) => {
            this.attributes = response.attribute_id;
            this.brands = response.brand_id;
            this.statuses = response.status_type.map((status, index) => {
                return {id: index, title: status};
            });
            response.images.forEach((image) => {
                this.selectedImages.push(image.path);
            });
            this.form.patchValue({
                title: response.title,
                content: response.content,
                price: response.price,
                brand_id: response.brand,
                status: response.status,
                images: this.selectedImages
            });
            this.setVariation(response.variant_groups);
            this.selectedCategories = this.format(response.categories);
            this.tree = this.format(response.category_id);
            this.isSpinner = false;
        }) : this.redirectService.redirect('/notfound', 0);
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

    resetVariant() {
        this.variants.controls = [];
        this.isVariationReset = true;
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
     * @method setVariation
     * @param variants
     */
    setVariation(variants: ProductEditVariantGroup[]) {
        variants.forEach((variant: ProductEditVariantGroup) => {
            (this.form.get('variants') as FormArray).push(new FormGroup({
                attributes: new FormControl(variant.attributes, Validators.required),
                price: new FormControl(variant.price, Validators.required),
                stock: new FormControl(variant.stock, Validators.required),
            }));
        })
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
                images: this.selectedImages
            })
            this.productService.update(this.id, this.form.value).subscribe((response) => {
                this.messageService.add(this.success(response.message))
                this.form.patchValue({
                    category_id: this.matchSelectedCategories
                })
                this.isLoading = false;
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
    emitImages(event: string[]) {
        event.length > 0 ? this.selectedImages = event : this.selectedImages = [];
    }
}
