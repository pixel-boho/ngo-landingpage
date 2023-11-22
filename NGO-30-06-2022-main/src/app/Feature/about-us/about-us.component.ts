import { ApiService } from './../../core/service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/core/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { column } from '../statistics/statistics.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare let Razorpay: any;
declare var $:any

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;
  chartColors:string[] = ["#B18ABD","#DC913E","#B2CE6C"];
  chartColors1:string[] = ["#B18ABD","#DC913E","#B2CE6C"];

  chartData:column[] = [
 { Name:'Users',Value:0},
 { Name:'Visiters',Value: 0},
//  { Name:' Total Campaigns ',Value: 0}

 ]
 campaignData:column[] = [
  { Name:'Total Fundraisers',Value:0},
  { Name:'Total Fund Required',Value: 0},
  { Name:'Total Supporters',Value: 0},
  ]
  campaignDataExtra:column[] = [
    { Name:'a',Value:0},
    { Name:'b',Value: 0},
    { Name:'c',Value: 0},
    ]
    fundData
    :column[] = [
      { Name:'totalFundRaised',Value:0},
      { Name:'totalFundRequired',Value: 0},
      ]
  allChartData:column[] = [
 { Name:'Users',Value:0},
 { Name:'Visitors',Value:0},
 ]
 customOptions2: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: true,
  navSpeed: 9000,
  // autoplay:true,

  navText: ['', ''],
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    740: {
      items: 1,
        },
    1491: {
      items: 1
    },

  },
  nav: true
}
 title:string="MIGRATION PROGRESS";
  partnerForm:any;
  fundRaiserList: any;
  baseUrl: string;
  baseUrl1:string;
  campaignList: any;
  public bannerList: any []=[];
  name = 'ngx sharebuttons';
  clicked: boolean;
  submitted: boolean;
  message: any;
  infoStatus: boolean;
  show_donor_information: any;
  donationAmount: any;
  fundraiserId: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  submittedgmForm: boolean;
  eightygmForm:FormGroup;
  mediaList: any;
  media_BaseUrl: any;
  pageNumber: any;
  totalCount: any;
  medialListLength: any;
  loginToken: any;
  orderResponse: any;
  data: any;
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
  teamList: any;
  teamBaseUrl: any;
  loading: boolean;
  userDetails: any;
  image_url: any;
  baseUrls: any;
  phoneerror: boolean;
  totalValue: number;
  counterStart: number;
  projectcountstop: number;
  totalVisitors: any;
  socialMediaList: any;
  facebook: any;
  instagram: any;
    whatsapp: any;
    linkedin: any;
    twitter: any;
  constructor(private fb: FormBuilder,private authService:AuthService,private router: Router,private apiService: ApiService,private spinner: NgxSpinnerService,private _formBuilder: FormBuilder ) {
    // setInterval(() =>{
    // this.getFundRaisers();
    // },5000);
    this.getFundRaisers();
    this.infoStatus = false;
    this.submitted = false;
    this.submittedgmForm = false;
    this.show_donor_information = 0;
    this.firstFormGroup = this._formBuilder.group({
      amount: ['',[Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]] ,
      show_donor_information: [''],

    });
    this.partnerForm = this.fb.group({
      name: ['',[Validators.required]],
      company: ['',[Validators.required]],
      designation: ['',[Validators.required]],
      phone_number:  ['', [Validators.required,Validators.pattern("^[0-9]*$")]] ,
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      // $('#alert-modal').modal('show');

    }, 5000);

    this.coureselSlider();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    this.donationAmount = 1000;
    this.getMedia();
    this.handletOurTeams();
    this.getUserDetails();
    this.getStatisticsData();
    this.Settings();
    var hash = document.location.hash;
    $(hash+'-tab').ready(function() {
      $(this).click();
    })
    if (hash) {
    $(hash+'-tab').click();
    }
  }
  getStatisticsData(){
    this.apiService.getTotalUsers().subscribe((res:any)=>{
      console.log(res)
     this.totalValue = res['items'].all.totalUsers;
     this.totalVisitors = res['items'].all.totalVisitors;
     this.chartData = [
      { Name:'Users',Value: parseInt(res['items'].all.totalUsers)},
      { Name:'Visitors',Value:parseInt(res['items'].all.totalVisitors)},
      // { Name:'Total Campaigns',Value:res['items'].campaigns.totalCampaigns},

      ];
      this.campaignData = [
        { Name:'Total Fundraisers',Value: parseInt(res['items'].campaigns.totalFundraisers)},
        { Name:'Total Campaigns',Value:parseInt(res['items'].campaigns.totalCampaigns)},
        { Name:'Total Supporters',Value: parseInt(res['items'].campaigns.totalSupporters)},
        // { Name:'Total Campaigns',Value:res['items'].campaigns.totalCampaigns},

        ];
        this.fundData = [
          { Name:'Total Fund Raised',Value: parseInt(res['items'].funds.totalFundRaised)},
          { Name:'Total Fund Required',Value:parseInt(res['items'].funds.totalFundRequired)},
          ];
        this.campaignDataExtra = [
          { Name:'Total Fundraisers',Value: parseInt(res['items'].campaigns.totalFundraisers)},
        { Name:'Total Fund Required',Value:parseInt(res['items'].funds.totalFundRequired)},
        { Name:'Total Supporters',Value: parseInt(res['items'].campaigns.totalSupporters)},
          // { Name:'Total Campaigns',Value:res['items'].campaigns.totalCampaigns},

          ];
      this.allChartData = [
        { Name:'Users',Value: parseInt(res['items'].all.totalUsers)},
        { Name:'Visitors',Value:parseInt(res['items'].all.totalVisitors)},
        // { Name:'Total Fund Required',Value: parseInt(res['items'].funds.totalFundRequired)},
        // { Name:'Total Campaigns',Value:res['items'].campaigns.totalCampaigns},

        ]
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

  counterAnimation(){
    this.counterStart = 0;
    this.totalValue = this.totalValue;
    if(this.totalValue > 0){
    let projectcountstop = setInterval(()=>{

      this.counterStart ++;
      document.getElementById('countuserValue').innerHTML = this.counterStart.toString();
      if(this.counterStart == this.totalValue){
        clearInterval(projectcountstop);

      }

    },300)
  }
  }

  coureselSlider(){
    setTimeout(function(){

      $('.custom1').owlCarousel({
      loop:true,
      infinte:true,
      nav:true,
      autoplay:true,
      navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      dots:false,
      items:3,
      autoplayHoverPause:false,
         responsive:{
              0:{
                  items:1,

              },
              768:{
                  items:2,
                  dots:false,

              },
              1200:{
                  items:3,
                  dots:false,

              }
          }

      });
    },3000);
  }

  getMedia(){
     this.apiService.getmedialist().subscribe((res:any)=>{
      this.mediaList = res['list'];
      this.media_BaseUrl = res.baseUrl;
      this.pageNumber =  res.page;
      this.totalCount = res.totalCount;
      this.medialListLength = this.mediaList.length;
    })
  }
  getUserDetails(){
    this.apiService.getUserProfile().subscribe((res:any)=>{
      this.userDetails = res['userDetails'];
      this.image_url = this.userDetails.image_url;
      this.baseUrls = res.baseUrl;
    }, error => {
    })

  }
  pageChanged(event){
    this.pageNumber =  event
    this.apiService.getmedialistByPagination(event).subscribe((res:any)=>{
      this.mediaList = res['list'];
      this.media_BaseUrl = res.baseUrl;
    })
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
    })

}
get f2() {
  return this.partnerForm.controls;
}
checkphoneNumValidation(){
  if(this.partnerForm.value.phone_number.length < 8){
    this.phoneerror = true;
  }
  else{
    this.phoneerror = false;
  }
}
parterRest(){
  this.partnerForm.reset();
}
  submit(){
    this.submitted = true;
    this.clicked = true;
    this.checkphoneNumValidation();
    const formData = new FormData();
    if (this.partnerForm.invalid) {
        this.clicked = false;
        return;
    }
    let submitFormVal =  this.partnerForm.value
    if(this.partnerForm.invalid === false){
      this.loading = true;
    }
    formData.append('name', submitFormVal.name);
    formData.append('email', submitFormVal.email);
    formData.append('phone_number', submitFormVal.phone_number);
    formData.append('company', submitFormVal.company);
    formData.append('designation', submitFormVal.designation);
    if(this.partnerForm.invalid === false){
    this.apiService.createPartner(formData).subscribe((res:any)=>{
       if (res.success == 1) {
         this.partnerForm.reset();
         this.submitted = false;
         this.loading = false;
         this.clicked = false;
         this.message = res.message;
         $('#successPartnerModal').modal('show');
        } else {

       }
     }, error => {
     })
    }
  }
  closelendSuccessModal(){
    $('#partner-success-modal').modal('hide'); //Using modal pop-up Id.

  }

  donatenowModal(id){
    if(localStorage.getItem("LoginToken")){
      $('#wizard-up-modal').modal('show');
      this.stepper.selectedIndex = 0;
      this.fundraiserId = id;
      this.submittedgmForm = false;
      this.getKey();
    }
    else if(localStorage.getItem("LoginToken") === null){
      $('#sign-in-modal').modal('show');
    }
  }

  get f3() {
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

  }
  close80gForm(){

  }
  get f4() {
    return this.eightygmForm.controls;
  }


 // DONATE NOW SECTION
 getKey(){
  this.apiService.getPaymentkey(this.fundraiserId).subscribe((res:any)=>{
   this.key = res.apiKey;
   this.customer_id = res.customerId;
  })
}
handletOurTeams(){
  this.apiService.getOurTeams().subscribe((res:any)=>{
   this.teamList = res['list'];
   this.teamBaseUrl = res.baseUrl;
  })
}

}

