import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

// Components Planning
import { ProdPlanComponent } from './components/planning/prod-plan/prod-plan.component';
import { ProdMachinewiseComponent } from './components/planning/prod-machinewise/prod-machinewise.component';
import { ProdShopfloorwiseComponent } from './components/planning/prod-shopfloorwise/prod-shopfloorwise.component';
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
import { QualityDashboardComponent } from './components/quality/quality-dashboard/quality-dashboard.component';
import { ProdPlantwiseComponent } from './components/planning/prod-plantwise/prod-plantwise.component';
import { ProdAssemblylinewiseComponent } from './components/planning/prod-assemblylinewise/prod-assemblylinewise.component';
import { OeeReportComponent } from './components/report/oee-report/oee-report.component';

// Components Config
import { CompanyComponent } from './components/config/company/company.component';
import { LocationComponent } from './components/config/location/location.component';
import { ShopfloorComponent } from './components/config/shopfloor/shopfloor.component';
import { AssemblylineComponent } from './components/config/assemblyline/assemblyline.component';
import { ProdPlanReportComponent } from './components/report/productionreport/prod-plan-report/prod-plan-report.component';
import { ProdLineConfigComponent } from './components/report/productionreport/prod-line-config/prod-line-config.component';
import { ProdAndonReportComponent } from './components/report/productionreport/prod-andon-report/prod-andon-report.component';
import { DailyInfoComponent } from './components/report/resourcereport/daily-info/daily-info.component';
import { MonthlyInfoComponent } from './components/report/resourcereport/monthly-info/monthly-info.component';
import { QualityManagementReportComponent } from './components/report/qualityreport/quality-management-report/quality-management-report.component';
import { MachineidComponent } from './components/config/machineid/machineid.component';
import { ProductidComponent } from './components/config/productid/productid.component';
import { BreakdownComponent } from './components/config/breakdown/breakdown.component';
import { SubBreakdownComponent } from './components/config/sub-breakdown/sub-breakdown.component';
import { ProdInfoComponent } from './components/planning/prod-info/prod-info.component';
import { SubAssemblylineComponent } from './components/config/sub-assemblyline/sub-assemblyline.component';
import { ProductRecipeComponent } from './components/config/product-recipe/product-recipe.component';
import { DepartmentComponent } from './components/config/department/department.component';
import { DesignationComponent } from './components/config/designation/designation.component';
import { ShiftConfigComponent } from './components/config/shift-config/shift-config.component';
import { SkillMatrixComponent } from './components/config/skill-matrix/skill-matrix.component';
import { BatchComponent } from './components/config/batch/batch.component';
import { PoNoComponent } from './components/config/po-no/po-no.component';
import { MachineDetailsComponent } from './components/production/machine-details/machine-details.component';
import { QcCheckTypeComponent } from './components/config/qc-check-type/qc-check-type.component';
import { FoodPriceComponent } from './components/canteen/food-price/food-price.component';
import { SoloAssemblylineComponent } from './components/production/solo-assemblyline/solo-assemblyline.component';
import { QcDefectTypeComponent } from './components/config/qc-defect-type/qc-defect-type.component';
import { QualityInspectionComponent } from './components/quality/quality-inspection/quality-inspection.component';
import { SpellAssemblylineComponent } from './components/production/spell-assemblyline/spell-assemblyline.component';
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
import { LTWorkstationComponent } from './components/lt-workstation/lt-workstation.component';




