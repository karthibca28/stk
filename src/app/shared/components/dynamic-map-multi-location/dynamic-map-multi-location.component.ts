import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-draw';
import axios from 'axios';

@Component({
  selector: 'app-dynamic-map-multi-location',
  templateUrl: './dynamic-map-multi-location.component.html',
  styleUrls: ['./dynamic-map-multi-location.component.scss']
})
export class DynamicMapMultiLocationComponent implements OnInit {
  map: Leaflet.Map;
  drawnItems: Leaflet.FeatureGroup;
  markers: Leaflet.Marker[] = [];
  @Output() locations = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  private async initializeMap(): Promise<void> {
    this.map = new Leaflet.Map('map').setView([11.127123, 78.656891], 11);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap'
    }).addTo(this.map);

    this.map.on('click', async (e: Leaflet.MouseEvent) => {
      if (this.markers.length < 2) {
        const latlng = e.latlng;
        const marker = Leaflet.marker(latlng).addTo(this.map);
        this.markers.push(marker);

        const locationName = await this.getLocationName(latlng.lat, latlng.lng);
        marker.bindPopup(locationName);
        this.emitLocations();
      } else {
        console.log('Maximum number of locations reached.');
      }
    });

    this.map.on('popupopen', (e: Leaflet.PopupEvent) => {
      const marker = e.popup._source as Leaflet.Marker;
      marker.on('click', () => {
        this.removeMarker(marker);
      });
    });
  }

  private async getLocationName(latitude: number, longitude: number): Promise<string> {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      return response.data.display_name;
    } catch (error) {
      console.error('Error fetching location name:', error);
      return 'Unknown';
    }
  }

  private emitLocations(): void {
    const locationsData = this.markers.map(m => ({
      latitude: m.getLatLng().lat,
      longitude: m.getLatLng().lng,
      locationName: m.getPopup().getContent()
    }));
    this.locations.emit(locationsData);
  }

  removeMarker(marker: Leaflet.Marker): void {
    this.map.removeLayer(marker);
    this.markers = this.markers.filter(m => m !== marker);
    this.emitLocations();
    console.log('Marker removed.');
  }

  clearSelection(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
    this.emitLocations(); 
    console.log('Selection cleared.');
  }
}
