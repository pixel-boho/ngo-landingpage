import { ApiService } from './../../core/service/api.service';
import { Component, ViewChildren, QueryList,OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare let Razorpay: any;
declare var $:any;
@Component({
  selector: 'app-fund-raiser',
  templateUrl: './fund-raiser.component.html',
  styleUrls: ['./fund-raiser.component.css']
})
export class FundRaiserComponent implements OnInit {
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
  fundRaiserList: any;
  baseUrl: any;
  bannerList:any;
  pageNumber: any;
  totalCount: any;
  sorting:any;
  filterForm: any;
  searchinput: any;
  campaignList: any;
  categoryList: any;
  category_id: any;
  filterVal:any
  sortrVal: string;
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
  campaigns: any[] = [];
  campaignsdata: any[]=[];
  category_idValue: any[]=[];
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
  loading: boolean;
  raisedAmountInPercentage: number;
  created_by: any;
  userDetails: any;
  userid: any;
  constructor(private fb: FormBuilder,private authService:AuthService,private spinner: NgxSpinnerService,private router: Router,private apiService: ApiService,private _formBuilder: FormBuilder ) {
    this.infoStatus = false;
    this.show_donor_information = 0;
    this.filterVal = '';
    this.sortrVal='';
    this.submittedgmForm = false;
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
    setInterval(() =>{
      this.getFundRaiser();
      this.getFundraiserForBanners();
    },50000)
    this.getFundRaiser();
    this.getFundraiserForBanners();
    this.getCatgoryList()
    this.donationAmount = 1000;
    this.getUserDetails();

  }
  getFundRaiser(){
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
    this.apiService.browseFundRaiser(this.sorting,this.searchinput,this.category_id).subscribe((res:any)=>{
      this.category_idValue = [];
      this.fundRaiserList = res['list'];
      this.spinner.hide();
      this.baseUrl = res.baseUrl;
      this.pageNumber =  res.page;
      this.totalCount = res.totalCount;
      this.fundRaiserlength = this.fundRaiserList.length;
      if(res['list'].fund_raised !='' || res['list'].fund_raised != undefined){
        this.raisedAmountInPercentage = (parseInt(res['list'].fund_raised)*100)/res['list'].fund_required;
        }
      if(res.succcess = 1){
        this.checkboxes.forEach((element) => {
          element.nativeElement.checked = false;
        });
      }
  })

}

getFundraiserForBanners(){
  this.apiService.getFundraiserForBanners().subscribe((res:any)=>{
    this.fundRaiserList = res['list'];
    this.baseUrl = res.baseUrl;
    var sortList =this.fundRaiserList.sort(function(a, b){
      var aa = new Date(a.closing_date),
          bb = new Date(b.closing_date);
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
      });
      this.bannerList = _.slice(sortList, 0,3);
})
}
sortAmount(){

}
pageChanged(page){
  $('html, body').animate({ scrollTop: 0 }, 'fast');
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
    this.apiService.browseFundRaiserByPagination(this.sorting,this.searchinput,this.category_id,page).subscribe((res:any)=>{
      this.fundRaiserList = res['list'];
      this.baseUrl = res.baseUrl;
      this.pageNumber =  res.page;
      this.totalCount = res.totalCount;
      this.fundRaiserlength = this.fundRaiserList.length;
      if(res['list'].fund_raised !='' || res['list'].fund_raised != undefined){
        this.raisedAmountInPercentage = (parseInt(res['list'].fund_raised)*100)/res['list'].fund_required;
        }
  })
}


getUserDetails(){
  this.apiService.getUserProfile().subscribe((res:any)=>{
    console.log(res)
    this.userDetails = res['userDetails'];
     this.userid = this.userDetails.id;

  })

}
fundRaiserDetail(id,created_by){
  console.log(created_by)
  console.log(this.userid)
  if(created_by == this.userid){
    if(created_by == this.userid)
    this.router.navigateByUrl('/withdraw-fundraiser/' + id)
  }
  else{
    this.router.navigateByUrl('/fund-raiser-detail/' + id)

  }
}
getCatgoryList(){
  this.apiService.getCampaignList().subscribe((res:any)=>{
    this.categoryList = res['list'];
  }, error => {
    // this.toastr.error(error.error.message);
  })

}

sortFundRaiser(){
this.sorting = this.filterForm.value.amount;
this.getFundRaiser()
}
searchFundRaiserByKeword(){
this.searchinput = this.filterForm.value.seachKeyword;
this.getFundRaiser();
}

  categoryVal(){
    this.category_idValue = this.filterForm.value.category_id;
    console.log(this.category_idValue)
    this.getFundRaiser()
  }




}

