import { ApiService } from './../../core/service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import  'jquery';
declare var $:any;
@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css']
})
export class EditLoanComponent implements OnInit {

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
  fileData;
  thumbFile = [];
  selectedFile: File;
  fileList: File[] = [];
  startFundraiserForm:FormGroup;
  @ViewChild('attachments', { static: false }) attachment: any;
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
  remainingLoanAmount: number;
  createLendForm: any;
  submitted: boolean;
  clicked: boolean;
  created_at: any;
  createdeDate: any;
  no_of_days: string;
  Difference_In_Day: number;
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router: Router,private apiService: ApiService,private _formBuilder: FormBuilder) {
    this.loanfirstFormGroup = this._formBuilder.group({
      amount: ['',[Validators.required]],
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

  ngOnInit(): void {
    this.loan_id = this.route.snapshot.paramMap.get('id');
    this.lendAmount = 1000;
    this.loanDetails();

  }
  loanDetails(){
    var data={
      loan_id:this.loan_id
     }
     this.apiService.getLoanDetails(data).subscribe((res:any)=>{
      this.Details = res['loanDetails'];
      this.title = this.Details.title;
      this.location = this.Details.location;
      this.amount = this.Details.amount;
      this.purpose = this.Details.purpose;
      this.fund_raised = res.fund_raised;
      this.image_url = this.Details.image_url;
      this.loanbaseUrl = res.baseUrl;
      this.campaignerDetails = res['campaignerDetails'];
       this.description = this.Details.description;
       this.closing_date = this.Details.closing_date;
       this.created_at = this.Details.created_at;
       this.createdeDate = this.created_at.slice(0,11)
       this.htmls = '';
       this.ReamingDaysForFundraising();
       this.showPercentage();
  })

  }
  showPercentage(){
    if(this.fund_raised !='' || this.fund_raised != undefined){
    this.raisedAmountInPercentage = (parseInt(this.fund_raised)*100)/this.fund_required;
    }
  }
  ReamingDaysForFundraising(){
    var todayDate = new Date().toISOString().slice(0, 10);
    var date1 = new Date(todayDate);
  var date2 = new Date(this.closing_date);
    // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  this.Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  }
  DaysForFundraising(){
    var date1 = new Date(this.createdeDate);
  var date2 = new Date(this.closing_date);
    // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  this.Difference_In_Day = Difference_In_Time / (1000 * 3600 * 24);
  var result= this.Difference_In_Day.toString();
  this.no_of_days=result.slice(0,2);
  }
  donateLoan(){
    $('#loan-modal').modal('show');

  }
  lendAmounts(e){
    this.lendAmount = e.target.outerText;
  }
  completeLoan(){
    $('#complete-loan-modal').modal('show');
    this.remainingLoanAmount = this.amount - this.fund_raised;
  }
  submitlend(){
    let formData = new FormData;
    let formval = this.loanfirstFormGroup.value;
    formData.append("loan_id",this.loan_id);
    formData.append("amount",formval.amount)
    this.apiService.createLoanLend(formData).subscribe((res:any)=>{
       if (res.success == 1) {
         $('#loan-modal').modal('hide');
         this.loanDetails();
         $('#lend-success-modal').modal('show');

       } else {
  }
     }, error => {
     })

  }
  closelendSuccessModal(){
    $('#lend-success-modal').modal('hide');
  }
  openEditlendModal(){
    $('#edit-lend-modal').modal('show');
    this.DaysForFundraising();
  }
  get f2() {
    return this.createLendForm.controls;
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
  formData.append('loan_id',this.loan_id)

  if(this.selectedFile){
    formData.append('image_url',this.selectedFile)
  }
  // formData.append('image_url',this.selectedFile)
  this.apiService.updateLoan(formData).subscribe((res:any)=>{
     if (res.success == 1) {
       this.createLendForm.reset();
      this.loanDetails();
       this.submitted = false;
       this.clicked = false;
       $('#edit-lend-modal').modal('hide');
     } else {
}
   }, error => {
   })
  }
}
