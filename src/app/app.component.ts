import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatatableService } from './datatable.services';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Transaction APP';
  // name: string = "";

  // DEFINING THE PAGINATION VAR
  p: Number = 1;


  // CLOSE MODALE
  closeResult = '';

  // BALANCE MAINTAIN
  balance: any = [];
  remaining_balance = 0;

  // TRANSACTION EXPORT
  data1: any = {
    type: "",
    amount: "",
    description: ""
  };

  // CURRENT TIME AND DATA
  today = new Date();
  todaysDataTime = '';

  // IMPORT TRANSACTION
  transectiontable: any = [];
  constructor(private modalService: NgbModal, private _datatable: DatatableService) {
    this.todaysDataTime = formatDate(this.today, 'MM-dd-yyyy', 'en-US');
  }

  ngOnInit() {
    this.getDataFromApi()

  }

  // FUNCTION TO EXPORT TRANSACTION
  async postModalData() {
    // console.log(this.data1);
    await this._datatable.registeruser(this.data1)
    this.balance = [];
    this.getDataFromApi()
  }

  // GET DATA
  getDataFromApi() {
    this._datatable.getdata().subscribe((res: any) => {
      // this.transectiontable = res;
      let remaining_balance: number = 0;


      // TYPE CHECK OF TRANSACTION
      for (let type_check of res) {
        type_check.type == "Credit" ? remaining_balance = remaining_balance + parseInt(type_check.amount) : 0;
        type_check.type == "Debit" ? remaining_balance = remaining_balance - parseInt(type_check.amount) : 0;

        // if(remaining_balance<0){
        //   alert("Credit Ammont is More than the Debit Ammount")
        // }
        // else{
        // PUSSING DATA INTO TABLE
        this.balance.push({
          amount: type_check.amount,
          description: type_check.description,
          type: type_check.type,
          remaining_balance: remaining_balance
        });
      }
    
      console.log(this.remaining_balance);


      // RECENT ENTERED TRANSACTION
      this.balance = this.balance.reverse();
      console.log(this.balance.remaining_balance);

    });
  }

  // MODAL EXECUTION
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
    // , (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}









