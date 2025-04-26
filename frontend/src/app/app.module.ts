import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { SharedService } from './shared.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from "primeng/calendar";


import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { SplitButtonModule } from 'primeng/splitbutton';
import { UIkitModule } from './demo/components/uikit/uikit.module';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';

import { ProdPlanComponent } from './components/planning/prod-plan/prod-plan.component';
import { AddEditProdPlanComponent } from './components/planning/prod-plan/add-edit-prod-plan/add-edit-prod-plan.component';
import { ProdMachinewiseComponent } from './components/planning/prod-machinewise/prod-machinewise.component';
import { AddEditProdMachinewiseComponent } from './components/planning/prod-machinewise/add-edit-prod-machinewise/add-edit-prod-machinewise.component';
import { ProdShopfloorwiseComponent } from './components/planning/prod-shopfloorwise/prod-shopfloorwise.component';
import { ShiftComponent } from './components/microfunctions/shift/shift.component';
import { AlertReportComponent } from './components/breakdown/alert-report/alert-report.component';
import { ShopfloorwiseComponent } from './components/breakdown/shopfloorwise/shopfloorwise.component';
import { CategorywiseComponent } from './components/breakdown/categorywise/categorywise.component';
import { AlertComponent } from './components/breakdown/alert/alert.component';
import { AssemblylineAnalysisComponent } from './components/breakdown/assemblyline-analysis/assemblyline-analysis.component';
import { MachinewiseAnalysisComponent } from './components/breakdown/machinewise-analysis/machinewise-analysis.component';
import { CallHelpComponent } from './components/breakdown/call-help/call-help.component';
import { ShiftSkillComponent } from './components/resource/shift-skill/shift-skill.component';
import { EmployeeMasterComponent } from './components/resource/employee-master/employee-master.component';
import { ShiftStrengthComponent } from './components/resource/shift-strength/shift-strength.component';
import { MonthlyReportComponent } from './components/resource/monthly-report/monthly-report.component';
import { EvacuationComponent } from './components/resource/evacuation/evacuation.component';
import { DailyReportComponent } from './components/resource/daily-report/daily-report.component';
import { QualityManagementComponent } from './components/quality/quality-management/quality-management.component';


