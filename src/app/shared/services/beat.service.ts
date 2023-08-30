import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeatService {


  apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.apiUrl = environment.endPoint;
  }
  getBeatType() {
    return this.http.get(`${this.apiUrl}Admin/getBeatType`);
  }
  getBeatsCount() {
    return this.http.get(`${this.apiUrl}Admin/getBeatSummary`);
  }
  getBeatList(type:string) {
    return this.http.post(`${this.apiUrl}Admin/getBeatList`,{searchType:type});
  }
  viewBeat(beatId: number) {
    const data = { beatId: beatId }
    return this.http.post(`${this.apiUrl}Admin/getBeatView`, data);
  }
  editBeat(beatId: number) {
    const data = { beatId: beatId }
    return this.http.post(`${this.apiUrl}Admin/getBeatEdit`, data);
  }
  saveBeatForm(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addBeatSubmit`, data);
  }
  updateBeatForm(data: any) {
    return this.http.post(`${this.apiUrl}Admin/editBeatSubmit`, data);
  }
  startBeat(beatId: number) {
    const data = { beatId: beatId }
    return this.http.post(`${this.apiUrl}Admin/beatStartSubmit`, data);
  }
  endBeat(beatId: number) {
    const data = { beatId: beatId }
    return this.http.post(`${this.apiUrl}Admin/beatEndSubmit`, data);
  }
  approveBeat(beatId: number) {
    const data = { beatId: beatId }
    return this.http.post(`${this.apiUrl}Admin/beatApproveSubmit`, data);
  }
  // Report -sho
  getBeatReport(type: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getBeatReport`, type);
  }
  getFoUser() {
    return this.http.get(`${this.apiUrl}Mainadmin/getFoUser`);
  }
  getSpecialDutyType() {
    return this.http.get(`${this.apiUrl}Mainadmin/getSpecialDutyType`);
  }
  getSpecialDutyTypeAll() {
    return this.http.get(`${this.apiUrl}Mainadmin/getSpecialDutyTypeAll`);
  }
  getFieldTaskType() {
    return this.http.get(`${this.apiUrl}Mainadmin/getFieldTaskType`);
  }
  getFieldTaskTypeAll() {
    return this.http.get(`${this.apiUrl}Mainadmin/getFieldTaskTypeAll`);
  }
  getspdutyReport(type: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getspdutyReport`, type);
  }
  getspdutySummaryReport(type: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getspdutySummaryReport`, type);
  }
  getTaskDetailReport(type: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getTaskDetailReport`, type);
  }
  getTaskSummaryReport(type: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getTaskSummaryReport`, type);
  }
  // Get task list
  getTaskSummary(type: any) {
    return this.http.post(`${this.apiUrl}MobileSho/getTaskList`, type);
  }
  // getDDtask(type: any) {
  //   return this.http.post(`${this.apiUrl}mobileFo/getTaskListDropdown`, type);
  // }
}
