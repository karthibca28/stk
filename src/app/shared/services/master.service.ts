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
  pageadminList(pageNumber:number) {
    return this.http.get(`${this.apiUrl}admin/administration?pageNumber=${pageNumber}&pageSize=10`);
  }
  zone() {
    return this.http.get(`${this.apiUrl}admin/zone`);
  }
  range(){
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

}


