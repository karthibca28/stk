import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-broadcast-form',
  templateUrl: './broadcast-form.component.html',
  styleUrls: ['./broadcast-form.component.scss']
})
export class BroadcastFormComponent implements OnInit {
   @ViewChild('videoElement') videoElement: ElementRef;
   isCameraOpen: boolean = false;
   photoData: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  openCamera() {
    const video = this.videoElement.nativeElement;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
          video.play();
          this.isCameraOpen = true;
        })
        .catch(error => console.error('Error accessing the camera:', error));
    } else {
      console.error('getUserMedia is not supported on this browser');
    }
  }

  takePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.photoData = canvas.toDataURL('image/png');
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      console.log('Selected file:', file);
    }
  }

}
