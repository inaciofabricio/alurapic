import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../photo/photo';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Injectable({ providedIn: 'root' })
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {

    constructor(private service: PhotoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userName = route.params.userName;
        return this.service.listFromUserPaginate(userName, 1);
    }

}