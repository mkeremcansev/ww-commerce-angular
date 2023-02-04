import {Component, OnInit} from '@angular/core';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {AlertService} from "./service/alert/alert.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService]
})
export class AppComponent extends AlertService implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        public messageService: MessageService
    ) {
        super();
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    successAlert(message: string) {
        this.messageService.add(this.success(message));
    }
}