import { OeeComponent } from './components/report/oee/oee.component';
import { TodoComponent } from './components/report/todo/todo.component';
import { ConfigurationComponent } from './components/config/configuration/configuration.component';
import { CompanyComponent } from './components/config/company/company.component';
import { LocationComponent } from './components/config/location/location.component';
import { ShopfloorComponent } from './components/config/shopfloor/shopfloor.component';
import { AssemblylineComponent } from './components/config/assemblyline/assemblyline.component';
import { SubAssemblylineComponent } from './components/config/sub-assemblyline/sub-assemblyline.component';
import { MachineidComponent } from './components/config/machineid/machineid.component';
import { ProductidComponent } from './components/config/productid/productid.component';
import { ProductRecipeComponent } from './components/config/product-recipe/product-recipe.component';
import { BreakdownComponent } from './components/config/breakdown/breakdown.component';
import { SubBreakdownComponent } from './components/config/sub-breakdown/sub-breakdown.component';
import { DepartmentComponent } from './components/config/department/department.component';
import { DesignationComponent } from './components/config/designation/designation.component';
import { QualityDashboardComponent } from './components/quality/quality-dashboard/quality-dashboard.component';
import { ProdPlantwiseComponent } from './components/planning/prod-plantwise/prod-plantwise.component';
import { ProdAssemblylinewiseComponent } from './components/planning/prod-assemblylinewise/prod-assemblylinewise.component';
import { OeeReportComponent } from './components/report/oee-report/oee-report.component';
import { ProdPlanReportComponent } from './components/report/productionreport/prod-plan-report/prod-plan-report.component';
import { ProdLineConfigComponent } from './components/report/productionreport/prod-line-config/prod-line-config.component';
import { ProdAndonReportComponent } from './components/report/productionreport/prod-andon-report/prod-andon-report.component';
import { DailyInfoComponent } from './components/report/resourcereport/daily-info/daily-info.component';
import { MonthlyInfoComponent } from './components/report/resourcereport/monthly-info/monthly-info.component';
import { QualityManagementReportComponent } from './components/report/qualityreport/quality-management-report/quality-management-report.component';
import { ProdInfoComponent } from './components/planning/prod-info/prod-info.component';
import { SkillMatrixComponent } from './components/config/skill-matrix/skill-matrix.component';
import { BatchComponent } from './components/config/batch/batch.component';
import { PoNoComponent } from './components/config/po-no/po-no.component';
import { ShiftConfigComponent } from './components/config/shift-config/shift-config.component';
import { MachineDetailsComponent } from './components/production/machine-details/machine-details.component';
import { QcCheckTypeComponent } from './components/config/qc-check-type/qc-check-type.component';
import { ProdStatsComponent } from './components/microfunctions/prod-stats/prod-stats.component';
import { FoodPriceComponent } from './components/canteen/food-price/food-price.component';
import { SoloAssemblylineComponent } from './components/production/solo-assemblyline/solo-assemblyline.component';
import { AddEditSoloAssemblylineComponent } from './components/production/solo-assemblyline/add-edit-solo-assemblyline/add-edit-solo-assemblyline.component';
import { QcDefectTypeComponent } from './components/config/qc-defect-type/qc-defect-type.component';
import { QualityInspectionComponent } from './components/quality/quality-inspection/quality-inspection.component';
import { SpellAssemblylineComponent } from './components/production/spell-assemblyline/spell-assemblyline.component';
import { AddEditSpellAssemblylineComponent } from './components/production/spell-assemblyline/add-edit-spell-assemblyline/add-edit-spell-assemblyline.component';
import { MachineDetailQualityComponent } from './components/quality/machine-detail-quality/machine-detail-quality.component';
import { DigitalQualityInspectionComponent } from './components/quality/digital-quality-inspection/digital-quality-inspection.component';
import { MachineDetailQuality2Component } from './components/quality/machine-detail-quality2/machine-detail-quality2.component';
import { SoloPlantComponent } from './components/production/solo-plant/solo-plant.component';
import { SoloShopfloorComponent } from './components/production/solo-shopfloor/solo-shopfloor.component';
import { DailyTargetComponent } from './components/report2/daily-target/daily-target.component';
import { WeeklyTargetComponent } from './components/report2/weekly-target/weekly-target.component';
import { MonthlyTargetComponent } from './components/report2/monthly-target/monthly-target.component';
import { ApiUrlComponent } from './components/config/api-url/api-url.component';
import { LineDashboardComponent } from './components/dashboard/line-dashboard/line-dashboard.component';
import { PlantDashboardComponent } from './components/dashboard/plant-dashboard/plant-dashboard.component';
import { MachineDashboardComponent } from './components/dashboard/machine-dashboard/machine-dashboard.component';
import { ProdShopfloorwise2Component } from './components/planning/prod-shopfloorwise2/prod-shopfloorwise2.component';
import { TimeComponent } from './components/microfunctions/time/time.component';
import { SslWorkstationComponent } from './components/ssl-workstation/ssl-workstation.component';
import { DisplayBoardComponent } from './components/breakdown/display-board/display-board.component';
import { DailyBreakdownComponent } from './components/breakdown/daily-breakdown/daily-breakdown.component';
import { AndonBoardComponent } from './components/breakdown/andon-board/andon-board.component';
import { HomeComponent } from './components/home/home.component';
import { ProdShiftwiseComponent } from './components/planning/prod-shiftwise/prod-shiftwise.component';
import { LineDashboard2Component } from './components/dashboard/line-dashboard2/line-dashboard2.component';
import { LinePerformanceComponent } from './components/dashboard/line-performance/line-performance.component';
import { WiproWorkstationComponent } from './components/wipro-workstation/wipro-workstation.component';
import { PlanActualComponent } from './components/production/plan-actual/plan-actual.component';
import { LinePlanActualComponent } from './components/production/line-plan-actual/line-plan-actual.component';
import { FiltrexWorkstationComponent } from './components/filtrex-workstation/filtrex-workstation.component';
import { LinePerformanceWiproComponent } from './components/dashboard/line-performance-wipro/line-performance-wipro.component';
import { LinePerformanceFiltrexComponent } from './components/dashboard/line-performance-filtrex/line-performance-filtrex.component';
import { LinePlanActualWiproComponent } from './components/production/line-plan-actual-wipro/line-plan-actual-wipro.component';
import { LinePlanActualFiltrexComponent } from './components/production/line-plan-actual-filtrex/line-plan-actual-filtrex.component';
import { GeWorkstationComponent } from './components/ge-workstation/ge-workstation.component';
import { LinePerformanceGeComponent } from './components/dashboard/line-performance-ge/line-performance-ge.component';
import { LinePlanActualGeComponent } from './components/production/line-plan-actual-ge/line-plan-actual-ge.component';
import { GeHealthcareComponent } from './components/kanban/ge-healthcare/ge-healthcare.component';
import { FiltrexHealthcareComponent } from './components/kanban/filtrex-healthcare/filtrex-healthcare.component';
import { ShopfloorPlanActualFiltrexComponent } from './components/production/shopfloor-plan-actual-filtrex/shopfloor-plan-actual-filtrex.component';




