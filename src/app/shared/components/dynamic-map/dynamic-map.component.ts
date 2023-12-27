import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { APIResponse } from '../../models/api-response';
import { MapMarkerService } from '../../services/map-marker.service';
import {LocationService} from '../../services/location.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = Leaflet.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Leaflet.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-dynamic-map',
  templateUrl: './dynamic-map.component.html',
  styleUrls: ['./dynamic-map.component.scss']
})
export class DynamicMapComponent implements OnInit {

  constructor(private markerService:MapMarkerService,private locationService: LocationService,private cdr: ChangeDetectorRef) { }

  @Input() latitude: any;
  @Input() longitude: any;
  @Input() nameField:any
  @Input() Endlatitude: any;
  @Input() Endlongitude: any;
  @Input() EndnameField:any

  private map: Leaflet.Map;
  private marker: Leaflet.Marker;

  ngOnInit(): void {
    this.initializeMap();
    this.updateMarker()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.latitude || changes.longitude) && this.map) {
      this.updateMarker();
    }
  }

  private initializeMap(): void {
    this.map = Leaflet.map('map').setView([11.127123, 78.656891], 11);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap'
    }).addTo(this.map);

    // this.map.on('click', this.onMapClick.bind(this));
  }

  // private onMapClick(event: Leaflet.MouseEvent): void {
  //   debugger
  //   const { lat, lng } = event.latlng;
  //   this.latitude = lat;
  //   this.longitude = lng;
  //   this.updateMarker();
  //   this.locationService.setLocationData(this.latitude, this.longitude);
  
  //   this.cdr.detectChanges();
  // }

  private updateMarker(): void {
    console.log(
      "Updating marker:",
      this.latitude,
      this.longitude,
      this.Endlatitude,
      this.Endlongitude
    );
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    if (this.latitude !== undefined && this.longitude !== undefined) {
      Leaflet.marker([this.latitude, this.longitude])
        .addTo(this.map)
        .bindPopup(this.nameField)
        .openPopup();
    }
    if (this.Endlatitude !== undefined && this.Endlongitude !== undefined) {
      Leaflet.marker([this.Endlatitude, this.Endlongitude])
        .addTo(this.map)
        .bindPopup(this.EndnameField)
        .openPopup();
    }
    this.map.invalidateSize();
  }
  
  
  
}