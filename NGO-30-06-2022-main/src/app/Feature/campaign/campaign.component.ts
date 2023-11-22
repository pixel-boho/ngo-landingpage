import { ApiService } from './../../core/service/api.service';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/core/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';

declare let Razorpay: any;
declare var $:any;
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
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
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  campaignList: any;
  baseUrl: any;
  name = 'ngx sharebuttons';
  fundRaiserList: any;
  bannerList: any;
  pageNumber: any;
  pagination: any;
  totalCount: any;
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
  fundRaiserlength: any;
  filterForm: FormGroup;
  searchinput: any;
  sorting: any;
  category_id: any;
  category_idValue: any[]=[];
  filterVal: string;
  sortrVal: string;
  campaignsdata: any[]=[];
  campaigns: any[];
  categoryList: any;
  campaignerList: any;
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
  raisedAmountInPercentage: number;
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private authService:AuthService,private router: Router,private spinner: NgxSpinnerService,private apiService: ApiService,private _formBuilder: FormBuilder ) {
    this.category_id = this.route.snapshot.paramMap.get('id');
    this.category_idValue = this.category_id
    this.infoStatus = false;
    this.show_donor_information = 0;
    this.submitted = false;
    this.submittedgmForm = false;
    this.filterVal = '';
    this.sortrVal='';
    this.firstFormGroup = this._formBuilder.group({
      amount: ['',[Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]] ,
      show_donor_information: [''],

    });
    this.filterForm = this.fb.group({
      amount:[''],
      seachKeyword:[''],
      category_id:['']

    })
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
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    setTimeout(() => {
      console.log(this.category_id)
      this.getCampaigns();
    }, 2000);
    this.getFundraiserForBanners();
    this.getCatgoryList();
    this.donationAmount = 1000;
    this.coureselSlider()
    // setInterval(() =>{
    //   this.getCampaigns();
    //   this.getFundraiserForBanners();
    // },5000);

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
      autoplayHoverPause:true,
         responsive:{
              0:{
                  items:1,

              },
              768:{
                  items:2,

              },
              1200:{
                  items:3,

              }
          }

      });
    },500);
  }
  getCatgoryList(){
    this.apiService.getCampaignList().subscribe((res:any)=>{
      this.categoryList = res['list'];
    }, error => {
      // this.toastr.error(error.error.message);
    })

  }
  pageChanged(event){
    if(this.filterForm.value.seachKeyword){
      this.searchinput = this.filterForm.value.seachKeyword;
    }
    else{
      this.searchinput = '';

    }
    if(this.filterForm.value.amount){
      this.sorting = this.filterForm.value.amount;
    }
    else{
      this.sorting = '';

    }
    if(this.category_idValue){
      this.category_id = this.category_idValue
    }
    else{
      this.category_id = '';
    }
    this.pageNumber =  event
    this.apiService.getCampaginerListByPagination(this.sorting,this.searchinput,this.category_id,event).subscribe((res:any)=>{
      this.campaignerList = res['list'];
      this.category_idValue = [];
      this.baseUrl = res.baseUrl
      this.totalCount = res.totalCount;
      if(res['list'].fund_raised !='' || res['list'].fund_raised != undefined){
        this.raisedAmountInPercentage = (parseInt(res['list'].fund_raised)*100)/res['list'].fund_required;
        }
    })
  }
  getCampaigns(){
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    console.log(this.category_id)
    if(this.filterForm.value.seachKeyword){
      this.searchinput = this.filterForm.value.seachKeyword;
    }
    else{
      this.searchinput = '';

    }
    if(this.filterForm.value.amount){
      this.sorting = this.filterForm.value.amount;
    }
    else{
      this.sorting = '';

    }
    if(this.category_idValue){
      this.category_id = this.category_idValue
    }
    else{
      this.category_id = '';
    }
    this.apiService.getCampaginerList(this.sorting,this.searchinput,this.category_id).subscribe((res:any)=>{
      this.category_idValue = [];
      console.log(res)
      this.campaignerList = res['list'];
      this.spinner.hide();
      this.baseUrl = res.baseUrl;
      this.pageNumber =  res.page;
      this.totalCount = res.totalCount;
     this.fundRaiserlength = this.fundRaiserList.length;

    })

}
searchFundRaiserByKeword(){
  this.searchinput = this.filterForm.value.seachKeyword;
  this.getCampaigns();
  }
  sortFundRaiser(){
    this.sorting = this.filterForm.value.amount;
    this.getCampaigns()
    }
    // categoryVal(data,category_id){
    //   this.category_idValue.push(category_id);
    //   let campaignName = data;
    //   this.campaignsdata.push(campaignName)
    // }
    categoryVal(){
      this.category_idValue = this.filterForm.value.category_id;
      console.log(this.category_idValue)
      this.getCampaigns()
    }
    filterCampagin(){
      this.category_idValue = this.category_idValue;
      this.getCampaigns()
      this.campaigns = this.campaignsdata;
    }
    removecampagin(index){
      this.campaigns.splice(index, 1);
      this.getCampaigns();
    }
    clearCheckedItems(){
      this.campaigns = [];
      this.campaignsdata = [];
      this.checkboxes.forEach((element) => {
        element.nativeElement.checked = false;
      });
      this.getCampaigns();
    }

  getFundraiserForBanners(){
  this.apiService.getFundraiserForBanners().subscribe((res:any)=>{
    this.campaignList = res['list'];
    this.baseUrl = res.baseUrl;
    var sortList =this.campaignList.sort(function(a, b){
      var aa = new Date(a.closing_date),
          bb = new Date(b.closing_date);
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
      });
      this.bannerList = _.slice(sortList, 0,3);
})
}
}

