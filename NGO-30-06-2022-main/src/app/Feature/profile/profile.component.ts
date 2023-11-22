import { element } from 'protractor';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/service/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Slick } from 'ngx-slickjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PageEvent } from '@angular/material/paginator';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  customOptions: OwlOptions = {
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
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },

    },
    nav: true
  }

  @ViewChild('attachments', { static: false }) attachment: any;
  
  userDetails: any;
  campaignList: any;
  baseUrl: any;
  loginToken: string;
  name: any;
  email: any;
  country_code:any;
  phone_number:any;
  date_of_birth: any;
  editProfileForm:any
  submitted: boolean;
  clicked: boolean;
  selectedVideo: any;
  fileList: File[] = [];
  fileData;
  thumbFile = [];
  selectedFile: File;
  uploadfileType: boolean;
  fileType: string;
  image_url: any;
  baseUrls: any;
  donationList: any;
  imagebaseUrl: any;
  dona_imgUrl: any;
  pageNumber: any;
  totalCount: any;
  donationLength: any;
  fund_imgUrl: any;
  MyFundRaiserList: any;
  fundimagebaseUrl: any;
  FundRaisertotalCount: any;
  MyCommentListList: any;
  commentimagebaseUrl: any;
  commentTotalCount: any;
  MyCommentList: any;
  loanbaseUrl: any;
  MyLoanList: any;
  upload_pancard:any
  loantotalCount: any;
  MyLendList: any;
  lendotalCount: any;
  lendbaseUrl: any;
  points: any;
  subscriptionId: any;
  editprfloading: boolean;
  dontLength: any;
  subsccanloading: boolean;
  raisedAmountInPercentage: number;
  phnomessage: any;
  upload :any
  uploadPancard= new FormGroup({})
  upload1:File;
  pancard_image: any;
  baseUrl1: any;
  donate: any;
  payment_hist: any;
  panUrls: any;
  paymentList: any;


  constructor(private fb: FormBuilder,private router: Router,private apiService: ApiService,private toastr: ToastrService) {
    this.editProfileForm = this.fb.group({
      username: ['',[Validators.required]],
      phone_number: ['', [Validators.required]] ,
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
      dob:['',[Validators.required]],
      image:[''],
    });
   
   
  this.upload = new FormControl('', [Validators.required]);
  
 }

  ngOnInit(): void {
    this.getUserDetails();
   this.getCampaigns();
   this.getDonationList();
   this.getMyCommentList();
   this.getMyFundRaiserList();
this.payment();
  }
  myFundRaiser(){
    this.getMyFundRaiserList();
  }
  myFundComments(){
    this.getMyCommentList();
  }
  myLoans(){
    this.getLoanList();
    this.getLendList();

  }
  get f1() {
    return this.uploadPancard.controls;
  }
  get f2() {
    return this.editProfileForm.controls;
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

      });
    },2000);
  }

getUserDetails(){
  setTimeout(() => {
  this.apiService.getUserProfile().subscribe((res:any)=>{
    console.log('detail',res);
    //console.log(res.statusCode)
    this.userDetails = res['userDetails'];
     this.points = this.userDetails.points;
    this.email = this.userDetails.email;
    this.phone_number = this.userDetails.phone_number;
    this.country_code = this.userDetails.country_code;
    this.date_of_birth = this.userDetails.date_of_birth;
    this.name = this.userDetails.name;
    this.image_url = this.userDetails.image_url;
   
    this.baseUrls = res.baseUrl; console.log('url',this.baseUrls);
    this.panUrls =res.panUrl;
    this.pancard_image=res['userDetails'].pancard_image;
    this.editProfileForm['controls'].username.setValue(this.name);
    this.editProfileForm['controls'].dob.setValue(this.date_of_birth);
    this.editProfileForm['controls'].phone_number.setValue(this.phone_number);
    this.editProfileForm['controls'].email.setValue(this.email);
  }, error => {
    // this.toastr.error(error.error.message);
  })
}, 500);
}
getCampaigns(){
  this.apiService.getFundRaiserScheme().subscribe((res:any)=>{
    this.coureselSlider();
    this.campaignList = res['list'];
    this.baseUrl = res.baseUrl;
    if(res['list'].fund_raised !='' || res['list'].fund_raised != undefined){
      this.raisedAmountInPercentage = (parseInt(res['list'].fund_raised)*100)/res['list'].fund_required;
      }


  }, error => {
    // this.toastr.error(error.error.message);
  })
}
getDonationList(){
  this.apiService.getdonations().subscribe((res:any)=>{
    console.log('get donation list',res)
    this.donationList = res['list'];
    this.imagebaseUrl = res.baseUrl;
    this.dona_imgUrl = res.image_url;
    this.pageNumber =  res.page;
    this.totalCount = res.totalCount;
    this.dontLength = this.donationList.length;
  })
}
pageChanged(event){
  this.pageNumber =  event
  this.apiService.getdonationsByPageChnaged(event).subscribe((res:any)=>{
    this.donationList = res['list'];
    // $('html, body').animate({ scrollTop: 0 }, 'fast');
    this.baseUrl = res.baseUrl
    this.totalCount = res.totalCount;
    this.dontLength = this.donationList.length;

  })
}
startaAfundRaiser(){
  $('#start-fundraiser-modal').modal('show'); //Using modal pop-up Id.
}

