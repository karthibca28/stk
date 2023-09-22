import { AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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

  constructor(private markerService:MapMarkerService,private locationService: LocationService) { }

  @Input() latitude: number;
  @Input() longitude: number;

  private map: Leaflet.Map;
  private marker: Leaflet.Marker;

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.latitude || changes.longitude) && this.map) {
      this.updateMarker();
    }
  }

  private initializeMap(): void {
    this.map = Leaflet.map('map').setView([11.127123, 78.656891], 6.5);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'CANADA'
    }).addTo(this.map);

    this.map.on('click', this.onMapClick.bind(this));
  }

  private onMapClick(event: Leaflet.MouseEvent): void {
    const { lat, lng } = event.latlng;
    this.latitude = lat;
    this.longitude = lng;
    this.updateMarker();
    this.locationService.setLocationData(this.latitude,this.longitude);
  }

  private updateMarker(): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    if (this.latitude !== undefined && this.longitude !== undefined) {
      this.marker = Leaflet.marker([this.latitude, this.longitude])
        .addTo(this.map)
        .bindPopup('Location')
        .openPopup();
    }
  }
  
}