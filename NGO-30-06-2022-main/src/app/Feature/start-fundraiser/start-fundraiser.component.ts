import { element } from 'protractor';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/service/api.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { FileHandle } from '../dragDrop.directive';
declare var $:any;
@Component({
  selector: 'app-start-fundraiser',
  templateUrl: './start-fundraiser.component.html',
  styleUrls: ['./start-fundraiser.component.css']
})
export class StartFundraiserComponent implements OnInit {
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
  priceList: any;
  loading: boolean;
  priceValue: any;
  errorMessage: string;
  errorMessagedoc: string;
  campaign_id: string;
  category: any;
  categoryName: any;
  BANK: any;
  BRANCH: any;
  phoneerror: boolean;

  files: FileHandle[] = [];
  msg: any
  status:any;
  name: any;
  pdfSrc: any;
  fileData1: any;

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  upload(): void {
    //get image upload file obj;
  }
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router: Router,private apiService: ApiService,private toastr: ToastrService,private _formBuilder: FormBuilder ) {
   this.getCatgoryList();
    this.startFundraiserForm = this._formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
      phone: ['', [Validators.required]] ,
      relation: ['', [Validators.required]] ,
      category: ['',[Validators.required]],
      patient_name: ['', [Validators.required]] ,
      health_issue: [''] ,
      hospital_name: [''] ,
      city: [''] ,
      noof_days: ['', [Validators.required,Validators.pattern("^[0-9]*$")]] ,
      account_holder_name: ['', [Validators.required]] ,
      account_number: ['', [Validators.required]] ,
      bank: ['', [Validators.required]] ,
      ifsccode: ['', [Validators.required,Validators.pattern("^[A-Z a-z 0-9]*$")]] ,
      amount: ['', [Validators.required,Validators.pattern("^[0-9,]*$")]] ,
      description: ['', [Validators.required]] ,
      photo: ['', [Validators.required]] ,
      documents:['', [Validators.required]] ,
      benefitiary_image:['', [Validators.required]] ,
      title:['',[Validators.required]],
      pricing_id :[''],
      branch:['']
    });
      this.campaign_id = this.route.snapshot.paramMap.get('id');
      console.log(this.campaign_id);
  }
  ngOnInit(): void {
    this.getRelation();
    this.handlepricing();
  }
  get fundr2() {
    return this.startFundraiserForm.controls;
  }
  handlepricing(){
    this.apiService.getPricing().subscribe((res:any)=>{
      console.log(res)
      this.priceList = res['list'];
   }, error => {
   })
  }
  // pricing_id
  getRelation(){
    this.apiService.getRelation().subscribe((res:any)=>{
      this.relationList = res['list'];
   }, error => {
   })
 }
 getCatgoryList(){
  this.apiService.getCampaignList().subscribe((res:any)=>{
    this.categoryList = res['list'];
    console.log(this.categoryList)
    setTimeout(() => {
    var category = this.categoryList.filter(item => item.id == this.campaign_id);
      this.categoryName = category[0].title;
      this.is_health_case = category[0].is_health_case;
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


fileProgress(event){
  this.selectedFile = event.target.files[0];
  this.name=URL.createObjectURL(event.target.files[0])
  this.fileList = []
  this.fileList.push(this.selectedFile);
   var reader = new FileReader();
   reader.readAsDataURL(this.selectedFile);
   reader.onload = (event) => {
     this.fileData = event.target;
     this.thumbFile = []
     console.log(this.selectedFile.type)
     if((this.selectedFile.type == 'image/png') || (this.selectedFile.type == 'image/jpg') || (this.selectedFile.type == 'image/jpeg')) {
      this.thumbFile.push(this.fileData.result);
     }
     else{
       this.errorMessage = "Please upload image with type png/jpg/jpeg format"}
       
   };
 this.attachment.nativeElement.value = '';
}

removeSelectedFile(index) {
 this.fileList.splice(index, 1);
 this.thumbFile.splice(index, 1);
}

uploadPatientDocuments(event){

  this.selectedDocumentsFile = event.target.files[0]; 
  this.documentFileList.push(this.selectedDocumentsFile);
   var reader = new FileReader();
   reader.readAsDataURL(this.selectedDocumentsFile);
   reader.onload = (event) => {
   this.fileData = event.target;
     console.log(this.selectedDocumentsFile.type) 
     if((this.selectedDocumentsFile.type == 'image/png') || (this.selectedDocumentsFile.type == 'image/jpeg') || (this.selectedDocumentsFile.type == 'application/pdf')|| (this.selectedDocumentsFile.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      this.documentThumbFile.push({fileval: this.fileData.result, filetype:this.selectedDocumentsFile.type});
      console.log('check',this.documentFileList)
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
uploadBenefitiaryImage(event){
 // console.log(event.target.files[0])
  if(event.target.files[0].type=="image/png"||event.target.files[0].type=="image/jpg"||event.target.files[0].type=="image/jpeg"){
    this.selectedBenefitiaryFile = event.target.files[0];
    this.benefitiaryFileList = [];
    this.benefitiaryFileList.push(this.selectedBenefitiaryFile);
     var reader = new FileReader();
     reader.readAsDataURL(this.selectedBenefitiaryFile);
     reader.onload = (event) => {
       this.fileData = event.target;
       this.benefitiaryThumbFile = [];
       this.benefitiaryThumbFile.push(this.fileData.result);
     };
   this.attachment.nativeElement.value = '';
  }
 else{
  console.log("error");
  this.status=1;
  this.msg="Please upload Image Only"
 }
  
}
removeBenefitiaryImage(index) {
  this.benefitiaryFileList.splice(index, 1);
  this.benefitiaryThumbFile.splice(index, 1);
 }
//  changeCampaign(){
//    this.is_health_case = this.startFundraiserForm.value.category.is_health_case;
//    if(this.is_health_case === 1){
//      this.startFundraiserForm.controls['health_issue'].setValidators([Validators.required])
//      this.startFundraiserForm.controls['hospital_name'].setValidators([Validators.required])
//      this.startFundraiserForm.controls['city'].setValidators([Validators.required])
//    }
//    else if(this.is_health_case === 0){
//      this.startFundraiserForm.controls['health_issue'].clearValidators();
//      this.startFundraiserForm.controls['health_issue'].updateValueAndValidity();
//      this.startFundraiserForm.controls['hospital_name'].clearValidators();
//      this.startFundraiserForm.controls['hospital_name'].updateValueAndValidity();
//      this.startFundraiserForm.controls['city'].clearValidators();
//      this.startFundraiserForm.controls['city'].updateValueAndValidity();
//    }
// }
getAccountDetails(){
  console.log(this.startFundraiserForm.value.ifsccode.length)
 if(this.startFundraiserForm.value.ifsccode.length == 11){
   var ifsc = this.startFundraiserForm.value.ifsccode.toUpperCase();
   console.log(ifsc)
  this.apiService.getBankdetails(ifsc).subscribe((res:any)=>{
    console.log(res.status)
    this.BANK = res.BANK;
    this.BRANCH   = res.BRANCH;
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
submitFundRaiser(event){
  this.submitted = true;
  this.clicked = true;
  const formData = new FormData();
  console.log(this.startFundraiserForm.controls)
  console.log(this.startFundraiserForm.controls.value)
  console.log(this.startFundraiserForm.invalid)

  if (this.startFundraiserForm.invalid) {
      this.clicked = false;
  }
  let fundFormValue =  this.startFundraiserForm.value
  console.log( this.startFundraiserForm.value)
    formData.append('name',fundFormValue.name)
    formData.append('email',fundFormValue.email)
    formData.append('phone_number',fundFormValue.phone.number)
    formData.append('relation_master_id',fundFormValue.relation)
    formData.append('campaign_id',this.campaign_id)
    formData.append('patient_name',fundFormValue.patient_name)
    formData.append('health_issue',fundFormValue.health_issue)
    formData.append('city',fundFormValue.city)
    formData.append('no_of_days',fundFormValue.noof_days)
    formData.append('beneficiary_account_name',fundFormValue.account_holder_name)
    formData.append('beneficiary_account_number',fundFormValue.account_number)
    formData.append('beneficiary_bank',fundFormValue.bank)
    formData.append('beneficiary_ifsc',fundFormValue.ifsccode.toUpperCase())
    formData.append('fund_required',fundFormValue.amount)
    formData.append('story',fundFormValue.description)
    formData.append('beneficiary_image',this.selectedBenefitiaryFile)
    formData.append('hospital',fundFormValue.hospital_name)
    formData.append('main_image',this.selectedFile)
    formData.append('country_code',fundFormValue.phone.dialCode)
    formData.append('title',fundFormValue.title)
    formData.append("pricing_id",fundFormValue.pricing_id)
for (let file of this.documentFileList) {
  formData.append('upload_documents[]', file);
}
if(this.startFundraiserForm.invalid === false){
  event.target.disabled = true;
  this.loading = true;
  this.apiService.createFundRaiser(formData).subscribe((res:any)=>{
    console.log('check',res)
    if (res.success == 1) {
      this.startFundraiserForm.reset();
      this.loading = false;
      $('#successFundModal').modal('show');
      this.submitted = false;
      this.clicked = false;

    } else {

    }
  }, error => {
  })
}
}
goToProfile(){
  this.router.navigateByUrl('/home')
}
changePrice(){
  this.priceValue = this.startFundraiserForm.value.pricing_id;
  console.log(this.priceValue)
}
closeloginSuccessModal(){
  $('#fundraiser-success-modal').modal('hide'); //Using modal pop-up Id.
}


}