getLoanList(){
  this.apiService.getMyLoans().subscribe((res:any)=>{
    this.MyLoanList = res['list'];
    this.loanbaseUrl = res.baseUrl;
        this.pageNumber =  res.page;
    this.loantotalCount = res.totalCount;
  })

}
pageChangedMyLoans(event){
  this.apiService.getMyLoansBypagination(event).subscribe((res:any)=>{
    this.MyLoanList = res['list'];
    this.loanbaseUrl = res.baseUrl;
        this.pageNumber =  res.page;
    this.loantotalCount = res.totalCount;
  })
}
getLendList(){
  this.apiService.getMyLend().subscribe((res:any)=>{
    this.MyLendList = res['list'];
    this.lendbaseUrl = res.baseUrl;
        this.pageNumber =  res.page;
    this.lendotalCount = res.totalCount;
  })

}
pageChangedMyLend(event){
  this.apiService.getMyLendBypagination(event).subscribe((res:any)=>{
    this.MyLendList = res['list'];
    this.lendbaseUrl = res.baseUrl;
        this.pageNumber =  res.page;
    this.lendotalCount = res.totalCount;
  })
}
pageChangedpayment(event){
  this.apiService.payment_history().subscribe((res:any)=>{
    this.paymentList = res['list'];
    console.log('payment', this.paymentList)
    // this.lendbaseUrl = res.baseUrl;
    //     this.pageNumber =  res.page;
    // this.lendotalCount = res.totalCount;
  })
}
getMyFundRaiserList(){
  this.apiService.getMyFundRaisers().subscribe((res:any)=>{
    console.log(res)
    this.MyFundRaiserList = res['list'];
    this.fundimagebaseUrl = res.baseUrl;
    this.fund_imgUrl = res.image_url;
    this.pageNumber =  res.page;
    this.FundRaisertotalCount = res.totalCount;
  })
}
pageChangedMyFundRaiser(event){
  this.pageNumber =  event
  this.apiService.getMyFundRaisersByPageChnaged(event).subscribe((res:any)=>{
    console.log(res)
    this.MyFundRaiserList = res['list'];
    $('html, body').animate({ scrollTop: 0 }, 'fast')
    this.fundimagebaseUrl = res.baseUrl;
    this.fund_imgUrl = res.image_url;
    this.pageNumber =  res.page;
    this.FundRaisertotalCount = res.totalCount;
  })
}
getMyCommentList(){
  this.apiService.getMyComments().subscribe((res:any)=>{
    this.MyCommentList = res['list'];
    console.log(res)
    this.commentimagebaseUrl = res.baseUrl;
    console.log(this.commentimagebaseUrl)
    this.fund_imgUrl = res.image_url;
    this.pageNumber =  res.page;
    this.commentTotalCount = res.totalCount;
  })
}
pageChangedMyComments(event){
  this.pageNumber =  event
  this.apiService.getMyCommentsByPageChnaged(event).subscribe((res:any)=>{
    this.MyCommentList = res['list'];
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    this.commentimagebaseUrl = res.baseUrl;
    this.commentTotalCount = res.totalCount;
  })
}
next(){
  $(".owl-next").click();

}
previous(){
  $(".owl-prev").click();

}
onFileChanged(event: any) {
  this.selectedVideo = event.target.files[0];
  this.fileList.push(this.selectedVideo);
  // this.fileList = selectedFile

    var reader = new FileReader();
    reader.readAsDataURL(this.selectedVideo);
    reader.onload = (event) => {
      this.fileData = event.target;
      this.thumbFile = [];
      this.thumbFile.push(this.fileData.result);
  // /this.attachment.nativeElement.value = '';
  if( this.selectedVideo.type != 'image/png') {
    if( this.selectedVideo.type != 'image/jpeg') {
       if( this.selectedVideo.type != 'image/jpg') {
         this.uploadfileType = false;
        this.toastr.warning('File format is not supported, Please upload jpg/png file');
      }
      else{
        this.fileType = 'image';
        this.uploadfileType = true;
      }

    }
    else{
      this.fileType = 'image';
      this.uploadfileType = true;
    }
  }
  else{
    this.fileType = 'image';
    this.uploadfileType = true;
  }
  }


}

