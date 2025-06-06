from django.urls import re_path
from report import views


urlpatterns = [

    re_path(r'^productionReport/$', views.productionReportList.as_view()),

    re_path(r'^productionReportExcel/$', views.ExportProductionReportExcelView.as_view()),

    re_path(r'^productionInfoExcel/$', views.ExportProductionInfoExcel.as_view()),

    re_path(r'^batchOrderExcel/$', views.ExportBatchOrderExcel.as_view()),

]