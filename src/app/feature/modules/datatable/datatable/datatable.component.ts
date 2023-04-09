import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {LazyLoadEvent, MessageService} from "primeng/api";
import {AlertService} from "../../../../service/alert/alert.service";
import {Table} from "primeng/table";
import * as _ from "lodash";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss']
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
     */
    constructor(
        public router: Router,
        public messageService: MessageService,
        public httpClient: HttpClient,
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
        ]
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
        if (!_.isEmpty(event.filters)) {
            this.loading = true;
            this.filterItems = event.filters;
            // @ts-ignore
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
                // @ts-ignore
                if (column == val.data) {
                    // @ts-ignore
                    this.table.columns[key].search.value = value[0].value;
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

    /**
     * @method action
     * @param type
     * @param id
     * @param data
     */
    action(type: string, id: number, data: any = {}) {
        switch (type) {
            case 'destroy':
                this.destroy(id);
                break;
            case 'edit':
                this.redirect(this.table.edit.url, id);
                break;
            default:
                break;
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
