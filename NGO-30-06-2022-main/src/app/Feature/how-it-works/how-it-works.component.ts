import { ApiService } from './../../core/service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/core/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare let Razorpay: any;
declare var $:any;

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 200,
    autoplay:true,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      1491: {
        items: 1
      },

    },
    nav: true
  }
  @ViewChild('stepper') private stepper: MatStepper;
  campaignList: any;
  baseUrl: any;
  name = 'ngx sharebuttons';
  fundRaiserList: any;
  bannerList: any;
  faqList: any;
  infoStatus: boolean;
  show_donor_information: any;
  donationAmount: any;
  fundraiserId: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  clicked: boolean;
  submitted: boolean;
  eightygmForm:FormGroup;
  submittedgmForm: boolean;
  loginToken: any;
  data: any;
  orderResponse: any;
  formdata: any;
  customer_id: any;
  gmformdata: any;
  certificate_name: any;
  certificate_address: any;
  certificate_phone: any;
  certificate_pan: any;
  orderId: any;
  amount: any;
  key: any;
  rzppay: any;
  razorpayResponse: string;
  showModal: boolean;
  submittedfeedback: boolean;
  ChatForm: any;
  isLoadingFeedback: boolean;
  response: any;
  message: any;
  feedbackmessage: any;
  priceList:any;
  faqLength: any;
  constructor(private fb: FormBuilder,private authService:AuthService,private spinner: NgxSpinnerService,private router: Router,private apiService: ApiService,private _formBuilder: FormBuilder ) {
    this.infoStatus = false;
    this.loginToken = localStorage.getItem("LoginToken")
    this.show_donor_information = 0;
    this.submittedgmForm = false;
    this.firstFormGroup = this._formBuilder.group({
      amount: ['',[Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]] ,
      show_donor_information: [''],

    });
    this.ChatForm = this.fb.group({
      name:['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
      message:['',[Validators.required]],
    })
   }

  ngOnInit(): void {
    this.handlepricing();
    setTimeout(() => {
      // $('#alert-modal').modal('show');

    }, 5000);
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    this.getCampaigns();
    this.getFaqlist();
    this.donationAmount = 1000;
    // this.getKey();
    var hash = document.location.hash;
    $(hash+'-tab').ready(function() {
      $(this).click();
    })
    if (hash) {
    $(hash+'-tab').click();
    }


  }
  handlepricing(){
    this.apiService.getPricing().subscribe((res:any)=>{
      console.log(res)
      this.priceList = res['list'];
      console.log(this.priceList);
   }, error => {
   })
  }
  getCampaigns(){
    this.apiService.getFundraiserForBanners().subscribe((res:any)=>{
      this.campaignList = res['list'];
      this.baseUrl = res.baseUrl
      var sortList =this.campaignList.sort(function(a, b){
        var aa = new Date(a.closing_date),
            bb = new Date(b.closing_date);
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });
        this.bannerList = _.slice(sortList, 0,3);
  })

}
getFaqlist(){
  this.apiService.getFaq().subscribe((res:any)=>{
    this.faqList = res['list'];
    this.faqLength=  this.faqList.length;
  })
}

  startaFundraiser(){
    $('#start-fundraiser-modal').modal('show'); //Using modal pop-up Id.
  }
  get feedform(){
    return this.ChatForm.controls;
  }
  TalkToUs(){
    document.getElementById("myChatBox").style.display = "block";
  }
  closeChatBoxs(){
    document.getElementById("talkToUs").style.display = "none";
  }
  submitFeedback(){
    this.submittedfeedback = true;
    this.clicked = true;
    const feedbackData = new FormData();
    if (this.ChatForm.invalid) {
        this.clicked = false;
    }
    let feedFormVal =  this.ChatForm.value
    var data={
      name:feedFormVal.name,
      email:feedFormVal.email,
      message:feedFormVal.message
    }
    if(data.name !='' && data.email !='' && data.message != ''){
      this.isLoadingFeedback = true;
    }
    if(this.ChatForm.controls.email.valid){
      this.apiService.subitFeedbackData(data).subscribe((res:any)=>{
        this.response = res;
        this.message=this.response.message
         if (res.success == 1) {
          this.isLoadingFeedback = false;
          this.ChatForm.reset();
          this.feedbackmessage = res.message;
          this.submittedfeedback = false;
          $('#success-modal').modal('show'); //Using modal pop-up Id.
    }
  })
    }

}

}





