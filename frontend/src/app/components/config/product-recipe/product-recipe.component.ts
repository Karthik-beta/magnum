import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-recipe',
  templateUrl: './product-recipe.component.html',
  styleUrls: ['./product-recipe.component.scss']
})
export class ProductRecipeComponent implements OnInit {


    constructor(private service:SharedService) { }

    productreceipeList:any=[];
    productreceipeListWithoutFilter:any=[];
    ModalTitle:string="";
    ActivateAddEditProductreceipeComp:boolean=false;
    productreceipe:any;

    loading: boolean = false;
    display: boolean = false;

    searchText:string="";

    items: MenuItem[] = [];


    ngOnInit(): void {
      this.refreshProductreceipeList();
      this.getProductList();

        // for (let i = 0; i < this.stages; i++) {
        //     this.stagesArray.push({
        //         stageName: '',
        //         targetPerUnit: '',
        //         targetPerMinute: '',
        //         targetPerHour: '',
        //         skillMatrix: '',
        //         qcCheckType: '',
        //         qcAcceptance: '',
        //         tolerance: ''
        //     });
        // }
    }

    addClick(){
      this.productreceipe={
        ProductReceipeID:0,
        ProductReceipeName:""
      }
      this.ModalTitle="Add Product Receipe";
      this.ActivateAddEditProductreceipeComp=true;

    }


    editClick(item: any){
      this.productreceipe=item;
      this.ModalTitle="Edit Product Receipe";
      this.ActivateAddEditProductreceipeComp=true;
    }

    deleteClick(item: any){
      if(confirm('Are you sure??')){
        this.service.deleteProductreceipe(item.ProductReceipeID).subscribe(data=>{
          alert(data.toString());
          this.refreshProductreceipeList();
        })
      }
    }

    closeClick(){
      this.ActivateAddEditProductreceipeComp=false;
      this.refreshProductreceipeList();
    }


    refreshProductreceipeList(){
        this.loading = true;
      this.service.getProductreceipeList().subscribe(data=>{
        this.productreceipeList=data;
        this.productreceipeListWithoutFilter=data;
        this.loading = false;
      });
    }


    filterData() {
      var searchText = this.searchText.toLowerCase();

      this.productreceipeList = this.productreceipeListWithoutFilter.filter(function (el: any) {
        return el.productId.toString().toLowerCase().includes(searchText) ||
          el.DesignationName.toString().toLowerCase().includes(searchText);
      });
    }



    dummyList = [
        {
            'product_Name': 'XYZ',
            'stages': [
                {
                    'stage': 'XYZ 1',
                    'target_per_unit': '00:01:00',
                    'units_per_minute': 1,
                    'units_per_hour': 60,
                    'skill_matrix': 'TEST',
                    'QC_acceptance': 'TEST',
                    'tolerance': 'TEST',
                },
                {
                    'stage': 'XYZ 2',
                    'target_per_unit': '00:02:00',
                    'units_per_minute': 0.5,
                    'units_per_hour': 30,
                    'skill_matrix': 'TEST',
                    'QC_acceptance': 'TEST',
                    'tolerance': 'TEST',
                }
            ]
        },
        {
            'product_Name': 'XYZ',
            'stages': [
                {
                    'stage': 'XYZ 1',
                    'target_per_unit': '00:01:00',
                    'units_per_minute': 1,
                    'units_per_hour': 60,
                    'skill_matrix': 'TEST',
                    'QC_acceptance': 'TEST',
                    'tolerance': 'TEST',
                },
                {
                    'stage': 'XYZ 2',
                    'target_per_unit': '00:02:00',
                    'units_per_minute': 0.5,
                    'units_per_hour': 30,
                    'skill_matrix': 'TEST',
                    'QC_acceptance': 'TEST',
                    'tolerance': 'TEST',
                },
                {
                    'stage': 'XYZ 1',
                    'target_per_unit': '00:01:00',
                    'units_per_minute': 1,
                    'units_per_hour': 60,
                    'skill_matrix': 'TEST',
                    'QC_acceptance': 'TEST',
                    'tolerance': 'TEST',
                },
                {
                    'stage': 'XYZ 2',
                    'target_per_unit': '00:02:00',
                    'units_per_minute': 0.5,
                    'units_per_hour': 30,
                    'skill_matrix': 'TEST',
                    'QC_acceptance': 'TEST',
                    'tolerance': 'TEST',
                }
            ]
        }
    ]

