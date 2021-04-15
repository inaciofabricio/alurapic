import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PhotoFormComponent } from './photo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VmessageModule } from 'src/app/shared/components/vmessage/vmessage.module';

@NgModule({
  declarations: [
    PhotoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VmessageModule,
    RouterModule
  ],
})
export class PhotoFormModule { }
