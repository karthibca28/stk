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
  selector: 'app-dynamic-multipledata-map',
  templateUrl: './dynamic-multipledata-map.component.html',
  styleUrls: ['./dynamic-multipledata-map.component.scss']
})
export class DynamicMultipledataMapComponent implements OnInit {
  @Input() public mapArrayData: any;
  map: Leaflet.Map;
  propertyList = [];

  constructor(private markerService:MapMarkerService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.mapArrayData !== null ) {
      for (const property of this.mapArrayData) {
        Leaflet.marker([property.lat, property.lng]).addTo(this.map)
        .bindPopup("<b>"+ property.beatTypeName +"</b><br><table><tr><td style='color:#0D4C92;font-weight:600;'>Name</td><td>"+
        property.userName + "</td></tr><tr><td style='color:#0D4C92;font-weight:600;'>Mob.No</td><td>" + property.userMobile +
        "</td></tr><tr><td style='color:#0D4C92;font-weight:600;'>PS.Name</td><td>" + property.policeStation +
        "</td></tr><tr><td style='color:#0D4C92;font-weight:600;'>Sub Div.</td><td>" + property.subdivision + 
        "</td></tr><tr><td style='color:#0D4C92;font-weight:600;'>District</td><td>" + property.district + "</td></tr></table>").openPopup();
      }
    }
  }
  ngOnInit(): void {
    //this.getMapData();
    this.map = new Leaflet.Map('map').setView([11.127123, 78.656891], 6.5);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'TAMILNADU'
    }).addTo(this.map);

    this.propertyList = this.mapArrayData;
    // this.leafletMap();
  }

  // getMapData() {
  //   this.markerService.getLiveBeatTrack().subscribe((resp: any) => {
  //     const mapData = resp.data;
  //     console.log("map data", mapData)
  //   });
  // }

  // leafletMap(): void {
  //   console.log("Its working-",this.propertyList)
  //   for (const property of this.propertyList) {
  //     Leaflet.marker([property.lat, property.long]).addTo(this.map)
  //       .bindPopup(property.city)
  //       .openPopup();
  //   }
  // }

  ngOnDestroy(): void {
    this.map.remove();
  }

}
