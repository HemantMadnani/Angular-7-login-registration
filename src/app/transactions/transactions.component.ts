import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { first } from 'rxjs/operators';
import { Transaction } from '../model/transaction.model';
import { Subject } from 'rxjs/internal/Subject';
import 'datatables.net';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  transactions: Transaction[];
  jquery: JQuery;
  $: JQuery;
  dtTrigger: Subject<Transaction> = new Subject();
  constructor(private transactionService: TransactionService) {
  }

  ngOnInit() {
    const that = this;
    this.transactionService.fetchCaptureTransaction().pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.transactions = data;
          this.dtTrigger.next();
        });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
      // data: this.transactions,
      // columns: [{ title: 'Id', data: 'id' },
      //  { title: 'Organisation', data: 'organisation' },
      //   { title: 'RequestDate', data: 'requestDate' },
      //    { title: 'ResponseDate', data: 'responseDate' },
      //     { title: 'Country', data: 'country' },
      //      { title: 'Zipcode', data: 'zipcode' },
      //       { title: 'status', data: 'status' }]

    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
