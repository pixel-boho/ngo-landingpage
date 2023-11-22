import { ApiService } from './../../core/service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import  'jquery';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/core/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Slick } from 'ngx-slickjs';
declare let Razorpay: any;
declare var $:any
declare var google:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    //margin:10,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 200,
    autoplay:true,

    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      },
      940: {
        items: 4
    }
  },
    nav: true
  }
  customOptions1: OwlOptions = {
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
      // 400: {
      //   items: 1
      // },
      // 740: {
      //   items: 1
      // },
      // 767: {
      //   items: 1
      // },

    },
    nav: true
  }

    @ViewChild('stepper') private stepper: MatStepper;
    fundRaiserList: any;
    baseUrl: string;
    baseUrl1:string;
    campaignList: any;
    public bannerList: any []=[];
    name = 'ngx sharebuttons';
    socialMediaList: any;
    facebook: any;
    instagram: any;
    whatsapp: any;
    linkedin: any;
    twitter: any;
    donateNowForm: any;
    submitted: boolean;
    clicked: boolean;
    infoStatus: boolean;
    show_donor_information: any;
    donationAmount: any;
    fundraiserId: any;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    eightygmForm:FormGroup;
    submittedgmForm: boolean;
    url: string;
    loginToken: any;
    razorpayResponse: string;
    orderId: any;
    amount: any;
    rzppay: any;
    key: any;
    showModal: boolean;
    modalReference: any;
    dialogRef: any;
    orderResponse: any;
    data: any;
    formdata: any;
    customer_id: any;
    gmformdata: any;
    certificate_name: any;
    certificate_address: any;
    certificate_phone: any;
    certificate_pan: any;
    searchinput: string;
    sorting: string;
    category_id: string;
    campaignerList: any;
  raisedAmountInPercentage: number;
  constructor( private fb: FormBuilder,private router: Router,private apiService: ApiService,
     private authService:AuthService,private _formBuilder: FormBuilder,private spinner: NgxSpinnerService) {
    //   setInterval(() =>{
    //   this.getFundRaisers();
    // },50000)
    this.getFundRaisers();
    this.infoStatus = false;
    this.show_donor_information = 0;
    this.firstFormGroup = this._formBuilder.group({
      amount: ['',[Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]] ,
      show_donor_information: [''],

    });
    this.eightygmForm = this._formBuilder.group({
      pancard_no:  ['',[Validators.required,Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]] ,
      name:  ['',[Validators.required]],
      phone_number:  ['',[Validators.required]],
      address:  ['',[Validators.required]],
    });
   }

  ngOnInit(): void {
    setTimeout(() => {
      // $('#alert-modal').modal('show');

    }, 5000);
      this.coureselSlider();
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    this.getComaignList();
    setInterval(() =>{
    this.getComaignList();
    },50000)
    this.Settings();
    //  this.Wizardmodal();
    this.donationAmount = 1000;
  }
  getKey(){
    this.apiService.getPaymentkey(this.fundraiserId).subscribe((res:any)=>{
      console.log(res)
     this.key = res.apiKey;
     this.customer_id = res.customerId;
     console.log(this.customer_id)
    })
  }
  RAZORPAY_OPTIONS = {
    "key": "",
    "amount": "",
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
    "modal": {},
    "theme": {
      "color": "#0096C5"
    },

  }

  coureselSlider(){
    setTimeout(function(){
      $('.custom1').owlCarousel({
      loop:true,
      infinte:true,
      nav:true,
      navSpeed: 200,
      autoplay:true,
      navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      dots:false,
      items:3,
      autoplayHoverPause:true,
      responsive:{
        0:{
            items:1,
            dots:false,
        },
        768:{
            items:2,
            dots:false,
        },
        1200:{
            items:3,

        }
    }

      }
      );
    },4000);

  }

  async getFundRaisers(){
    await this.apiService.getFundraiserForBanners().subscribe((res:any)=>{
      this.fundRaiserList = res['list'];
      this.baseUrl = res.baseUrl
        var sortList =this.fundRaiserList.sort(function(a, b){
          var aa = new Date(a.closing_date),
              bb = new Date(b.closing_date);
          return aa < bb ? -1 : (aa > bb ? 1 : 0);
          });
          this.bannerList = _.slice(sortList, 0,3);
          console.log(this.bannerList)
    })
}

getComaignList(){
  this.apiService.getCampaignList().subscribe((res:any)=>{
    // this.coureselSlider(
      console.log('camp',res['list']);
    this.campaignList = res['list'];
    this.baseUrl1 = res.baseUrl;
  }, error => {
    // this.toastr.error(error.error.message);
  })
}
Settings(){
  this.apiService.settings().subscribe((res:any)=>{
    this.socialMediaList = res['list'];
    this.facebook= this.socialMediaList[0].facebook;
    this.instagram= this.socialMediaList[0].instagram;
    this.whatsapp=this.socialMediaList[0].whatsapp;
    this.linkedin=this.socialMediaList[0].linkedin;
    this.twitter=this.socialMediaList[0].twitter;

  })
}
next(){
  $(".owl-next").click();

}
previous(){
  $(".owl-prev").click();

}

 googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

donatenowModal(id){
  if(localStorage.getItem("LoginToken")){
    $('#wizard-up-modal').modal('show');
    this.stepper.selectedIndex = 0;
    this.submittedgmForm = false;
    this.fundraiserId = id;
    this.getKey();
  }
  else if(localStorage.getItem("LoginToken") === null){
    $('#sign-in-modal').modal('show');
  }

}
get f3() {
  return this.eightygmForm.controls;
}
get f2() {
  return this.secondFormGroup.controls;
}
showinfo(event){
this.infoStatus = event.target.checked;
if(this.infoStatus === true){
  this.show_donor_information = 1;
}
else{
  this.show_donor_information = 0;

}
}
donAmount(e){
  this.donationAmount = e.target.outerText;
}
closeModal(){
  $('#wizard-up-modal').modal('hide');
  setTimeout(() => {
    $('#closeDonateModal').modal('show');

  }, 200);
}
close80gForm(){
  $('#80gmFormmodal').modal('hide');
  setTimeout(() => {
    $('#closeDonateModal').modal('show');
  }, 200);
  $('#closeDonateModal').modal('show');
}


}

