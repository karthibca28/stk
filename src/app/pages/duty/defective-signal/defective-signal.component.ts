import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-defective-signal',
  templateUrl: './defective-signal.component.html',
  styleUrls: ['./defective-signal.component.scss']
})
export class DefectiveSignalComponent implements OnInit {
  form: FormGroup;
  selectedFile: any;
  isRecording = false;
  isPlaying = false;
  mediaRecorder: any;
  audioChunks: any[] = [];
  audioBlob: Blob;
  audioUrl: string;
  audio: HTMLAudioElement | null = null;
  fileError: string;

  constructor(private fb: FormBuilder, private secondaryService: SecondaryService, private sharedService: SharedService,
    private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    this.form = this.fb.group({
      locationName: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  location(data: any) {
    console.log(data)
    this.form.patchValue({
      latitude: data.latitude,
      longitude: data.longitude,
      locationName: data.name.split(", ")[0]
    })
  }
  onSubmit() {
    if (this.form.valid && this.selectedFile) {
      var formData = new FormData();
      formData.append('location', this.form.value.locationName);
      formData.append('latitude', this.form.value.latitude);
      formData.append('longitude', this.form.value.longitude);
      formData.append('description', this.form.value.description);
      formData.append('files', this.selectedFile);
      if (this.audioBlob) {
        formData.append('audio', this.audioBlob, 'audio.wav');
      }
      this.secondaryService.addDefectiveSignal(formData).subscribe((res: any) => {
        if (res) {
          this.sharedService.showSuccess('Defective Signal Added Successfully');
          this.router.navigate(['/main/duty/defective-signal-list'])
        }
      })
    } else {
      this.form.markAllAsTouched();
      if (!this.selectedFile) {
        this.fileError = 'File is required';
      }
    }
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    this.selectedFile = fileInput.files?.[0];
    if (this.selectedFile) {
      this.fileError = ''; 
    } else {
      this.fileError = 'File is required';
    }
  }

  toggleRecording() {
    if (!this.isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.isRecording = true;
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.mediaRecorder.ondataavailable = (event: any) => {
            this.audioChunks.push(event.data);
          };
          this.mediaRecorder.onstop = () => {
            this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
            this.audioUrl = URL.createObjectURL(this.audioBlob);
            this.audioChunks = [];
            this.isRecording = false;
          };
        });
    } else {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }

  playAudio() {
    if (this.audioUrl) {
      this.audio = new Audio(this.audioUrl);
      this.audio.play();
    }
  }

  togglePlay() {
    if (!this.audioUrl) return;
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    } else {
      if (!this.audio) {
        this.audio = new Audio(this.audioUrl);
        this.audio.onended = () => {
          this.audio = null;
        };
      }
      this.audio.play();
    }
  }

  deleteAudio() {
    if (this.audioBlob || this.audioUrl) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the audio?',
        accept: () => {
          this.audioBlob = null;
          this.audioUrl = null;
          this.audio = null;
          this.sharedService.showSuccess('Audio Deleted Successfully');
        },
        reject: () => {
          this.sharedService.showWarn('Cancelled')
        }
      });
    }
  }
}