@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, ProdPlanComponent, AddEditProdPlanComponent, ProdMachinewiseComponent, AddEditProdMachinewiseComponent,
        ProdShopfloorwiseComponent, ShiftComponent, AlertReportComponent, ShopfloorwiseComponent, CategorywiseComponent,
        AlertComponent, AssemblylineAnalysisComponent, MachinewiseAnalysisComponent, CallHelpComponent, ShiftSkillComponent,
        EmployeeMasterComponent, ShiftStrengthComponent, MonthlyReportComponent, EvacuationComponent, DailyReportComponent,
        QualityManagementComponent, OeeComponent, TodoComponent, ConfigurationComponent, CompanyComponent,
        LocationComponent, ShopfloorComponent, AssemblylineComponent, SubAssemblylineComponent, MachineidComponent, ProductidComponent,
        ProductRecipeComponent, BreakdownComponent, SubBreakdownComponent, DepartmentComponent, DesignationComponent,
        QualityDashboardComponent, ProdPlantwiseComponent, ProdAssemblylinewiseComponent, OeeReportComponent, ProdPlanReportComponent,
        ProdLineConfigComponent, ProdAndonReportComponent, DailyInfoComponent, MonthlyInfoComponent, QualityManagementReportComponent,
        ProdInfoComponent, SkillMatrixComponent, BatchComponent, PoNoComponent, ShiftConfigComponent, MachineDetailsComponent,
        QcCheckTypeComponent, ProdStatsComponent, FoodPriceComponent, SoloAssemblylineComponent, AddEditSoloAssemblylineComponent,
        QcDefectTypeComponent, QualityInspectionComponent, SpellAssemblylineComponent, AddEditSpellAssemblylineComponent,
        MachineDetailQualityComponent, DigitalQualityInspectionComponent, MachineDetailQuality2Component, SoloPlantComponent,
        SoloShopfloorComponent, DailyTargetComponent, WeeklyTargetComponent, MonthlyTargetComponent, ApiUrlComponent,
        LineDashboardComponent, PlantDashboardComponent, MachineDashboardComponent, ProdShopfloorwise2Component, TimeComponent, SslWorkstationComponent, DisplayBoardComponent, DailyBreakdownComponent, AndonBoardComponent, HomeComponent, ProdShiftwiseComponent, LineDashboard2Component, LinePerformanceComponent, WiproWorkstationComponent, PlanActualComponent, LinePlanActualComponent, FiltrexWorkstationComponent, LinePerformanceWiproComponent, LinePerformanceFiltrexComponent, LinePlanActualWiproComponent, LinePlanActualFiltrexComponent, GeWorkstationComponent, LinePerformanceGeComponent, LinePlanActualGeComponent, GeHealthcareComponent, FiltrexHealthcareComponent, ShopfloorPlanActualFiltrexComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,

        //components WIP
        CardModule,
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        InputTextModule,
        SplitButtonModule,
        UIkitModule,
        CalendarModule,
        ToggleButtonModule,
        SelectButtonModule,
        DividerModule,
        DockModule,
        ProgressBarModule,
        ConfirmDialogModule,
        ToastModule,
        TooltipModule,
        KeyFilterModule,
        FieldsetModule,
        TagModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, SharedService, MessageService, ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
