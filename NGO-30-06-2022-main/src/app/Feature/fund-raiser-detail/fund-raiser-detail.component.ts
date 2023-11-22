import { ApiService } from './../../core/service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { Slick } from 'ngx-slickjs';
import { NgxSpinnerService } from 'ngx-spinner';
import 'jquery';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;
declare let Razorpay: any;
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-fund-raiser-detail',
  templateUrl: './fund-raiser-detail.component.html',
  styleUrls: ['./fund-raiser-detail.component.css'],
})
export class FundRaiserDetailComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 200,
    autoplay: true,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
    },
    nav: true,
  };
  @ViewChild('stepper') private stepper: MatStepper;
  config: Slick.Config = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  isLoading = false;
  show:any
  public type: string;
  public typeUrl: string;
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
  campaignerBaseUrl: any;
  image_url: any;
  beneficiary_account_name: any;
  beneficiary_image: any;
  beneficiary_bank: any;
  beneficiary_ifsc: any;
  beneficiary_account_number: any;
  baseUrl: any;
  story: any;
  donorList: any[];
  name: any;
  donor_image_url: any;
  donorName: any;
  donateAmount: any;
  donation_baseUrl: any;
  supportersList: any[];
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
  fundraiserDocuments: any[];
  url: any;
  htmls: string;
  donationAmount: number;
  submittedgmForm: boolean;
  eightygmForm: FormGroup;
  infoStatus: boolean;
  show_donor_information: any;
  fundraiserId: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  raisedAmountInPercentage: number;
  fund_raised: any;
  patientphone_number: any;
  patientemail: any;
  virtual_account_number: any;
  virtual_account_ifsc: any;
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
  health_issue: any;
  RAZORPAY_OPTIONS: any;
  fundRaiserLengths: any;
  raisedAmountInPercentages: any;
  reportForm: FormGroup;
  phoneerror: boolean;
  openUrl: any;
  userDetails: any;
  dontedId: any;
  donorTotalCount: any;
  supporterTotalCount: any;
  campaign_id: any;
  virtual_account_name: any;
  virtual_account_type: any;
  is_campaign: any;
  loadecomment: boolean;
  logintoken: string;
  is_cancelled: number;
  eightygStatus: any;
  show_80g_formStatus: number;
  subscribed: number;
  Nosubscibed: number;
  searchinput: string;
  sorting: string;
  campaignList: any;
  usersignup: boolean;
  isLoadingsignUp: boolean;
  datatitle: string;
  orderIdsubs:any;
  secondFormGroupNgo: any;
  email: any;
  mob: any;
  secondFormGroupNgo1: FormGroup;
  amount11: any;
  feedbackmessage: any;
  msg: any;
  mob_number_donor: any;
  id: string;
  userid: string;
  contact: any;
  fund: any;
  data1: any
  error: any;
  raisedAmount: any;
  fundid: any;
  secondFormGroupNgo3: any;
  show_80g_form: any;
  campaign_id1: any;
    FormGroupNgo: any;
  pancard_no: any;
  apikey: any;
  show1: number;
  certificate_addres: any;
  errorMsg: string;
  close_date: any;
  val: any;
  content_title: any;
  // var ext =  fileName.split('.').pop();
  constructor(
    private metaService: Meta,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private apiService: ApiService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    // this.coureselSliderRelated();
    this.datatitle = 'Check out this on our website';
    this.pageNumber = 1;
    this.submittedgmForm = false;
    this.infoStatus = false;
    this.eightygStatus = false;
    this.show_donor_information = 0;
    this.show_80g_formStatus = 0;
    this.commentForm = this._formBuilder.group({
      comment: ['', [Validators.required]],
    });
    this.firstFormGroup = this._formBuilder.group({
      amount: ['', [Validators.required]],
      show_80g_form: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      amount: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      show_donor_information: [''],
      mob_number_donor: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      pancard_no: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Z a-z]{5}[0-9]{4}[A-Z a-z]{1}'),
        ],
      ],
    });

    this.reportForm = this._formBuilder.group({
      username: [''],
      phone: [''],
      email: [''],
      comment_desc: ['', [Validators.required]],
    });

    this.route.params.subscribe((val) => {
      this.fundraiser_id = val.id;
this.fundid= this.fundraiser_id;
      console.log(val)
      this.fundRaiserDetails();
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

    this.secondFormGroupNgo1 = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      show_donor_information  : [''],
      pancard_no              : ['',[ Validators.required,Validators.pattern('[A-Z a-z]{5}[0-9]{4}[A-Z a-z]{1}'),], ],
      show_80g_form           : [''],
    })
      this.secondFormGroupNgo3 = this.fb.group({
        amount                  : ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        pancard_no              : ['',[ Validators.required,Validators.pattern('[A-Z a-z]{5}[0-9]{4}[A-Z a-z]{1}'),], ],
        show_donor_information  : [''],
        mob_number_donor        : [ '', [Validators.required, Validators.pattern('^[0-9]*$')],],
        name                    : ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'),]],
        show_80g_form           : [''],
        email                   : [ '',[ Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'), ],
      ],
  })
  this.FormGroupNgo = this.fb.group({
    amount: ['', [Validators.required]],
    show_80g_form           : [''],
    pancard_no              : ['',[ Validators.required,Validators.pattern('[A-Z a-z]{5}[0-9]{4}[A-Z a-z]{1}'),], ],
    show_donor_information  : [''],
  })
  }

    





  

  ngOnInit(): void {
    this.fundraiser_id = this.route.snapshot.paramMap.get('id');
    this.userid=localStorage.getItem('user_id');
    // console.log('test', this.userid);
    // this.donationAmount = 1000;
    this.fundRaiserDetails();
    this.getAllComments();
    this.getTopDonors();
    this.getTopSupporters();
    this.getUserDetails();
    this.coureselSlider();
    // this.addTag();'
    setInterval(() => {
      if (localStorage.getItem('donateclicked')) {
       // console.log('hide');
        $('#alert-modal-fund').modal('hide');
        $('#alert-modal').modal('hide');
      } else {
        $('#alert-modal-fund').modal('hide');
        $('#alert-modal').modal('hide');

        // console.log('show');
      }
    }, 9000);
    setInterval(() => {
       //this.fundRaiserDetails();

      this.getAllComments();
      this.getTopDonors();
      this.getTopSupporters();
    }, 60000);

    setTimeout(() => {
      $('#alert-modal-fund').modal('hide');
      $('#alert-modal').modal('hide');
    }, 500);
  }
  closeAlertModal() {
    $('#alert-modal-fund').modal('hide');
  }
  get rprt() {
    return this.reportForm.controls;
  }

  checkphoneNumValidation() {
    if (this.secondFormGroup.value.mob_number_donor.length < 8) {
      this.phoneerror = true;
    } else {
      this.phoneerror = false;
    }
  }

  coureselSlider() {
    setTimeout(function () {
      $('.custom1').owlCarousel({
        loop: true,
        infinte: true,
        nav: true,
        autoplay: true,
        navText: [
          "<i class='fa fa-angle-left'></i>",
          "<i class='fa fa-angle-right'></i>",
        ],
        dots: false,
        items: 3,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
            dots: false,
          },
          768: {
            items: 2,
            dots: false,
          },
          1200: {
            items: 3,
          },
        },
      });
    }, 6000);
  }

  changeUrl(type, typeUrl) {
    this.typeUrl = typeUrl;
    this.type = type;
  }
  openImage(documentBaseUrl, typeUrl, type) {
    if (type === 'pdf' || 'docx') {
      this.openUrl = documentBaseUrl + typeUrl;
      window.open(this.openUrl);
    }
  }
  getUserDetails() {
    this.apiService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res['userDetails'];
        this.dontedId = this.userDetails.id;
      },
      (error) => {
        // this.toastr.error(error.error.message);
      }
    );
  }
  get f2() {
    return this.commentForm.controls;
  }
  slickySlider() {
    /*----------------------------
        Product details slider 2
    ------------------------------ */
    $('.product-dec-slider-2').slick({
      infinite: true,
      slidesToShow: 4,
      vertical: true,
      slidesToScroll: 1,
      centerPadding: '60px',
      prevArrow:
        '<span class="product-dec-icon product-dec-prev"><i class="la la-angle-up"></i></span>',
      nextArrow:
        '<span class="product-dec-icon product-dec-next"><i class="la la-angle-down"></i></span>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    });

    $('.sidebar-active').stickySidebar({
      topSpacing: 0,
      bottomSpacing: 0,
      minWidth: 767,
    });
    /*--------------------------
      Product Zoom
  ---------------------------- */
    $('.zoompro').elevateZoom({
      gallery: 'gallery',
      galleryActiveClass: 'active',
      zoomWindowWidth: 300,
      zoomWindowHeight: 100,
      scrollZoom: false,
      zoomType: 'inner',
      cursor: 'crosshair',
    });
  }
  getAllComments() {
    var data = {
      fundraiser_id: this.fundraiser_id,
    };
    this.apiService.getComments(data).subscribe((res: any) => {
      this.commentList = res['list'];
      this.comment_baseUrl = res.baseUrl;
      //  this.pageNumber =  res.page;
      this.totalCount = res.totalCount;
      this.hasNextPage = res.hasNextPage;
    });
  }
  getCommentsByPagination() {
    this.pageNumber += 1;
    var data = {
      fundraiser_id: this.fundraiser_id,
    };
    this.apiService
      .getCommentsByPagination(data, this.pageNumber)
      .subscribe((res: any) => {
        res['list'].forEach((element) => {
          this.commentList.push(element);
        });
        this.comment_baseUrl = res.baseUrl;
        this.pageNumber = res.page;
        this.totalCount = res.totalCount;
        this.hasNextPage = res.hasNextPage;
      });
  }
  getTopDonors() {
    var data = {
      fundraiser_id: this.fundraiser_id,
    };
    this.apiService.getTopDonors(data).subscribe((res: any) => {
      this.donorList = res['list'];
      this.donation_baseUrl = res.baseUrl;
      this.noOfDonors = this.donorList.length;
      this.pageNumber = res.page;
      this.donorTotalCount = res.totalCount;
    });
  }
  pageChanged(event) {
    this.pageNumber = event;
    var data = {
      fundraiser_id: this.fundraiser_id,
    };
    this.apiService
      .getTopDonorsByPagination(data, event)
      .subscribe((res: any) => {
        this.donorList = res['list'];
        this.donation_baseUrl = res.baseUrl;
        this.noOfDonors = this.donorList.length;
        this.pageNumber = res.page;
        this.donorTotalCount = res.totalCount;
      });
  }
  getTopSupporters() {
    var data = {
      fundraiser_id: this.fundraiser_id,
    };
    this.apiService.getTopSupporters(data).subscribe((res: any) => {
      this.supportersList = res['list'];
      this.supporter_baseUrl = res.baseUrl;
      this.noOfSupporters = this.supportersList.length;
      this.pageNumber = res.page;
      this.supporterTotalCount = res.totalCount;
    });
  }

  pageChangedSupporters(event) {
    this.pageNumber = event;
    var data = {
      fundraiser_id: this.fundraiser_id,
    };
    this.apiService
      .getTopSupportersByPagination(data, event)
      .subscribe((res: any) => {
        this.supportersList = res['list'];
        this.supporter_baseUrl = res.baseUrl;
        this.noOfSupporters = this.supportersList.length;
        this.pageNumber = res.page;
        this.supporterTotalCount = res.totalCount;
      });
  }

  fundRaiserDetails() {
   // console.log('fundraiser')
    var data = {
      fundraiser_id: this.fundraiser_id,
    };
    this.apiService.getFundRaiserDetails(data).subscribe((res: any) => {
      console.log('check',res);
      this.Details = res['fundraiserDetails'];
      this.raisedAmount=this.Details.fund_raised;
      this.close_date=this.Details.closing_date
      this.id=this.Details.id
      console.log(this.Details);
      this.campaign_id = this.Details.campaign_id;
      this.campaign_id1 = this.Details.id;
     // console.log(this.campaign_id);
      if(this.Details.is_campaign==0){
        this.show1=0;
        console.log('iscomp',this.Details.is_campaign)
        if(this.Difference_In_Days == 0 || this.Details.fund_required==this.raisedAmount){
          console.log('this.Details.Difference_In_Days',this.Difference_In_Days,'this.Details.fund_required',this.Details.fund_required,'this.raisedAmount',this.raisedAmount,'this.userid',this.userid,'this.Details.created_by',this.Details.created_by,'this.Details.created_by',this.Details.created_by);  
        if(this.Details.created_by==this.userid){
            this.show =1;
            this.show1=2;
            }else{
            this.show=0;
          } }else{
            this.show=0;
        }
      }else{
        this.show1=1;
        console.log('iscomp',this.Details.is_campaign)
      }
     
      if (this.campaign_id) {
        this.getCampaigns();
      }
      this.closing_date = this.Details.closing_date;
      var todayDate = new Date().toISOString().slice(0, 10);
      var date1 = new Date(todayDate);
      var date2 = new Date(this.closing_date);
      var Difference_In_Time = date2.getTime() - date1.getTime();
      this.Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      this.virtual_account_number = this.Details.virtual_account_number;
      this.virtual_account_name = this.Details.virtual_account_name;
      this.virtual_account_type = this.Details.virtual_account_type;
      this.virtual_account_ifsc = this.Details.virtual_account_ifsc;
      this.title = this.Details.title;
      this.content_title = this.Details.content_title;
      this.is_campaign = this.Details.is_campaign;
      this.fund_required = this.Details.fund_required;
      this.fund_raised = res.fund_raised;
      this.name = this.Details.patient_name;
      this.is_cancelled = this.Details.is_cancelled;
      this.patientphone_number = this.Details.phone_number;
      this.patientemail = this.Details.email;
      this.beneficiary_account_name = this.Details.beneficiary_account_name;
      this.beneficiary_image = this.Details.beneficiary_image;
      this.beneficiary_bank = this.Details.beneficiary_bank;
      this.story= this.Details.story;
     // this.story = 'Hey,I am supporting a critical fundraiser on Crowd works india foundation! Join me in saving' + this.name + ' \nlife by donating to' + this.name + '\nfundraiser on crowd works india foundation.\n\n' + this.name + '  '  + '\nFundraiser:' + this.Details.title + '  ' +  'Please Help \n\n ' + this.Details.story + '\n\nRead More & Donate Now' ;
      //console.log(this.name);
      this.beneficiary_account_number = this.Details.beneficiary_account_number;
      this.beneficiary_ifsc = this.Details.beneficiary_ifsc;
      this.campaignerDetails = res['campaignerDetails'];
      this.campaignerName = this.campaignerDetails.name;
      this.campagineremail = this.campaignerDetails.email;
      this.campaignerphone_number = this.campaignerDetails.phone_number;
      this.campaignerBaseUrl = res.campaignerBaseUrl;
      this.image_url = this.Details.image_url;
      this.health_issue = this.Details.health_issue;
      this.baseUrl = res.baseUrl;
      this.documentBaseUrl = res.documentBaseUrl;
      this.fundRaiserLengths = res.fundraiserDocuments.length;
      this.fundraiserDocuments = res.fundraiserDocuments;
      this.typeUrl = this.fundraiserDocuments[0].doc_url;
      this.type = this.fundraiserDocuments[0].file_type;
      // this.url = this.fundraiserDocuments[0].doc_url;
      this.htmls = '';
      setTimeout(() => {
        this.slickySlider();
      }, 500);

      this.showPercentage();
    });


  }
  showPercentage() {
    if (this.fund_raised != '' || this.fund_raised != undefined) {
      this.raisedAmountInPercentage =
        (parseInt(this.fund_raised) * 100) / this.fund_required;
      //console.log(this.raisedAmountInPercentage);
    }
  }

  submitComment() {
    this.submitted = true;
    this.clicked = true;
    const formData = new FormData();
    if (this.commentForm.invalid) {
      this.clicked = false;
      return;
    }
    let submitFormVal = this.commentForm.value;
    formData.append('comment', submitFormVal.comment);
    formData.append('fundraiser_id', this.fundraiser_id);
    if (this.commentForm.invalid === false) {
      this.loadecomment = true;
    }
    if (localStorage.getItem('LoginToken')) {
      this.apiService.addcomment(formData).subscribe(
        (res: any) => {
          if (res.success == 1) {
            this.commentForm.reset();
            this.submitted = false;
            this.loadecomment = false;
            this.clicked = false;
            this.getAllComments();
          } else {
          }
        },
        (error) => {}
      );
    } else if (localStorage.getItem('LoginToken') === null) {
      $('#sign-in-modal').modal('show');
      this.submitted = false;
      this.commentForm.reset();
      this.loadecomment = false;
    }
  }

  copyUpinumber(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    $('#successCopyUpiNumber').modal('show');
    // alert("Copied the text: " + inputElement.value);
  }

  // DONATE NOW SECTION

  donatenowModal() {
   //console.log('dfg');
    $('#alert-modal-fund').modal('hide');
    this.logintoken = localStorage.getItem('LoginToken');
    //console.log(this.logintoken)
    localStorage.setItem('donateclicked', 'donatebtnclicked');
    if (this.is_cancelled == 0) {
      if (this.logintoken) {
        // this.donateAmount = 1000;
        // this.firstFormGroup.controls['amount'].setValue(this.donateAmount);
        $('#wizard-up-modal11').modal('show');
        $('#alert-modal-fund').modal('hide');
        this.stepper.selectedIndex = 0;
        this.submittedgmForm = false;
        this.fundraiserId = this.fundraiser_id;
        this.getKey();
      } else {
        //console.log('not user')
        $('#wizard-up-modal').modal('show');
        $('#alert-modal-fund').modal('hide');

        // $('#sign-up-modal').modal('show'); //Using modal pop-up Id.
      }
    } else {
      $('#cancelFundModal').modal('show');
    }
  }
  goToSignIn() {
    $('#sign-up-modal').modal('show'); //Using modal pop-up Id.
    $('#continue-signup-modal').modal('hide');
    $('#wizard-up-modal1').modal('hide');
    $('#wizard-up-modal').modal('hide');
    $('#continue-signup-modal1').modal('hide');
  }
  continueDonation() {
     $('#wizard-up-modal12').modal('show');
    //  $('#wizard-up-modal').modal('hide');
    $('#wizard-up-modal1').modal('hide');
    $('#wizard-up-modal').modal('hide');
  }
  continueDonation1(){
    $('#wizard-up-modal1').modal('show');
    $('#continue-signup-modal').modal('hide');
  }
  closeDonation() {
    $('#wizard-up-modal').modal('hide');
    $('#wizard-up-modal12').modal('hide');
    // $('#continue-signup-modal1').modal('hide');
  }
  get f3() {
    return this.secondFormGroup.controls;
  }
   show80gFormNgo(event) {
    this.eightygStatus = event.target.checked;
    if (this.eightygStatus === true) {
      this.show_80g_formStatus = 1;
    } else {
      this.show_80g_formStatus = 0;
    }
  }
  get f5() {
    return this.secondFormGroupNgo.controls;
  }
  showinfo(event) {
    this.infoStatus = event.target.checked;
    if (this.infoStatus === true) {
      this.show_donor_information = 1;
    } else {
      this.show_donor_information = 0;
    }
  }
  show80gForm(event) {
    this.eightygStatus = event.target.checked;
    if (this.eightygStatus === true) {
      this.show_80g_formStatus = 1;
    } else {
      this.show_80g_formStatus = 0;
    }
  }
  donAmount(e) {
    this.donationAmount = e.target.outerText;
  }
  closeFeedbackModal(){
    $('success-modal').modal('hide');
    window.location.reload();
  }

  closeModal() {
    $('#wizard-up-modal').modal('hide');
    localStorage.removeItem('donateclicked');
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    setTimeout(() => {
      $('#closeDonateModal').modal('show');
      this.donationAmount = 1000;
    }, 200);
    window.location.reload();
  }
  closeModal1(){
    $('#wizard-up-modal1').modal('hide');
    $('#wizard-up-modal12').modal('hide');
    localStorage.removeItem('donateclicked');
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    window.location.reload();
    setTimeout(() => {
      $('#closeDonateModal').modal('show');
      this.donationAmount = 0;
    }, 200);
  }
  closeDonateModals() {
    localStorage.removeItem('donateclicked');
    $('#newwizard-up-modal').modal('hide');
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    setTimeout(() => {
      $('#closeDonateModal').modal('show');
    }, 200);
  }
  get f4() {
    return this.eightygmForm.controls;
  }
  getKey() {
    this.apiService.getPaymentkey(this.fundraiserId).subscribe((res: any) => {
      this.key = res.apiKey;
      console.log('key',this.key);
      this.customer_id = res.customerId;
    });
  }

  submitDonationDetails() {
    this.getKey();
    this.getUserDetails();
    this.submitted = true;
    this.clicked = true;
    this.checkphoneNumValidation();
    if (this.show_80g_formStatus === 0) {
      this.secondFormGroup.controls['pancard_no'].clearValidators();
      this.secondFormGroup.controls['pancard_no'].updateValueAndValidity();
    } else {
      this.secondFormGroup.controls['pancard_no'].setValidators([
        Validators.required,
      ]);
    }
    if (this.secondFormGroup.invalid) {
      this.clicked = false;
    }
    let submitFormVal = this.secondFormGroup.value;
    let submitform = this.firstFormGroup.value;
    var id = this.fundraiserId;
    var donorSattus = this.show_donor_information;
    this.mob_number_donor=submitFormVal.mob_number_donor,
    this.name= submitFormVal.name,
    this.email=submitFormVal.email,
    this.data = {
      name: submitFormVal.name,
      email: submitFormVal.email,
      amount: submitform.amount,
      show_donor_information: donorSattus,
      show_80g_form: submitFormVal.show_80g_form,
      fundraiser_id: this.fundraiserId,
      mob_number_donor: submitFormVal.mob_number_donor,
      certificate_pan: submitFormVal.pancard_no,
    };
    var datas = {
      amount: submitform.amount,
      fundraiser_id: id,
    };

    if (this.is_campaign === 0) {
      if (
        this.secondFormGroup.valid &&
        this.secondFormGroup.controls.email.valid &&
        this.phoneerror === false &&
        this.secondFormGroup.controls.pancard_no.valid
      ) {
        $('#wizard-up-modal').modal('hide');
        this.spinner.show();
        this.formdata = this.data;
        this.apiService.getOrderId(datas).subscribe((res: any) => {
          //console.log(res)
          this.orderResponse = res;
          var orderId1 = res.orderId;
          this.amount = res.convertedAmount;
          if (res) {
            this.spinner.hide();
            this.RAZORPAY_OPTIONS = {
              key: '',
              amount: '',
              name: 'NGO',
              currency: 'INR',
              order_id: '',
              customer_id: '',
              description: 'App Payment',
              image:
                'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
              prefill: {
                name: this.name,
                email: this.email,
                contact: this.mob_number_donor,
                method: '',
              },
              notes: {
                type: 'fundraiser',
                amt: this.formdata.amount,
                fid: this.fundraiser_id,
                nam: this.formdata.name,
                eml: this.formdata.email,
                mob: this.formdata.mob_number_donor,
                sdi: this.formdata.show_donor_information ? 1 : 0,
                cpc: this.formdata.certificate_pan
                  ? this.formdata.certificate_pan.toUpperCase()
                  : '',
                cna: this.formdata.certificate_pan ? this.formdata.name : '',
                d_by: this.dontedId ? this.dontedId : '',
                cad: '',
                cph: this.formdata.certificate_pan
                  ? this.formdata.mob_number_donor
                  : '',
              },
              modal: {},
              theme: {
                color: '#0096C5',
              },
            };
            //console.log(this.dontedId);
           // console.log(this.RAZORPAY_OPTIONS);
            this.RAZORPAY_OPTIONS.amount = this.amount;
            this.RAZORPAY_OPTIONS.key = this.key;
            this.RAZORPAY_OPTIONS.order_id = orderId1;
            this.RAZORPAY_OPTIONS.customer_id = this.customer_id;
            this.RAZORPAY_OPTIONS['handler'] =
              this.razorPaySuccessHandler.bind(this);
            this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
            this.firstFormGroup.reset();
            this.secondFormGroup.reset();
            // $('#alert-modal-fund').modal('hide');
            this.rzppay.open();
            this.submitted = false;
            this.clicked = false;
          }
        });
      }
    }
    else if (
      this.is_campaign === 1 &&
      this.secondFormGroup.valid &&
      this.secondFormGroup.controls.email.valid &&
      this.phoneerror === false &&
      this.secondFormGroup.controls.pancard_no.valid
    ) {
      if (localStorage.getItem('LoginToken')) {
        $('#subscribeCampaign').modal('show');
        $('#wizard-up-modal').modal('hide');
      }
       else if (localStorage.getItem('LoginToken') === null) {
        if (
          this.secondFormGroup.valid &&
          this.secondFormGroup.controls.email.valid &&
          this.secondFormGroup.controls.pancard_no.valid &&
          this.phoneerror === false
        ) {
          $('#wizard-up-modal').modal('hide');
          this.spinner.show();
          this.formdata = this.data;
          this.apiService.getOrderId(datas).subscribe((res: any) => {
            this.orderResponse = res;
            var orderId2 = res.orderId;
            //console.log(this.orderId);
            this.amount = res.convertedAmount;
            if (res) {
              this.spinner.hide();
              this.RAZORPAY_OPTIONS = {
                key: '',
                amount: '',
                name: 'NGO',
                currency: 'INR',
                order_id: '',
                customer_id: '',
                description: 'App Payment',
                image:
                  'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
                prefill: {
                  name: '',
                  email: 'test@test.com',
                  contact: '',
                  method: '',
                },
                notes: {
                  type: 'donate',
                  amt: this.formdata.amount,
                  fid: this.fundraiser_id,
                  nam: this.formdata.name,
                  eml: this.formdata.email,
                  mob: this.formdata.mob_number_donor,
                  sdi: this.formdata.show_donor_information ? 1 : 0,
                  cpc: this.formdata.certificate_pan
                    ? this.formdata.certificate_pan.toUpperCase()
                    : '',
                  cna: this.formdata.certificate_pan ? this.formdata.name : '',
                  d_by: this.dontedId ? this.dontedId : '',
                  cad: '',
                  cph: this.formdata.certificate_pan
                    ? this.formdata.mob_number_donor
                    : '',
                },
                modal: {},
                theme: {
                  color: '#0096C5',
                },
              };
              this.RAZORPAY_OPTIONS.amount = this.amount;
              this.RAZORPAY_OPTIONS.key = this.key;
              this.RAZORPAY_OPTIONS.order_id = orderId2;
              this.RAZORPAY_OPTIONS.customer_id = this.customer_id;
              this.RAZORPAY_OPTIONS['handler'] =
                this.razorPaySuccessHandler.bind(this);
              this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
              //console.log(this.RAZORPAY_OPTIONS);
              this.firstFormGroup.reset();
              this.secondFormGroup.reset();
              $('#alert-modal-fund').modal('hide');
              this.rzppay.open();
              this.submitted = false;
              this.clicked = false;
            }
          });
        }
      }
    }
  }
  subscribeCampaign() {
    this.getUserDetails();
    this.getKey();
    this.subscribed = 1;
    $('#subscribeCampaign').modal('hide');
    this.submitted = true;
    this.clicked = true;
    if (this.show_80g_formStatus === 0) {
      this.secondFormGroup.controls['pancard_no'].clearValidators();
      this.secondFormGroup.controls['pancard_no'].updateValueAndValidity();
    } else {
      this.secondFormGroup.controls['pancard_no'].setValidators([
        Validators.required,
      ]);
    }
    this.checkphoneNumValidation();
    if (this.secondFormGroup.invalid) {
      this.clicked = false;
    }
    let submitFormVal = this.secondFormGroup.value;
    let submitform = this.firstFormGroup.value;
    var id = this.fundraiserId;
    var donorSattus = this.show_donor_information;
    this.data = {
      name: submitFormVal.name,
      email: submitFormVal.email,
      amount: submitform.amount,
      show_donor_information: donorSattus,
      show_80g_form: submitFormVal.show_80g_form,
      fundraiser_id: this.fundraiserId,
      mob_number_donor: submitFormVal.mob_number_donor,
      certificate_pan: submitFormVal.pancard_no,
    };
    var datas = {
      amount: submitform.amount,
      fundraiser_id: id,
    };
    // if(this.secondFormGroup.valid && this.secondFormGroup.controls.email.valid && this.phoneerror === false){
    $('#wizard-up-modal').modal('hide');
    this.spinner.show();
    this.formdata = this.data;
    this.apiService.getOrderId(datas).subscribe((res: any) => {
      this.orderResponse = res;
      this.orderIdsubs = res.orderId;
      //console.log(this.orderIdsubs)
      this.amount = res.convertedAmount;
      if (res) {
        this.spinner.hide();
        this.RAZORPAY_OPTIONS = {
          key: this.key,
          amount: this.amount,
          name: 'NGO',
          currency: 'INR',
          order_id: this.orderIdsubs,
          customer_id: '',
          description: 'App Payment',
          image:
            'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
          prefill: {
            name: '',
            email: 'test@test.com',
            contact: '',
            method: '',
          },
          notes: {
            type: 'donate',
            amt: this.formdata.amount,
            fid: this.fundraiser_id,
            nam: this.formdata.name,
            eml: this.formdata.email,
            mob: this.formdata.mob_number_donor,
            sdi: this.formdata.show_donor_information ? 1 : 0,
            cpc: this.formdata.certificate_pan
              ? this.formdata.certificate_pan.toUpperCase()
              : '',
            cna: this.formdata.certificate_pan ? this.formdata.name : '',
            d_by: this.dontedId ? this.dontedId : '',
            cad: '',
            cph: this.formdata.certificate_pan
              ? this.formdata.mob_number_donor
              : '',
            sbscrb: this.subscribed,
          },
          modal: {},
          theme: {
            color: '#0096C5',
          },
        };
       // console.log(this.RAZORPAY_OPTIONS);


        this.RAZORPAY_OPTIONS['handler'] =
          this.razorPaySuccessHandler.bind(this);
        this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
        //console.log(this.RAZORPAY_OPTIONS);
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        $('#alert-modal-fund').modal('hide');
        this.rzppay.open();
        this.submitted = false;
        this.clicked = false;
      }
    });
    // }
  }
  noSubscription() {
    this.getUserDetails();
    this.Nosubscibed = 0;
    $('#subscribeCampaign').modal('hide');
    if (this.show_80g_formStatus === 0) {
      this.secondFormGroup.controls['pancard_no'].clearValidators();
      this.secondFormGroup.controls['pancard_no'].updateValueAndValidity();
    } else {
      this.secondFormGroup.controls['pancard_no'].setValidators([
        Validators.required,
      ]);
    }
    this.submitted = true;
    this.clicked = true;
    let submitFormVal = this.secondFormGroup.value;
    let submitform = this.firstFormGroup.value;
    var id = this.fundraiserId;
    var donorSattus = this.show_donor_information;
    this.data = {
      name: submitFormVal.name,
      email: submitFormVal.email,
      amount: submitform.amount,
      show_donor_information: donorSattus,
      show_80g_form: submitFormVal.show_80g_form,
      fundraiser_id: this.fundraiserId,
      mob_number_donor: submitFormVal.mob_number_donor,
      certificate_pan: submitFormVal.pancard_no,
    };
    var datas = {
      amount: submitform.amount,
      fundraiser_id: id,
    };
    // if(this.secondFormGroup.valid && this.secondFormGroup.controls.email.valid && this.phoneerror === false){
    this.spinner.show();
    this.formdata = this.data;
    this.apiService.getOrderId(datas).subscribe((res: any) => {
      this.orderResponse = res;
    var orderId3 = res.orderId;
      //console.log(this.orderId);
      this.amount = res.convertedAmount;
      if (res) {
        this.spinner.hide();
        this.RAZORPAY_OPTIONS = {
          key: this.key,
          amount: this.amount,
          name: 'NGO',
          currency: 'INR',
          order_id: orderId3,
          customer_id: '',
          description: 'App Payment',
          image:
            'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
          prefill: {
            name: '',
            email: 'test@test.com',
            contact: '',
            method: '',
          },
          notes: {
            type: 'donate',
            amt: this.formdata.amount,
            fid: this.fundraiser_id,
            nam: this.formdata.name,
            eml: this.formdata.email,
            mob: this.formdata.mob_number_donor,
            sdi: this.formdata.show_donor_information ? 1 : 0,
            cpc: this.formdata.certificate_pan
              ? this.formdata.certificate_pan.toUpperCase()
              : '',
            cna: this.formdata.certificate_pan ? this.formdata.name : '',
            d_by: this.dontedId ? this.dontedId : '',
            cad: '',
            cph: this.formdata.certificate_pan
              ? this.formdata.mob_number_donor
              : '',
            sbscrb: this.Nosubscibed,
          },
          modal: {},
          theme: {
            color: '#0096C5',
          },
        };
       // console.log(this.amount);
        // this.RAZORPAY_OPTIONS.amount = this.amount;
        // this.RAZORPAY_OPTIONS.key = this.key;
        // this.RAZORPAY_OPTIONS.order_id = orderId3;
        // this.RAZORPAY_OPTIONS.customer_id = this.customer_id;
        this.RAZORPAY_OPTIONS['handler'] =
          this.razorPaySuccessHandler.bind(this);
        this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
        //console.log(this.RAZORPAY_OPTIONS);
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.rzppay.open();
        this.submitted = false;
        this.clicked = false;
      }
    });
  }
  sureIwillhelp() {
    $('#closeDonateModal').modal('hide');
    $('#newwizard-up-modal').modal('show');
  }

  submitSmallDonation() {
    this.getUserDetails();
    this.submitted = true;
    this.checkphoneNumValidation();
    this.clicked = true;
    if (this.show_80g_formStatus === 0) {
      this.secondFormGroup.controls['pancard_no'].clearValidators();
      this.secondFormGroup.controls['pancard_no'].updateValueAndValidity();
    }
    if (this.secondFormGroup.invalid) {
      this.clicked = false;
    }
    var donationAmount = 300;
    let submitFormVal = this.secondFormGroup.value;
    let submitform = this.firstFormGroup.value;
    var id = this.fundraiserId;
    var donorSattus = this.show_donor_information;
    this.data = {
      name: submitFormVal.name,
      email: submitFormVal.email,
      smallamount: donationAmount,
      show_donor_information: donorSattus,
      show_80g_form: submitFormVal.show_80g_form,
      fundraiser_id: this.fundraiserId,
      mob_number_donor: submitFormVal.mob_number_donor,
      certificate_pan: submitFormVal.pancard_no,
    };
    var datas = {
      amount: donationAmount,
      fundraiser_id: id,
    };
    if (
      this.secondFormGroup.valid &&
      this.secondFormGroup.controls.email.valid &&
      this.phoneerror === false &&
      this.secondFormGroup.controls.pancard_no.valid
    ) {
      $('#newwizard-up-modal').modal('hide');
      this.spinner.show();
      this.formdata = this.data;
      this.apiService.getOrderId(datas).subscribe((res: any) => {
        this.orderResponse = res;
        var orderId4 = res.orderId;
        this.amount = res.convertedAmount;
        if (res) {
          this.spinner.hide();
          this.RAZORPAY_OPTIONS = {
            key: '',
            amount: '',
            name: 'NGO',
            currency: 'INR',
            order_id: '',
            customer_id: '',
            description: 'App Payment',
            image:
              'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
            prefill: {
              name: '',
              email: 'test@test.com',
              contact: '',
              method: '',
            },
            notes: {
              type: 'donate',
              amt: this.formdata.smallamount,
              fid: this.fundraiser_id,
              nam: this.formdata.name,
              eml: this.formdata.email,
              mob: this.formdata.mob_number_donor,
              sdi: this.formdata.show_donor_information ? 1 : 0,
              cpc: this.formdata.certificate_pan
                ? this.formdata.certificate_pan.toUpperCase()
                : '',
              cna: this.formdata.certificate_pan ? this.formdata.name : '',
              d_by: this.dontedId ? this.dontedId : '',
              cad: '',
              cph: this.formdata.certificate_pan
                ? this.formdata.mob_number_donor
                : '',
            },
            modal: {},
            theme: {
              color: '#0096C5',
            },
          };
          this.RAZORPAY_OPTIONS.amount =this.formdata.smallamount;
          this.RAZORPAY_OPTIONS.key = this.key;
          this.RAZORPAY_OPTIONS.order_id = orderId4;
          this.RAZORPAY_OPTIONS.customer_id = this.customer_id;
          this.RAZORPAY_OPTIONS['handler'] =
            this.razorPaySuccessHandler.bind(this);
          this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
          //console.log(this.RAZORPAY_OPTIONS);
          this.firstFormGroup.reset();
          this.secondFormGroup.reset();
          this.rzppay.open();
          this.submitted = false;
          this.clicked = false;
        }
      });
    }
  }
  public razorPaySuccessHandler(response) {
    this.razorpayResponse = 'Razorpay Response';
    this.showModal = true;
    if (response.razorpay_payment_id) {
      $('#successPaymentModal').modal('show');
      this.fundRaiserDetails();
      // this.piService.search(data).subscribe((res: any) => {
      //   this.searchResult = res['list'];
      // });
    }
  }

  // DONATION SECTION END
  next() {
    $('.owl-next').click();
  }
  previous() {
    $('.owl-prev').click();
  }

  loadFundRaiserDetails(id) {
    //console.log(id);
    this.fundraiser_id = id;
    this.fundRaiserDetails();
    // window.location.reload();
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    // this.router.navigateByUrl('/fund-raiser-detail/',id)
  }
  // Get related items
  getCampaigns() {
    this.searchinput = '';
    this.sorting = '';
    this.apiService
      .getCampaginerList(this.sorting, this.searchinput, this.campaign_id)
      .subscribe((res: any) => {
        //console.log(res);
        this.baseUrl = res.baseUrl;
        //console.log('result');
        this.campaignList = res['list'];
       // console.log(this.campaignList);
        if (
          res['list'].fund_raised != '' ||
          res['list'].fund_raised != undefined
        ) {
          this.raisedAmountInPercentages =
            (parseInt(res['list'].fund_raised) * 100) /
            res['list'].fund_required;
        }
      });
  }

  reportFundraiser() {
    $('#success-modals').modal('show');
    //console.log(localStorage.getItem('LoginToken'));
    if (localStorage.getItem('LoginToken')) {
      this.usersignup = true;
      this.reportForm.controls['username'].clearValidators();
      this.reportForm.controls['username'].updateValueAndValidity();
      this.reportForm.controls['phone'].clearValidators();
      this.reportForm.controls['phone'].updateValueAndValidity();
      this.reportForm.controls['email'].clearValidators();
      this.reportForm.controls['email'].updateValueAndValidity();
    } else {
      this.usersignup = false;
      this.reportForm.controls['username'].setValidators([Validators.required]);
      this.reportForm.controls['phone'].setValidators([Validators.required]);
      this.reportForm.controls['email'].setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
      ]);
    }
  }

  submitReport() {
    this.submitted = true;
    this.clicked = true;
    if (this.reportForm.invalid) {
      this.clicked = false;
    }
    let submitFormVal = this.reportForm.value;
    //console.log(this.reportForm.controls);
    const formData = new FormData();
    formData.append('name', submitFormVal.username);
    formData.append('email', submitFormVal.email);
    formData.append('description', submitFormVal.comment_desc);
    formData.append('phone', submitFormVal.phone.number);
    formData.append('fundraiser_scheme_id', this.fundraiser_id);
    if (this.reportForm.invalid === false) {
      this.isLoadingsignUp = true;

      this.apiService.reportFundRaiser(formData).subscribe(
        (res: any) => {
        //  console.log(res);
          if (res.success == true) {
            this.isLoadingsignUp = false;
            $('#report-modal').modal('hide');
            $('#successReportModal').modal('show');
            this.reportForm.reset();
            this.submitted = false;
          }
        },
        (err) => {
         // console.log(err);
        }
      );
    }
  }
  closeReportModal() {
    $('#report-modal').modal('hide');
    this.reportForm.reset();
    this.submitted = false;
    this.isLoadingsignUp = false;
  } 
  payment(){
   // console.log('payment',  this.secondFormGroupNgo.value);
    this.name     = this.secondFormGroupNgo.value.name;
    this.email    = this.secondFormGroupNgo.value.email;
    this.amount   = this.secondFormGroupNgo.value.amount
    this.mob      = this.secondFormGroupNgo.value.mob_number_donor;

    this.show_donor_information = this.secondFormGroupNgo.value.show_donor_information
    let data={
              name:this.secondFormGroupNgo.value.name,
              email:this.secondFormGroupNgo.value.email,
              amount:this.secondFormGroupNgo.value.amount,
  
            }
   // console.log(data, this.mob  ) ;
    $('#wizard-up-modal').modal('hide');
    this.apiService.guestDonate(data).subscribe(
      (res: any) => {
       // console.log('api-fund',res)
        this.orderId = res.orderId;
        this.amount = res.convertedAmount;
        if(res.orderId){
           //console.log('hgj')
           //this.closeModal();
         
           this.spinner.hide();
        this.RAZORPAY_OPTIONS = {
          key: res.apiKey,
          amount:this.amount,
          name: 'NGO',
          currency: 'INR',
          order_id:this.orderId,
          customer_id: '',
          description: 'App Payment',
          image:
            'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
          prefill: {
            name: this.name,
            email: this.email,
            contact: this.secondFormGroupNgo.mob_number_donor,
            method: '',
          },
          notes: {
            type: 'donate',
            mob: this.mob,
            amt:  this.secondFormGroup.value.amount,
            // 'fid': this.fundraiser_id,
            nam: this.secondFormGroup.value.name,
            eml: this.secondFormGroup.value.email,
            // mob: this.secondFormGroup.value.mob_number_donor,
            sdi: this.secondFormGroup.value.show_donor_information ? 1 : 0,
            cpc:this.secondFormGroup.value.certificate_pan
              ? this.secondFormGroup.value.certificate_pan.toUpperCase()
              : '',
            // 'd_by':this.dontedId?this.donatedId:''
            cna:this.secondFormGroup.value.certificate_pan ?this.secondFormGroup.value.name : '',
            d_by: this.dontedId ? this.dontedId : '',
            cad: '',
            cph:this.secondFormGroup.value.certificate_pan
              ? this.secondFormGroup.value.mob_number_donor
              : '',
          },
          modal: {},
          theme: {
            color: '#0096C5',
          },
        };
      //  console.log(this.RAZORPAY_OPTIONS);
        this.RAZORPAY_OPTIONS.amount = this.amount;
        this.RAZORPAY_OPTIONS.key = this.key;
        this.RAZORPAY_OPTIONS.order_id = this.orderId;
        this.RAZORPAY_OPTIONS.customer_id = this.customer_id;
        this.secondFormGroupNgo.reset();
        //this.firstFormGroupNGO.reset();
       // this.donationAmountNgo = 1000;
        //console.log(this.donationAmountNgo);
        this.RAZORPAY_OPTIONS['handler'] =
          this.razorPaySuccessHandler1.bind(this);
        this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
        this.rzppay.open();
        this.submitted = false;
        this.clicked = false;
      }
        
       })
      
} 
public razorPaySuccessHandler1(response) {
  this.razorpayResponse = 'Razorpay Response';
  this.showModal = true;
  if (response.razorpay_payment_id) {
    let data={
      transaction_id:response.razorpay_payment_id,
      amount:this.amount,
      name:this.name,
      email:this.email,
      show_donor_information:this.show_donor_information ? 1 : 0,
     certificate_name:'',
     certificate_address:'',
     certificate_phone:this.formdata.mob_number_donor,
     certificate_pan:this.formdata.certificate_pan,
  
    }
    this.apiService.guest_donate(data).subscribe((res: any) => {
     // console.log('db1',res);
     
      if (res.statusCode==200) {
        this.msg=res.message;
        this.feedbackmessage=this.msg
       $('#success-modal').modal('show'); 
      }
     
    })
  }
  }
  //=======================================================================================//
  //-------------------------------fundraiser-user donate----------------------------------//
  //=======================================================================================//
  Paynow(){
    console.log('user');
    let donate_amount                    = this.fund_required-this.fund_raised;
    console.log('donate_amount',donate_amount,this.secondFormGroupNgo.value.amount)
    if(this.secondFormGroupNgo.value.amount<= donate_amount){
      this.fundraiserId                  = this.fundraiser_id;
      this.apiService.getPaymentkey(this.fundraiserId).subscribe((res: any) => {
      this.apikey                        = res.apiKey;
      this.fundraiser_id                 = this.fundraiser_id
      //console.log('this.certificate_address ',this.secondFormGroupNgo.value)
      this.name                          = res.user_details.name;
      this.email                         = res.user_details.email
      this.mob                           = res.user_details.phone_number;
      this.amount11                      = this.secondFormGroupNgo.value.amount;
      this.pancard_no                    = this.secondFormGroupNgo.value.pancard_no;
      this.certificate_address           = this.secondFormGroupNgo.value.certificate_address;
      console.log('this.certificate_address ',this.certificate_address )
      let data                           = {
            amount                       : this.amount11,
            fundraiser_id                : this.fundraiser_id
      }
      this.apiService.getOrderId(data).subscribe((res: any) => {
        $('#wizard-up-modal11').modal('hide'); 
        this.orderResponse               = res;
        this.orderId                     = res.orderId;
        this.amount                      = this.amount11;
        if (res) {
          this.spinner.hide();
          this.RAZORPAY_OPTIONS          = {
                key                      : this.apikey ,
                amount                   : this.amount11,
                name                     : 'NGO',
                currency                 : 'INR',
                order_id                 : this.orderId,
                description              : 'App Payment',
                image                    : 'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
                prefill:                   {
                  name                   : this.name,
                  email                  : this.email,
                  contact                : this.mob,
                  method                 : '',
                },
            notes                        : {
                type                     : 'donate ',
                amt                      : this.amount,
                nam                      : this.name,
                eml                      : this.email,
              },
                modal                    : {},
                theme                    : {
                  color                  : '#0096C5',
                },
          };
          this.RAZORPAY_OPTIONS.amount   = this.amount;
          this.RAZORPAY_OPTIONS.key      = this.apikey ,
          this.RAZORPAY_OPTIONS.order_id = this.orderId;
          this.RAZORPAY_OPTIONS.customer_id='';
          this.secondFormGroupNgo.reset();
          this.RAZORPAY_OPTIONS['handler'] =
            this.razorPaySuccessHandler2.bind(this);
          this.rzppay                    = new Razorpay(this.RAZORPAY_OPTIONS);
          this.rzppay.open();
          this.submitted                 = false;
          this.clicked                   = false;
          this.isLoading                 = false;
        }
      });   
  })
    }else{
    this.errorMsg='Amount-exceeded';
    this.isLoading                 = false;
    }
}
public razorPaySuccessHandler2(response) {
  this.razorpayResponse                  = 'Razorpay Response';
  this.showModal                         = true;
  if (response.razorpay_payment_id) {
      let data                           = {
      certificate_pan                    : this.pancard_no,
      certificate_name                   : this.name,
      certificate_address                : this.certificate_address,
      certificate_phone                  : this.mob,
      transaction_id                     : response.razorpay_payment_id,
      amount                             : this.amount,
      fundraiser_id                      : this.fundraiser_id,
      name                               : this.name,
      email                              : this.email,
      show_donor_information:this.show_donor_information ? 1 : 0,
      user_id                            : this.userid
    }
    console.log('data',data )
    this.apiService.user_donate(data).subscribe((res: any) => {
      this.feedbackmessage               = res.message;
      if (res.statusCode==200) {
          $('#success-modal').modal('show'); 
      }else{
          $('#success-modal1').modal('show'); 
      }
    })
  }
} 
//   =========================================================================//
submitDonationDetailsNgo() {
  this.isLoading            = true;
  this.val=this.secondFormGroupNgo.value.certificate_address;
  let pan=this.secondFormGroupNgo.value.pancard_no
  console.log('guest',this.secondFormGroupNgo.value,pan)
   let donate_amount                               = this.fund_required-this.fund_raised;
  if (this.secondFormGroupNgo.value.amount=='' || this.secondFormGroupNgo.value.email==''|| this.secondFormGroupNgo.value.mob_number_donor==''|| this.secondFormGroupNgo.value.name=='') {
    this.clicked                                  = false;
    this.submitted                                = true;
    console.log('hii');
  }else{
    console.log('else');
   if(this.secondFormGroupNgo.value.amount<=donate_amount){
    this.submitted                         = true;
    this.clicked                           = true;
    let submitFormVal                      = this.secondFormGroupNgo.value;
        this.name                          = submitFormVal.name;
        this.email                         = submitFormVal.email;
        this.amount                        = submitFormVal.amount;
        this.mob                           = submitFormVal.mob_number_donor;
        this.certificate_addres            = this.val;
        this.certificate_pan               = pan,
         this.data                         = {
                name                       : submitFormVal.name,
                email                      : submitFormVal.email,
                amount                     : submitFormVal.amount,
          
          };
          console.log('this.certificate_pan  ',this.certificate_pan )
        this.getKey();
        this.apiService.guestDonate(this.data).subscribe((res: any) => {
        console.log('api',res)
        this.orderResponse                = res;
        this.orderId                      = res.orderId;
        this.amount                       = this.amount;
              if (res) {
                this.isLoading            = false;
                this.spinner.hide();
                this.RAZORPAY_OPTIONS     = {
                  key                     : res.apiKey,
                  amount                  : this.amount,
                  name                    : 'NGO',
                  currency                : 'INR',
                  order_id                : this.orderId,
                  customer_id             : '',
                  description             : 'App Payment',
                  image                   : 'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
                    prefill               : {
                      name                : this.name,
                      email               : this.email,
                      contact             : this.mob,
                      method              : '',
                  },
                  notes                   : {
                    type                  : 'donate',
                    amt                   : this.amount,
                    nam                   : this.name,
                    eml                   : this.email,
                    mob                   : this.mob,
                    sdi                   : this.secondFormGroupNgo.show_donor_information ? 1 : 0,
                    cpc                   : this.formdata.certificate_pan ? this.formdata.certificate_pan.toUpperCase(): '',
                    cna                   : this.formdata.certificate_pan ? this.formdata.name : '',
                    d_by                  : this.dontedId ? this.dontedId : '',
                    cad                   : '',
                    cph                   : this.formdata.certificate_pan ? this.formdata.mob_number_donor : '',
                  },
                  modal                   : {},
                  theme                   : {
                    color                 : '#0096C5',
                  },
                };
                console.log(this.RAZORPAY_OPTIONS);
                this.RAZORPAY_OPTIONS.amount         = this.amount;
                this.RAZORPAY_OPTIONS.key            = this.key;
                this.RAZORPAY_OPTIONS.order_id       = this.orderId;
                this.RAZORPAY_OPTIONS.customer_id    = this.customer_id;
                this.secondFormGroupNgo.reset();
                this.RAZORPAY_OPTIONS['handler']     =
                this.razorPaySuccessHandler3.bind(this);
                this.rzppay                          = new Razorpay(this.RAZORPAY_OPTIONS);
                this.rzppay.open();
                this.submitted                       = false;
                this.clicked                         = false;
              }
            });
            $('#wizard-up-modal12').modal('hide');
                this.formdata                        = this.data;
                this.spinner.hide();
          }
          else{
            this.errorMsg='Amount-exceeded'
            this.isLoading                 = false;
          }

        
      }
    }   
  public razorPaySuccessHandler3(response:any) {
    this.razorpayResponse                           = 'Razorpay Response';
    this.showModal = true;
    if (response.razorpay_payment_id) {
      // console.log(response)
      $('#wizard-up-modal12').modal('hide');
       let data1                  = {
       transaction_id             : response.razorpay_payment_id,
       amount                     : this.amount,
       fundraiser_id              : this.fundid,
       name                       : this.name,
       email                      : this.email,
       show_donor_information:this.formdata.show_donor_information ? 1 : 0,
       certificate_name           : this.name,
       certificate_address        : this.val,
       certificate_phone          : this.mob,
       certificate_pan            : this.certificate_pan ,
       donor_type:'Guest',
     }
     console.log(data1);
     this.apiService.guest(data1).subscribe((res: any) => {
       console.log('db-guest',res);
       this.feedbackmessage=res.message;
       if (res.statusCode==200) {
        $('#success-modal').modal('show'); 
       } else {
        $('#success-modal1').modal('show'); 
         //this.toastr.warning(res.message);
       } 
     })
     
   
    }
  }
  //=========================================================================//
  tranferAmount(){
        this.isLoading                             =   true;
        if(this.Details.created_by                 ==  this.userid){
            this.data                              =    { 
                                                          id:this.fundraiser_id
                                                        }
            this.apiService.transferAmount(this.data).subscribe((res: any) => {
            if(res.success                         ==   true){
                this.apiService.get_contact(this.data).subscribe((res: any) => {
                 if(res){
                  this.contact                     =    res;
                  this.data                        =   {
                        contact_id                 :    this.contact.id,
                        name                       :    this.Details.beneficiary_account_name,
                        ifsc                       :    this.Details.beneficiary_ifsc,
                        account_number             :    this.Details.beneficiary_account_number
                      }  
                  this.apiService.fund_account(this.data).subscribe((res: any) => {
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
                            this.feedbackmessage="Amount Transffered Successfully"
                            $('#wizard-up').modal('show');
                          }) 
                      }
                      else{
                          this.feedbackmessage="Something Went Wrong"
                          $('#wizard-up').modal('show'); 
                         }  
                    })
                  })     
                 } 
          })
          }else{
            this.feedbackmessage="Something Went Wrong"
            $('#wizard-up').modal('show'); 
          } 
      })
      
    }else{
      this.feedbackmessage="Something Went Wrong"
      $('#wizard-up').modal('show'); 
    }
  }
  //===========================================================================//
  donatenowModal2(){
    $('#alert-modal-fund').modal('hide');
    this.logintoken = localStorage.getItem('LoginToken');
    localStorage.setItem('donateclicked', 'donatebtnclicked');
    if (this.is_cancelled == 0) {
      if (this.logintoken) {
        $('#wizard-up-modal1').modal('show');
        $('#alert-modal-fund').modal('hide');
        this.stepper.selectedIndex = 0;
        this.submittedgmForm = false;
        this.fundraiserId = this.fundraiser_id;
        this.getKey();
      } else {
        $('#wizard-up-modal2').modal('show');
        $('#alert-modal-fund').modal('hide');
      }
    } else {
      $('#cancelFundModal').modal('show');
    }
  }
  //=========================================================================//