@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },

                    // Components Planning
                    { path: 'prod_plan', component: ProdPlanComponent },
                    { path: 'lmc', loadChildren: () => import('./components/planning/lmc/lmc.module').then(m => m.LmcModule) },


                    // Components Production
                    { path: 'machinewise', component: ProdMachinewiseComponent },
                    { path: 'shopfloorwise/:substring', component: ProdShopfloorwiseComponent },
                    { path: 'shopfloorwise2/:substring', component: ProdShopfloorwise2Component },
                    { path: 'assemblylinewise', component: ProdAssemblylinewiseComponent },
                    { path: 'plantwise', component: ProdPlantwiseComponent },
                    { path: 'machine_details', component: MachineDetailsComponent },

                    // Solo Components
                    { path: 'solo_assemblyline', component: SoloAssemblylineComponent },
                    { path: 'solo_plant', component: SoloPlantComponent },
                    { path: 'solo_shopfloor', component: SoloShopfloorComponent },

                    // Spell Assemblyline
                    { path: 'spell_assemblyline', component: SpellAssemblylineComponent },

                    // Components Breakdown
                    { path: 'alert_report', component: AlertReportComponent },
                    { path: 'shopfloorwise_breakdown', component: ShopfloorwiseComponent },
                    { path: 'categorywise_breakdown', component: CategorywiseComponent },
                    { path: 'alert', component: AlertComponent },
                    { path: 'assemblyline_analysis', component: AssemblylineAnalysisComponent },
                    { path: 'machinewise_analysis', component: MachinewiseAnalysisComponent },
                    { path: 'call_help', component: CallHelpComponent },

                    // Components Report
                    { path: 'oee', component: OeeComponent },
                    { path: 'todo', component: TodoComponent },
                    { path: 'oee_report', component: OeeReportComponent },

                    // Components Production Report
                    { path: 'prod_plan_report', component: ProdPlanReportComponent },
                    { path: 'prod_line_config_report', component: ProdLineConfigComponent },
                    { path: 'prod_andon_report', component: ProdAndonReportComponent },
                    { path: 'prod_info', component: ProdInfoComponent },

                    // Components Resource Report
                    { path: 'daily_report', component: DailyInfoComponent },
                    { path: 'monthly_report', component: MonthlyInfoComponent },

                    // Components Quality Report
                    { path: 'quality_report', component: QualityManagementReportComponent },

                    // Components Configuration
                    { path: 'config', component: ConfigurationComponent },

                    // Components Resource
                    { path: 'shift_skill', component: ShiftSkillComponent },
                    { path: 'employee_details', component: EmployeeMasterComponent },
                    { path: 'shift_strength', component: ShiftStrengthComponent },
                    { path: 'monthly_in_out', component: MonthlyReportComponent },
                    { path: 'evacuation', component: EvacuationComponent },
                    { path: 'daily_info', component: DailyReportComponent },

                    // Components Quality
                    { path: 'quality_dashboard', component: QualityDashboardComponent },
                    { path: 'quality_management', component: QualityManagementComponent },
                    { path: 'quality_inspection', component: QualityInspectionComponent },
                    { path: 'machine_quality', component: MachineDetailQualityComponent },
                    { path: 'machine_quality2', component: MachineDetailQuality2Component },
                    { path: 'digital_inspection', component: DigitalQualityInspectionComponent },


                    // Canteen
                    { path: 'canteen', component: FoodPriceComponent },

                    // Components Config
                    { path: 'company', component: CompanyComponent },
                    { path: 'location', component: LocationComponent },
                    { path: 'shopfloor', component: ShopfloorComponent },
                    { path: 'assemblyline', component: AssemblylineComponent },
                    { path: 'sub_assemblyline', component: SubAssemblylineComponent },
                    { path: 'machineid', component: MachineidComponent },
                    { path: 'productid', component: ProductidComponent },
                    { path: 'product_receipe', component: ProductRecipeComponent },
                    { path: 'breakdown_category', component: BreakdownComponent },
                    { path: 'sub_breakdown_category', component: SubBreakdownComponent },
                    { path: 'department', component: DepartmentComponent },
                    { path: 'designation', component: DesignationComponent },
                    { path: 'shift', component: ShiftConfigComponent },
                    { path: 'skill_matrix', component: SkillMatrixComponent },
                    { path: 'batch', component: BatchComponent },
                    { path: 'po_no', component: PoNoComponent },
                    { path: 'QC_check_types', component: QcCheckTypeComponent },
                    { path: 'QC_defect_type', component: QcDefectTypeComponent},

                    // Reports 2
                    { path: 'daily_target', component: DailyTargetComponent },
                    { path: 'weekly_target', component: WeeklyTargetComponent },
                    { path: 'monthly_target', component: MonthlyTargetComponent },

                    // API URL
                    { path: 'api_url', component: ApiUrlComponent },

                    // Dashboards
                    { path: 'line_dash', component: LineDashboardComponent },
                    { path: 'plant_dash', component: PlantDashboardComponent },
                    { path: 'machine_dash', component: MachineDashboardComponent },

                    // SSL Workstation
                    { path: 'filtrex_workstation/:sid/:lid', component: FiltrexWorkstationComponent },
                    { path: 'ssl_workstation/:id', component: SslWorkstationComponent },
                    { path: 'display_board', component: DisplayBoardComponent },
                    { path: 'daily_breakdown', component: DailyBreakdownComponent },
                    { path: 'andon_board', component: AndonBoardComponent },
                    { path: 'home', component: HomeComponent },
                    { path: 'shiftwise_analysis', component: ProdShiftwiseComponent },

                    // New Components
                    { path: 'line_dash2/:substring', component: LineDashboard2Component },
                    { path: 'line_performance', component: LinePerformanceComponent },
                    { path: 'wipro_workstation/:id', component: WiproWorkstationComponent },
                    { path: 'plan_actual', component: PlanActualComponent },
                    { path: 'line_plan_actual/:substring', component: LinePlanActualComponent },

                    { path: 'line_performance_wipro', component: LinePerformanceWiproComponent },
                    { path: 'line_performance_filtrex', component: LinePerformanceFiltrexComponent },
                    { path: 'line_plan_actual_wipro', component: LinePlanActualWiproComponent },
                    { path: 'line_plan_actual_filtrex', component: LinePlanActualFiltrexComponent },

                    { path: 'GE_workstation/:id', component: GeWorkstationComponent },
                    { path: 'line_performance_ge', component: LinePerformanceGeComponent },
                    { path: 'line_plan_actual_ge', component: LinePlanActualGeComponent },

                    { path: 'ge_kanban', component: GeHealthcareComponent },
                    { path: 'filtrex_kanban', component: FiltrexHealthcareComponent },
                    { path: 'shopfloor_plan_actual_filtrex', component: ShopfloorPlanActualFiltrexComponent},

                    // L&T Workstation
                    { path: 'lt_workstation/:shopfloor/:machine', component: LTWorkstationComponent },
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },


        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule  {

}
