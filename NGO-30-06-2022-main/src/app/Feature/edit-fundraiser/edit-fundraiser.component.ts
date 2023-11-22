import { element } from 'protractor';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/service/api.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
declare var $:any;
@Component({
  selector: 'app-edit-fundraiser',
  templateUrl: './edit-fundraiser.component.html',
  styleUrls: ['./edit-fundraiser.component.css']
})
export class EditFundraiserComponent implements OnInit {
  relationList: any [];
  categoryList: any [];
  fileUploadProgress:any;
  uploadedFilePath:any;
  activityDetails:any [];
  urls: any[] = [];
  fileData;
  thumbFile = [];
  selectedFile: File;
  fileList: File[] = [];
  startFundraiserForm:FormGroup;
  @ViewChild('attachments', { static: false }) attachment: any;
  documentFileList: any[] = [];
  documentThumbFile: any[]= [];
  benefitiaryFileList: any[] = [];
  benefitiaryThumbFile: any[] =[];
  submitted: boolean;
  clicked: boolean;
  data: any;
  is_health_case: any;
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  selectedDocumentsFile: File;
  selectedBenefitiaryFile: File;
  title: any;
  Details: any;
  fund_required: any;
  campaignerDetails: any;
  campaignerName: any;
  campaignerBaseUrl: any;
  image_url: any;
  beneficiary_account_name: any;
  beneficiary_image: any;
  beneficiary_bank: any;
  beneficiary_ifsc: any;
  beneficiary_account_number: any;
  baseUrl: any;
  story: any;
  donorList: any [];
  name: any;
  donor_image_url: any;
  donorName: any;
  donateAmount: any;
  donation_baseUrl: any;
  supportersList: any [];
  supporter_baseUrl: any;
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
  fund_raised:any;
  fundraiser_id: any;
  fundRaisername: any;
  email: any;
  phone_number: any;
  campaign_id: any;
  patient_name: any;
  health_issue: any;
  hospital_name: any;
  city: any;
  amount: any;
  description: any;
  account_holder_name: any;
  account_number: any;
  bank: any;
  ifsccode: any;
  relation: any;
  patientImage: any;
  benefitiary_image: any;
  noof_days: any;
  documentList: any;
  patientfileData: FileReader;
  created_at: any;
  createdeDate: any;
  campaignChane: number;
  BANK: any;
  BRANCH: any;
  phoneerror: boolean;
  errorMessagedoc: string;
  loading: boolean;
  titleName: any;
  constructor(private fb: FormBuilder,private route:ActivatedRoute,   private router: Router,private apiService: ApiService,private toastr: ToastrService,private _formBuilder: FormBuilder ) {
   this.campaignChane = 0;
    this.startFundraiserForm = this._formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
      phone_number: ['', [Validators.required]] ,
      relation: ['', [Validators.required]] ,
      category: ['',[Validators.required]],
      patient_name: ['', [Validators.required]] ,
      health_issue: [''] ,
      hospital_name: [''] ,
      city: [''] ,
      noof_days: ['', [Validators.required]] ,
      account_holder_name: ['', [Validators.required]] ,
      account_number: ['', [Validators.required]] ,
      bank: ['', [Validators.required]] ,
      ifsccode: ['', [Validators.required]] ,
      amount: ['', [Validators.required]] ,
      description: ['', [Validators.required]] ,
      photo: [''] ,
      documents:[''] ,
      benefitiary_image:[''] ,
      title:['',[Validators.required]]
    });
  }
  ngOnInit() {
    this.fundraiser_id = this.route.snapshot.paramMap.get('id');
    this.fundRaiserDetails()
    this.getRelation();
    // this.getCatgoryList();
    setTimeout(() => {
      this.getCampaginOnLOad();

    }, 500);
  }
  get fundr2() {
    return this.startFundraiserForm.controls;
  }
  getRelation(){
    this.apiService.getRelation().subscribe((res:any)=>{
      this.relationList = res['list'];
   }, error => {
   })
 }

fileProgress(event){
  this.selectedFile = event.target.files[0];
  this.fileList = [];
  this.fileList.push(this.selectedFile);
   var reader = new FileReader();
   reader.readAsDataURL(this.selectedFile);
   reader.onload = (event) => {
     this.fileData = event.target;
     this.thumbFile =[]
     this.thumbFile.push(this.fileData.result);
   };
 this.attachment.nativeElement.value = '';
}

removeSelectedFile(index) {
 this.fileList.splice(index, 1);
 this.thumbFile.splice(index, 1);
}
uploadBenefitiaryImage(event){
  this.selectedBenefitiaryFile = event.target.files[0];
  this.benefitiaryFileList.push(this.selectedBenefitiaryFile);
   var reader = new FileReader();
   reader.readAsDataURL(this.selectedBenefitiaryFile);
   reader.onload = (event) => {
     this.fileData = event.target;
     this.benefitiaryThumbFile= []
     this.benefitiaryThumbFile.push(this.fileData.result);
   };
 this.attachment.nativeElement.value = '';
}
removeBenefitiaryImage(index) {
  this.benefitiaryFileList.splice(index, 1);
  this.benefitiaryThumbFile.splice(index, 1);
 }
