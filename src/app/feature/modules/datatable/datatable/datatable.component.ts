import {Component, ElementRef, Inject, Input, LOCALE_ID, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {AlertService} from "../../../../service/alert/alert.service";
import {Table} from "primeng/table";
import * as lodash from "lodash";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss'],
    providers: [ConfirmationService]
})
export class DatatableComponent extends AlertService {
    @Input() table: any;
    @ViewChild('filter') filter!: ElementRef;
    public variables = [];
    public filterItems: any = [];
    public rows: number = 10;
    public start: number = 0;
    public recordsTotal: number = 0;
    public loading: boolean = true;
    public viewColumnsForTable: any = [];
    public checkedItems: number[] = [];

    /**
     * @method constructor
     * @param router
     * @param messageService
     * @param httpClient
     * @param confirmationService
     * @param translateService
     */
    constructor(
        public router: Router,
        public messageService: MessageService,
        public httpClient: HttpClient,
        public confirmationService: ConfirmationService,
        public translateService: TranslateService,
    ) {
        super();
    }

    /**
     * @method ngOnInit
     */
    ngOnInit() {
        this.table.start = this.start;
        this.table.length = this.rows;
        this.table.order = [
            {
                "column": 0,
                "dir": "desc"
            }
        ];
    }

    /**
     * @method load
     * @param event
     */
    load(event: LazyLoadEvent) {
        this.viewColumns();
        if (!lodash.isEmpty(event.filters)) {
            this.loading = true;
            this.filterItems = event.filters;
            this.table.start = event.first;
            this.formatter();
            this.tableRequest();
        } else {
            this.loading = true;
            this.tableRequest();
        }
    }

    tableRequest() {
        this.httpClient.post(environment.api + this.table.url, this.table).subscribe((response: any) => {
                this.loading = false;
                this.variables = response.data;
                this.recordsTotal = response.recordsFiltered;
            },
            (error: any) => {
                this.loading = false;
                this.variables = [];
                this.recordsTotal = 0;
                this.messageService.add(this.error(error.error.message))
            });
    }

    /**
     * @method trashedOrOginial
     */
    trashedOrOriginal() {
        this.checkedItems = [];
        const isTrashed = this.table.url.includes('trashed');
        if (isTrashed) {
            this.table.url = this.table.url.replace('?trashed=1', '');
        } else {
            this.table.url += '?trashed=1';
        }
        this.load({first: 0, rows: this.rows, filters: this.filterItems});
    }

    /**
     * @method checkTrashedOrOriginal
     */
    checkTrashedOrOriginal() {
        return this.table.url.includes('trashed');
    }

    checkboxEvent(event: any, type: string) {
        switch (type) {
            case 'multiple':
                if (event.target.checked) {
                    this.variables.forEach((item: any) => {
                        this.checkedItems.push(item.id);
                    });
                } else {
                    this.checkedItems = [];
                }
                break;
            case 'single':
                if (event.target.checked) {
                    this.checkedItems.push(Number(event.target.value));
                } else {
                    this.checkedItems.splice(this.checkedItems.indexOf(Number(event.target.value)), 1);
                }
                break;
            default:
                break;
        }
    }

    /**
     * @method formatter
     */
    formatter() {
        for (const [column, value] of Object.entries(this.filterItems)) {
            for (const [key, val] of Object.entries(this.table.columns)) {
                if (column == (val as any).data) {
                    this.table.columns[key].search.value = (value as any)[0].value;
                }
            }
        }
    }

    /**
     * @method redirect
     * @param route
     * @param params
     */
    redirect(route: string, params: any) {
        this.router.navigate([params ? route + params : route]);
    }

    /**
     * @method destroy
     * @param id
     * @param multiple
     */
    destroy(id: number, multiple: boolean = false) {
        this.httpClient.delete<{
            message: string,
            data: { id: number }
        }>(environment.api + this.table.destroy.url + id + '/destroy').subscribe((response) => {
                if (!multiple) {
                    this.messageService.add(this.success(response.message))
                }
                this.load({first: 0, rows: this.rows, filters: this.filterItems});
            },
            (error) => {
                if (!multiple) {
                    this.messageService.add(this.error(error.error.message))
                }
            });
    }

    confirm(type: string, id: number | number[], data: any = {}) {
        this.confirmationService.confirm({
            key: 'confirm',
            message: this.translateService.instant('datatable.alert.' + type),
            accept: () => {
                switch (type) {
                    case 'destroy':
                        if (!lodash.isArray(id)) {
                            this.destroy(id);
                        }
                        break;
                    case 'forceDestroy':
                        if (lodash.isArray(id)) {
                            this.forceDestroy(id);
                        } else {
                            this.forceDestroy([id]);
                        }
                        break;
                    case 'restore':
                        if (lodash.isArray(id)) {
                            this.restore(id);
                        } else {
                            this.restore([id]);
                        }
                        break;
                    case 'edit':
                        this.redirect(this.table.edit.url, id);
                        break;
                    default:
                        break;
                }
                this.checkedItems = [];
            },
        });
    }

    /**
     * @method restore
     * @param ids
     */
    restore(ids: number[]) {
        this.httpClient.post<{
            message: string,
            data: { id: number }
        }>(environment.api + this.table.restore.url, {ids: ids}).subscribe((response) => {
                this.messageService.add(this.success(response.message))
                this.load({first: 0, rows: this.rows, filters: this.filterItems});
            },
            (error) => {
                this.messageService.add(this.error(error.error.message))
            });
    }

    /**
     * @method forceDestroy
     * @param ids
     */
    forceDestroy(ids: number[]) {
        this.httpClient.post<{
            message: string,
            data: { id: number }
        }>(environment.api + this.table.forceDestroy.url, {ids: ids}).subscribe((response) => {
                this.messageService.add(this.success(response.message))
                this.load({first: 0, rows: this.rows, filters: this.filterItems});
            },
            (error) => {
                this.messageService.add(this.error(error.error.message))
            });
    }

    /**
     * @method multipleDestroy
     */
    multipleDestroy() {
        this.confirmationService.confirm({
            key: 'confirm',
            message: this.translateService.instant('datatable.alert.destroy'),
            accept: () => {
                this.checkedItems.forEach((id: number) => {
                    this.destroy(id, true);
                });
                this.checkedItems = [];
                this.messageService.add(this.success(this.translateService.instant('datatable.alert.destroySuccess')))
            },
        });
    }

    /**
     * @method actionStatus
     * @param type
     * @param id
     * @param data
     */
    actionStatus(type: string, id: number, data: any = {}) {
        switch (type) {
            case 'destroy':
                return !data?.deleted_at;
            case 'forceDestroy':
                return data?.deleted_at;
            case 'restore':
                return data?.deleted_at;
            case 'edit':
                return !data?.deleted_at;
            default:
                return false;
        }
    }

    /**
     * @method viewColumns
     */
    viewColumns() {
        this.viewColumnsForTable = [];
        this.table.columns.forEach((column: any) => {
            this.viewColumnsForTable.push({data: column.data});
        });
    }
}
