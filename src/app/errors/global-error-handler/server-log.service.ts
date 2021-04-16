import { HttpClient } from '@angular/common/http';
import {Injectable } from "@angular/core";

import { ServerLog } from './server-log';
import { environment } from '../../../environments/environment'

const API_URL = environment.ServerLog;

@Injectable({ providedIn: 'root'})
export class ServerLogService {

    constructor(private http: HttpClient) { }

    log(serverLog: ServerLog){
        return this.http.post(API_URL + '/infra/log', serverLog);
    }

}