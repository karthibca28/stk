import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { PrimeModule } from './modules/prime/prime.module';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { AudioRecordingService } from './services/audio-recording.service';
import { VideoRecordingService } from './services/video-recording.service';
import { DynamicMapComponent } from './components/dynamic-map/dynamic-map.component';
import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from './components/footer/footer.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DynamicReportTableComponent } from './components/dynamic-report-table/dynamic-report-table.component';
// map-marker
import { MapMarkerService } from './services/map-marker.service';
import { AuthguardServiceService } from './services/authguard-service.service';
import { DynamicPdfComponent } from './components/dynamic-pdf/dynamic-pdf.component';
import { DynamicCsvComponent } from './components/dynamic-csv/dynamic-csv.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './modules/material/material.module';
import { DynamicMoreTableComponent } from './components/dynamic-more-table/dynamic-more-table.component';

@NgModule({
  declarations: [ DynamicFormComponent, DynamicTableComponent, DynamicMapComponent, FooterComponent, DynamicReportTableComponent, DynamicPdfComponent, DynamicCsvComponent, LoaderComponent, DynamicMoreTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    PrimeModule,
    MaterialModule,
    ImageCropperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYCM2u1Vb6YOhi2dnZk0v5s_hIbNHOmNQ',
    })
  ], 
  providers:[AudioRecordingService,VideoRecordingService,MapMarkerService,AuthguardServiceService],
  exports: [DynamicFormComponent,DynamicTableComponent,DynamicMoreTableComponent,DynamicMapComponent,FooterComponent,DynamicReportTableComponent,DynamicPdfComponent,DynamicCsvComponent,LoaderComponent]
})
export class SharedModule { }
 