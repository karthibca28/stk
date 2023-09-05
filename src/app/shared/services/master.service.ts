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

  //Get Details

  stateList() {
    return this.http.get(`${this.apiUrl}admin/state`);
  }

  adminList() {
    return this.http.get(`${this.apiUrl}admin/administration`);
  }
  zone() {
    return this.http.get(`${this.apiUrl}admin/zone`);
  }
  range(){
    return this.http.get(`${this.apiUrl}admin/range`);
  }
  rangeList(pageNumber:number) {
    return this.http.get(`${this.apiUrl}admin/range?pageNumber=${pageNumber}&pageSize=10`);
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


  // Add Details
  administration(data: any) {
      return this.http.post(`${this.apiUrl}admin/administration`, data);
  }

  addZone(data: any) {
    return this.http.post(`${this.apiUrl}admin/zone`, data);
  }
  addRange(data: any){
  return this.http.post(`${this.apiUrl}admin/range`,data);
  }
   addDistrict(data: any){
  return this.http.post(`${this.apiUrl}admin/district`,data);
  }
  addSubDivsion(data: any){
    return this.http.post(`${this.apiUrl}admin/subDivision`,data);
    }
  addPoliceStation(data:any){
  return this.http.post(`${this.apiUrl}admin/policeStation`,data);
  }

  //GetById
getAdmistrationbyId(adminId:any){
  return this.http.get(`${this.apiUrl}admin/administration?adminId=${adminId}`)
}
getZonebyId(zoneId:any){
  return this.http.get(`${this.apiUrl}admin/zone?zoneId=${zoneId}`)
}
getRangebyId(rangeId:any){
  return this.http.get(`${this.apiUrl}admin/range?rangeId=${rangeId}`)
}
getDistrictbyId(districtId:any){
  return this.http.get(`${this.apiUrl}admin/district?districtId=${districtId}`)
}
getSubDivisionbyId(subDivisionId:any){
  return this.http.get(`${this.apiUrl}admin/subDivision?subDivisionId=${subDivisionId}`)
}
getPoliceStationbyId(policeStationId:any){
  return this.http.get(`${this.apiUrl}admin/policeStation?policeStationId=${policeStationId}`)
}
}