//-----------------------------campaign -guest----------------------------->
//==========================================================================//
  donate(id:any){
    console.log('guest',this.secondFormGroupNgo.value)
    this.isLoading            = true;

   let donate_amount                               = this.fund_required-this.fund_raised;
  if (this.secondFormGroupNgo.value.amount=='' || this.secondFormGroupNgo.value.email==''|| this.secondFormGroupNgo.value.mob_number_donor==''|| this.secondFormGroupNgo.value.name=='') {
    this.clicked                                  = false;
    this.submitted                                = true;
    this.isLoading                                = false
    console.log('hii');
  }else{
    if(this.secondFormGroupNgo.value.amount<=donate_amount){
        this.submitted                     = true;
        this.clicked                       = true;
        this.campaign_id                   = id;
        let submitFormVal                  = this.secondFormGroupNgo.value;
        this.name                          = submitFormVal.name;
        this.email                         = submitFormVal.email;
        this.amount                        = submitFormVal.amount;
        this.mob                           = submitFormVal.mob_number_donor;
        this.pancard_no                    = submitFormVal.pancard_no;
        this.certificate_address           = submitFormVal.certificate_address;
        this.data                          = {
                  name                     : submitFormVal.name,
                  email                    : submitFormVal.email,
                  amount                   : submitFormVal.amount,
                  mob                      : submitFormVal.mob_number_donor,
                  pancard_no               : submitFormVal.pancard_no,
                  campaign_id              : id,       
      }
      this.apiService.guestDonate(this.data).subscribe((res: any) => {
      this.orderResponse                   = res;
      this.orderId                         = res.orderId;
      this.amount                          = this.amount;
        if (res) {
          this.isLoading                 = false;
          this.spinner.hide();
          this.RAZORPAY_OPTIONS            = {
                key                        : res.apiKey,
                amount                     : this.amount,
                name                       : 'NGO',
                currency                   : 'INR',
                order_id                   : this.orderId,
                customer_id                : '',
                description                : 'Campaign Amount',
                image                      :'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
                prefill: {
                name                       : this.name,
                email                      : this.email,
                contact                    : this.mob,
                method                     : '',
            },
              notes: {
                type                       : 'guest_donate',
                amt                        : this.amount,
                campaign_id                :this.campaign_id,
                nam                        : this.name,
                eml                        : this.email,
                mob                        : this.mob,
                sdi                        : this.secondFormGroupNgo.show_donor_information ? 1 : 0,
                cpc                        : this.formdata.certificate_pan
                                            ? this.formdata.certificate_pan.toUpperCase()
                                            : '',
                cna                        : this.formdata.certificate_pan ? this.formdata.name : '',
                d_by                       : this.dontedId ? this.dontedId : '',
                cad                        : '',
                cph                        : this.formdata.certificate_pan
                                            ? this.formdata.mob_number_donor
                                           : '',
                 },
                modal                      : {},
                theme                      : {
                  color                    : '#0096C5',
                },
          };
          this.RAZORPAY_OPTIONS.amount     = this.amount;
          this.RAZORPAY_OPTIONS.key        = this.key;
          this.RAZORPAY_OPTIONS.order_id   = this.orderId;
          this.RAZORPAY_OPTIONS.customer_id= this.customer_id;
          this.secondFormGroupNgo.reset();
          this.RAZORPAY_OPTIONS['handler'] =
          this.razorPaySuccessHandler4.bind(this);
          this.rzppay                      = new Razorpay(this.RAZORPAY_OPTIONS);
          this.rzppay.open();
          this.submitted                   = false;
          this.clicked                     = false;
      }
    });
    $('#wizard-up-modal2').modal('hide');
      this.formdata                        = this.data;
      this.spinner.hide();
      this.isLoading                       =false;
  }else{
    this.errorMsg='Amount-exceeded';
    this.isLoading                 = false;
  }
}

}
  
    public razorPaySuccessHandler4(response:any) {
    this.razorpayResponse                  = 'Razorpay Response';
    this.showModal                         = true;
    if (response.razorpay_payment_id) {
      $('#wizard-up-modal2').modal('hide');
          this.data = {
                name                       : this.name,
                email                      : this.email,
                amount                     : this.amount,
                certificate_pan            : this.pancard_no,
                campaign_id                : this.campaign_id,
                transaction_id             : response.razorpay_payment_id,
                certificate_name           : this.name,
                certificate_address        : this.certificate_address,
                certificate_phone          : this.mob,
                show_donor_information     : this.formdata.show_donor_information ? 1 : 0,
                donor_type                 :'Guest', 
        }
          this.apiService.campaign(this.data).subscribe((res: any) => {
               this.feedbackmessage        = res.message;
          if (res.statusCode==200) {
              $('#success-modal').modal('show'); 
          }else{
              $('#success-modal1').modal('show'); 
          }
        }) 
      } 
  }
  //=================================================================================//
  //----------------------------- campaign-user --------------------------------------//
  //=================================================================================//
  Pay_now(id:any){
    console.log('companign-user',id);
    this.isLoading = true; 
    let donate_amount                               = this.fund_required-this.fund_raised;
        if (this.secondFormGroupNgo.value.amount=='') {
          this.clicked                                  = false;
          this.submitted                                = true;
          this.isLoading = false; 
        }else{
          console.log('else')
          if(this.secondFormGroupNgo.value.amount<= donate_amount){
          let submitFormVal                  = this.secondFormGroupNgo.value;
          this.pancard_no                    = submitFormVal.pancard_no;
          this.certificate_address           = submitFormVal.certificate_address;
          this.apiService.getPaymentkey(id).subscribe((res: any) => {
          this.campaign_id                   = id;
          this.apikey                        = res.apiKey;
          this.name                          = res.user_details.name;
          this.email                         = res.user_details.email
          this.mob                           = res.user_details.phone_number;
          this.amount11                      = this.secondFormGroupNgo.value.amount;
          let data                          = { 
                                                  amount      : this.amount11,
                                                  campaign_id : this.campaign_id 
              }
              this.apiService.getOrderId(data).subscribe((res: any) => {
                $('#wizard-up-modal1').modal('hide'); 
                    this.orderResponse          = res;
                    this.orderId                = res.orderId;
                    this.amount                 = this.amount11;
                      if (res) {
                        this.spinner.hide();
                        this.isLoading                 = false;
                        this.RAZORPAY_OPTIONS   = {
                          key                   : this.apikey,
                          amount                : this.amount11,
                          name                  : 'NGO',
                          currency              : 'INR',
                          order_id              : this.orderId,
                          description           : 'App Payment',
                          image                 :  'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
                          prefill               : {
                                name            : this.name,
                                email           : this.email,
                                contact         : this.mob,
                                method          : '',
                          },
                          notes: {
                                  type          : 'donate ',
                                  amt           : this.amount,
                                  nam           : this.name,
                                  eml           : this.email,
                                
                          },
                              modal             : {},
                              theme             : {
                                color           : '#0096C5',
                              },
                        };
                  this.RAZORPAY_OPTIONS.amount  = this.amount;
                  this.RAZORPAY_OPTIONS.key     = this.apikey;
                  this.RAZORPAY_OPTIONS.order_id = this.orderId;
                  this.RAZORPAY_OPTIONS.customer_id='';
                  this.secondFormGroupNgo.reset();
                  this.RAZORPAY_OPTIONS['handler'] =
                    this.razorPaySuccessHandler5.bind(this);
                  this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
                  this.rzppay.open();
                  this.submitted = false;
                  this.clicked = false;
                  this.isLoading =false
                }
              });
              

              })
            }else{
              this.errorMsg='Amount-exceeded';
              this.isLoading                 = false;
            }
          }
}
public razorPaySuccessHandler5(response) {
  this.razorpayResponse               = 'Razorpay Response';
  this.showModal                      = true;
  if (response.razorpay_payment_id) {
    let data={
      certificate_pan                 : this.pancard_no,
      certificate_name                : this.name,
      certificate_address             : this.certificate_address,
      certificate_phone               : this.mob,
      transaction_id                  : response.razorpay_payment_id,
      amount                          : this.amount,
      campaign_id                     : this.campaign_id,
      name                            : this.name,
      email                           : this.email,
      show_donor_information          : this.show_donor_information ? 1 : 0,
      user_id                         : this.userid
    }
    console.log(data);
    this.apiService.campaign_user(data).subscribe((res: any) => {
      console.log(res);
      this.feedbackmessage            = res.message;
      if (res.statusCode==200) {
          $('#success-modal').modal('show'); 
      }else{
          console.log(this.feedbackmessage)
          $('#success-modal1').modal('show'); 
      }
    })
   
  }
}
//=================================
closeFeedbackModal1(){
  $('#wizard-up').modal('hide'); 
  
  this.router.navigateByUrl('#/fund-raiser')
}
}
