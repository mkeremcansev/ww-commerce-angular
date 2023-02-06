import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageService} from "../service/image.service";

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent {
    @Input() public multiple: boolean = true
    @Input() public deselect: boolean = true;
    @Input() public deleteSelections: boolean = true;
    @Output() public selectedImagesEmitter = new EventEmitter<string[]>();
    public images = [];
    @Input() public selectedImages: string[] = [];

    /**
     * @method constructor
     * @param imageService
     */
    constructor(
        public imageService: ImageService,
    ) {
    }

    ngOnInit() {
        this.index();
    }

    index() {
        this.imageService.index().subscribe((data: any) => {
            this.images = data;
        });
    }

    selectAndDelete(path: string) {
        if (this.multiple) {
            this.selectedImages = this.selectedImages.includes(path)
                ? this.selectedImages.filter(item => item !== path)
                : [...this.selectedImages, path];
        } else {
            this.selectedImages.includes(path)
                ? this.selectedImages = []
                : this.selectedImages = [path];
        }
        this.selectedImagesEmitter.emit(this.selectedImages);
    }

    /**
     * @method deselectImages
     */
    deselectImages(){
        this.selectedImages = [];
    }

    deleteSelectedImages(){
        this.images = this.images.filter(item => !this.selectedImages.includes(item));
        this.selectedImages = [];
    }
}
