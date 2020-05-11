import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user/user.service';
import { UsuarioModel } from '@core/models/user.model';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MessageUtil } from '@core/utils/util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: UsuarioModel;
  friends: UsuarioModel[];
  imageChangedEvent: any = '';
  nameImageAvatar: string;
  croppedImage: any = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fireStorage: AngularFireStorage,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser
      .subscribe(user => this.user = user);

    this.userService.getUsers()
      .subscribe(friends => this.friends = friends);
  }

  logout() {
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }

  updateInformation(updateForm: NgForm) {
    if (updateForm.invalid) {
      return;
    }

    MessageUtil.loading();

    this.userService.updateUser(this.user)
      .then(() => {
        this.authService.setCurrentUser(this.user.id);
        MessageUtil.success('Se actualizó correctamente la información');
      })
      .catch(error => {
        MessageUtil.error(error.message);
      });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.nameImageAvatar = this.imageChangedEvent.target.files[0].name;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  updateAvatarImage() {
    MessageUtil.loading();
    const path = `images_profiles/${this.nameImageAvatar}`;

    return this.fireStorage.ref(path).putString(this.croppedImage, 'data_url')
      .then(() => {
        this.fireStorage.ref(path).getDownloadURL()
          .subscribe(ref => {
            this.userService.updateUser({ id: this.user.id, avatar: ref })
              .then(() => {
                this.authService.setCurrentUser(this.user.id);
                MessageUtil.success('Se actualizó correctamente el avatar');
              })
              .catch(error => MessageUtil.error(error.message));
          });
      })
      .catch(error => MessageUtil.error(error.message));
  }

}
