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
  getShoDashboard(){
    return this.http.get(`${this.apiUrl}sho/dashboard`)
  }
  getList(data: any) {
    return this.http.post(`${this.apiUrl}webSo/getList`, data);
  }
  getPerformanceSummaryNew(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getPerformanceSummaryNew`, data);
  }
  getDlCheck() {
    return this.http.get(`${this.apiUrl}seniorOfficer/dlCheck?dateFilter=thisYear`);
  }
  getChartDataForAdminDLRC(dayType: any, limit: any) {
    return this.http.get(`${this.apiUrl}admin/summaryDashboard?dateType=${dayType}&limit=${limit}`);
  }
  getChartDataForAdmin(dayType: any, date: any, dutyType: any) {
    return this.http.get(`${this.apiUrl}admin/summaryDetailDashboard?dateType=${dayType}&date=${date}&type=${dutyType}`);
  }
  getLocation() {
    return this.http.get(`${this.apiUrl}sho/dutyPoint`)
  }

  //sho

  addDuty(data: any) {
    return this.http.post(`${this.apiUrl}sho/dutyPoint`, data)
  }
  addVehiclePoint(data: any) {
    return this.http.post(`${this.apiUrl}sho/vehiclePoint`, data)
  }
  getVehiclePoint(pageNumber: any, pageSize: any) {
    return this.http.get(`${this.apiUrl}sho/vehiclePoint?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  addVipRoute(data: any) {
    return this.http.post(`${this.apiUrl}sho/vipRoute`, data)
  }
  getVipRoute() {
    return this.http.get(`${this.apiUrl}sho/vipRoute`)
  }
  addInventory(data: any) {
    return this.http.post(`${this.apiUrl}sho/inventoryMaster`, data)
  }
  getInventory(pageNumber: any, pageSize: any) {
    return this.http.get(`${this.apiUrl}sho/inventoryMaster?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  getLocations(pageNumber: any, pageSize: any) {
    return this.http.get(`${this.apiUrl}sho/dutyPoint?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  assignDuty(data: any) {
    return this.http.post(`${this.apiUrl}sho/assignDuty`, data)
  }
  getDuty(pageNumber: any, pageSize: any) {
    return this.http.get(`${this.apiUrl}sho/duty?pageNumber=${pageNumber}&pageSize=${pageSize}&status=ASSIGNED&dateFilter=thisYear`)
  }
  getOfficer() {
    return this.http.get(`${this.apiUrl}sho/fieldOfficer`)
  }
  getSosAlert(id: any) {
    return this.http.get(`${this.apiUrl}admin/alerts?id=${id}`)
  }
  getDefectiveSignal() {
    return this.http.get(`${this.apiUrl}common/defectSignal`)
  }
  addDefectiveSignal(data: any) {
    return this.http.post(`${this.apiUrl}common/defectSignal`, data)
  }
  getSOSAlert(pageNumber: any, pageSize: any) {
    return this.http.get(`${this.apiUrl}common/SOSAlert?dateFilter=today&pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
  addSOSAlert(data: any) {
    return this.http.post(`${this.apiUrl}common/SOSAlert`, data)
  }
  viewDutyPoints(dutyPointId: any) {
    return this.http.get(`${this.apiUrl}sho/dutyPoint?dutyPointId=${dutyPointId}`)
  }
  viewDynamicVechilePoint(vehiclePointId: any) {
    return this.http.get(`${this.apiUrl}sho/vehiclePoint?vehiclePointId=${vehiclePointId}`)
  }
  viewDuty(dutyId: any) {
    return this.http.get(`${this.apiUrl}sho/duty?dutyId=${dutyId}`)
  }

}
