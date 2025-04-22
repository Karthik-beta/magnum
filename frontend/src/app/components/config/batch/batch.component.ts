import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit{

    constructor(private service:SharedService) { }


    ngOnInit(): void {
      this.refreshBatchList();
    }

    batchList:any=[];
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
    //       this.refreshBatchList();
    //     })
    //   }
    }

    closeClick(){
      this.ActivateAddEditProComp=false;
      this.refreshBatchList();
    }

    refreshBatchList(){
        this.loading = true;

        this.service.getBatchList().subscribe(data=>{
            this.batchList=data;
            this.loading = false;
      });
    }






  }
