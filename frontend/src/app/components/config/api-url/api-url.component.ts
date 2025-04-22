import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-api-url',
  templateUrl: './api-url.component.html',
  styleUrls: ['./api-url.component.scss']
})
export class ApiUrlComponent {

    constructor(private sharedService: SharedService) { }

    prefix: string = 'http://';
    Url: string = '';
    port: string = '';

    concatAPIUrl: string = '';

    concatApiUrl(): void {
        this.concatAPIUrl = this.prefix + this.Url + ':' + this.port;
        console.log('API URL: ' + this.concatAPIUrl);
    }

    updateApiUrl(): void {
        this.sharedService.setApiUrl(this.concatAPIUrl);
        console.log('Api URL updated to: ' + this.concatAPIUrl);
    }

}
