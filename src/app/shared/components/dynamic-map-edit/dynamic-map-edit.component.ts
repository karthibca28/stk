import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-draw';
import axios from 'axios'; // Import Axios for making HTTP requests

@Component({
  selector: 'app-dynamic-map-edit',
  templateUrl: './dynamic-map-edit.component.html',
  styleUrls: ['./dynamic-map-edit.component.scss']
})
export class DynamicMapEditComponent implements OnInit {
  map: Leaflet.Map;
  drawnItems: Leaflet.FeatureGroup;
  marker: Leaflet.Marker | null = null;
  @Output() location = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = new Leaflet.Map('map').setView([11.127123, 78.656891], 11);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap'
    }).addTo(this.map);

    this.drawnItems = new Leaflet.FeatureGroup().addTo(this.map);

    const drawControl = new Leaflet.Control.Draw({
      draw: {
        polygon: false,
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: true
      },
      edit: {
        featureGroup: this.drawnItems
      }
    });

    this.map.addControl(drawControl);

    this.map.on(Leaflet.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      this.drawnItems.addLayer(layer);
    });

    this.map.on('click', (e: Leaflet.MouseEvent) => {
      const latlng = e.latlng;

      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      this.marker = Leaflet.marker(latlng).addTo(this.map);

      // Reverse geocoding request using OpenStreetMap Nominatim API
      axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`)
        .then(response => {
          const locationName = response.data.display_name;
          console.log('Location:', locationName);

          const data = {
            latitude: latlng.lat,
            longitude: latlng.lng,
            name: locationName // Adding location name to the emitted data
          };

          console.log('Clicked location:', latlng.lat, latlng.lng);
          this.location.emit(data);
        })
        .catch(error => {
          console.error('Error fetching location:', error);
        });
    });
  }
}
