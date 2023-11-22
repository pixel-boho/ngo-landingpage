import { ApiService } from './../../core/service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

declare var $:any;

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;

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
  campaign_id: any;
  searchinput: string;
  sorting: string;
  category_id: any;
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router: Router,private apiService: ApiService,private _formBuilder: FormBuilder ) {
    this.campaign_id = this.route.snapshot.paramMap.get('id');
     this.infoStatus = false;
    this.show_donor_information = 0;
    this.submitted = false;
    this.submittedgmForm = false;
    this.firstFormGroup = this._formBuilder.group({
      amount: ['',[Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]] ,
      show_donor_information: [''],

    });
    this.eightygmForm = this._formBuilder.group({
      pancard_no: ['',[Validators.required]],
      name: ['', [Validators.required]] ,
      phone_number: ['', [Validators.required]] ,
    });
  }

  ngOnInit(): void {
    this.getFundraiserForBanners();
    this.getFundraiserByCampaign();
    this.donationAmount = 1000;

  }

  getFundraiserByCampaign(){
    this.searchinput = '';
       this.sorting = '';
       this.category_id = this.campaign_id;
     this.apiService.browseFundRaiser(this.sorting,this.searchinput,this.category_id).subscribe((res:any)=>{
       this.fundRaiserList = res['list'];
       this.baseUrl = res.baseUrl;
       this.pageNumber =  res.page;
       this.totalCount = res.totalCount;
       this.fundRaiserlength = this.fundRaiserList.length;
       if(res.succcess = 1){
       }
   })
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

donatenowModal(id){
  $('#wizard-up-modal').modal('show');
  this.stepper.selectedIndex = 0;
  this.fundraiserId = id;
  this.submittedgmForm = false;
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
  $('#closeDonateModal').modal('show');
}
close80gForm(){
  $('#80gmFormmodal').modal('hide');
  $('#closeDonateModal').modal('show');
}
submitDonationDetails(){
  this.submitted = true;
  this.clicked = true;
    if (this.secondFormGroup.invalid) {
      this.clicked = false;
  }
  let submitFormVal =  this.secondFormGroup.value
  let submitform = this.firstFormGroup.value;
var donorSattus = this.show_donor_information
var id = this.fundraiserId;
  var data={
    name:submitFormVal.name,
    email:submitFormVal.email,
    amount:submitform.amount,
    show_donor_information:donorSattus,
    fundraiser_id:id
  }
  this.apiService.submitDonation(data).subscribe((res:any)=>{
     if (res.success == 1) {
       this.secondFormGroup.reset();
       this.submitted = false;
       this.clicked = false;
       $('#wizard-up-modal').modal('hide');
       $('#gmFormmodal').modal('show');
     } else {
}
   }, error => {
   })
  }
  get f4() {
    return this.eightygmForm.controls;
  }
  open80gForm(){
    $('#gmFormmodal').modal('hide');
    $('#80gmFormmodal').modal('show');
  }
  submit80gForm(){
    this.submittedgmForm = true;
    this.clicked = true;
      if (this.eightygmForm.invalid) {
        this.clicked = false;
    }
  }
  closeDonateModal(){
    $('#wizard-up-modal').modal('hide');
    $('#closeDonateModal').modal('show');

  }
}