changeCampaign(){
  this.campaignChane = 1;
  this.is_health_case = this.startFundraiserForm.value.category.is_health_case;
  if(this.is_health_case === 1){
    this.startFundraiserForm.controls['health_issue'].setValidators([Validators.required])
    this.startFundraiserForm.controls['hospital_name'].setValidators([Validators.required])
    this.startFundraiserForm.controls['city'].setValidators([Validators.required])
  }
  else if(this.is_health_case === 0){
    this.startFundraiserForm.controls['health_issue'].clearValidators();
    this.startFundraiserForm.controls['health_issue'].updateValueAndValidity();
    this.startFundraiserForm.controls['hospital_name'].clearValidators();
    this.startFundraiserForm.controls['hospital_name'].updateValueAndValidity();
    this.startFundraiserForm.controls['city'].clearValidators();
    this.startFundraiserForm.controls['city'].updateValueAndValidity();
  }
}

uploadPatientDocuments(event){
  this.selectedDocumentsFile = event.target.files[0];
  this.documentFileList.push(this.selectedDocumentsFile);
   var reader = new FileReader();
   reader.readAsDataURL(this.selectedDocumentsFile);
   reader.onload = (event) => {
     this.patientfileData = event.target;
     if((this.selectedDocumentsFile.type == 'image/png') || (this.selectedDocumentsFile.type == 'image/jpeg') || (this.selectedDocumentsFile.type == 'application/pdf')|| (this.selectedDocumentsFile.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
     this.documentThumbFile.push(this.patientfileData.result);
     }
     else{
      console.log("kjj")
         this.errorMessagedoc = "Please upload file with type png/jpeg/pdf/docx format"
         console.log(this.errorMessagedoc)
        }
    };


 this.attachment.nativeElement.value = '';
}
removePatientDocument(index) {
  this.documentFileList.splice(index, 1);
  this.documentThumbFile.splice(index, 1);
 }

fundRaiserDetails(){
  var data={
    fundraiser_id:this.fundraiser_id
   }
   this.apiService.getFundRaiserDetails(data).subscribe((res:any)=>{
    this.Details = res['fundraiserDetails'];
    this.fundRaisername = this.Details.name;
    this.email = this.Details.email;
    this.phone_number = this.Details.phone_number;
    this.campaign_id = this.Details.campaign_id;
    this.patient_name = this.Details.patient_name;
    this.health_issue = this.Details.health_issue;
    this.hospital_name = this.Details.hospital;
    this.city = this.Details.city;
    this.patient_name = this.Details.patient_name;
    this.amount = this.Details.fund_required;
    this.title = this.Details.title;
    this.description = this.Details.title;
    this.relation = this.Details.relation_master_id;
    this.account_holder_name = this.Details.beneficiary_account_name;
    this.account_number = this.Details.beneficiary_account_number;
    // this.bank = this.Details.beneficiary_bank;
    this.startFundraiserForm.controls['bank'].setValue(this.Details.beneficiary_bank);

    this.ifsccode = this.Details.beneficiary_ifsc;
    this.patientImage = this.Details.image_url;
    this.benefitiary_image = this.Details.beneficiary_image;
    this.noof_days=this.Details.no_of_days;
    this.baseUrl = res.baseUrl;
    this.documentList = res['fundraiserDocuments'];
    this.documentBaseUrl = res.documentBaseUrl;
    this.closing_date = this.Details.closing_date;
    this.created_at = this.Details.created_at;
    this.createdeDate = this.created_at.slice(0,11)
    this.ReamingDaysForFundraising();
    if(res){
      this.getCatgoryList();
    }

})
}
getCatgoryList(){
  console.log(this.campaign_id)

  this.apiService.getCampaignList().subscribe((res:any)=>{
    console.log(res)
    this.categoryList = res['list'];
    setTimeout(() => {
      var resultData = this.categoryList.filter(item=>item.id === this.campaign_id)
      console.log(resultData)
      this.titleName = resultData[0].title;
      this.is_health_case = resultData[0].is_health_case;
      if(this.is_health_case === 1){
        this.startFundraiserForm.controls['health_issue'].setValidators([Validators.required])
        this.startFundraiserForm.controls['hospital_name'].setValidators([Validators.required])
        this.startFundraiserForm.controls['city'].setValidators([Validators.required])
      }
      else if(this.is_health_case === 0){
        this.startFundraiserForm.controls['health_issue'].clearValidators();
        this.startFundraiserForm.controls['health_issue'].updateValueAndValidity();
        this.startFundraiserForm.controls['hospital_name'].clearValidators();
        this.startFundraiserForm.controls['hospital_name'].updateValueAndValidity();
        this.startFundraiserForm.controls['city'].clearValidators();
        this.startFundraiserForm.controls['city'].updateValueAndValidity();
      }
}, 2000);

  }, error => {
    // this.toastr.error(error.error.message);
  })
}
ReamingDaysForFundraising(){
   var date_diff_indays = function(date1, date2) {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }
     this.noof_days = date_diff_indays(this.createdeDate, this.closing_date);

}
getAccountDetails(){
  console.log(this.startFundraiserForm.value.ifsccode.length)
  if(this.startFundraiserForm.value.ifsccode.length == 11){
    var ifsc = this.startFundraiserForm.value.ifsccode.toUpperCase();
    console.log(ifsc)
   this.apiService.getBankdetails(ifsc).subscribe((res:any)=>{
     console.log(res)
     this.BANK = res.BANK;
     this.BRANCH   = res.BRANCH;
     if(this.BANK){
     this.bank = this.Details.beneficiary_bank;
     console.log(this.bank)
     this.startFundraiserForm.controls['bank'].setValue(this.BANK);
   }
   })
 }
}
checkphoneNumValidation(){
  console.log(this.startFundraiserForm.value.phone.number.length)
  if(this.startFundraiserForm.value.phone.number.length < 8){
    this.phoneerror = true;
  }
  else{
    this.phoneerror = false;
  }
}
getCampaginOnLOad(){
  this.is_health_case =   this.campaign_id;
  if(this.is_health_case === 1){
    this.startFundraiserForm.controls['health_issue'].setValidators([Validators.required])
    this.startFundraiserForm.controls['hospital_name'].setValidators([Validators.required])
    this.startFundraiserForm.controls['city'].setValidators([Validators.required])
  }
  else if(this.is_health_case === 0){
    this.startFundraiserForm.controls['health_issue'].clearValidators();
    this.startFundraiserForm.controls['health_issue'].updateValueAndValidity();
    this.startFundraiserForm.controls['hospital_name'].clearValidators();
    this.startFundraiserForm.controls['hospital_name'].updateValueAndValidity();
    this.startFundraiserForm.controls['city'].clearValidators();
    this.startFundraiserForm.controls['city'].updateValueAndValidity();
  }
}
removeOldPatientDocument(index){
  const formData = new FormData();
  formData.append('id',index)
  formData.append('fundraiser_id',this.fundraiser_id)
  this.apiService.RemoveDocuments(formData).subscribe((res:any)=>{
    if (res.success == 1) {
      this.submitted = false;
      this.clicked = false;
      this.fundRaiserDetails();

    } else {

    }
  }, error => {
  })
}

updateFundRaiser(){
  this.submitted = true;
  this.clicked = true;
  const formData = new FormData();
  if (this.startFundraiserForm.invalid) {
      this.clicked = false;
  }
  this.loading = true;
let fundFormValue =  this.startFundraiserForm.value
formData.append('name',fundFormValue.name)
formData.append('email',fundFormValue.email)
formData.append('phone_number',fundFormValue.phone_number)
formData.append('relation_master_id',fundFormValue.relation)
// if(this.campaignChane === 1){
//   formData.append('campaign_id',fundFormValue.category.id)
// }
// else if(this.campaignChane === 0){
  formData.append('campaign_id',this.campaign_id)
// }
formData.append('patient_name',fundFormValue.patient_name)
formData.append('health_issue',fundFormValue.health_issue)
formData.append('city',fundFormValue.city)
formData.append('hospital',fundFormValue.hospital_name)
formData.append('no_of_days',fundFormValue.noof_days)
formData.append('beneficiary_account_name',fundFormValue.account_holder_name)
formData.append('beneficiary_account_number',fundFormValue.account_number)
formData.append('beneficiary_bank',fundFormValue.bank)
formData.append('beneficiary_ifsc',fundFormValue.ifsccode.toUpperCase())
formData.append('fund_required',fundFormValue.amount)
formData.append('story',fundFormValue.description)
if(this.selectedBenefitiaryFile){
  formData.append('beneficiary_image',this.selectedBenefitiaryFile)
}
if(this.selectedFile){
  formData.append('main_image',this.selectedFile)
}
// formData.append('upload_documents',this.documentFileList)
formData.append('title',fundFormValue.title)
formData.append('fundraiser_id',this.fundraiser_id)
for (let file of this.documentFileList) {
  formData.append('upload_documents', file);
}
  this.apiService.updateFundRaiser(formData).subscribe((res:any)=>{
    if (res.success == 1) {
      this.startFundraiserForm.reset();
      this.loading = false;
      $('#successFundModal').modal('show');
      // this.router.navigateByUrl('/profile')
      this.submitted = false;
      this.clicked = false;


    } else {

    }
  }, error => {
  })
}
goToProfile(){
  this.router.navigateByUrl('/profile')
}
}

