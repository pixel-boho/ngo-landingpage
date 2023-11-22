import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/service/api.service';
@Component({
  selector: 'app-paytm-payment',
  templateUrl: './paytm-payment.component.html',
  styleUrls: ['./paytm-payment.component.css']
})
export class PaytmPaymentComponent implements OnInit {
  payment_token:any
  access_key:any
  val:any
  data: { amount: number; };
  constructor(private ApiService: ApiService,){
    
  }

  

  ngOnInit(): void {
    this.payment()
  }
  payment(){
  this.data={amount:2};

  this.ApiService.payment_token(this.data).subscribe((res: any) => {
    console.log('payment',res)
   console.log(res.id)

})
  }
  }