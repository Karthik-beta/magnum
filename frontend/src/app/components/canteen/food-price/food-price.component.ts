import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-food-price',
  templateUrl: './food-price.component.html',
  styleUrls: ['./food-price.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class FoodPriceComponent implements OnInit{

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

    selectedItems: any[] = [];
    value: number = 0;

    employees: any;

    selectedEmp: any;

    selectedEmployeeDetails: any = null;

    ngOnInit() {
        this.employees =[
            { name: 'Ramesh' },
            { name: 'Suresh' },
            { name: 'Mahesh' },
            { name: 'Naresh' },
            { name: 'Umesh' },
            { name: 'Dinesh' },
        ]
    }

    // Function to update selected employee details when an employee is chosen from the dropdown
    onEmployeeSelect() {
        // Find the selected employee details from the 'employeeDetails' list
        this.selectedEmployeeDetails = this.employeeDetails.find(
        (emp) => emp.name === this.selectedEmp.name
        );
    }

    addToCart(item: any) {
        const existingItem = this.selectedItems.find(selectedItem => selectedItem.name === item.name);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.selectedItems.push({ ...item, quantity: 1 });
        }

        this.calculateTotal();
      }

      calculateTotal() {
        let total = 0;
        for (const selectedItem of this.selectedItems) {
          total += selectedItem.price * selectedItem.quantity;
        }

        // Update total value
        this.value = total;
      }

      removeItem(index: number) {
        if (this.selectedItems[index].quantity === 1) {
          this.selectedItems.splice(index, 1);
        } else {
          this.selectedItems[index].quantity -= 1;
        }

        this.calculateTotal();
      }

      increaseQuantity(index: number) {
        this.selectedItems[index].quantity += 1;
        this.calculateTotal();
      }

      decreaseQuantity(index: number) {
        if (this.selectedItems[index].quantity > 1) {
          this.selectedItems[index].quantity -= 1;
          this.calculateTotal();
        }
      }


    confirmPay() {
        const confirmationMessage = `Are you sure that you want to proceed to pay ₹${this.value}?`;

        this.confirmationService.confirm({
            message: confirmationMessage,
            header: 'Confirmation',
            icon: 'pi pi-money-bill',
            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Thank You' });
                this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Handover coupon to cafeteria and collect your food' });

                // Clear selected items and employee details
                // this.clearSelections();

                // Delay for 1 seconds (1000 milliseconds) before clearing selections
                setTimeout(() => {
                    this.clearSelections();
                }, 1000);
            },
            reject: (type) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                      this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                      break;
                    case ConfirmEventType.CANCEL:
                      this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                      break;
                    default:
                      // Handle default case if needed
                      break;
                  }
            }
        });
    }

    clearSelections() {
        this.selectedItems = [];
        this.value = 0;
        this.selectedEmp = null;
        this.selectedEmployeeDetails = null;
    }

    employeeDetails = [
        {
            id: 1,
            name: 'Ramesh',
            department: '9th',
            section: 'A',
            currency: 200
        },
        {
            id: 2,
            name: 'Suresh',
            department: '9th',
            section: 'A',
            currency: 200
        },
        {
            id: 3,
            name: 'Mahesh',
            department: '9th',
            section: 'A',
            currency: 200
        },
        {
            id: 4,
            name: 'Naresh',
            department: '9th',
            section: 'A',
            currency: 200
        },
        {
            id: 5,
            name: 'Umesh',
            department: '9th',
            section: 'A',
            currency: 200
        },
        {
            id: 6,
            name: 'Dinesh',
            department: '9th',
            section: 'A',
            currency: 200
        },
    ]

    foodItems = [
        {
            image: 'Idli',
            name: 'Idli',
            price: 70.00
        },
        {
            image: 'dosa',
            name: 'Dosa',
            price: 100.00
        },
        {
            image: 'puri',
            name: 'Puri',
            price: 60.00
        },
        {
            image: 'samosa',
            name: 'Samosa',
            price: 40.00
        },
        {
            image: 'sandwich',
            name: 'Sandwich',
            price: 70.00
        },
        {
            image: 'rolls',
            name: 'Veg Spring Rolls',
            price: 90.00
        },
        {
            image: 'milkshake',
            name: 'Chocolate Milkshake',
            price: 50.00
        },
        {
            image: 'coffee',
            name: 'Coffee',
            price: 30.00
        },
        {
            image: 'cheese_burger',
            name: 'Cheese Burger',
            price: 50.00
        },
    ]

}
