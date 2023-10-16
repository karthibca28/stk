import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecondaryService {

  apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.apiUrl = environment.endPoint;
  }

  // post method
  // saveSpecialDutyWoFile(data: any) { 
  //     return this.http.post(`${this.apiUrl}Admin/addSpecialDutySubmit`, data);
  // }
  getDashboard() {
      return this.http.get(`${this.apiUrl}seniorOfficer/dashboard`);
  }
  getDashboardAdmin() {
    return this.http.get(`${this.apiUrl}admin/dashboard`);
}
  getList(data: any) {
      return this.http.post(`${this.apiUrl}webSo/getList`, data);
  }
  getPerformanceSummaryNew(data: any) {
      return this.http.post(`${this.apiUrl}Officer/getPerformanceSummaryNew`, data);
  }
  getDlCheck(){
    return this.http.get(`${this.apiUrl}seniorOfficer/dlCheck?dateFilter=thisYear`);
  }
  getChartDataForAdminDLRC(){
    return this.http.get(`${this.apiUrl}admin/dlrcDashboard?dateType=day`);
  }
  getChartDataForAdmin(){
    return this.http.get(`${this.apiUrl}admin/challanDashboard?dateType=day`);
  }

}
