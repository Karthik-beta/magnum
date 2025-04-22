import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit{

    constructor(private service:SharedService) { }

    plantList:any=[];

    ModalTitle:string="";
    ActivateAddEditLocComp:boolean=false;
    loc:any;

    LocationIdFilter:string="";
    LocationNameFilter:string="";
    plantListWithoutFilter:any=[];


    loading: boolean = false;

    ngOnInit(): void {
      this.refreshLocList();
    }

    addClick(){
      this.loc={
        LocationId: 0,
        LocationName:""
      }
      this.ModalTitle="Add Location";
      this.ActivateAddEditLocComp=true;

    }

    editClick(item: any){
      this.loc=item;
      this.ModalTitle="Edit Location";
      this.ActivateAddEditLocComp=true;
    }

    deleteClick(item: {LocationId: any;}){
      if(confirm('Are you sure??')){
        this.service.deletePlant(item.LocationId).subscribe((data: any) => {
          alert(data.toString());
          this.refreshLocList();
        })
      }
    }




    closeClick(){
      this.ActivateAddEditLocComp=false;
      this.refreshLocList();
    }


    refreshLocList(){
        this.loading = true;

      this.service.getPlantList().subscribe(data=>{
        this.plantList=data;
        this.plantListWithoutFilter=data;
        this.loading = false;
      });
    }

    FilterFn(){
      var LocationIdFilter = this.LocationIdFilter;
      var LocationNameFilter = this.LocationNameFilter;

      this.plantList = this.plantListWithoutFilter.filter(function (el:any){
          return el.LocationId.toString().toLowerCase().includes(
            LocationIdFilter.toString().trim().toLowerCase()
          )&&
          el.LocationName.toString().toLowerCase().includes(
            LocationNameFilter.toString().trim().toLowerCase()
          )
      });
    }

    sortResult(prop:any,asc:any){
      this.plantList = this.plantListWithoutFilter.sort(function(a:any,b:any){
        if(asc){
          return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
        }else{
          return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
        }
      })
    }
  }

