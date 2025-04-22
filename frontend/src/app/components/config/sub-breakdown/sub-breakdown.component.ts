import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-sub-breakdown',
  templateUrl: './sub-breakdown.component.html',
  styleUrls: ['./sub-breakdown.component.scss']
})
export class SubBreakdownComponent implements OnInit {

    constructor(private service:SharedService) { }

    subBreakdownCategoryList:any=[];
    breakdownCategoryList: any[] = [];

    ModalTitle:string="";
    ActivateAddEditSubBreakdownComp:boolean=false;
    subbreakdown:any;

    searchText:string="";
    subBreakdownCategoryListWithoutFilter:any=[];

    loading: boolean = false;

    ngOnInit(): void {
      this.refreshSubBreakdownCategoryList();
    }

    addClick(){
      this.subbreakdown={
        SubBreakdownCategoryID:0,
        SubBreakdownCategoryName:""
      }
      this.ModalTitle="Add SubBreakdown Category";
      this.ActivateAddEditSubBreakdownComp=true;

    }

    editClick(item: any){
      this.subbreakdown=item;
      this.ModalTitle="Edit SubBreakdown Category";
      this.ActivateAddEditSubBreakdownComp=true;
    }

    deleteClick(item: any){
      if(confirm('Are you sure??')){
        this.service.deletesubBreakdownCategory(item.SubBreakdownCategoryID).subscribe(data=>{
          alert(data.toString());
          this.refreshSubBreakdownCategoryList();
        })
      }
    }

    closeClick(){
      this.ActivateAddEditSubBreakdownComp=false;
      this.refreshSubBreakdownCategoryList();
    }

    refreshSubBreakdownCategoryList() {
        this.loading = true;

      this.service.getsubBreakdownCategoryList().subscribe(data => {
        this.subBreakdownCategoryList = data;

        // Fetch the corresponding breakdown category name for each sub-breakdown category
        this.service.getBreakdowncategoryList().subscribe(breakdownCategories => {
          this.breakdownCategoryList = breakdownCategories;
          this.loading = false;
        });
      });
    }

    getBreakdownCategoryName(breakdownCategoryId: number): string {
      const breakdownCategory = this.breakdownCategoryList.find(
        category => category.breakdownCategoryId === breakdownCategoryId
      );

      return breakdownCategory ? breakdownCategory.breakdownCategoryName : '';
    }



    filterData(){
      var searchText = this.searchText.toLowerCase();

      this.subBreakdownCategoryList = this.subBreakdownCategoryListWithoutFilter.filter(function (el: any) {
        return el.subBreakdownCategoryId.toString().toLowerCase().includes(searchText) ||
          el.subBreakdownCategoryName.toString().toLowerCase().includes(searchText);
      });
    }



  }
