import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-sub-assemblyline',
  templateUrl: './sub-assemblyline.component.html',
  styleUrls: ['./sub-assemblyline.component.scss']
})
export class SubAssemblylineComponent implements OnInit {

    constructor(private service:SharedService) { }

    subAssemblyLineList:any=[];
    assemblyLineList: any[] = [];

    ModalTitle:string="";
    ActivateAddEditSubAssemblyLineComp:boolean=false;
    subassemblyline:any;

    searchText:string="";
    subAssemblyLineListWithoutFilter:any=[];

    loading: boolean = false;

    ngOnInit(): void {
      this.refreshSubAssemblyLineList();
    }

    addClick(){
      this.subassemblyline={
        SubAssemblyLineID:0,
        SubAssemblyLineName:"",
        AssemblyLineID:0
      }
      this.ModalTitle="Add SubAssemblyLine";
      this.ActivateAddEditSubAssemblyLineComp=true;

    }

    editClick(item: any){
      this.subassemblyline=item;
      this.ModalTitle="Edit SubAssemblyLine";
      this.ActivateAddEditSubAssemblyLineComp=true;
    }

    deleteClick(item: any){
      if(confirm('Are you sure??')){
        this.service.deletesubAssemblyLine(item.SubAssemblyLineID).subscribe(data=>{
          alert(data.toString());
          this.refreshSubAssemblyLineList();
        })
      }
    }

    closeClick(){
      this.ActivateAddEditSubAssemblyLineComp=false;
      this.refreshSubAssemblyLineList();
    }

    getAssemblyLineName(assemblyLineId: number): string {
      const assemblyLine = this.assemblyLineList.find(item => item.assemblylineId === assemblyLineId);
      return assemblyLine ? assemblyLine.assemblylineName : '';
    }

    refreshSubAssemblyLineList() {
        this.loading = true;
      this.service.getsubAssemblyLineList().subscribe(data => {
        this.subAssemblyLineList = data;
        this.subAssemblyLineListWithoutFilter = data;
      });
      this.service.getAssemblyLineList().subscribe(data => {
        this.assemblyLineList = data;
        this.loading = false;
      });
    }




    filterData(){
      var searchText = this.searchText.toLowerCase();

      this.subAssemblyLineList = this.subAssemblyLineListWithoutFilter.filter(function (el: any) {
        return el.subAssemblylineId.toString().toLowerCase().includes(searchText) ||
          el.subAssemblylineName.toString().toLowerCase().includes(searchText);
      });
    }

  }
