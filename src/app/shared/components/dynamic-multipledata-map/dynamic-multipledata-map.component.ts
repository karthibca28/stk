import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-dynamic-multipledata-map',
  templateUrl: './dynamic-multipledata-map.component.html',
  styleUrls: ['./dynamic-multipledata-map.component.scss']
})
export class DynamicMultipledataMapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public mapArrayData: any[];
  map: Leaflet.Map;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mapArrayData && this.mapArrayData) {
      this.updateMarkers();
    }
  }

  ngOnInit(): void {
    console.log(this.mapArrayData)
    setTimeout(() => {
      if (!this.map) {
        this.initializeMap();
      }
      this.updateMarkers();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap(): void {
    this.map = new Leaflet.Map('map').setView([11.127123, 78.656891], 11);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap'
    }).addTo(this.map);

    this.updateMarkers();
  }

  private updateMarkers(): void {
    if (this.map && this.mapArrayData) {
      this.map.eachLayer((layer) => {
        if (layer instanceof Leaflet.Marker) {
          this.map.removeLayer(layer);
        }
      });

      this.mapArrayData.forEach((data) => {
        const { location, fullName, policeStation, subDivision } = data;
        const { latitude, longitude } = location || {};

        if (latitude && longitude) {
          const popupContent = `
            <b>${fullName}</b><br>
            <table>
              <tr><td style='color:#0D4C92;font-weight:600;'>PS.Name</td><td>${policeStation.name}</td></tr>
              <tr><td style='color:#0D4C92;font-weight:600;'>Sub Div.</td><td>${subDivision.name}</td></tr>
            </table>
          `;

          Leaflet.marker([parseFloat(latitude), parseFloat(longitude)])
            .addTo(this.map)
            .bindPopup(popupContent)
            .openPopup();
        }
      });
    }
  }
}
