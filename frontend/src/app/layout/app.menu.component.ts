import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            { label: 'Home' },
            { separator: true },
            {
                // label: 'Home',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },


                ]


            },

            //planning
            {
                label: 'Production Management',
                items: [
                    { label: 'Production Planning', icon: 'fa-solid fa-calendar', routerLink: ['/prod_plan'] },
                    { label: 'Production Planning Control', icon: 'fa-solid fa-cog', routerLink: ['/lmc/view_lmc'] },
                ]
            },

            //production
            // {
            //     label: 'Resource Management',
            //     items: [
            //         {
            //             label: 'Resource Management', icon: 'fa-solid fa-user',
            //             items: [
            //                 {
            //                     label: 'Dashboard', icon: 'fa-solid fa-tachometer',
            //                     items: [
            //                         { label: 'Shift Strength V/S Skill Matrix', icon: 'fa-solid fa-scale-balanced', routerLink: ['/shift_skill'] },
            //                         { label: 'Shift Strength', icon: 'fa-solid fa-users', routerLink: ['/shift_strength'] },
            //                         { label: 'Evacuation', icon: 'fa-solid fa-right-from-bracket', routerLink: ['/evacuation']},
            //                     ]
            //                 },
            //                 { label: 'Onboarding', icon: 'fa-solid fa-user-plus', routerLink: ['/employee_details'] },
            //                 {
            //                     label: 'Resource Allocation', icon: 'fa-solid fa-sliders',
            //                     items: [
            //                         { label: 'Shift management', icon: 'fa-solid fa-list-check', routerLink: ['/shift_skill'] },
            //                         { label: 'Reserve Skill Matrix Employee', icon: 'fa-solid fa-people-roof', routerLink: ['/shift_strength'] },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Attendance Regularization', icon: 'fa-solid fa-people-roof',
            //                     items: [
            //                         { label: 'Missed Punch Management', icon: 'fa-solid fa-fingerprint' },
            //                         { label: 'Leave Management', icon: 'fa-solid fa-calendar-days' },
            //                         { label: 'Compensatory Off Management', icon: 'fa-solid fa-calendar-plus' },
            //                         { label: 'On Duty Management', icon: 'fa-solid fa-calendar-minus' },
            //                         { label: 'Gate Pass Management', icon: 'fa-solid fa-address-card' },
            //                         { label: 'Holiday Management', icon: 'fa-solid fa-calendar-check' },
            //                     ]
            //                 },
            //                 { label: 'Daily Attendance Info', icon: 'fa-solid fa-calendar-days', routerLink: ['/daily_info'] },
            //                 {
            //                     label: 'Monthly Info', icon: 'fa-solid fa-calendar',
            //                     items: [
            //                         { label: 'Monthly In - Out', icon: 'fa-solid fa-clock', routerLink: ['/monthly_in_out'] },
            //                         { label: 'Monthly In – Out Register', icon: 'fa-solid fa-calendar-days' },
            //                         { label: 'Monthly Muster Roll Register', icon: 'fa-solid fa-calendar-plus' },
            //                         { label: 'Payroll Output Register', icon: 'fa-solid fa-calendar-plus' },
            //                     ]
            //                 }
            //             ]
            //         },
            //     ]
            // },

            {
                label: 'GE Healthcare Workstation',
                items: [
                    { label: 'Workstations', icon: 'fa-solid fa-cogs',
                        items: [
                            { label: 'M1', icon: 'fa-solid fa-cogs', routerLink: ['/GE_workstation/1'] },
                            { label: 'M2', icon: 'fa-solid fa-cogs', routerLink: ['/GE_workstation/2'] },
                        ]
                    },
                    { label: 'Production Kanban Board', icon: 'fa-solid fa-cogs', routerLink: ['/ge_kanban'] },
                    { label: 'Line Performance', icon: 'fa-solid fa-cogs', routerLink: ['/line_performance_ge'] },
                    { label: 'Line Plan vs Actual', icon: 'fa-solid fa-cogs', routerLink: ['/line_plan_actual_ge'] },
                ],
            },

            {
                label: 'Line: Wipro Workstations',
                items: [
                    { label: 'Workstations', icon: 'fa-solid fa-cogs',
                        items: [
                            { label: 'Workstation - 001', icon: 'fa-solid fa-cogs', routerLink: ['/wipro_workstation/1'] },
                            { label: 'Workstation - 002', icon: 'fa-solid fa-cogs', routerLink: ['/wipro_workstation/2'] },
                            { label: 'Workstation - 003', icon: 'fa-solid fa-cogs', routerLink: ['/wipro_workstation/3'] },
                            { label: 'Workstation - 004', icon: 'fa-solid fa-cogs', routerLink: ['/wipro_workstation/4'] },
                            { label: 'Workstation - 005', icon: 'fa-solid fa-cogs', routerLink: ['/wipro_workstation/5'] },
                        ]
                    },
                    { label: 'Line Performance', icon: 'fa-solid fa-cogs', routerLink: ['/line_performance_wipro'] },
                    { label: 'Line Plan vs Actual', icon: 'fa-solid fa-cogs', routerLink: ['/line_plan_actual_wipro'] },
                ],
            },

            {
                label: 'Line: SSL Workstations',
                items: [
                    { label: 'Workstations', icon: 'fa-solid fa-cogs',
                        items: [
                            { label: 'Workstation - 001', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/1'] },
                            { label: 'Workstation - 002', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/2'] },
                            { label: 'Workstation - 003', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/3'] },
                            { label: 'Workstation - 004', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/4'] },
                            { label: 'Workstation - 005', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/5'] },
                            { label: 'Line Performance', icon: 'fa-solid fa-cogs', routerLink: ['/line_performance'] },
                            { label: 'Line Plan vs Actual', icon: 'fa-solid fa-cogs', routerLink: ['/line_plan_actual'] },
                        ]
                    },
                ],
            },

            {
                label: 'Shopfloor Filtrex',
                items: [
                        {
                            label: 'Shopfloor 1', icon: 'fa-solid fa-building',
                            items: [
                                { label: 'Asset Performance vs Breakdown Andon', icon: 'fa-solid fa-cogs',
                                    items: [
                                        { label: 'Line 1', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s1/l1'] },
                                        { label: 'Line 2', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s1/l2'] },
                                        { label: 'Line 3', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s1/l3'] },
                                        { label: 'Line 4', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s1/l4'] },
                                        { label: 'Line 5', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s1/l5'] },
                                    ]
                                },
                                { label: 'Production Kanban Board', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_kanban'] },
                                { label: 'Asset Performance', icon: 'fa-solid fa-industry', routerLink: ['/line_dash2'] },
                                { label: 'Asset On vs Idle vs Breakdown Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise'] },
                                { label: 'Asset On vs Idle Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise2'] },
                                { label: 'Asset Plan vs Actual', icon: 'fa-solid fa-industry', routerLink: ['/line_plan_actual_filtrex'] },
                                { label: 'Shopfloor Plan vs Actual', icon: 'fa-solid fa-cogs', routerLink: ['/shopfloor_plan_actual_filtrex'] },
                                ]
                        },
                        {
                            label: 'Shopfloor 2', icon: 'fa-solid fa-building',
                            items: [
                                { label: 'Asset Performance vs Breakdown Andon', icon: 'fa-solid fa-cogs',
                                    items: [
                                        { label: 'Line 1', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s2/l1'] },
                                        { label: 'Line 2', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s2/l2'] },
                                        { label: 'Line 3', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s2/l3'] },
                                        { label: 'Line 4', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s2/l4'] },
                                        { label: 'Line 5', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s2/l5'] },
                                    ]
                                },
                                { label: 'Production Kanban Board', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_kanban'] },
                                { label: 'Asset Performance', icon: 'fa-solid fa-industry', routerLink: ['/line_dash2'] },
                                { label: 'Asset On vs Idle vs Breakdown Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise'] },
                                { label: 'Asset On vs Idle Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise2'] },
                                { label: 'Asset Plan vs Actual', icon: 'fa-solid fa-industry', routerLink: ['/line_plan_actual_filtrex'] },
                                { label: 'Shopfloor Plan vs Actual', icon: 'fa-solid fa-cogs', routerLink: ['/shopfloor_plan_actual_filtrex'] },
                                ]
                        },
                        {
                            label: 'Shopfloor 3', icon: 'fa-solid fa-building',
                            items: [
                                { label: 'Asset Performance vs Breakdown Andon', icon: 'fa-solid fa-cogs',
                                    items: [
                                        { label: 'Line 1', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s3/l1'] },
                                        { label: 'Line 2', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s3/l2'] },
                                        { label: 'Line 3', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s3/l3'] },
                                        { label: 'Line 4', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s3/l4'] },
                                        { label: 'Line 5', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_workstation/s3/l5'] },
                                    ]
                                },
                                { label: 'Production Kanban Board', icon: 'fa-solid fa-cogs', routerLink: ['/filtrex_kanban'] },
                                { label: 'Asset Performance', icon: 'fa-solid fa-industry', routerLink: ['/line_dash2'] },
                                { label: 'Asset On vs Idle vs Breakdown Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise'] },
                                { label: 'Asset On vs Idle Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise2'] },
                                { label: 'Asset Plan vs Actual', icon: 'fa-solid fa-industry', routerLink: ['/line_plan_actual_filtrex'] },
                                { label: 'Shopfloor Plan vs Actual', icon: 'fa-solid fa-cogs', routerLink: ['/shopfloor_plan_actual_filtrex'] },
                                ]
                        },
                        { label: 'Asset Performance', icon: 'fa-solid fa-industry', routerLink: ['/line_dash2'] },
                        { label: 'Asset Plan vs Actual', icon: 'fa-solid fa-industry', routerLink: ['/machine_details'] },
                        { label: 'Line Performance', icon: 'fa-solid fa-cogs', routerLink: ['/line_performance_filtrex'] },
                        { label: 'Line Plan vs Actual', icon: 'fa-solid fa-cogs', routerLink: ['/line_plan_actual_filtrex'] },
                ],
            },

            {
                label: 'Shopfloor L&T',
                items: [
                        {
                            label: 'Metal Shopfloor', icon: 'fa-solid fa-building',
                            items: [
                                { label: 'Asset Performance vs Breakdown Andon', icon: 'fa-solid fa-cogs',
                                    items: [
                                        { label: 'Machine 1', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/1'] },
                                        { label: 'Machine 2', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/2'] },
                                        { label: 'Machine 3', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/3'] },
                                        { label: 'Machine 4', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/4'] },
                                        { label: 'Machine 5', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/5'] },
                                    ]
                                },
                                { label: 'Asset Performance', icon: 'fa-solid fa-industry', routerLink: ['/line_dash2/1'] },
                                { label: 'Asset On vs Idle vs Breakdown Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise/1'] },
                                { label: 'Asset On vs Idle Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise2/1'] },
                                { label: 'Asset Plan vs Actual', icon: 'fa-solid fa-industry', routerLink: ['/line_plan_actual/1'] },
                                ]
                        },
                        {
                            label: 'ORT Shopfloor', icon: 'fa-solid fa-building',
                            items: [
                                { label: 'Asset Performance vs Breakdown Andon', icon: 'fa-solid fa-cogs',
                                    items: [
                                        { label: 'Machine 1', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/1'] },
                                        { label: 'Machine 2', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/2'] },
                                        { label: 'Machine 3', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/3'] },
                                        { label: 'Machine 4', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/4'] },
                                        { label: 'Machine 5', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/5'] },
                                    ]
                                },
                                { label: 'Asset Performance', icon: 'fa-solid fa-industry', routerLink: ['/line_dash2/2'] },
                                { label: 'Asset On vs Idle vs Breakdown Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise/2'] },
                                { label: 'Asset On vs Idle Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise2/2'] },
                                { label: 'Asset Plan vs Actual', icon: 'fa-solid fa-industry', routerLink: ['/line_plan_actual/2'] },
                                ]
                        },
                        {
                            label: 'Steelwaler Shopfloor', icon: 'fa-solid fa-building',
                            items: [
                                { label: 'Asset Performance vs Breakdown Andon', icon: 'fa-solid fa-cogs',
                                    items: [
                                        { label: 'Machine 1', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/1'] },
                                        { label: 'Machine 2', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/2'] },
                                        { label: 'Machine 3', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/3'] },
                                        { label: 'Machine 4', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/4'] },
                                        { label: 'Machine 5', icon: 'fa-solid fa-cogs', routerLink: ['/ssl_workstation/5'] },
                                    ]
                                },
                                { label: 'Asset Performance', icon: 'fa-solid fa-industry', routerLink: ['/line_dash2/3'] },
                                { label: 'Asset On vs Idle vs Breakdown Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise/3'] },
                                { label: 'Asset On vs Idle Hours', icon: 'fa-solid fa-industry', routerLink: ['/shopfloorwise2/3'] },
                                { label: 'Asset Plan vs Actual', icon: 'fa-solid fa-industry', routerLink: ['/line_plan_actual/3'] },
                                ]
                        },
                        // { label: 'Asset Performance', icon: 'fa-solid fa-industry', routerLink: ['/line_dash2'] },
                        // { label: 'Asset Plan vs Actual', icon: 'fa-solid fa-industry', routerLink: ['/machine_details'] },
                ],
            },

            {
                label: 'Production Andon', icon: 'fa-solid fa-chart-bar',
                items: [
                    {
                        label: 'Plant Dashboard', icon: 'fa-solid fa-industry',
                        // routerLink: ['/plant_dash']
                        items: [
                            { label: 'Plant Overview', icon: 'fa-solid fa-industry', routerLink: ['/dashboard'] },
                            { label: 'Production Overview', icon: 'fa-solid fa-industry', routerLink: ['/plant_dash'] },
                            // { label: 'Breakdown Dashboard', icon: 'fa-solid fa-chart-bar', routerLink: ['/line_dash'] },
                            // { label: 'Quality Dashboard', icon: 'fa-solid fa-cogs' },
                            // { label: 'Resource Dashboard', icon: 'fa-solid fa-cogs'},
                            // { label: 'OEE Dashboard', icon: 'fa-solid fa-cogs'}
                        ]
                    },
                    { label: 'Plan vs Actual', icon: 'fa-solid fa-tachometer', routerLink: ['/plan_actual'] },
                    // { label: 'Line Dashboard', icon: 'fa-solid fa-chart-bar', routerLink: ['/line_dash'] },
                    // { label: 'Machine Dashboard', icon: 'fa-solid fa-cogs' },
                ]
            },


            //Breakdown
            {
                label: 'Breakdown Andon',
                items: [
                    {
                        label: 'Andon Breakdown', icon: 'fa-solid fa-tools',
                        items: [
                            {
                                label: 'Dashboard', icon: 'fa-solid fa-tachometer',
                                items: [
                                    { label: 'Plant Breakdown', icon: 'fa-solid fa-industry', routerLink: ['/alert_report'] },
                                    { label: 'Shopfloor Breakdown', icon: 'fa-solid fa-wrench', routerLink: ['/shopfloorwise_breakdown'] },
                                    { label: 'Category Breakdown', icon: 'fa-solid fa-list-alt', routerLink: ['/categorywise_breakdown'] },
                                    { label: 'Alerts', icon: 'fa-solid fa-exclamation-circle', routerLink: ['/alert'] },
                                    { label: 'Andon Display Board', icon: 'fa-solid fa-tv', routerLink: ['/display_board'] },
                                    { label: 'Andon Reason', icon: 'fa-solid fa-list', routerLink: ['/line_dash'] },
                                    { label: 'Shift Running vs Breakdown', icon: 'fa-solid fa-chart-line', routerLink: ['/andon_board'] },
                                ]
                            },
                            // { label: 'Andon Call Help', icon: 'fa-solid fa-phone', routerLink: ['/call_help'] },
                            // { label: 'Alerts Info', icon: 'fa-solid fa-exclamation-circle', routerLink: ['/alert_report'] },
                            {
                                label: 'Andon Breakdown Analysis', icon: 'fa-solid fa-chart-bar',
                                items: [
                                    { label: 'Assemblyline Analysis', icon: 'fa-solid fa-chart-bar', routerLink: ['/assemblyline_analysis'] },
                                    { label: 'Machinewise Analysis', icon: 'fa-solid fa-chart-bar', routerLink: ['/machinewise_analysis'] },
                                    { label: 'Shiftwise Analysis', icon: 'fa-solid fa-chart-bar', routerLink: ['/shiftwise_analysis'] },
                                    { label: 'Daily Breakdown Analysis', icon: 'fa-solid fa-chart-bar', routerLink: ['/daily_breakdown'] },
                                ]
                            },
                        ]
                    },
                ]
            },

            // Quality
            {
                label: 'Quality Management',
                items: [
                    { label: 'Quality Management', icon: 'fa-solid fa-check-to-slot', routerLink: ['/quality_dashboard'] },
                    { label: 'Digital Quality Inspection', icon: 'fa-solid fa-search-plus', routerLink: ['/machine_quality'] },
                ],
            },

            {
                items: [
                    {
                        label: 'Visual Quality Inspection', icon: 'fa-solid fa-binoculars',
                        items: [
                            { label: '90 Degree Inspection', icon: 'fa-solid fa-magnifying-glass', routerLink: ['/machine_quality2'] },
                        ]
                    },
                ]
            },

            // {
            //     label: 'Work in Progress',
            //     items: [
            //         {
            //             label: 'Assemblyline', icon: 'fa-solid fa-cogs',
            //             items: [
            //                 {
            //                     label: 'Line 1', icon: 'fa-solid fa-industry',
            //                     items: [
            //                         {
            //                             label: 'Production Performance', icon: 'fa-solid fa-tachometer-alt',
            //                             items: [
            //                                 { label: 'Daily Shift Target', icon: 'fa-solid fa-bullseye', routerLink: ['/daily_target'] },
            //                                 { label: 'Weekly Targets', icon: 'fa-solid fa-bullseye', routerLink: ['/weekly_target'] },
            //                                 { label: 'Month Targets', icon: 'fa-solid fa-bullseye', routerLink: ['/monthly_target'] },
            //                             ]
            //                         },
            //                         {
            //                             label: 'Quality Inspection', icon: 'fa-solid fa-binoculars',
            //                             items: [
            //                                 { label: 'Breakage Total Quality', icon: 'fa-solid fa-balance-scale', routerLink: ['/quality_inspection'] },
            //                                 { label: 'Module Defects & Low Power Rejection', icon: 'fa-solid fa-exclamation-triangle', routerLink: ['/quality_inspection'] },
            //                             ]
            //                         },
            //                         {
            //                             label: 'Shift Incharge', icon: 'fa-solid fa-user-tie',
            //                             items: [
            //                                 { label: 'Performance', icon: 'fa-solid fa-tachometer-alt', routerLink: ['/quality_inspection'] },
            //                                 { label: 'Performance - Cell Breakage %', icon: 'fa-solid fa-chart-bar', routerLink: ['/quality_inspection'] },
            //                                 { label: 'Output - Rework Laminates', icon: 'fa-solid fa-sync-alt', routerLink: ['/quality_inspection'] },
            //                                 { label: 'Output - Performance at Layup', icon: 'fa-solid fa-chart-line', routerLink: ['/quality_inspection'] },
            //                             ]
            //                         },
            //                     ]
            //                 },
            //             ]
            //     }
            //     ]
            // },

            // OEE
            {
                label: 'OEE',
                items: [
                    { label: 'OEE', icon: 'fa-solid fa-chart-line', routerLink: ['/oee_report'] }
                ]
            },

            // {
            //     label: 'Utility Management',
            //     items: [
            //         {
            //             label: 'Utility Management', icon: 'fa-solid fa-cogs',
            //             items: [
            //                 { label: 'Tool Management', icon: 'fa-solid fa-toolbox'},
            //                 { label: 'Calibration Management', icon: 'fa-solid fa-ruler-combined' },
            //                 { label: 'Energy Management', icon: 'fa-solid fa-bolt' },
            //                 { label: 'Store Management', icon: 'fa-solid fa-store' },
            //             ]
            //         }
            //     ]
            // },

            //ToDo
            // {
            //     items: [
            //         { label: 'TO-DO', icon:'fa-solid fa-list-check', routerLink: ['/todo'] }
            //     ]
            // },

            //Reports
            {
                label: 'Reports',
                items: [
                    {
                        label: 'Reports', icon: 'fa-solid fa-file',
                        items: [
                            {
                                label: 'Production info', icon: 'fa-solid fa-chart-bar',
                                items: [
                                    { label: 'Production Planning', icon: 'fa-solid fa-chart-bar', routerLink: ['/prod_plan_report'] },
                                    { label: 'Production Line Config', icon: 'fa-solid fa-chart-bar', routerLink: ['/prod_line_config_report'] },
                                    { label: 'Production Andon', icon: 'fa-solid fa-chart-bar', routerLink: ['/prod_andon_report'] },
                                ]
                            },
                            {
                                label: 'Breakdown info', icon: 'fa-solid fa-chart-bar',
                                items: [
                                    { label: 'Alerts info', icon: 'fa-solid fa-bell' },
                                    { label: 'Alerts Machinewise', icon: 'fa-solid fa-exclamation-circle', routerLink: ['/oee'] },
                                ]
                            },
                            {
                                label: 'Resource Management', icon: 'fa-solid fa-chart-bar',
                                items: [
                                    { label: 'Daily Info', icon: 'fa-solid fa-bell', routerLink: ['/daily_report'] },
                                    { label: 'Monthly Info', icon: 'fa-solid fa-exclamation-circle', routerLink: ['/monthly_report'] },
                                ]
                            },
                            {
                                label: 'Quality info', icon: 'fa-solid fa-chart-bar',
                                items: [
                                    { label: 'Quality Management', icon: 'fa-solid fa-bell', routerLink: ['/quality_report'] },
                                    // { label: 'Quality Andon', icon: 'fa-solid fa-exclamation-circle' },
                                ]
                            },
                            {
                                label: 'OEE Anlaysis', icon: 'fa-solid fa-chart-bar', routerLink: ['/oee_report']
                            }
                        ]
                    },
                ]
            },

            // Settings
            {
                label: 'Settings',
                items: [
                    {
                        label: 'Settings', icon: 'fa-solid fa-gear',
                        items: [
                            { label: 'Configuration', icon: 'fa-solid fa-cogs', routerLink: ['/config'] },
                        ]
                    }
                ]
            }


            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
        //     {
        //         label: 'Pages',
        //         icon: 'pi pi-fw pi-briefcase',
        //         items: [
        //             {
        //                 label: 'Landing',
        //                 icon: 'pi pi-fw pi-globe',
        //                 routerLink: ['/landing']
        //             },
        //             {
        //                 label: 'Auth',
        //                 icon: 'pi pi-fw pi-user',
        //                 items: [
        //                     {
        //                         label: 'Login',
        //                         icon: 'pi pi-fw pi-sign-in',
        //                         routerLink: ['/auth/login']
        //                     },
        //                     {
        //                         label: 'Error',
        //                         icon: 'pi pi-fw pi-times-circle',
        //                         routerLink: ['/auth/error']
        //                     },
        //                     {
        //                         label: 'Access Denied',
        //                         icon: 'pi pi-fw pi-lock',
        //                         routerLink: ['/auth/access']
        //                     }
        //                 ]
        //             },
        //             {
        //                 label: 'Crud',
        //                 icon: 'pi pi-fw pi-pencil',
        //                 routerLink: ['/pages/crud']
        //             },
        //             {
        //                 label: 'Timeline',
        //                 icon: 'pi pi-fw pi-calendar',
        //                 routerLink: ['/pages/timeline']
        //             },
        //             {
        //                 label: 'Not Found',
        //                 icon: 'pi pi-fw pi-exclamation-circle',
        //                 routerLink: ['/notfound']
        //             },
        //             {
        //                 label: 'Empty',
        //                 icon: 'pi pi-fw pi-circle-off',
        //                 routerLink: ['/pages/empty']
        //             },
        //         ]
        //     },
        //     {
        //         label: 'Hierarchy',
        //         items: [
        //             {
        //                 label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
        //                 items: [
        //                     {
        //                         label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
        //                         items: [
        //                             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
        //                         ]
        //                     },
        //                     {
        //                         label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
        //                         items: [
        //                             { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
        //                         ]
        //                     },
        //                 ]
        //             },
        //             {
        //                 label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
        //                 items: [
        //                     {
        //                         label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
        //                         items: [
        //                             { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
        //                             { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
        //                         ]
        //                     },
        //                     {
        //                         label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
        //                         items: [
        //                             { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
        //                         ]
        //                     },
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         label: 'Get Started',
        //         items: [
        //             {
        //                 label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
        //             },
        //             {
        //                 label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
        //             }
        //         ]
        //     }
        ];
    }
}
