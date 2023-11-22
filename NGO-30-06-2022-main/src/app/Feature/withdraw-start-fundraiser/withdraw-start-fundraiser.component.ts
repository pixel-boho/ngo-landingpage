import { ApiService } from './../../core/service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import  'jquery';
declare var $:any
@Component({
  selector: 'app-withdraw-start-fundraiser',
  templateUrl: './withdraw-start-fundraiser.component.html',
  styleUrls: ['./withdraw-start-fundraiser.component.css']
})
export class WithdrawStartFundraiserComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;
  fundraiser_id: any;
  commentForm: FormGroup;
  submitted: boolean;
  clicked: boolean;
  fundraiserDetails: any;
  title: any;
  Details: any;
  fund_required: any;
  campaignerDetails: any;
  campaignerName: any;
  fundraiserDocumentsLength:any;
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
  donationAmount: number;
  submittedgmForm: boolean;
  eightygmForm:FormGroup;
  infoStatus: boolean;
  show_donor_information: any;
  fundraiserId: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  raisedAmountInPercentage: number;
  fund_raised: any;
  totalCollectedAmount: any;
  totlaRequiredAmount: any;
  RemainingAmount: any;
  fileData;
  thumbFile = [];
  selectedFile: File;
  fileList: File[] = [];
  startFundraiserForm:FormGroup;
  documentForm:FormGroup
  @ViewChild('attachments', { static: false }) attachment: any;
  patientphone_number: any;
  patientemail: any;
  loading: boolean;
  isLoading: boolean;
  typeUrl: any;
  type: any;
  openUrl: any;
  is_approved: any;
  trnsferloading: boolean;
  virtual_account_name: any;
  virtual_account_number: any;
  virtual_account_ifsc: any;
  virtual_account_type: any;
  insMessage: boolean;
  cancelForm: FormGroup;
  reason: boolean;
  isLoadingsignUp: boolean;
  cancelloading: boolean;
  is_cancelled: any;
  close_date: any;
  data: { id: any; };
  contact: any;
  fund: any;
  data1: { contact_id: any; name: any; ifsc: any; account_number: any; };
  show: number;
  show_80g_formStatus: number;
  eightygStatus: any;
  secondFormGroupNgo:           any;
  Difference_In_Time: boolean;
  datecheck: boolean;
  stat:any;
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router: Router,private apiService: ApiService,private _formBuilder: FormBuilder) {
    this.pageNumber = 1;
    this.submittedgmForm = false;
    this.infoStatus = false;
    this.show_donor_information = 0;
    this.commentForm = this._formBuilder.group({
      comment: ['',[Validators.required]],
    });
    this.firstFormGroup = this._formBuilder.group({
      amount                              : ['',[Validators.required]],
      show_donor_information              : [''],
      pancard_no                          : ['',[Validators.required]],
      certificate_address                 : [''],
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
    this.cancelForm = this._formBuilder.group({
      cancel_reason: ['',[Validators.required]],
      comment: [''],
    });
    
    this.secondFormGroupNgo                     = this.fb.group({
      name                                      : ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'),]],
      amount                                    : ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      show_80g_form                             : [''],
      email                                     : ['', [ Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'), ],],
      show_donor_information                    : [''],
      certificate_address                       : [''],
      mob_number_donor                          : ['', [Validators.required, Validators.pattern('^[0-9]*$')],],
      pancard_no                                : [ '',[ Validators.required, Validators.pattern('[A-Z a-z]{5}[0-9]{4}[A-Z a-z]{1}'), ],  ],
    });

  }

  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    this.show_80g_formStatus = 0;
    this.fundraiser_id = this.route.snapshot.paramMap.get('id');
    this.donationAmount = 1000;
    this.fundRaiserDetails();
    this.coureselSlider();
    this.getAllComments();
    this.getTopDonors();
    this.getTopSupporters();
    this.ReamingDaysForFundraising();
    setInterval(() =>{
      this.fundRaiserDetails();
    this.coureselSlider();
    this.getAllComments();
    this.getTopDonors();
    this.getTopSupporters();
    this.ReamingDaysForFundraising();
     },60000)
  }
  get f2() {
    return this.commentForm.controls;
  }
  get f5() {
    return this.secondFormGroupNgo.controls;
  }
  get fundr2() {
    return this.cancelForm.controls;
  }
  show80gFormNgo(event) {
    this.eightygStatus = event.target.checked;
    if (this.eightygStatus === true) {
      this.show_80g_formStatus = 1;
    } else {
      this.show_80g_formStatus = 0;
    }
  }

  changeUrl(type,typeUrl){
    this.typeUrl = typeUrl;
    this.type = type;
    console.log(this.type)
  }
  openImage(documentBaseUrl,typeUrl,type){
    console.log(type)
    if(type === 'pdf' || 'docx'){
    this.openUrl = documentBaseUrl + typeUrl;
    console.log(this.openUrl)
    window.open(this.openUrl);
    }
   }

  coureselSlider(){
    $('.support-items-bar').owlCarousel({
      loop:true,
      infinte:true,
      nav:true,
      autoplay:true,
      navText: [$('.spt-icon-left'),$('.spt-icon-right')],
      dots:false,
      items:1,
      autoplayHoverPause:true,

      });
      $('.donor-items-bar').owlCarousel({
        loop:true,
        infinte:true,
        nav:true,
        autoplay:true,
        navText: [$('.donor-icon-left'),$('.donor-icon-right')],
        dots:false,
        items:1,
        autoplayHoverPause:true,

        });

  }

  slickySlider(){
       /*----------------------------
        Product details slider 2
    ------------------------------ */
    $('.product-dec-slider-2').slick({
      infinite: true,
      slidesToShow: 4,
      vertical: true,
      slidesToScroll: 1,
      centerPadding: '60px',
      prevArrow: '<span class="product-dec-icon product-dec-prev"><i class="la la-angle-up"></i></span>',
      nextArrow: '<span class="product-dec-icon product-dec-next"><i class="la la-angle-down"></i></span>',
      responsive: [{
              breakpoint: 1200,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 1199,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 991,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 767,
              settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1
              }
          },
          {
              breakpoint: 575,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
              }
          }
      ]
  });

  $('.sidebar-active').stickySidebar({
    topSpacing: 0,
    bottomSpacing: 0,
    minWidth: 767,
});
  /*--------------------------
      Product Zoom
  ---------------------------- */
  $(".zoompro").elevateZoom({
    gallery: "gallery",
    galleryActiveClass: "active",
    zoomWindowWidth: 300,
    zoomWindowHeight: 100,
    scrollZoom: false,
    zoomType: "inner",
    cursor: "crosshair"
});
  }
   getAllComments(){
     var data={
      fundraiser_id:this.fundraiser_id
     }
     this.apiService.getComments(data).subscribe((res:any)=>{
      this.commentList = res['list'];
      console.log(this.commentList)
       this.comment_baseUrl = res.baseUrl;
      //  this.pageNumber =  res.page;
       this.totalCount = res.totalCount;
     this.hasNextPage = res.hasNextPage;
 })
}
getCommentsByPagination(){
 this.pageNumber +=1;
  var data={
    fundraiser_id:this.fundraiser_id
   }
   this.apiService.getCommentsByPagination(data,this.pageNumber).subscribe((res:any)=>{
    res['list'].forEach(element => {
      this.commentList.push(element);
    });
     this.comment_baseUrl = res.baseUrl;
     this.pageNumber =  res.page;
     this.totalCount = res.totalCount;
     this.hasNextPage = res.hasNextPage;
})
}
getTopDonors(){
  var data={
    fundraiser_id:this.fundraiser_id
   }
   this.apiService.getTopDonors(data).subscribe((res:any)=>{
    this.donorList = res['list'];
    console.log(this.donorList)
    this.donation_baseUrl = res.baseUrl
    this.noOfDonors = this.donorList.length;
    this.totalCollectedAmount = res.totalCollectedAmount;
    this.totlaRequiredAmount = res.totlaRequiredAmount;
    this.RemainingAmount = this.totlaRequiredAmount - this.totalCollectedAmount;


})
}
getTopSupporters(){
  var data={
    fundraiser_id:this.fundraiser_id
   }
   this.apiService.getTopSupporters(data).subscribe((res:any)=>{
   this.supportersList = res['list'];
   this.supporter_baseUrl = res.baseUrl
   this.noOfSupporters = this.supportersList.length;
})
}
fundRaiserDetails(){
  var data={
    fundraiser_id:this.fundraiser_id
   }
   this.apiService.getMyFundRaiserDetails(data).subscribe((res:any)=>{
    console.log('withdraw',res)
    this.Details = res['fundraiserDetails'];
    this.title = this.Details.title;
    this.close_date=this.Details.closing_date
    this.fund_required = this.Details.fund_required;
    this.fund_raised = res.fund_raised;
    this.name = this.Details.patient_name;
    this.virtual_account_number = this.Details.virtual_account_number;
    this.virtual_account_name = this.Details.virtual_account_name;
    this.virtual_account_type = this.Details.virtual_account_type;
    this.virtual_account_ifsc = this.Details.virtual_account_ifsc;
    this.patientphone_number = this.Details.phone_number;
    this.patientemail=this.Details.email;
    this.is_cancelled = this.Details.is_cancelled;
    this.beneficiary_account_name = this.Details.beneficiary_account_name;
    this.beneficiary_image = this.Details.beneficiary_image;
    this.beneficiary_bank = this.Details.beneficiary_bank;
    this.closing_date= this.Details.closing_date;
    var todayDate = new Date().toISOString().slice(0, 10);
    var date1 = new Date(todayDate);
    var date2 = new Date(this.closing_date);
    console.log(date1)
    console.log(date2)
    // To calculate the time difference of two dates
    // this.datecheck = date2.getTime() < date1.getTime();
    // To calculate the no. of days between two dates
    // this.Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    this.story = 'Hey,I am supporting a critical fundraiser on Crowd works india foundation! Join me in saving' + this.name + ' \nlife by donating to' + this.name + '\nfundraiser on crowd works india foundation.\n\n' + this.name + '  '  + '\nFundraiser:' + this.Details.title + '  ' +  'Please Help \n\n ' + this.Details.story + '\n\nRead More & Donate Now' ;
    this.beneficiary_account_number = this.Details.beneficiary_account_number;
    this.beneficiary_ifsc = this.Details.beneficiary_ifsc;
    this.campaignerDetails = res['campaignerDetails'];
    this.campaignerName = this.campaignerDetails.name;
    this.campagineremail = this.campaignerDetails.email;
    this.campaignerphone_number = this.campaignerDetails.phone_number;
     this.campaignerBaseUrl = res.campaignerBaseUrl;
     this.image_url = this.Details.image_url;
     this.baseUrl = res.baseUrl;
     this.documentBaseUrl = res.documentBaseUrl;
     this.fundraiserDocuments = res.fundraiserDocuments;
     this.fundraiserDocumentsLength = res.fundraiserDocuments.length;
     this.is_approved = this.Details.is_approved;
    //  this.url = this.fundraiserDocuments[0].doc_url;
if( date2.getTime() < date1.getTime()){
  this.stat =1;
}else{
  this.stat=0;
}




    this.typeUrl = this.fundraiserDocuments[0].doc_url;
    if(this.Difference_In_Days == 0 || this.Details.fund_required==this.fund_raised){
     this.show=1;
        
   }else
   {
    this.show=0;
   }
   
    console.log(this.typeUrl)
    this.type = this.fundraiserDocuments[0].file_type;
     this.htmls = '';
     setTimeout( ()=>{
      this.slickySlider();
    }, 500);
     this.showPercentage();
})

}
showPercentage(){
  if(this.fund_raised !='' || this.fund_raised != undefined){
  this.raisedAmountInPercentage = (parseInt(this.fund_raised)*100)/this.fund_required;
  }
}
ReamingDaysForFundraising(){

}
submitComment(){
    this.submitted = true;
    this.clicked = true;
    const formData = new FormData();
    if (this.commentForm.invalid) {
        this.clicked = false;
        return;
    }
    let submitFormVal =  this.commentForm.value

    formData.append('comment', submitFormVal.comment);
    formData.append('fundraiser_id',this.fundraiser_id)
    if(this.commentForm.invalid === false){
      this.isLoading = true;
    }
    this.apiService.addcomment(formData).subscribe((res:any)=>{
       if (res.success == 1) {
         this.commentForm.reset();
         this.submitted = false;
         this.clicked = false;
         this.isLoading = false;
         this.getAllComments()
       } else {

       }
     }, error => {
     })

  }
  donatenowModal(){
    $('#wizard-up-modal1').modal('show');
    this.stepper.selectedIndex = 0;
    this.submittedgmForm = false;
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
  submitDonationDetails(){
    this.submitted = true;
    this.clicked = true;
      if (this.secondFormGroup.invalid) {
        this.clicked = false;
    }
    let submitFormVal =  this.secondFormGroup.value
    let submitform = this.firstFormGroup.value;
  var donorSattus = this.show_donor_information
  var id = this.fundraiser_id;
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
      setTimeout(() => {
        $('#80gmFormmodal').modal('show');

      }, 200);
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
getLastUploadImage(){
  var data={
    fundraiser_id:this.fundraiser_id
   }
   this.apiService.getFundRaiserDetails(data).subscribe((res:any)=>{
    //  var this.fundRaiserDocuments = res.fundraiserDocuments
     let result =res.fundraiserDocuments.slice(-1)[0] // returns last element in an array
         var div = '<div class="slick-slide slick-active" data-slick-index="3" aria-hidden="false" style="width: 116px;"><div><a _ngcontent-yva-c118="" data-image="http://45.79.120.216/ngo/common/uploads/fundraiser-documents/download-1c56a592c8d1ef8bd4e9028af1a8535ba22b8fb4.jpg" data-zoom-image="http://45.79.120.216/ngo/common/uploads/fundraiser-documents/download-1c56a592c8d1ef8bd4e9028af1a8535ba22b8fb4.jpg" class="ng-star-inserted" style="width: 100%; display: inline-block;" tabindex="0"><img _ngcontent-yva-c118="" alt="" src="http://45.79.120.216/ngo/common/uploads/fundraiser-documents/download-1c56a592c8d1ef8bd4e9028af1a8535ba22b8fb4.jpg"></a></div></div>'
      var img = '<a data-image="'+ res.documentBaseUrl+ result.doc_url +' " data-zoom-image="'+ res.documentBaseUrl+ result.doc_url +'"><img src="'+ res.documentBaseUrl+ result.doc_url +'" alt=""></a>';
      $('.product-dec-slider-2').slick('slickAdd','<div><div> <a data-image="'+ res.documentBaseUrl+ result.doc_url +'" data-zoom-image="'+ res.documentBaseUrl+ result.doc_url +'"><img src="'+ res.documentBaseUrl+ result.doc_url +'" alt=""></a></div></div>');
      $('.product-dec-slider-2').slick('unslick');

   })
}
    uploadImage(event){
      console.log("aa")
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
     if(this.thumbFile){
       this.loading = true;
     }
   this.attachment.nativeElement.value = '';
   setTimeout(() => {
    const formData = new FormData;
    formData.append('upload_document',this.selectedFile)
    formData.append('fundraiser_id',this.fundraiser_id)
    this.apiService.updateDocument(formData).subscribe((res:any)=>{
   this.loading = false;
   $('#successdocModal').modal('show'); //Using modal pop-up Id.


      this.fundRaiserDetails();
      this.getLastUploadImage()

      })
   }, 500);

  }
  withDrawFundRaiserModal(){
    // $('#canelfundModal').modal('show'); //Using modal pop-up Id.
  }

  withDrawFundRaiser(){
  const formdta = new FormData;
  formdta.append('fundraiser_id',this.fundraiser_id)
  this.apiService.withdrawFundRaiser(formdta).subscribe((res:any)=>{
  console.log(res)
  if(res.success = 1){
    this.router.navigateByUrl('/profile')
  }
  })
  }
  copyUpinumber(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    $('#successCopyUpiNumber').modal('show');
  }

  TransferAmountModal(){
    if(this.is_cancelled == 0){
    if(this.fund_raised > 0 ){
      $('#trnsferamntModal').modal('show');
    }
    else{
      $('#insuffAmount').modal('show');
    }
  }
  else{
    $('#cancelFundModal').modal('show');

  }
  }
cancelCampaignModal(){
      $('#cancelcampaignModal').modal('show');
  }


  transferAmount(){
    const formdta = new FormData;
    formdta.append('id',this.fundraiser_id)
    this.trnsferloading = true;
    this.apiService.transferAmount(formdta).subscribe((res:any)=>{
      console.log(res)
      if(res.success = 1){
        this.trnsferloading = false;
        this.data                              =    { 
          id:this.fundraiser_id
        }
        $('#trnsferamntModal').modal('hide'); //Using modal pop-up Id.
       
        this.apiService.get_contact(this.data).subscribe((res: any) => {
          if(res){
           this.contact                     =    res;
           this.data1                        =   {
                 contact_id                 :    this.contact.id,
                 name                       :    this.Details.beneficiary_account_name,
                 ifsc                       :    this.Details.beneficiary_ifsc,
                 account_number             :    this.Details.beneficiary_account_number
               }  
           this.apiService.fund_account(this.data1).subscribe((res: any) => {
           this.fund                        =  res;
             var val                        = {
                 fund_account_id            :    this.fund.id,
                 amount                     :    this.Details.fund_required
             }
           this.apiService.payout(val).subscribe((res: any) => {
           this.isLoading                    =   false;
               if(res['result']){
                   let val                   = {
                     fundraiser_id           :    this.fundraiser_id
                   }
                   this.apiService.withdraw(val).subscribe((res: any) => {
                     this.isLoading = false;
                    //  this.feedbackmessage="Amount Transffered Successfully"
                     //$('#wizard-up').modal('show');
                     $('#successtrnsfr').modal('show'); //Using modal pop-up Id.
                     this.router.navigateByUrl('/profile');
                   }) 
               }
               else{
                  //  this.feedbackmessage="Something Went Wrong"
                   $('insuffAmount1').modal('show'); 
                  }  
             })
           })     
          } 
   })
      }
      })
  }
  chooseReason(){
   if(this.cancelForm.value.cancel_reason === 'others'){
     this.reason = true;
   }
   else{
     this.reason = false;
   }
  }

  cancelFundraiser(){
    console.log("hhhhhhhhhhhhhh")
    this.submitted = true;
    this.clicked = true;
    if (this.cancelForm.invalid) {
        this.clicked = false;
    }
    let submitFormVal =  this.cancelForm.value;
    const formData = new FormData();
    if(this.cancelForm.value.cancel_reason === 'others'){
      formData.append('reason', submitFormVal.comment);
      formData.append('fundraiser_scheme_id', this.fundraiser_id)
      this.cancelForm.controls['comment'].setValidators([Validators.required])


    }
    else if(this.cancelForm.value.cancel_reason === 'not_fast' || this.cancelForm.value.cancel_reason === 'collected'){
      formData.append('reason', submitFormVal.cancel_reason);
      formData.append('fundraiser_scheme_id', this.fundraiser_id)
      this.cancelForm.controls['comment'].clearValidators();
      this.cancelForm.controls['comment'].updateValueAndValidity();


    }
    if(this.cancelForm.invalid === false){
      this.cancelloading = true;

    this.apiService.cancelFundRaiser(formData).subscribe((res:any)=>{
      console.log(res)
      if(res.success == true){
        this.cancelloading = false;
        $('#cancelcampaignModal').modal('hide');
         $('#successCancelModal').modal('show');
         this.cancelForm.reset();
         this.submitted = false;

      }
    },err=>{
      console.log(err)
    })
  }

  }
  closeCancelModal(){
    $('#cancelcampaignModal').modal('hide');
    this.cancelForm.reset();
    this.submitted = false;
    this.cancelloading = false;
  }


    }



