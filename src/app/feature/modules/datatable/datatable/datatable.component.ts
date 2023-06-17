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
     * @method clear
     * @param table
     */
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
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
     */
    destroy(id: number) {
        this.httpClient.delete<{ message: string, data: { id: number } }>(environment.api + this.table.destroy.url + id + '/destroy').subscribe((response) => {
                this.messageService.add(this.success(response.message))
                this.load({first: 0, rows: this.rows, filters: this.filterItems});
            },
            (error) => {
                this.messageService.add(this.error(error.error.message))
            });
    }

    confirm(type: string, id: number, data: any = {}) {
        this.confirmationService.confirm({
            key: 'confirm',
            message: this.translateService.instant('datatable.alert.' + type),
            accept: () => {
                switch (type) {
                    case 'destroy':
                        this.destroy(id);
                        break;
                    case 'forceDestroy':
                        this.forceDestroy(id);
                        break;
                    case 'restore':
                        this.restore(id);
                        break;
                    case 'edit':
                        this.redirect(this.table.edit.url, id);
                        break;
                    default:
                        break;
                }
            },
        });
    }

    /**
     * @method restore
     * @param id
     */
    restore(id: number) {
        this.httpClient.post<{ message: string, data: { id: number } }>(environment.api + this.table.restore.url, {ids: [id]}).subscribe((response) => {
                this.messageService.add(this.success(response.message))
                this.load({first: 0, rows: this.rows, filters: this.filterItems});
            },
            (error) => {
                this.messageService.add(this.error(error.error.message))
            });
    }

    /**
     * @method forceDestroy
     * @param id
     */
    forceDestroy(id: number) {
        this.httpClient.post<{ message: string, data: { id: number } }>(environment.api + this.table.forceDestroy.url, {ids: [id]}).subscribe((response) => {
                this.messageService.add(this.success(response.message))
                this.load({first: 0, rows: this.rows, filters: this.filterItems});
            },
            (error) => {
                this.messageService.add(this.error(error.error.message))
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
