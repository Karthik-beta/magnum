import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    private APIUrl = environment.APIUrl;

  constructor(private http:HttpClient) { }

  setApiUrl(url: string): void {
    this.APIUrl = url;
}

  getMaterialTransactionList():Observable<any[]>{
    return this.http.get<any[]>(`${this.APIUrl}/materials/`);
  }

  getDatabaseStatus():Observable<any[]>{
    return this.http.get<any[]>(`${this.APIUrl}/check_database_connection/`);
  }

  //Production Plannning
  getProductionPlan(params: any): Observable<any> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }

    return this.http.get(`${this.APIUrl}/productionPlanning/`, { params: httpParams });
  }

  getProductionPlanById(id: number): Observable<any> {
    return this.http.get(`${this.APIUrl}/productionPlanning/${id}/`);
  }

  addProductionPlan(plan: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/productionPlanning/`, plan);
  }

  updateProductionPlan(plan: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/productionPlanning/${plan.id}/`, plan);
  }

  deleteProductionPlan(itemId: number): Observable<any> {
    return this.http.delete(`${this.APIUrl}/productionPlanning/${itemId}/`);
  }

  getRecentOrders(params: any): Observable<any> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }

    return this.http.get(`${this.APIUrl}/recentOrders/`, { params: httpParams });
  }

  //Retrive Lists
  getProductList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/product/');
  }

  getBatchList():Observable<any[]>{
    return this.http.get<any[]>(`${this.APIUrl}/batch/`);
  }

  getPoNoList():Observable<any[]>{
    return this.http.get<any[]>(`${this.APIUrl}/poNo/`);
  }

  // LMC Component
  getAllMachineSlotConfig():Observable<any[]>{
    return this.http.get<any[]>(`${this.APIUrl}/lmcSlotConfigViewAll/`);
  }

  getLineMachineConfig(params: any): Observable<any> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }

    return this.http.get(`${this.APIUrl}/lineMachineConfig/`, { params: httpParams });
  }

  addLineMachineConfigSlot(slot: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/lineMachineSlotConfig/`, slot);
  }

  getLineMachineConfigSlot(params: any): Observable<any> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }

    return this.http.get(`${this.APIUrl}/lineMachineSlotConfig/`, { params: httpParams });
  }

  getProdPlanById(params: any): Observable<any> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }

    return this.http.get(`${this.APIUrl}/productionPlanById/`, { params: httpParams });
  }

  getAllOpenJobWork(): Observable<any> {
    return this.http.get<any[]>(`${this.APIUrl}/openJobWorks/`);
  }

  getMostOrderedProducts(): Observable<any> {
    return this.http.get<any[]>(`${this.APIUrl}/mostOrderedProducts/`);
  }

  // Andon Production
  getMachineWiseData(): Observable<any> {
    return this.http.get(`${this.APIUrl}/machineWiseData/`);
  }

  getMachineList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/machine/');
  }

  // Production Andon - Machinewise
  updateMachineWiseData(plan: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/machineWiseData/${plan.id}/`, plan);
  }


  // Breakdown
  downloadAndonData(): Observable<any> {
    return this.http.get(`${this.APIUrl}/export/`, {
      responseType: 'blob' as 'json', // Set the response type to 'blob' for binary data
    });
  }

  getMetricsData():Observable<any[]>{
    return this.http.get<any[]>(`${this.APIUrl}/metrics/`);
  }

  getAndList(params: any): Observable<any> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }
    return this.http.get(`${this.APIUrl}/andon/`, { params: httpParams });
  }

  createAndonData(plan: any): Observable<any> {
    return this.http.post(`${this.APIUrl}/andon/`, plan);
  }

  updateAndonData(plan: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/andon/${plan.id}/`, plan);
  }

  patchAndonData(plan: any): Observable<any> {
    return this.http.patch(`${this.APIUrl}/andon/${plan.id}/`, plan);
  }

  getAndonOpenAlerts():Observable<any[]>{
    return this.http.get<any[]>(`${this.APIUrl}/andon_open/`);
  }

  // Resource

  // Employee Master
  deleteEmployee(id: number){
    return this.http.delete(this.APIUrl+'/employee/'+id);
  }

  getEmployeeList(params: any): Observable<any> {
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, params[key]);
      }
    }

    return this.http.get(`${this.APIUrl}/employee/`, { params: httpParams });
  }



  // Components Config

  // Company
  getCompanyList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/company/');
  }

  addCompany(val:any){
    return this.http.post(this.APIUrl+'/company/',val);
  }

  updateCompany(val:any){
    return this.http.put(this.APIUrl+'/company/',val);
  }

  deleteCompany(id: number){
    return this.http.delete(this.APIUrl+'/company/'+id);
  }

  // Location/Plant

  getLocation():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/location/');
  }

  getPlantList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/plant/');
  }

  addPlant(val:any){
    return this.http.post(this.APIUrl+'/plant/',val);
  }

  updatePlant(val:any){
    return this.http.put(this.APIUrl+'/plant/',val);
  }

  deletePlant(id: number){
    return this.http.delete(this.APIUrl+'/location/'+id);
  }

    // Shopfloor
  getShopFloorList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/shopfloor/');
  }

  addShopFloor(val:any){
    return this.http.post(this.APIUrl+'/shopfloor/',val);
  }

  updateShopFloor(val:any){
    return this.http.put(this.APIUrl+'/shopfloor/',val);
  }

  deleteShopFloor(id: number){
    return this.http.delete(this.APIUrl+'/shopfloor/'+id);
  }

    // Assemblyline
  getAssemblyLineList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/assemblyline/');
  }

  addAssemblyLine(val:any){
    return this.http.post(this.APIUrl+'/assemblyline/',val);
  }

  updateAssemblyLine(val:any){
    return this.http.put(this.APIUrl+'/assemblyline/',val);
  }

  deleteAssemblyLine(id: number){
    return this.http.delete(this.APIUrl+'/assemblyline/'+id);
  }

  // Sub-Assemblyline
  getsubAssemblyLineList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/subAssemblyLine/');
  }

  addsubAssemblyLine(val:any){
    return this.http.post(this.APIUrl+'/subAssemblyLine/',val);
  }

  updatesubAssemblyLine(val:any){
    return this.http.put(this.APIUrl+'/subAssemblyLine/',val);
  }

  deletesubAssemblyLine(id: number){
    return this.http.delete(this.APIUrl+'/subAssemblyLine/'+id);
  }

  // Breakdown Category
  getBreakdowncategoryList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/breakdown_category/');
  }

  addBreakdowncategory(val:any){
    return this.http.post(this.APIUrl+'/breakdown_category/',val);
  }

  updateBreakdowncategory(val:any){
    return this.http.put(this.APIUrl+'/breakdown_category/',val);
  }

  deleteBreakdowncategory(id: number){
    return this.http.delete(this.APIUrl+'/breakdown_category/'+id);
  }

  // Sub-Breakdown Category
  getsubBreakdownCategoryList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/subBreakdownCategory/');
  }

  addsubBreakdownCategory(val:any){
    return this.http.post(this.APIUrl+'/subBreakdownCategory/',val);
  }

  updatesubBreakdownCategory(val:any){
    return this.http.put(this.APIUrl+'/subBreakdownCategory/',val);
  }

  deletesubBreakdownCategory(id: number){
    return this.http.delete(this.APIUrl+'/subBreakdownCategory/'+id);
  }

  // Product Receipe
  getProductreceipeList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/productReceipe/');
  }

  addProductReceipe(recipeData:any){
    return this.http.post(this.APIUrl+'/productReceipe/', recipeData);
  }

  updateProductreceipe(val:any){
    return this.http.put(this.APIUrl+'/productReceipe/',val);
  }

  deleteProductreceipe(id: number){
    return this.http.delete(this.APIUrl+'/productReceipe/'+id);
  }

  // Department
  getDepList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/department/');
  }

  addDepartment(val:any){
    return this.http.post(this.APIUrl+'/department/',val);
  }

  updateDepartment(val:any){
    return this.http.put(this.APIUrl+'/department/',val);
  }

  deleteDepartment(id: number){
    return this.http.delete(this.APIUrl+'/department/'+id);
  }

  // Designation
  getDesList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/designation/');
  }

  addDesignation(val:any){
    return this.http.post(this.APIUrl+'/designation/',val);
  }

  updateDesignation(val:any){
    return this.http.put(this.APIUrl+'/designation/',val);
  }

  deleteDesignation(id: number){
    return this.http.delete(this.APIUrl+'/designation/'+id);
  }

  // Dashboard Cards
  getDashCardCount():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/dash_card_count');
  }

  // Production Stats
  getProductionStats():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/production_stats')
  }

  downloadMachineWiseData(): Observable<any> {
    return this.http.get(`${this.APIUrl}/export_excel/`, {
      responseType: 'blob' as 'json', // Set the response type to 'blob' for binary data
    });
  }

  // AssemblyLine Wise Data
  getAssemblyLineWiseData():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/assemblylinewise')
  }

  updateAssemblyLineWiseData(plan: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/assemblylinewise/${plan.id}/`, plan);
  }

  // Solo Assemblyline
  getSoloAssemblyLineList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/soloAssemblyLineWise/');
  }

  updateSoloAssemblyLineData(plan: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/soloAssemblyLineWise/${plan.id}/`, plan);
  }

  // Spell Assemblyline
  getSpellAssemblyLineList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/spellAssemblyLineWise/');
  }

  updateSpellAssemblyLineData(plan: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/spellAssemblyLineWise/${plan.id}/`, plan);
  }

  // Calender Blocked Dates
  getBlockedDates():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/blocked_dates/');
  }

  // Get Production Report
  getProductionReport():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/productionReport/');
  }

  // Download Production Report
  downloadProductionReport(): Observable<any> {
    return this.http.get(`${this.APIUrl}/productionReportExcel/`, {
      responseType: 'blob' as 'json', // Set the response type to 'blob' for binary data
    });
  }

  // Get QC Defect Types
    getQcDefectTypes():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/qc_defect_type/');
    }

    // Get Shift Timing
    getShiftTiming():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/shift/');
    }

    // Get ProductionAndon
    getProductionAndon():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/productionAndon/');
    }

    getAllMachineDetails():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/allMachine/');
    }

    getSingleMachineDetails(params: any):Observable<any[]>{
        let httpParams = new HttpParams();

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                httpParams = httpParams.append(key, params[key]);
            }
        }

        return this.http.get<any[]>(this.APIUrl+'/machineStatus/', { params: httpParams });
    }

    getShopfloorStatus():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/shopfloorStatus/');
    }

    getShopfloorStatus2():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/shopfloorStatus2/');
    }

    downloadShopfloorStatus(params: any): Observable<any> {
        let httpParams = new HttpParams();

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                httpParams = httpParams.append(key, params[key]);
            }
        }

        return this.http.get(`${this.APIUrl}/shopfloorStatus/export/`, {
            params: httpParams,
            responseType: 'blob' as 'json', // Set the response type to 'blob' for binary data
        });
    }

    downloadShopfloorStatus2(params: any): Observable<any> {
        let httpParams = new HttpParams();

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                httpParams = httpParams.append(key, params[key]);
            }
        }

        return this.http.get(`${this.APIUrl}/shopfloorStatus2/export/`, {
            params: httpParams,
            responseType: 'blob' as 'json', // Set the response type to 'blob' for binary data
        });
    }

    getAndonCategoryStats():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/andon_category_stats/');
    }

    getMachineBreakdownToday():Observable<any[]>{
        return this.http.get<any[]>(this.APIUrl+'/machine_breakdown_today/');
    }
}
