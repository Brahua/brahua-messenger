import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ImageCropperModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ImageCropperModule
  ]
})
export class SharedModule { }
