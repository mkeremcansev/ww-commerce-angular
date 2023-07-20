import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageService} from "../service/image.service";
import {AlertService} from "../../../../../service/alert/alert.service";
import {MessageService} from "primeng/api";
import {ImageIndexResponse} from "../entity/entity";
import {DataView} from 'primeng/dataview';
import * as lodash from 'lodash';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent extends AlertService {
    @Input() public multiple: boolean = true
    @Input() public deselect: boolean = true;
    @Input() public deleteSelections: boolean = true;
    @Input() public searchStatus: boolean = true;
    @Input() public title: string = 'image.imageList';
    @Input() public upload: boolean = true;
    @Input() public trashedStatus: boolean = false;
    @Input() public selectAllStatus: boolean = false;
    @Output() public selectedImagesEmitter = new EventEmitter<ImageIndexResponse[]>();
    @Input() public selectedImages: ImageIndexResponse[] = [];
    public images: ImageIndexResponse[] = [];
    public isSpinner: boolean = true;
    public isTrashed: boolean = false;
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
    index(trashed = false) {
        this.imageService.index(trashed).subscribe((data: any) => {
            this.isSpinner = false;
            if (lodash.isArray(data)){
                this.images = data;
            } else {
                this.images = [];
            }
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

    reloadImages(trashed = false) {
        this.isTrashed = trashed;
        this.selectedImages = [];
        this.index(trashed);
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

    restore(){
        const ids = this.selectedImages.map(item => item.id);
        this.imageService.restore(ids).subscribe((response: any) => {
                this.images = this.images.filter(item => !this.selectedImages.includes(item));
                this.selectedImages = [];
                this.messageService.add(this.success(response.message));
            },
            (error: any) => {
                this.messageService.add(this.error(error.error.message));
            });
    }

    selectAll(){
        this.selectedImages = this.images;
    }

    forceDestroy(){
        const ids = this.selectedImages.map(item => item.id);
        this.imageService.forceDestroy(ids).subscribe((response: any) => {
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
