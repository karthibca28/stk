import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapMarkerService {

  apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.apiUrl = environment.endPoint;
  }
  capitals: string = '/assets/data/abc.json';
  // map service
  getLiveBeatTrack() {
    return this.http.get(`${this.apiUrl}mobileSho/getLiveBeatTracking`);
  }
  // makeCapitalMarkers(map: L.map): void {
  //   this.http.get(this.capitals).subscribe((res: any) => {
  //     for (const c of res.features) {
  //       const lon = c.geometry.coordinates[0];
  //       const lat = c.geometry.coordinates[1];
  //       const marker = L.marker([lat, lon]);
        
  //       marker.addTo(map);
  //     }
  //   });
  // }
  
}