closeEditPrfModal(){
  this.editprfloading = false;

}
updateProfile(){
  this.submitted = true;
  this.clicked = true;
  const formData = new FormData();

  if (this.editProfileForm.invalid) {
      this.clicked = false;

  }
  if(this.editProfileForm.invalid === false){
    this.editprfloading = true;
  }
  let profFormVal =  this.editProfileForm.value
  formData.append('image', this.selectedVideo);
  formData.append('name', profFormVal.username);
  formData.append('email', profFormVal.email);
  formData.append('phone_number', profFormVal.phone_number);
  formData.append('date_of_birth', profFormVal.dob);
  this.apiService.updateProfile(formData).subscribe((res:any)=>{
    this.phnomessage = res.message;
    if(res.phnomessage === 'Phone number already taken' || 'Email already taken'){
      this.editprfloading = false;
    }
     if (res.success == 1) {
      this.editprfloading = false;
       this.editProfileForm.reset();
       this.submitted = false;
       this.clicked = false;
       $('#edit-profile-modal').modal('hide'); //Using modal pop-up Id.
      this.getUserDetails();
      $('#successeditPrfModal').modal('show'); //Using modal pop-up Id.
     }else {
       this.toastr.warning(res.message);
   }
 }, error => {
   this.toastr.error(error.error.message);
 })


}
onFileChange(event:any) {
  
  // if (event.target.files.length > 0) {
  //   // const file = event.target.files[0];
  //   // this.uploadPancard.patchValue({
  //   //   fileSource: file
  //   // });
  //   console.log(event.target.files[0].name);
  //   this.upload1=event.target.files[0];

  // }


  this.selectedFile = event.target.files[0];
  console.log(this.selectedFile)
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
      this.toastr.warning('File format is not supported, Please upload jpg/png file');
   };
}
}
 
UploadPAN(){
  const formData = new FormData();
  console.log(this.selectedFile)
  // let d1={'pancard_image':this.upload1};
//  console.log(d1)
 formData.append('pancard_image', this.selectedFile);
 this.apiService.upload_pancard(formData).subscribe((res:any)=>{
  console.log(res);
  this.baseUrl=res.baseUrl;
  this.pancard_image=res.pancard_image;
  console.log(this.baseUrl,this.pancard_image)
 })
}
removeSubscriptionModal(subscribe_id){
  this.subscriptionId = subscribe_id;
  $('#canelsubscModal').modal('show'); //Using modal pop-up Id.
}
cancelSubscription(){
  const formdta = new FormData;
  formdta.append('id',this.subscriptionId)
  this.subsccanloading = true;
  this.apiService.removeSubscription(formdta).subscribe((res:any)=>{
  if(res.success = 1){
    this.subsccanloading = false;
    $('#canelsubscModal').modal('hide'); //Using modal pop-up Id.
    this.getDonationList();

  }
  })
} 
payment(){
  this.apiService.payment_history().subscribe((res:any)=>{
    console.log(res)
    this.donate=res.donate; console.log(this.donate)
    this.payment_hist=res.payment_hist;
    
  })
}
}
