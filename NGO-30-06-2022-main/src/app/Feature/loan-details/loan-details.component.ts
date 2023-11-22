import { ApiService } from './../../core/service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import  'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
declare let Razorpay: any;
declare var $:any;
import { AuthService } from '../../core/service/auth.service';
@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  noOfDonors: number;
  noOfSupporters: number;
  commentList: any;
  comment_baseUrl: any;
  closing_date: any;
  Difference_In_Days: number;
  pageNumber: any;
  totalCount: any;
  hasNextPage: any;
  campagineremail: any;
  campaignerphone_number: any;
  documentBaseUrl: any;
  fundraiserDocuments: any [];
  url: any;
  htmls: string;
  donationAmount: number;
  submittedgmForm: boolean;
  infoStatus: boolean;
  show_donor_information: any;
  fundraiserId: any;
  raisedAmountInPercentage: number;
  fund_raised: any;
  loan_id: any;
  fundraiserDetails: any;
  title: any;
  Details: any;
  fund_required: any;
  campaignerDetails: any;
  campaignerName: any;
  campaignerBaseUrl: any;
  image_url: any;
  baseUrl: any;
  lendAmount: any;
  loanfirstFormGroup: FormGroup;
  story: any;
  loanbaseUrl: any;
  location: any;
  amount: any;
  purpose: any;
  description: any;
  remainingLoanAmount: any;
  key: any;
  customer_id: any;
  orderResponse: any;
  orderId: any;
  rzppay: any;
  submitted: boolean;
  clicked: boolean;
  razorpayResponse: string;
  totalamount: any;
  RAZORPAY_OPTIONS: any;
  gmformdata: any;
  certificate_address: any;
  certificate_phone: any;
  certificate_pan: any;
  userDetails: any;
  dontedId: any;
  apikey: any;
  loginToken: any;
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private authService: AuthService,private router: Router,private spinner: NgxSpinnerService,private apiService: ApiService,private _formBuilder: FormBuilder) {
    this.loanfirstFormGroup = this._formBuilder.group({
      amount: ['',[Validators.required]],
    });
    this.loginToken = this.authService.isAuthenticated();

  }

  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    this.loan_id = this.route.snapshot.paramMap.get('id');
    console.log('id',this.loan_id)
    this.lendAmount = '';
    this.loanDetails();
     this.getUserDetails();

  }
  getKey(){
    this.apiService.getPaymentkeyForLoan(this.loan_id).subscribe((res:any)=>{
      console.log('loan-key',res)
     this.key = res.apiKey;
     this.customer_id = res.customerId;
     console.log(this.customer_id)
    })
  }
  getUserDetails(){
    this.apiService.getUserProfile().subscribe((res:any)=>{
      this.userDetails = res['userDetails'];
       this.dontedId = this.userDetails.id;
       console.log(this.dontedId)

    }, error => {
      // this.toastr.error(error.error.message);
    })
  }
  loanDetails(){
    var data={
      loan_id:this.loan_id
     }
     this.apiService.getLoanDetails(data).subscribe((res:any)=>{
      console.log('loan',res)
      this.Details = res['loanDetails'];
      this.closing_date = this.Details.closing_date;
      var todayDate = new Date().toISOString().slice(0, 10);
      var date1 = new Date(todayDate);
      var date2 = new Date(this.closing_date);
      // To calculate the time difference of two dates
      var Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
      this.Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      this.title = this.Details.title;
      this.location = this.Details.location;
      this.totalamount = this.Details.amount;
      this.purpose = this.Details.purpose;
      this.fund_raised = res.fund_raised;
      this.image_url = this.Details.image_url;
      this.loanbaseUrl = res.baseUrl;
      this.campaignerDetails = res['campaignerDetails'];
      this.description = this.Details.description;
      this.htmls = '';
      this.showPercentage();
  })

  }
  showPercentage(){
    if(this.fund_raised !='' || this.fund_raised != undefined){
      this.raisedAmountInPercentage = (parseInt(this.fund_raised)*100)/this.fund_required;
    }
  }
  // ReamingDaysForFundraising(){
  //   var todayDate = new Date().toISOString().slice(0, 10);
  //   var date1 = new Date(todayDate);
  // var date2 = new Date(this.closing_date);
  //   // To calculate the time difference of two dates
  // var Difference_In_Time = date2.getTime() - date1.getTime();
  // // To calculate the no. of days between two dates
  // this.Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  // }
  donateLoan(){
    $('#loan-modal').modal('show');
    this.getKey();

  }
  lendAmounts(e){
    this.lendAmount = e.target.outerText;
  }
  completeLoan(){
    $('#complete-loan-modal').modal('show');
    this.getKey();
    this.remainingLoanAmount = this.totalamount - this.fund_raised;
   
  }
  completeLoanAmount(){
    console.log('complete',)
    this.spinner.show();
    console.log(this.remainingLoanAmount,)
    var datas={
      amount:this.remainingLoanAmount,
      fundraiser_id:this.loan_id
    }
    $('#complete-loan-modal').modal('hide');
     this.apiService.getPaymentkey(this.loan_id).subscribe((res: any) => {
     // this.apiService.getPaymentkeyForLoan(this.loan_id).subscribe((res: any) => {
      
      console.log('key',res)
    })
    this.apiService.getOrderId(datas).subscribe((res:any)=>{
      console.log('orderid',res)
      this.orderResponse = res;
    this.orderId  = res.orderId;
    this.amount = res.convertedAmount;
    if(res){
      this.spinner.hide();
      console.log('remaining',this.remainingLoanAmount)
      let formval = this.loanfirstFormGroup.value;
      console.log("aaaaaaaaaaaaa")
      this.RAZORPAY_OPTIONS = {
        "key": this.key,
        "amount": this.amount ,
        "name": "NGO",
        "currency":"INR",
        "order_id": this.orderId,
        "customer_id": "",
        "description": "App Payment",
        "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
        "prefill": {
          "name": "",
          "email": "test@test.com",
          "contact": "",
          "method": ""
        },
          "notes":{
            'type':'loan',
            'lid': this.loan_id,
            'amt': formval.amount,
            'cna': this.gmformdata?this.gmformdata.name:'',
            'cad': this.gmformdata?this.certificate_address:'',
            'cph': this.gmformdata?this.certificate_phone:'',
            'cpc': this.gmformdata?this.certificate_pan:'',
            'd_by':this.dontedId

          },
          "modal": {},
          "theme": {
            "color": "#0096C5"
          },

        }
      this.RAZORPAY_OPTIONS.amount = this.amount;
      this.RAZORPAY_OPTIONS.key = this.key;
      this.RAZORPAY_OPTIONS.order_id = this.orderId;
      this.RAZORPAY_OPTIONS.customer_id = this.customer_id;
      // this.RAZORPAY_OPTIONS.receivers.acc = this.key;
      this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);
      this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
      console.log(this.rzppay)
      this.rzppay.open();
       this.submitted = false;
       this.clicked = false;
       console.log(this.RAZORPAY_OPTIONS)

    }

    })

}
  submitlend(){
    console.log( this.loanfirstFormGroup.value);
    this.spinner.show();
    let formval = this.loanfirstFormGroup.value;
    var datas={
      amount:formval.amount,
      fundraiser_id:this.loan_id
    }
    $('#loan-modal').modal('hide');
    $('#complete-loan-modal').modal('hide');
    this.apiService.getPaymentkey(this.loan_id).subscribe((res: any) => {
      console.log('key',res)
      this.apikey  =res.apikey
    })

     this.apiService.getOrderId(datas).subscribe((res:any)=>{
      this.orderResponse = res;
    this.orderId  = res.orderId;
    this.amount = res.convertedAmount;
    if(res){
      this.spinner.hide();
      console.log(this.remainingLoanAmount)
      console.log("aaaaaaaaaaaaa")
      this.RAZORPAY_OPTIONS = {
        "key": this.apikey,
        "amount": this.amount,
        "name": "NGO",
        "currency":"INR",
        "order_id": "",
        "customer_id": "",
        "description": "App Payment",
        "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
        "prefill": {
          "name": "",
          "email": "test@test.com",
          "contact": "",
          "method": ""
        },
          "notes":{
            'type':'loan',
            'lid': this.loan_id,
            'amt': formval.amount,
            'cna': this.gmformdata?this.gmformdata.name:'',
            'cad': this.gmformdata?this.certificate_address:'',
            'cph': this.gmformdata?this.certificate_phone:'',
            'cpc': this.gmformdata?this.certificate_pan:'',
            'd_by':this.dontedId

          },
          "modal": {},
          "theme": {
            "color": "#0096C5"
          },

        }
      this.RAZORPAY_OPTIONS.amount = this.amount;
      this.RAZORPAY_OPTIONS.key = this.apikey;
      this.RAZORPAY_OPTIONS.order_id = this.orderId;
      this.RAZORPAY_OPTIONS.customer_id = this.customer_id;
      // this.RAZORPAY_OPTIONS.receivers.acc = this.key;
      this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);
      this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
      console.log(this.rzppay)
      this.rzppay.open();
       this.submitted = false;
       this.clicked = false;
       console.log(this.RAZORPAY_OPTIONS)

    }

    })
  }
  closelendSuccessModal(){
    $('#lend-success-modal').modal('hide');
  }

  public razorPaySuccessHandler(response) {
    let formData = new FormData;
    let formval = this.loanfirstFormGroup.value;
    console.log(this.remainingLoanAmount)
    console.log("hkhkh")
    formData.append("loan_id",this.loan_id);
    formData.append("amount",formval.amount);
    formData.append("transaction_id",response.razorpay_payment_id)
    this.razorpayResponse = 'Razorpay Response';
    if(response.razorpay_payment_id){
     console.log(response.razorpay_payment_id);
     $('#successPaymentModal').modal('show');
       this.apiService.createLoanLend(formData).subscribe((res:any)=>{
      if (res.success == true) {
        $('#successPaymentModal').modal('show');
        this.loanDetails();
      } else {
    }
    }, error => {
    })
      }
    }

}
