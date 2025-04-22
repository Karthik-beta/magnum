import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit{


    constructor(private service:SharedService) { }

    authenticated: boolean= false; // Define 'authenticated' property
    message: string='';

    companyList:any=[];

    ModalTitle:string="";
    ActivateAddEditComComp:boolean=false;
    com:any;

    loading: boolean = false;

    CompanyIdFilter:string="";
    CompanyNameFilter:string="";
    CompanyLocationFilter:string="";
    CompanyListWithoutFilter:any=[];
    searchText:string="";

    ngOnInit(): void {
      this.refreshComList();
    }

    addClick(){
      this.com={
        CompanyId: 0,
        CompanyName:"",
        CompanyLocation:""
      }
      this.ModalTitle="Add Company";
      this.ActivateAddEditComComp=true;

    }

    editClick(item: any){
      this.com=item;
      this.ModalTitle="Edit Company";
      this.ActivateAddEditComComp=true;
    }

    deleteClick(item: {CompanyId: any;}){
      if(confirm('Are you sure??')){
        this.service.deleteCompany(item.CompanyId).subscribe((data: any) => {
          alert(data.toString());
          this.refreshComList();
        })
      }
    }




    closeClick(){
      this.ActivateAddEditComComp=false;
      this.refreshComList();
    }


    refreshComList(){
        this.loading = true;
        this.service.getCompanyList().subscribe(data=>{
            this.companyList=data;
            this.CompanyListWithoutFilter=data;
            console.log(this.companyList);
            this.loading = false;
      });
    }

    filterData() {
      var searchText = this.searchText.toLowerCase();

      this.companyList = this.CompanyListWithoutFilter.filter(function (el: any) {
        return el.CompanyId.toString().toLowerCase().includes(searchText) ||
               el.CompanyName.toString().toLowerCase().includes(searchText) ||
               el.CompanyLocation.toString().toLowerCase().includes(searchText);
      });
    }




  }
