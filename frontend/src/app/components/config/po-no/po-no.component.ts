import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-po-no',
  templateUrl: './po-no.component.html',
  styleUrls: ['./po-no.component.scss']
})
export class PoNoComponent implements OnInit{

    constructor(private service:SharedService) { }


    ngOnInit(): void {
      this.refreshPoNOList();
    }

    poNoList:any=[];
    ModalTitle:string="";
    ActivateAddEditProComp:boolean=false;
    product:any;

    ProductListWithoutFilter:any=[];
    searchText:string="";
    pro:any;

    loading: boolean = false;

    addClick(){
      this.product={
        id:0,
        product_Name:"",
      }
      this.ModalTitle="Add Product";
      this.ActivateAddEditProComp=true;
    }

    editClick(item: any){
      this.product=item;
      this.ModalTitle="Edit Product";
      this.ActivateAddEditProComp=true;
    }

    deleteClick(item: any){
    //   if(confirm('Are you sure??')){
    //     this.service.deleteProduct(item.productId).subscribe(data=>{
    //       alert(data.toString());
    //       this.refreshPoNOList();
    //     })
    //   }
    }

    closeClick(){
      this.ActivateAddEditProComp=false;
      this.refreshPoNOList();
    }

    refreshPoNOList(){
        this.loading= true;

        this.service.getPoNoList().subscribe(data=>{
            this.poNoList=data;
            this.loading= false;
      });
    }
  }
