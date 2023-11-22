import { ApiService } from './../../core/service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import * as _ from 'lodash';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare let Razorpay: any;
declare var $:any;
@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrls: ['./lend.component.css']
})
export class LendComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;
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
  fundRaiserList: any;
  baseUrl: any;
  bannerList:any;
  pageNumber: any;
  totalCount: any;
  lendLength: any;
  donationAmount: number;
  submittedgmForm: boolean;
  lendAmount:number;
  eightygmForm:FormGroup;
  infoStatus: boolean;
  show_donor_information: any;
  fundraiserId: any;
  submitted: boolean;
  clicked: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  fileData;
  thumbFile = [];
  selectedFile: File;
  fileList: File[] = [];
  startFundraiserForm:FormGroup;
  @ViewChild('attachments', { static: false }) attachment: any;
  createLendForm: FormGroup;
  loanfirstFormGroup: FormGroup;
  filterVal: string;
  sortrVal: string;
  filterForm: FormGroup;
  searchinput: any;
  sorting: any;
  baseUrlLoan: any;
  loanList: any;
  loading: boolean;
  formdata: any;
  orderResponse: any;
  orderId: any;
  amount: any;
  rzppay: any;
  key: string;
  customer_id: string;
  gmformdata: { pancard_no: any; name: any; phone_number: any; address: any; };
  data: { name: any; email: any; amount: number; show_donor_information: any; fundraiser_id: any; };
  razorpayResponse: string;
  showModal: boolean;
  certificate_name: any;
  certificate_address: any;
  certificate_phone: any;
  certificate_pan: any;
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private spinner: NgxSpinnerService,private router: Router,private apiService: ApiService,private _formBuilder: FormBuilder) {
    this.pageNumber = 1;
    this.submittedgmForm = false;
    this.infoStatus = false;
    this.show_donor_information = 0;
    this.filterVal = '';
    this.sortrVal='';
    this.firstFormGroup = this._formBuilder.group({
      amount: ['',[Validators.required]],
    });
    this.loanfirstFormGroup = this._formBuilder.group({
      amount: ['',[Validators.required]],
    });
    this.filterForm = this.fb.group({
      amount:[''],
      seachKeyword:[''],
      // category_id:['']

    })
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
    this.createLendForm = this._formBuilder.group({
      title: ['',[Validators.required]],
      purpose: ['', [Validators.required]] ,
      amount: ['', [Validators.required]] ,
      no_of_days: ['', [Validators.required]] ,
      location: ['', [Validators.required]] ,
      description: ['', [Validators.required]] ,
      image: ['', [Validators.required]] ,
    });

   }
   get f2() {
    return this.createLendForm.controls;
  }

  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    this.getLoans();
    this.getFundraiserForBanners();
    this.donationAmount = 1000;
    this.lendAmount = 1000;
    // setInterval(() =>{
    //   this.getLoans();
    // this.getFundraiserForBanners();
    //  },5000)

  }
  getLoans(){
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
    // if(this.category_idValue){
    //   this.category_id = this.category_idValue
    // }
    // else{
    //   this.category_id = '';
    // }
    this.apiService.getLoanList(this.sorting,this.searchinput).subscribe((res:any)=>{
      this.loanList = res['list'];
      this.spinner.hide();
      this.baseUrlLoan = res.baseUrl;
      this.pageNumber =  res.page;
      this.totalCount = res.totalCount;
      this.lendLength = this.loanList.length;
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

  this.pageNumber =  event
  this.apiService.getLoanListBypagination(this.sorting,this.searchinput,event).subscribe((res:any)=>{
    this.loanList = res['list'];
      this.baseUrlLoan = res.baseUrl;
      this.pageNumber =  res.page;
      this.totalCount = res.totalCount;
      this.lendLength = this.loanList.length;


  })
}
searchFundRaiserByKeword(){
  this.searchinput = this.filterForm.value.seachKeyword;
  this.getLoans();
  }
  sortFundRaiser(){
    this.sorting = this.filterForm.value.amount;
    this.getLoans()
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

createlendModal(){
  if(localStorage.getItem("LoginToken")){
    $('#create-lend-modal').modal('show');
  }
  else if(localStorage.getItem("LoginToken") === null){
    $('#sign-in-modal').modal('show');
  }
}
  uploadImage(event){
    this.selectedFile = event.target.files[0];
  this.fileList = []
  this.fileList.push(this.selectedFile);
   var reader = new FileReader();
   reader.readAsDataURL(this.selectedFile);
   reader.onload = (event) => {
     this.fileData = event.target;
     this.thumbFile = []
     this.thumbFile.push(this.fileData.result);
   };
 this.attachment.nativeElement.value = '';
  }
  removeSelectedFile(index) {
   this.fileList.splice(index, 1);
   this.thumbFile.splice(index, 1);
  }
  createLend(){
    this.submitted = true;
    this.clicked = true;
      if (this.createLendForm.invalid) {
        this.clicked = false;
    }
    let submitFormVal =  this.createLendForm.value
  var id = this.fundraiserId;
  const formData = new FormData;
  formData.append('title',submitFormVal.title)
  formData.append('purpose',submitFormVal.purpose)
  formData.append('amount',submitFormVal.amount)
  formData.append('location',submitFormVal.location)
  formData.append('no_of_days',submitFormVal.no_of_days)
  formData.append('description',submitFormVal.description)
  formData.append('image_url',this.selectedFile)
  if(this.createLendForm.invalid === false){
    this.loading = true;
  }
  this.apiService.createLoan(formData).subscribe((res:any)=>{
     if (res.success == 1) {
       this.createLendForm.reset();
       this.getLoans();
       this.submitted = false;
       this.clicked = false;
       this.loading = false;
       $('#create-lend-modal').modal('hide');
setTimeout(() => {
  $('#successlendModal').modal('show');

}, 1000);
     } else {
}
   }, error => {
   })
  }
  donateLoan(){
    $('#loan-modal').modal('show');

  }
  lendAmounts(e){
    this.lendAmount = e.target.outerText;
  }
  // DONATE NOW SECTION
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
  get f4() {
    return this.eightygmForm.controls;
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
submitDonationDetails(){
  this.submitted = true;
  this.clicked = true;
    if (this.secondFormGroup.invalid) {
      this.clicked = false;
  }
  let submitFormVal =  this.secondFormGroup.value
  let submitform = this.firstFormGroup.value;
  var id = this.fundraiserId;
  var donorSattus = this.show_donor_information
  this.data={
        name:submitFormVal.name,
        email:submitFormVal.email,
        amount:submitform.amount,
        show_donor_information:donorSattus,
        fundraiser_id:this.fundraiserId
      }
      var datas={
        amount:submitform.amount,
        fundraiser_id:id
      }
      console.log(datas)
      if(this.secondFormGroup.valid && this.secondFormGroup.controls.email.valid){
      $('#wizard-up-modal').modal('hide');
      $('#gmFormmodal').modal('show');
      }
  }

  open80gForm(data){
    console.log(data)
    $('#gmFormmodal').modal('hide');
      $('#80gmFormmodal').modal('show');
  }
   submitPayment(data){
    this.spinner.show();
    console.log(data);
    this.formdata = data;
    this.eightygmForm.controls['name'].clearValidators();
    this.eightygmForm.controls['name'].updateValueAndValidity();
    this.eightygmForm.controls['address'].clearValidators();
    this.eightygmForm.controls['address'].updateValueAndValidity();
    this.eightygmForm.controls['pancard_no'].clearValidators();
    this.eightygmForm.controls['pancard_no'].updateValueAndValidity();
    this.eightygmForm.controls['phone_number'].clearValidators();
    this.eightygmForm.controls['phone_number'].updateValueAndValidity();
    $('#gmFormmodal').modal('hide');
    var datas={
      amount:data.amount,
      fundraiser_id:data.fundraiser_id
    }
     this.apiService.getOrderId(datas).subscribe((res:any)=>{
      this.orderResponse = res;
    this.orderId  = res.orderId;
    this.amount = res.convertedAmount;
    console.log(this.orderId)
    if(res){
      this.spinner.hide();
      console.log("aaaaaaaaaaaaa")
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
  submit80gForm(data){
    this.submittedgmForm = true;
    this.clicked = true;
      if (this.eightygmForm.invalid) {
        this.clicked = false;
    }
    console.log(data);
    let submitform = this.eightygmForm.value;
    this.formdata = data;
    this.gmformdata={
      pancard_no:submitform.pancard_no,
      name:submitform.name,
      phone_number:submitform.phone_number,
      address:submitform.address,
    }
    $('#gmFormmodal').modal('hide');
    var datas={
      amount:data.amount,
      fundraiser_id:data.fundraiser_id
    }
    console.log("test")
    if(this.eightygmForm.valid){
      console.log("valid")
      $('#80gmFormmodal').modal('hide');
      this.spinner.show();
      this.apiService.getOrderId(datas).subscribe((res:any)=>{
        this.orderResponse = res;
      this.orderId  = res.orderId;
      this.amount = res.convertedAmount;
      console.log(this.orderId)
      if(res){
        this.spinner.hide();
        console.log("aaaaaaaaaaaaa")
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


  }
  sureIwillhelp(){
     $('#closeDonateModal').modal('hide');
     $('#newwizard-up-modal').modal('show');
  }

  submitSmallDonation(){
    this.submitted = true;
    this.clicked = true;
      if (this.secondFormGroup.invalid) {
        this.clicked = false;
    }
    let submitFormVal =  this.secondFormGroup.value
    var id = this.fundraiserId;
    var donorSattus = this.show_donor_information
    var donationAmount = 300;
    this.data={
          name:submitFormVal.name,
          email:submitFormVal.email,
          amount:donationAmount,
          show_donor_information:donorSattus,
          fundraiser_id:this.fundraiserId
        }
        var datas={
          amount:donationAmount,
          fundraiser_id:id
        }
        console.log(datas)
        if(this.secondFormGroup.valid){
        $('#newwizard-up-modal').modal('hide');
        $('#gmFormmodal').modal('show');
        $('#closeDonateModal').modal('hide');
        }
    }

  public razorPaySuccessHandler(response) {
      console.log(this.gmformdata);
      this.razorpayResponse = 'Razorpay Response';
      this.showModal = true;
      if(response.razorpay_payment_id){
       console.log(response.razorpay_payment_id)
       if(this.gmformdata != undefined){
        this.certificate_name =this.gmformdata.name
        this.certificate_address=this.gmformdata.address
        this.certificate_phone=this.gmformdata.phone_number
        this.certificate_pan=this.gmformdata.pancard_no
      }
      else{
        this.certificate_name = ''
        this.certificate_address= ''
        this.certificate_phone= ''
        this.certificate_pan= ''
      }
       var dataValue = {
          transaction_id:response.razorpay_payment_id,
          name:this.formdata.name,
          email:this.formdata.email,
          amount:this.formdata.amount,
          show_donor_information:this.formdata.show_donor_information,
          fundraiser_id:this.formdata.fundraiser_id,
          certificate_name:this.certificate_name,
          certificate_address:this.certificate_address,
          certificate_phone:this.certificate_phone,
          certificate_pan:this.certificate_pan,
       }
       console.log(dataValue)
        this.apiService.submitDonation(dataValue).subscribe((res:any)=>{
          if (res.success == 1) {
            $('#successPaymentModal').modal('show');
            this.submitted = false;
            this.clicked = false;

          }
        }, error => {
         })
        }
    }

}
