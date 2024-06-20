import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpaycoTransaction } from 'src/app/model/epayco-transaction';
import { EpaycoService } from 'src/app/services/epayco.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  refPayco: string = ''
	transactionResponse:any ;
  constructor(
  private epaycoService: EpaycoService,
  private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
	this.activatedRoute.queryParams.subscribe(params => {
       this.refPayco= params['ref_payco'] || params['x_ref_payco'];
 	});
  	this.epaycoService.getTransactionResponse(this.refPayco)
    .subscribe((data: EpaycoTransaction) =>{
        this.transactionResponse = data.data
    });
  }


}
