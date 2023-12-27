import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as Leaflet from 'leaflet';
@Component({
  selector: 'app-dynamic-livedata-map',
  templateUrl: './dynamic-livedata-map.component.html',
  styleUrls: ['./dynamic-livedata-map.component.scss']
})
export class DynamicLivedataMapComponent implements OnInit {
  @Input() public mapArrayData: any[];
  map: Leaflet.Map;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mapArrayData && this.mapArrayData) {
      this.updateMarkers();
    }
  }

  ngOnInit(): void {
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
    console.log(this.mapArrayData)
    if (this.map && this.mapArrayData) {
      this.map.eachLayer((layer) => {
        if (layer instanceof Leaflet.Marker) {
          this.map.removeLayer(layer);
        }
      });
      console.log(this.mapArrayData)
      this.mapArrayData.forEach((data) => {
        const {abandonedVehicle} = data;
        console.log(abandonedVehicle.latitude , abandonedVehicle.longitude,abandonedVehicle.locationName,abandonedVehicle.vehicleNumber,
          abandonedVehicle.vehicleType)
        if (abandonedVehicle.latitude && abandonedVehicle.longitude) {
          const popupContent = `
            <b>${abandonedVehicle.locationName}</b><br>
            <table>
              <tr><td style='color:#0D4C92;font-weight:600;'>Vehicle No</td><td>${abandonedVehicle.vehicleNumber}</td></tr>
              <tr><td style='color:#0D4C92;font-weight:600;'>Vechile Type</td><td>${abandonedVehicle.vehicleType}</td></tr>
            </table>
          `;

          Leaflet.marker([parseFloat(abandonedVehicle.latitude), parseFloat(abandonedVehicle.longitude)])
            .addTo(this.map)
            .bindPopup(popupContent)
            .openPopup();
        }
      });
    }
  }

}
