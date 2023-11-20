import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  adminListUser(stateId:any) {
    return this.http.get(`${this.apiUrl}admin/administration?stateId=${stateId}`);
  }
  pageadminList(pageNumber:number) {
    return this.http.get(`${this.apiUrl}admin/administration?pageNumber=${pageNumber}&pageSize=10`);
  }
  zone() {
    return this.http.get(`${this.apiUrl}admin/zone`);
  }
  getZoneUser(adminId:any) {
    return this.http.get(`${this.apiUrl}admin/zone?adminId=${adminId}`);
  }
  range(){
    return this.http.get(`${this.apiUrl}admin/range`);
  }
  getRangeUser(zoneId:any){
    return this.http.get(`${this.apiUrl}admin/range?zoneId=${zoneId}`);
  }
 
  district() {
    return this.http.get(`${this.apiUrl}admin/district`);
  }
  getDistrictUser(rangeId:any) {
    return this.http.get(`${this.apiUrl}admin/district?rangeId=${rangeId}`);
  }
  subDivision() {
    return this.http.get(`${this.apiUrl}admin/subDivision`);
  }
  getSubDivisionUser(districtId:any) {
    return this.http.get(`${this.apiUrl}admin/subDivision?districtId=${districtId}`);
  }
  policeStation() {
    return this.http.get(`${this.apiUrl}admin/policeStation`);
  }
  getPoliceStationUser(subDivisionId:any) {
    return this.http.get(`${this.apiUrl}admin/policeStation?subDivisionId=${subDivisionId}`);
  }
  accessControlList(){
    return this.http.get(`${this.apiUrl}admin/accessControl`);
  }
  inventoryTypeList(){
    return this.http.get(`${this.apiUrl}admin/inventoryType`);
  }
  rankList(){
    return this.http.get(`${this.apiUrl}admin/rank`);
  }
  roleList(){
    return this.http.get(`${this.apiUrl}admin/role`);
  }
  findAccessControl() {
    return this.http.get(`${this.apiUrl}common/access`);
  }
  subTypeFilter(type:any,reportType:any) {
    return this.http.get(`${this.apiUrl}common/rptSubType?type=${type}&reportType=${reportType}`);
  }
  async getReportsforSo(
    dateFilter: any,
    type: any,
    reportType: any,
    reportSubType: any,
    stateId: any,
    adminId: any,
    zoneId: any,
    rangeId: any,
    districtId: any,
    subDivisionId: any,
    policeStationId: any
  ) {
    let apiUrl = `${this.apiUrl}seniorOfficer/report?`;
    if (dateFilter) apiUrl += `dateFilter=${dateFilter}&`;
    if (type) apiUrl += `type=${type}&`;
    if (reportType) apiUrl += `reportType=${reportType}&`;
    if (reportSubType) apiUrl += `reportSubType=${reportSubType}&`;
    if (stateId) apiUrl += `stateId=${stateId}&`;
    if (adminId) apiUrl += `adminId=${adminId}&`;
    if (zoneId) apiUrl += `zoneId=${zoneId}&`;
    if (rangeId) apiUrl += `rangeId=${rangeId}&`;
    if (districtId) apiUrl += `districtId=${districtId}&`;
    if (subDivisionId) apiUrl += `subDivisionId=${subDivisionId}&`;
    if (policeStationId) apiUrl += `policeStationId=${policeStationId}&`;
    if (apiUrl.endsWith('&')) {
      apiUrl = apiUrl.slice(0, -1);

    }
    // debugger
    let params = new HttpParams();
    const userData = JSON.parse(sessionStorage.getItem('userInfo') as string);
    let auth: any; 
    let token=null;
    if (userData) {
      token = userData.data.session.accessToken; 
    } 
    return await fetch(apiUrl, {headers: {'Authorization':token}}).then(res=>{
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.blob();
    }).catch(e=>console.log('error in fetch > ', e));
    
    // return this.http.get(apiUrl, {
    //   params,
    //   responseType: 'blob' as 'json' ,
    //   // headers: {'content-type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
    // })


  }

  async getReportsfoAdmin(
    dateFilter: any,
    type: any,
    reportType: any,
    reportSubType: any,
    stateId: any,
    adminId: any,
    zoneId: any,
    rangeId: any,
    districtId: any,
    subDivisionId: any,
    policeStationId: any
  ) {
    let apiUrl = `${this.apiUrl}admin/report?`;
    if (dateFilter) apiUrl += `dateFilter=${dateFilter}&`;
    if (type) apiUrl += `type=${type}&`;
    if (reportType) apiUrl += `reportType=${reportType}&`;
    if (reportSubType) apiUrl += `reportSubType=${reportSubType}&`;
    if (stateId) apiUrl += `stateId=${stateId}&`;
    if (adminId) apiUrl += `adminId=${adminId}&`;
    if (zoneId) apiUrl += `zoneId=${zoneId}&`;
    if (rangeId) apiUrl += `rangeId=${rangeId}&`;
    if (districtId) apiUrl += `districtId=${districtId}&`;
    if (subDivisionId) apiUrl += `subDivisionId=${subDivisionId}&`;
    if (policeStationId) apiUrl += `policeStationId=${policeStationId}&`;
    if (apiUrl.endsWith('&')) {
      apiUrl = apiUrl.slice(0, -1);

    }
    // debugger
    let params = new HttpParams();
    const userData = JSON.parse(sessionStorage.getItem('userInfo') as string);
    let auth: any; 
    let token=null;
    if (userData) {
      token = userData.data.session.accessToken; 
    } 
    return await fetch(apiUrl, {headers: {'Authorization':token}}).then(res=>{
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.blob();
    }).catch(e=>console.log('error in fetch > ', e));
    
    // return this.http.get(apiUrl, {
    //   params,
    //   responseType: 'blob' as 'json' ,
    //   // headers: {'content-type':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
    // })


  }
  
  // getReportsfoAdmin(
  //   dateFilter: any,
  //   type: any,
  //   reportType: any,
  //   reportSubType: any,
  //   stateId: any,
  //   adminId: any,
  //   zoneId: any,
  //   rangeId: any,
  //   districtId: any,
  //   subDivisionId: any,
  //   policeStationId: any
  // ) {
  //   let apiUrl = `${this.apiUrl}admin/report?`;
  //   if (dateFilter) apiUrl += `dateFilter=${dateFilter}&`;
  //   if (type) apiUrl += `type=${type}&`;
  //   if (reportType) apiUrl += `reportType=${reportType}&`;
  //   if (reportSubType) apiUrl += `reportSubType=${reportSubType}&`;
  //   if (stateId) apiUrl += `stateId=${stateId}&`;
  //   if (adminId) apiUrl += `adminId=${adminId}&`;
  //   if (zoneId) apiUrl += `zoneId=${zoneId}&`;
  //   if (rangeId) apiUrl += `rangeId=${rangeId}&`;
  //   if (districtId) apiUrl += `districtId=${districtId}&`;
  //   if (subDivisionId) apiUrl += `subDivisionId=${subDivisionId}&`;
  //   if (policeStationId) apiUrl += `policeStationId=${policeStationId}&`;
  //   if (apiUrl.endsWith('&')) {
  //     apiUrl = apiUrl.slice(0, -1);
  //   }
  //   return this.http.get(apiUrl);
  // }
  
  commonStateList() {
    return this.http.get(`${this.apiUrl}common/state`);
  }
  commonAdminList() {
    return this.http.get(`${this.apiUrl}common/administration`);
  }
  commonZone() {
    return this.http.get(`${this.apiUrl}common/zone`);
  }

  commonRange(){
    return this.http.get(`${this.apiUrl}common/range`);
  }
 
  commonDistrict() {
    return this.http.get(`${this.apiUrl}common/district`);
  }
  commonSubDivision() {
    return this.http.get(`${this.apiUrl}common/subDivision`);
  }
  commonPoliceStation() {
    return this.http.get(`${this.apiUrl}common/policeStation`);
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
  addInventoryType(data:any){
    return this.http.post(`${this.apiUrl}admin/inventoryType`, data);
  }

  UserRegistration(data:any){
    return this.http.post(`${this.apiUrl}admin/user`,data);
    }
    accessControl(data: any) {
        return this.http.post(`${this.apiUrl}admin/accessControl`, data);
    }
    addRole(data: any) {
        return this.http.post(`${this.apiUrl}admin/role`, data);
    }
    addRank(data: any) {
      return this.http.post(`${this.apiUrl}admin/rank`, data);
    }

    addBroadCast(data: FormData) {
      return this.http.post(`${this.apiUrl}common/broadcastMessage`, data);
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
getInventoryTypeId(inventoryTypeId:any){
  return this.http.get(`${this.apiUrl}admin/inventoryType?inventoryTypeId=${inventoryTypeId}`)
}
getAccessControlbyId(accessControlId:any){
  return this.http.get(`${this.apiUrl}admin/accessControl?accessId=${accessControlId}`)
}
getRolebyId(roleId:any){
  return this.http.get(`${this.apiUrl}admin/role?roleId=${roleId}`)
}
getRankbyId(rankId:any){
  return this.http.get(`${this.apiUrl}admin/rank?rankId=${rankId}`)
}

//Delete Details

deleteAdministrationList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/administration?Id=${dataId}`);
}
deleteZoneList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/zone?Id=${dataId}`);
}
deleteRangeList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/range?Id=${dataId}`);
}
deleteDistrictList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/district?Id=${dataId}`);
}
deleteSubDivisiontList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/subDivision?Id=${dataId}`);
}
deletePoliceStationList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/policeStation?Id=${dataId}`);
}
deleteAccessControlList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/accessControl?Id=${dataId}`);
}
deleteRoleList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/role?Id=${dataId}`);
}
deleteRankList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/rank?Id=${dataId}`);
}
deleteInventoryTypeList(dataId:any){
  return this.http.delete(`${this.apiUrl}admin/inventoryType?Id=${dataId}`);
}

//Update Details

updateAdminstration(data: any){
  return this.http.put(`${this.apiUrl}admin/administration`,data);
}
updateZone(data: any){
  return this.http.put(`${this.apiUrl}admin/zone`,data);
}
updateRange(data: any){
  return this.http.put(`${this.apiUrl}admin/range`,data);
}
updateDistrict(data: any){
  return this.http.put(`${this.apiUrl}admin/district`,data);
}
updateSubDivision(data: any){
  return this.http.put(`${this.apiUrl}admin/subDivision`,data);
}
updatePoliceStation(data: any){
  return this.http.put(`${this.apiUrl}admin/policeStation`,data);
}
updateRole(data: any){
  return this.http.put(`${this.apiUrl}admin/role`,data);
}
updateRank(data: any){
  return this.http.put(`${this.apiUrl}admin/rank`,data);
}
updateAccessControl(data: any){
  return this.http.put(`${this.apiUrl}admin/accessControl`,data);
}
updateInventoryType(data:any){
  return this.http.put(`${this.apiUrl}admin/inventoryType`, data);
}

}


