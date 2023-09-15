import { AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { APIResponse } from '../../models/api-response';
import { MapMarkerService } from '../../services/map-marker.service';
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


  constructor(private markerService:MapMarkerService) { }

  @Input() latitude: number;
  @Input() longitude: number;

  map: Leaflet.Map;



  ngOnInit(): void {
    // Initialize the map and add a tile layer
    this.map = new Leaflet.Map('map').setView([11.127123, 78.656891], 6.5);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'CANADA'
    }).addTo(this.map);

    // Add a marker based on the latitude and longitude
    if (this.latitude !== undefined && this.longitude !== undefined) {
      this.addMarker(this.latitude, this.longitude);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Update the marker when latitude or longitude changes
    if ((changes.latitude || changes.longitude) && !changes.latitude.firstChange && !changes.longitude.firstChange) {
      this.updateMarker();
    }
  }

  private addMarker(latitude: number, longitude: number): void {
    Leaflet.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup('Location')
      .openPopup();
  }

  private updateMarker(): void {
    // Remove the old marker and add a new one with updated coordinates
    this.map.eachLayer(layer => {
      if (layer instanceof Leaflet.Marker) {
        this.map.removeLayer(layer);
      }
    });
    this.addMarker(this.latitude, this.longitude);
  }

}