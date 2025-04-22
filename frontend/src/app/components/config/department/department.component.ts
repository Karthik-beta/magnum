import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

    constructor(private service:SharedService) { }

    DepartmentList:any=[];

    ModalTitle:string="";
    ActivateAddEditDepComp:boolean=false;
    dep:any;

    DepartmentIdFilter:string="";
    DepartmentNameFilter:string="";
    DepartmentListWithoutFilter:any=[];
    searchText: string = '';

    loading: boolean = false;

    ngOnInit(): void {
      this.refreshDepList();
    }

    addClick(){
      this.dep={
        DepartmentId: 0,
        DepartmentName:""
      }
      this.ModalTitle="Add Department";
      this.ActivateAddEditDepComp=true;

    }

    editClick(item: any){
      this.dep=item;
      this.ModalTitle="Edit Department";
      this.ActivateAddEditDepComp=true;
    }

    deleteClick(item: {DepartmentId: any;}){
      if(confirm('Are you sure??')){
        this.service.deleteDepartment(item.DepartmentId).subscribe((data: any) => {
          alert(data.toString());
          this.refreshDepList();
        })
      }
    }




    closeClick(){
      this.ActivateAddEditDepComp=false;
      this.refreshDepList();
    }


    refreshDepList(){
        this.loading = true;
      this.service.getDepList().subscribe(data=>{
        this.DepartmentList=data;
        this.DepartmentListWithoutFilter=data;
        this.loading = false;
      });
    }

    filterData() {
      var searchText = this.searchText.toLowerCase();

      this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el: any) {
        return el.DepartmentId.toString().toLowerCase().includes(searchText) ||
          el.DepartmentName.toString().toLowerCase().includes(searchText);
      });
    }

    sortResult(prop:any,asc:any){
      this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
        if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
        }else{
          return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
        }
      })
    }

  }
