from django.urls import re_path
from production import views


urlpatterns = [
    re_path(r'^check_database_connection/$', views.check_database_connection),

    re_path(r'^productionPlanning/$', views.productionPlanningList.as_view(), name='productionPlanning'),
    re_path(r'^productionPlanning/(?P<id>\d+)/$', views.productionPlanningEdit.as_view()),

    re_path(r'^mostOrderedProducts/$', views.MostOrderedProducts.as_view(), name='most_ordered_products'),

    re_path(r'^recentOrders/$', views.recentOrders.as_view(), name='recentOrders'),

    re_path(r'^lineMachineConfig/$', views.lineMachineConfigList.as_view()),
    re_path(r'^lineMachineConfig/(?P<id>\d+)/$', views.lineMachineConfigEdit.as_view()),

    re_path(r'^openJobWorks/$', views.openJobWorks.as_view()),

    re_path(r'^productionPlanById/$', views.productionPlanById.as_view()),

    re_path(r'^lineMachineSlotConfig/$', views.LineMachineSlotConfigViewSet.as_view({'post': 'calculate_schedule', 'get': 'get_schedule'})),
    re_path(r'^lineMachineSlotConfig/$', views.LineMachineSlotConfigEdit.as_view()),

    re_path(r'^blocked_dates/$', views.DateBlockAPIView.as_view()),

    re_path(r'^machineWiseData/$', views.machineWiseDataView.as_view()),
    re_path(r'^machineWiseData/(?P<id>\d+)/$', views.machineWiseDataUpdate.as_view()),

    re_path(r'^production_stats/$', views.ProductionPlanningStatsView.as_view()),
    
    re_path(r'^lmcSlotConfigViewAll/$', views.lineMachineSlotConfigViewAll.as_view()),

    re_path(r'^export_excel/$', views.ExportExcelMachineView.as_view(), name='export-excel'),

    re_path(r'^assemblylinewise/$', views.AssemblyLineWiseDataView.as_view()),
    re_path(r'^assemblylinewise/(?P<id>\d+)/$', views.AssemblyLineWiseDataUpdate.as_view()),

    re_path(r'^soloAssemblyLineWise/$', views.soloAssemblyLineDataView.as_view()),
    re_path(r'^soloAssemblyLineWise/(?P<id>\d+)/$', views.soloAssemblyLineDataUpdate.as_view()),

    re_path(r'^spellAssemblyLineWise/$', views.spellAssemblyLineDataView.as_view()),
    re_path(r'^spellAssemblyLineWise/(?P<id>\d+)/$', views.spellAssemblyLineDataUpdate.as_view()),

    re_path(r'^productionAndon/$', views.ProductionAndonView.as_view()),

    re_path(r'^productionHourly/$', views.HourlyProductionAndon.as_view()),

    # re_path(r'^export_excel2/$', views.ExportExcelMachineView2.as_view(), name='export-excel2'),
    # re_path(r'^export_excel3/$', views.ExportExcelMachineView3.as_view(), name='export-excel3'),

    re_path(r'^allMachine/$', views.AllMachinesDetails.as_view()),

    re_path(r'^machineStatus/$', views.SingleMachineDetails.as_view()),

    re_path(r'^shopfloorStatus/$', views.ShiftShopfloorStatus.as_view()),
    re_path(r'^shopfloorStatus/export/$', views.ShiftShopfloorExcelView.as_view()),

    re_path(r'^shopfloorStatus2/$', views.ShiftShopfloorStatus2.as_view()),
    re_path(r'^shopfloorStatus2/export/$', views.ShiftShopfloorExcelView2.as_view()),

    re_path(r'^filtrix/$', views.FiltrixListAPIView.as_view()),
    re_path(r'^filtrix/(?P<id>\d+)/$', views.FiltrixDetailAPIView.as_view()),

    re_path(r'^filtrix2/$', views.FiltrixListAPIView2.as_view()),
    # re_path(r'^filtrix2/(?P<id>\d+)/$', views.FiltrixDetailAPIView2.as_view()),
]