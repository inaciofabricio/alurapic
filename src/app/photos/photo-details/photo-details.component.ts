import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.photoId = params.photoId;
        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$.subscribe(
          () => {}, 
          err => {
            this.router.navigate(['not-found']);
          })
      });
  }

  remove() {
    this.photoService
        .removePhoto(this.photoId)
        .subscribe(
          () => {
            this.alertService.success('Photo removed!', true);
            this.router.navigate(['/user', this.userService.getUserName()]);
          },
          err => {
            console.log(err);
            this.alertService.success('Could not delete the photo!');
          });
  }

}