    getProductList() {
        this.service.getProductList().subscribe(data=>{
            this.productList=data.map(item => ({name: item.product_Name, stages: item.stages}));
            this.initializeStagesArray();
            // console.log("productList: ", this.productList)
        });
    }

    initializeStagesArray() {
        this.stagesArray = Array.from({ length: this.stages }, (_, index) => ({
            stage_no: index + 1,
            stage: '',
            target_per_unit: '',
            units_per_minute: '',
            units_per_hour: '',
            skill_matrix: '',
            QC_check_type: '',
            QC_acceptance: '',
            tolerance: ''
        }));
    }

    // updateUnits(targetPerUnit: string, index: number) {
    //     // Parse targetPerUnit to get hours, minutes, and seconds
    //     const [hours, minutes, seconds] = targetPerUnit.split(':').map(Number);

    //     // Calculate units per minute and units per hour
    //     const totalMinutes = hours * 60 + minutes + seconds / 60;
    //     this.stagesArray[index].units_per_minute = (60 / totalMinutes).toFixed(2);
    //     this.stagesArray[index].units_per_hour = (60 / totalMinutes * 60).toFixed(2);
    // }
    updateUnits(targetPerUnit: string, index: number) {
        // Parse targetPerUnit to get hours, minutes, and seconds
        const [hours, minutes, seconds] = targetPerUnit.split(':').map(Number);

        // Calculate total seconds
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;

        // Calculate units per minute and units per hour
        this.stagesArray[index].units_per_minute = (60 / totalSeconds).toFixed(2);
        this.stagesArray[index].units_per_hour = (3600 / totalSeconds).toFixed(2);
    }

    stageName: string="";
    stages: number=0;
    stagesArray: any[] = [];
    productList: any[] = [];
    selectedProduct: any;
    saveButton: boolean=false;


    onProductSelected(event: any) {
        // Assuming event.value is the selected product
        this.selectedProduct = event.value;

        console.log(this.selectedProduct);

        // Update the stages variable with the selected product's stages property
        this.stages = this.selectedProduct ? this.selectedProduct.stages : 0;

        this.saveButton = true;

        // Reinitialize the stagesArray based on the updated stages variable
        this.initializeStagesArray();
    }

    addProductRecipe() {
        // Check if selectedProduct is defined and has the name property
        if (this.selectedProduct && this.selectedProduct.name) {
          const recipeData = {
            product_name: this.selectedProduct.name,
            stages: this.stagesArray,
          };
        //   console.log(recipeData);

          // Make an API call to save the product recipe
          this.service.addProductReceipe(recipeData).subscribe({
            next: (response) => {
              console.log(response);
              // Optionally, handle success (e.g., show a success message, refresh the list)
              this.refreshProductreceipeList();
              this.display = false;
            },
            error: (error) => {
              console.error(error);
              // Optionally, handle error (e.g., show an error message)
            },
          });
        }

        else {
          // Handle the case where selectedProduct is not defined or does not have a valid name property
          console.error("Selected product is undefined or does not have a valid name property.");
        }
      }


  isFormValid = true; // Flag to track form validity



  saveForm() {
    // Check if any required fields are empty
    this.isFormValid = this.stagesArray.every(stage =>
      stage.stage && stage.target_per_unit && stage.units_per_minute && stage.units_per_hour
      && stage.skill_matrix && stage.QC_check_type && stage.QC_acceptance && stage.tolerance
    );

    if (this.isFormValid) {
      // Perform save or post logic
      console.log('Form is valid. Ready to save.');
      this.addProductRecipe();
    } else {
        this.blinkInvalidFields();
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }

  blinkInvalidFields() {
    this.isFormValid = false;

    // Reset the invalid form state after 4 seconds
    setTimeout(() => {
      this.isFormValid = true;
    }, 4000);
  }

  }
