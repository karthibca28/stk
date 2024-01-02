import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  apiUrl: string = '';
  constructor(private http: HttpClient) {
    this.apiUrl = environment.endPoint;
  }
  getDynamicFormData(data: any) {
    return this.http.post(`${this.apiUrl}Admin/getForm`, data);
  }
  callDynamicFunction(urlTail: string, data: any) {
    return this.http.post(`${this.apiUrl}${urlTail}`, data);
  }
  saveFieldTask(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addTaskSubmit`, data);
  }
  saveFieldTaskFile(data: FormData) {
    return this.http.post(`${this.apiUrl}Admin/addTaskSubmitFile`, data);
  }
  saveSpecialDuty(data: any | FormData) {
    return this.http.post(`${this.apiUrl}Admin/addSpecialDutySubmitFile`, data);
  }
  updateSpecialDuty(data: any | FormData) {
    return this.http.post(`${this.apiUrl}Admin/editSpecialDutySubmitFile`, data);
  }
  updateSpecialDutywoFile(data: any) {
    return this.http.post(`${this.apiUrl}Admin/editSpecialDutySubmit`, data);
  }
  updateSpecialDutyComments(data: FormData) {
    return this.http.post(`${this.apiUrl}Admin/editSpecialDutyCompletedFile`, data);
  }
  approveSpecialDutyComments(data: any) {
    return this.http.post(`${this.apiUrl}Admin/specialDutyApproveSubmit`, data);
  }
  saveSpecialDutyWoFile(data: any) { 
    return this.http.post(`${this.apiUrl}Admin/addSpecialDutySubmit`, data);
  }
  saveSummonWarrant(data: any) {
    return this.http.post(`${this.apiUrl}Admin/addSummonWarrantSubmit`, data);
  }
  updateSummonWarrant(data: any) {
    return this.http.post(`${this.apiUrl}Admin/editSummonWarrantSubmit`, data);
  }
  getSpecialDutySummary() {
    return this.http.get(`${this.apiUrl}Admin/getSpecialDutySummary`);
  }
  getSpecialDutyMasterList() {
    return this.http.get(`${this.apiUrl}Admin/getSpecialDutyType`);
  }
  getSpecialDutyList(type: string) {
    return this.http.post(`${this.apiUrl}Admin/getSpecialDutyList`, { searchType: type });
  }
  getSpecialDutyById(id: any) {
    return this.http.post(`${this.apiUrl}Admin/getSpecialDutyEdit`, { specialDutyId: id });
  }
  getFieldTaskMasterList() {
    return this.http.get(`${this.apiUrl}Admin/getTaskType`);
  }
  getAllFieldTaskList() {
    return this.http.get(`${this.apiUrl}Admin/getTaskList`)
  }
  getAllSpecialDutyList() {
    return this.http.get(`${this.apiUrl}Admin/getSpecialDutyList`)
  }
  updateFieldTask(id) {
    const data = { taskId: id };
    return this.http.post(`${this.apiUrl}Admin/taskUpdateSubmit`, data);
  }
  getPoliceVerifyList(){
    return this.http.get(`${this.apiUrl}Admin/getPoliceVerification`);
  }
  policeVerifySubmit(data: any) {
    //console.log("PV service data - ", data)
    return this.http.post(`${this.apiUrl}MobileFo/addSpecialDutySubmit`, data);
  }
  getFoList() {
    return this.http.get(`${this.apiUrl}MobileSho/getFoList`);
  }
  getPersonCheckDetails(data:any){
    return this.http.post(`https://vividtranstech.com/ebeatApi/personapi/Person/personCheck`,data);
  }
  getVehicleRcCheckDetails(data:any){
    return this.http.post(`https://vividtranstech.com/ebeatApi/personapi/Person/vehicleRcCheck`,data);
  }
  getVehicleEngineCheckDetails(data:any){
    return this.http.post(`https://vividtranstech.com/ebeatApi/personapi/Person/vehicleEngineCheck`,data);
  }
  // Save and Update form data
  getDynamicListData(data: any) {
    return this.http.post(`${this.apiUrl}Admin/formList`, data);
  }
  updateMasterForm(data: any) {
    return this.http.post(`${this.apiUrl}Admin/getFormEdit`, data);
  }
  saveMasterForm(data: any) {
    return this.http.post(`${this.apiUrl}Master/addSubmit`, data);
  }
  saveMasterEditForm(data: any) {
    return this.http.post(`${this.apiUrl}Master/editSubmit`, data);
  }
  deleteMasterList(data: any) {
    return this.http.post(`${this.apiUrl}Master/deleteSubmit`, data);
  }
  deleteUsers(userId: any) {
    return this.http.delete(`${this.apiUrl}admin/user?userId=${userId}`);
  }
  getPStationCount() {
    return this.http.get(`${this.apiUrl}Mainadmin/getPStationCount`);
  }
  // getLocation category
  getLoCategory() {
    return this.http.get(`${this.apiUrl}MobileFo/getLocationCategory`);
  }
  getLocationList(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/getLocationList`, data);
  }
  getLocationWeb(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/getLocationWeb`, data);
  }
  saveApproveLoc(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/locationApproveSubmit`, data);
  }
  saveRejectLoc(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/locationRejectSubmit`, data);
  }
  //pvr data
  getPvrData(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/pvrSearch`, data);
  }
  pvrDataSubmit(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/addPVRSubmit`, data);
  }
  // IMEI data
  getImeiData(data: any) {
    return this.http.post(`${this.apiUrl}MobileFo/imeiSearch`, data);
  }
  // imeiDataSubmit(data: any) {
  //   return this.http.post(`${this.apiUrl}MobileFo/addIMEISubmit`, data);
  // }
  // BlackDB persn, vehicle ( you removed after table format set)
  getVehicleList(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/getBlockedVehicleList`, data);
  }
  getPersonList(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/getBlockedPersonList`, data)
  }
  // BlackDB persn, vehicle tab;le format
  getBlockedPersonListWeb(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/getBlockedPersonListWeb`, data)
  }
  getBlockedVehicleListWeb(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/getBlockedVehicleListWeb`, data);
  }
  // Performance Report getState,getZone,getRange,getDistrictDd,getSubdivision,getSubdivision,getPoliceStationDd, getReportUserFo,  getPerformanceSummary
  getState() {
    return this.http.get(`${this.apiUrl}Mainadmin/getState`);
  }
  getZone(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getZone`, data);
  }
  getRange(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getRange`, data);
  }
  getDistrictDd(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getDistrictDd`, data);
  }
  getSubdivision(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getSubdivision`, data);
  }
  getPoliceStationDd(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getPoliceStationDd`, data);
  }
  getReportUserFo(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getReportUserFo`, data);
  }
  getPerformanceSummary(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getPerformanceSummary`, data);
  }
  //old report
  getReportDistrict() {
    return this.http.get(`${this.apiUrl}Mainadmin/getDistrict`);
  }
  getReportPStation2() {
    return this.http.get(`${this.apiUrl}Mainadmin/getPoliceStation`);
  }
  stateSummary(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/stateSummary`, data)
  }
  districtSummary(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/districtSummary`, data)
  }
  policeStationSummary(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/policeStationSummary`, data)
  }
  getReportPStation(data: any) {
    //console.log("errore appd", data)
    return this.http.post(`${this.apiUrl}Mainadmin/getReportPoliceStation`, data)
  }
  getReportAdmin(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getAdminReport`, data);
  }
  getAdminDetailReport(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getAdminDetailReport`, data);
  }
  getAdminDBReport(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getAdminDashboard`, data);
  }
  getBeatReportSummary(data: any) {
    return this.http.post(`${this.apiUrl}Mainadmin/getBeatReportSummary`, data);
  }
  // task
  fieldTaskSubmit(data: any) {
    return this.http.post(`${this.apiUrl}MobileFo/addTaskSubmit`, data);
  }
  updateFieldTaskSubmit(data: any) {
    return this.http.post(`${this.apiUrl}MobileFo/editTaskSubmit`, data);
  }
  getLockedHouse(){
    return this.http.get(`${this.apiUrl}MobileFo/getLockedHouse`);
  }
  getSeniorCitizens(){
    return this.http.get(`${this.apiUrl}MobileFo/getSeniorCitizens`);
  }
  getTaskEdit(data: any) {
    return this.http.post(`${this.apiUrl}Admin/getTaskEdit`, data);
  }
  saveBCsubmit(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/addBadCharacterSubmit`, data);
  }
  saveBCedit(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/editBadCharacterSubmit`, data);
  }
  saveLHsubmit(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/addLockedHouseSubmit`, data);
  }
  saveLHedit(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/editLockedHouseSubmit`, data);
  }
  saveSCsubmit(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/addSeniorCitizenSubmit`, data);
  }
  saveSCedit(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/editSeniorCitizenSubmit`, data);
  }
  // Admin & SHO count
  getUserCount() {
    return this.http.get(`${this.apiUrl}Admin/adminDashboard`);
  }
  //Broadcast msg
  addBroadcastSubmitFile(data: any | FormData) {
    return this.http.post(`${this.apiUrl}Admin/addBroadcastSubmitFile`, data);
  }
  getBroadcastList() {
    return this.http.get(`${this.apiUrl}Admin/getBroadcastList`);
  }
  // Live tracking
  getLiveBeatTrack() {
    return this.http.get(`${this.apiUrl}MobileSho/getLiveBeatTracking`);
  }
  //zone master
  getBeatZoneMasterList(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/getBeatZoneMasterList`, data);
  }
  addBeatZoneMasterSubmit(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/addBeatZoneMasterSubmit`, data);
  }
  addBeatZoneDetailSubmit(data: any) {
    return this.http.post(`${this.apiUrl}MobileSho/addBeatZoneDetailSubmit`, data);
  }
  //admin/da location
  getAdminLocationList() {
    return this.http.get(`${this.apiUrl}Mainadmin/getLocationList`);
  }
  
  //seniorofficer
  getSOfficerData() {
    return this.http.get(`${this.apiUrl}Officer/getDashboard`);
  }
  getBeatListWeb(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getBeatListWeb`, data);
  }
  getTaskListWeb(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getTaskListWeb`, data);
  }
  getDutyListWeb(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getDutyListWeb`, data);
  }
  getLiveBeatTracking() {
    return this.http.get(`${this.apiUrl}Officer/getLiveBeatTracking`);
  }
  getUserListWeb(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getUserListWeb`, data);
  }
  getLocationListWeb() {
    return this.http.get(`${this.apiUrl}Officer/getLocationListWeb`);
  }
  getDistrict() {
    return this.http.get(`${this.apiUrl}Officer/getDistrict`);
  }
  getPoliceStation() {
    return this.http.get(`${this.apiUrl}Officer/getPoliceStation`);
  }
  getReportWeb(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getReportWeb`, data);
  }
  getDetailReportWeb(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getDetailReportWeb`, data);
  }
  getDatewiseExport(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getDatewiseExport`, data);
  }
  getActivitySummaryExport(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getActivitySummaryExport`, data);
  }
  getLocationExport() {
    return this.http.get(`${this.apiUrl}Officer/getLocationExport`);
  }
  getUserloginListWeb(data: any) {
    return this.http.post(`${this.apiUrl}Officer/getUserloginListWeb`, data);
  }
  // Admin
  getChartData() {
    return this.http.get(`${this.apiUrl}Admin/getChartData`);
  }
  getProfile(userId:string) {
    return this.http.get(`${this.apiUrl}user/profile?userId=${userId}`);
  }
  // DAdmin
  getChartLinearData() {
    return this.http.get(`${this.apiUrl}Admin/getChartLinearData`);
  }
  // Access Hierarchy based
  getAccessFilter() {
    return this.http.get(`${this.apiUrl}Officer/getAccessFilter`);
  }
  getUserforSeniorOfficer(){
    return this.http.get(`${this.apiUrl}seniorOfficer/user`);
  }
  // getTaskforSeniorOfficer(tasktype:any){
  //   return this.http.get(`${this.apiUrl}seniorOfficer/task?dateFilter=thisYear&taskType=${tasktype}`);
  // }
  getTaskforSeniorOfficer(tasktype: any,dateFilter:any, adminId: any, zoneId: any, rangeId: any, districtId: any, subDivisionId: any, policeStationId: any) {
    let url = `${this.apiUrl}seniorOfficer/task?taskType=${tasktype}&dateFilter=${dateFilter}`;
  
    if (adminId != null && adminId !== "") {
      url += `&adminId=${adminId}`;
    }
  
    if (zoneId != null && zoneId !== "") {
      url += `&zoneId=${zoneId}`;
    }
  
    if (rangeId != null && rangeId !== "") {
      url += `&rangeId=${rangeId}`;
    }
  
    if (districtId != null && districtId !== "") {
      url += `&districtId=${districtId}`;
    }
  
    if (subDivisionId != null && subDivisionId !== "") {
      url += `&subDivisionId=${subDivisionId}`;
    }
  
    if (policeStationId != null && policeStationId !== "") {
      url += `&policeStationId=${policeStationId}`;
    }
  
    // Make the HTTP request
    return this.http.get(url);
  }
  
  getTaskforSeniorOfficerPaginaton(pageNumber:any,tasktype:any){
    return this.http.get(`${this.apiUrl}seniorOfficer/task?dateFilter=thisYear&pageNumber=${pageNumber}&PageSize=10&taskType=${tasktype}`);
  }
  getDutyforSeniorOfficer(dutyType: any,dateFilter:any, adminId: any, zoneId: any, rangeId: any, districtId: any, subDivisionId: any, policeStationId: any) {
    let url = `${this.apiUrl}seniorOfficer/duty?dutyType=${dutyType}&dateFilter=${dateFilter}`;
  
    if (adminId != null && adminId !== "") {
      url += `&adminId=${adminId}`;
    }
  
    if (zoneId != null && zoneId !== "") {
      url += `&zoneId=${zoneId}`;
    }
  
    if (rangeId != null && rangeId !== "") {
      url += `&rangeId=${rangeId}`;
    }
  
    if (districtId != null && districtId !== "") {
      url += `&districtId=${districtId}`;
    }
  
    if (subDivisionId != null && subDivisionId !== "") {
      url += `&subDivisionId=${subDivisionId}`;
    }
  
    if (policeStationId != null && policeStationId !== "") {
      url += `&policeStationId=${policeStationId}`;
    }
  
    // Make the HTTP request
    return this.http.get(url);
  }
  
  getDutyPointsforSeniorOfficer(){
    return this.http.get(`${this.apiUrl}seniorOfficer/dutyPoint`);
  }
  getDutyPointsforSeniorOfficerbyId(dutyPointId:string){
    return this.http.get(`${this.apiUrl}seniorOfficer/dutyPoint?dutyPointId=${dutyPointId}`);
  }
  getBroadCastById(broadcastId:any){
    return this.http.get(`${this.apiUrl}common/broadcastMessage?broadcastId=${broadcastId}`);
  }
  getTaskById(taskId:any){
    return this.http.get(`${this.apiUrl}seniorOfficer/task?taskId=${taskId}`);
  }
  getDutyById(dutyId:any){
    return this.http.get(`${this.apiUrl}seniorOfficer/duty?dutyId=${dutyId}`);
  }
  async getAudio(data:any){
    const userData = JSON.parse(sessionStorage.getItem('userInfo') as string);
    let token=null;
    if (userData) {
      token = userData.data.session.accessToken; 
    } 
    return `${data}&authorization=${token}`
  }
  // getFileForBroadCast(fileData: any): Observable<ArrayBuffer> {
  //   return this.http.get(fileData, { responseType: 'arraybuffer' });
  // }
  async getFileForBroadCast(
    data:any
  ) {
    
    let params = new HttpParams();
    const userData = JSON.parse(sessionStorage.getItem('userInfo') as string);
    let auth: any; 
    let token=null;
    if (userData) {
      token = userData.data.session.accessToken; 
    } 
    return await fetch(data, {headers: {'Authorization':token}}).then(res=>{
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.blob();
    }).catch(e=>console.log('error in fetch > ', e));
  }

  

  async getImg(
    data:any
  ) {
    
    let params = new HttpParams();
    const userData = JSON.parse(sessionStorage.getItem('userInfo') as string);
    let auth: any; 
    let token=null;
    if (userData) {
      token = userData.data.session.accessToken; 
    } 
    return await fetch(data, {headers: {'Authorization':token}}).then(res=>{
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.blob();
    }).catch(e=>console.log('error in fetch > ', e));
  }
  // getInventoryforSeniorOfficer(inventorytype:string){
  //   return this.http.get(`${this.apiUrl}seniorOfficer/inventory?type=${inventorytype}`);
  // }
  getInventoryforSeniorOfficer(inventorytype: any, adminId: any, zoneId: any, rangeId: any, districtId: any, subDivisionId: any, policeStationId: any) {
    let url = `${this.apiUrl}seniorOfficer/inventory?type=${inventorytype}`;
  
    if (adminId != null && adminId !== "") {
      url += `&adminId=${adminId}`;
    }
  
    if (zoneId != null && zoneId !== "") {
      url += `&zoneId=${zoneId}`;
    }
  
    if (rangeId != null && rangeId !== "") {
      url += `&rangeId=${rangeId}`;
    }
  
    if (districtId != null && districtId !== "") {
      url += `&districtId=${districtId}`;
    }
  
    if (subDivisionId != null && subDivisionId !== "") {
      url += `&subDivisionId=${subDivisionId}`;
    }
  
    if (policeStationId != null && policeStationId !== "") {
      url += `&policeStationId=${policeStationId}`;
    }
  
    // Make the HTTP request
    return this.http.get(url);
  }
  getInventorySummaryforSeniorOfficer(){
    return this.http.get(`${this.apiUrl}seniorOfficer/inventory/summary`);
  }
  getDutySummaryforSeniorOfficer(){
    return this.http.get(`${this.apiUrl}seniorOfficer/duty/summary?dateFilter=thisYear`);
  }
  getTaskSummaryforSeniorOfficer(){
    return this.http.get(`${this.apiUrl}seniorOfficer/task/summary?dateFilter=thisYear&taskType=all`);
  }

  getUserListAdmin(){
    return this.http.get(`${this.apiUrl}admin/user`);
  }
  getVipRoutesforSeniorOfficer(){
    return this.http.get(`${this.apiUrl}seniorOfficer/vipRoutes`);
  }
  getPoliceStationforSeniorOfficer(){
    return this.http.get(`${this.apiUrl}seniorOfficer/policeStation`);
  }
  getBroadCastforSeniorOfficer(){
    return this.http.get(`${this.apiUrl}common/broadcastMessage`);
  }
  getSOSAlert(){
    return this.http.get(`${this.apiUrl}admin/alerts`);
  }
}