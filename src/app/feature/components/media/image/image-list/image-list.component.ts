import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageService} from "../service/image.service";
import {AlertService} from "../../../../../service/alert/alert.service";
import {MessageService} from "primeng/api";
import {ImageIndexResponse} from "../entity/entity";
import { DataView } from 'primeng/dataview';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent extends AlertService {
    @Input() public multiple: boolean = true
    @Input() public deselect: boolean = true;
    @Input() public deleteSelections: boolean = true;
    @Input() public upload: boolean = true;
    @Output() public selectedImagesEmitter = new EventEmitter<ImageIndexResponse[]>();
    @Input() public selectedImages: ImageIndexResponse[] = [];
    public images : ImageIndexResponse[] = [];
    public isSpinner: boolean = true;

    public isSearch: boolean = false;

    /**
     * @method constructor
     * @param imageService
     * @param messageService
     */
    constructor(
        public imageService: ImageService,
        public messageService: MessageService
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {
        this.index();
    }

    /**
     * @method index
     */
    index() {
        this.imageService.index().subscribe((data: any) => {
            this.isSpinner = false;
            this.images = data;
        });
    }

    /**
     * @method selectAndDelete
     * @param media
     */
    selectAndDelete(media: ImageIndexResponse) {
        if (this.multiple) {
            this.selectedImages = this.selectedImages.some(item => item.id === media.id)
                ? this.selectedImages.filter(item => item.id !== media.id)
                : [...this.selectedImages, media];
        } else {
            this.selectedImages.some(item => item.id === media.id)
                ? this.selectedImages = []
                : this.selectedImages = [media];
        }
        this.selectedImagesEmitter.emit(this.selectedImages);
    }

    /**
     * @method deselectImages
     */
    deselectImages() {
        this.selectedImages = [];
    }

    reloadImages() {
        this.index();
    }

    /**
     * @method deleteSelectedImages
     */
    deleteSelectedImages() {
        this.imageService.destroy(this.selectedImages).subscribe((response: any) => {
                this.images = this.images.filter(item => !this.selectedImages.includes(item));
                this.selectedImages = [];
                this.messageService.add(this.success(response.message));
            },
            (error: any) => {
                this.messageService.add(this.error(error.error.message));
            });
    }

    /**
     * @method selectControl
     * @param media
     */
    selectControl(media: ImageIndexResponse) {
        return this.selectedImages.some(item => item.id === media.id);
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    search() {
        this.isSearch = !this.isSearch;
    }
}
