import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.apiUrl = environment.endPoint;
  }

  adList() {
      return this.http.get(`${this.apiUrl}admin/administration`);
  }
  administration(data: any) {
      return this.http.post(`${this.apiUrl}admin/administration`, data);
  }
  zone() {
    return this.http.get(`${this.apiUrl}admin/zone`);
  }
  range() {
    return this.http.get(`${this.apiUrl}admin/range`);
  }
  district() {
    return this.http.get(`${this.apiUrl}admin/district`);
  }
  subDivision() {
    return this.http.get(`${this.apiUrl}admin/subDivision`);
  }
  policeStation() {
    return this.http.get(`${this.apiUrl}admin/policeStation`);
  }
}
