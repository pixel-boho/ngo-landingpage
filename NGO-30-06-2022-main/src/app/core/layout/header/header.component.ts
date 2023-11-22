import { ApiService } from 'src/app/core/service/api.service';
import { AuthService } from './../../service/auth.service';
import { element } from 'protractor';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import CONFIG from '../../../../../mocks/merchant-config.js';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';
import { MatStepper } from '@angular/material/stepper';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
declare var window: any;
declare var google: any;
declare let Razorpay: any;
declare function openJsCheckoutPopup(orderId: any, txnToken: any, amount: any)
import 'jquery';
import { Console } from 'console';
import { CheckoutService } from 'paytm-blink-checkout-angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  providers: [DatePipe],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  @ViewChild('stepper') private stepper: MatStepper;
  initialConfig: any;
  loadScript = false;
  show: boolean = false;
  signUpForm: any;
  otpForm: any;
  loginForm: any;
  submitted: boolean = false;
  clicked: boolean = false;
  otp: any;
  apiToken: any;
  phone: any;
  country_code: any;
  apiTokens: any;
  loginStatus: boolean;
  response: any;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  Layer:any;
  mid: any
  message: any;
  messageverify: any;
  loginToken: any;
  data: any;
  feedbackForm: FormGroup;
  feedbackmessage: any;
  searchForm: FormGroup;
  searchResult: any;
  submittedlogin: boolean;
  submittedfeedback: boolean;
  token: string;
  userDetails: any;
  points: any;
  isLoading = false;
  otpOne: any;
  otpTwo: any;
  otpThree: any;
  otpFour: any;
  phnomessage: any;
  isLoadingsignUp: boolean;
  campaignList: any;
  baseUrl1: any;
  campaignId: any;
  firstFormGroupNGO: any;
  secondFormGroupNgo: any;
  eightygmForm: any;
  pageNumber: number;
  submittedgmForm: boolean;
  infoStatus: boolean;
  orderResponse: any;
  formdata: any;
  show_donor_information: number;
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
  donationAmountNgo: number;
  logintoken: string;
  phoneerror: boolean;
  eightygStatus: boolean;
  show_80g_formStatus: number;
  smallamount: any;
  pointDetails: any;
  isLoadingVerifyOtp: boolean;
  isLoadingFeedback: boolean;
  dontedId: any;
  datetody: any;
  selectData: boolean;
  isLoggedIn: boolean;
  isSignUp: boolean;
  data1: any;
data2:any
  FormGroupNgo: any;
  userid: any;
  options: { key: string; amount: any; name: string; description: string; image: string; order_id: string; handler: (response: any) => void; prefill: { name: string; email: string; contact: string; }; notes: { address: string; }; theme: { color: string; }; };
  paytm: any;
  url: string;
  txntoken: any;
  config: { root: string; flow: string; data: { orderId: any; token: any; tokenType: string; amount: any; }; handler: { notifyMerchant: (eventName: any, data: any) => void; }; };
  isCheckoutVisible: boolean;
  apikey: any;
  user: any;
  user_name: any;
  email: any;
  phone_number: any;
  name: any;
  mob: any;
  pancard_no: any;
  constructor(
    private readonly checkoutService: CheckoutService,
    private fb: FormBuilder,
    private authService: AuthService,
    private datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    private router: Router,
    private ApiService: ApiService,
    private toastr: ToastrService
  ) {
    this.isCheckoutVisible = true;
    this.loginStatus = false;
    this.pageNumber = 1;
    this.submittedgmForm = false;
    this.infoStatus = false;
    this.eightygStatus = false;
    this.selectData = false;
    this.show_donor_information = 0;
    this.show_80g_formStatus = 0;
    this.loginToken = this.authService.isAuthenticated();

    this.FormGroupNgo = this.fb.group({
      amount                             : ['', [Validators.required]],
      certificate_address                : [''],
      show_80g_form                      : [''],
      show_donor_information             : [''],
      pancard_no                         : [ '', [ Validators.required,Validators.pattern('[A-Z a-z]{5}[0-9]{4}[A-Z a-z]{1}'),],],
    })

    this.signUpForm                      = this.fb.group({
      username                           : ['', [Validators.required]],
      phone                              : ['', [Validators.required]],
      email                              : ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'), ],],
      dob                                : ['', [Validators.required]],
      terms_and_Conditions1              : ['', [Validators.required]],
    });

    this.loginForm                       = this.fb.group({
      phone                              : ['', [Validators.required]],
      terms_and_Conditions               : ['', [Validators.required]],
    });

    this.otpForm                         = this.fb.group({
      otpOne                             : ['', [Validators.required]],
      otpTwo                             : ['', [Validators.required]],
      otpThree                           : ['', [Validators.required]],
      otpFour                            : ['', [Validators.required]],
    });

    this.feedbackForm                    = this.fb.group({
      name                               : ['', [Validators.required]],
      email                              : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),], ],
      message                            : ['', [Validators.required]],
    });

    this.searchForm                      = this.fb.group({
      searchInput                        : [''],
    });

    this.firstFormGroupNGO               = this.fb.group({
      amount                             : ['', [Validators.required]],
      show_80g_form                      : [''],
    });

    this.secondFormGroupNgo              = this.fb.group({
      name                               : ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'),]],
      amount                             : ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      show_80g_form                      :  [''],
      email                              : [ '', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'), ], ],
      show_donor_information             : [''],
      mob_number_donor                   : [ '',[Validators.required, Validators.pattern('^[0-9]*$')],],
      pancard_no                         : ['',[ Validators.required,Validators.pattern('[A-Z a-z]{5}[0-9]{4}[A-Z a-z]{1}'),  ], ],
    });
  }
  ngOnInit(): void {
    this.userid = "";

    // this.donationAmountNgo = 1000;
    this.getUserDetails();
    this.getComaignList();
    this.getPoints();
    this.points = this.authService.isGetPoints();
    $(document).scroll(function () {
      var win_height = $(window).height();
      var doc_height = $(document).height();
      var curPos = parseInt(doc_height) - parseInt(win_height) - 140;
      if ($(this).scrollTop() >= 100) {
        $('.main-navbar').addClass('header-fix');
      } else {
        $('.main-navbar').removeClass('header-fix');
      }
    });
    var tody = new Date();
    this.datetody = this.datepipe.transform(tody, 'yyyy-MM-dd');
    console.log(this.datetody);
    // this.datetody = '2021-07-03'
  }
  getComaignList() {
    this.ApiService.getCampaignList().subscribe(
      (res: any) => {
        this.campaignList = res['list'];
        this.baseUrl1 = res.baseUrl;
      },
      (error) => {
        // this.toastr.error(error.error.message);
      }
    );
  }
  firstNum(event1) {
    document.getElementById('second').focus();
  }
  secondNum() {
    document.getElementById('third').focus();
  }
  thirdNum() {
    document.getElementById('four').focus();
  }
  ngAfterViewInit(): void {
    // new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
  }

  get feedform() {
    return this.feedbackForm.controls;
  }
  get f2() {
    return this.signUpForm.controls;
  }
  get f1() {
    return this.loginForm.controls;
  }
  get f3() {
    return this.otpForm.controls;
  }

  getUserDetails() {
    this.ApiService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res['userDetails'];
        this.dontedId = this.userDetails.id;
        //  this.points = this.userDetails.points;
        if (res.statusCode === 401) {
          localStorage.removeItem('LoginToken');
          $('#sign-in-modal').modal('show');
        }
      },
      (error) => {
        // this.toastr.error(error.error.message);
      }
    );
  }
  getPoints() {
    this.ApiService.HowtogetPoints().subscribe((res: any) => {
      this.pointDetails = res['list'];
    });
  }

  signUp() {
    this.submitted = true;
    this.clicked = true;
    if (this.signUpForm.invalid) {
      this.clicked = false;
      return;
    }
    let submitFormVal = this.signUpForm.value;
    const formData = new FormData();
    formData.append('name', submitFormVal.username);
    formData.append('email', submitFormVal.email);
    formData.append('date_of_birth', submitFormVal.dob);
    formData.append('phone_number', submitFormVal.phone.number);
    formData.append('country_code', submitFormVal.phone.dialCode);
    if (this.signUpForm.invalid === false) {
      this.isLoadingsignUp = true;
    }
    console.log(this.signUpForm.controls);
    if (this.isSignUp == true) {
      this.ApiService.registerUser(formData).subscribe(
        (res: any) => {
          this.phnomessage = res.message;
          if (
            res.phnomessage === 'Phone number already taken' ||
            'Email already taken'
          ) {
            this.isLoadingsignUp = false;
          }
          if (res.success == 1) {
            this.isLoadingsignUp = false;
            this.signUpForm.reset();
            this.submitted = false;
            this.clicked = false;
            $('#sign-up-modal').modal('hide'); //Using modal pop-up Id.
            $('#successModal').modal('show');
          } else {
            this.toastr.warning(res.message);
          }
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }

  terms(event) {
    if (event.target.checked == true) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  terms1(event) {
    if (event.target.checked == true) {
      this.isSignUp = true;
    } else {
      this.isSignUp = false;
    }
  }
  login() {
    this.submittedlogin = true;
    this.clicked = true;
    const loginData = new FormData();
    if (this.loginForm.invalid) {
      this.clicked = false;
    }
    let loginFormVal = this.loginForm.value;
    loginData.append('phone_number', loginFormVal.phone.number);
    loginData.append('country_code', loginFormVal.phone.dialCode);
    if (this.loginForm.value.phone.number && this.isLoggedIn == true) {
      this.isLoading = true;
    }
    console.log(this.isLoggedIn);

    if (this.isLoggedIn == true) {
      this.ApiService.loginUser(loginData).subscribe(
        (res: any) => {
          console.log('1', res);

          this.response = res;
          this.message = this.response.message;
          if (this.message) {
            this.isLoading = false;
          }
          if (res.success == 1) {
            this.otp = res.userToken;
            //  this.apiToken = res.apiToken;
            this.otpOne = this.otp.slice(0, 1);
            this.otpTwo = this.otp.slice(1, 2);
            this.otpThree = this.otp.slice(2, 3);
            this.otpFour = this.otp.slice(3, 4);
            localStorage.setItem('apiToken', res.apiToken);
           
            this.phone = res.phone;
            this.country_code = res.countryCode;
            this.loginForm.reset();
            this.submittedlogin = false;
            this.clicked = false;
            this.loginStatus = true;
            this.isLoading = false;
            $('#sign-in-modal').modal('hide'); //Using modal pop-up Id.
            $('#varify-modal').modal('show');
            this.isLoadingVerifyOtp = false;
            $('#start-fundraiser-otp-modal').modal('hide'); //Using modal pop-up Id.
          } else if (res.success == false) {
            $('#loginmsg-modal').modal('show');
          }
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    }
  }

  closeLoginModal() {
    this.loginForm.reset();
    this.submittedlogin = false;
  }
  varifyOtp() {
    this.apiToken = localStorage.getItem('apiToken');
    this.submitted = true;
    this.clicked = true;
    const otpData = new FormData();
    if (this.loginForm.invalid) {
      this.clicked = false;
    }
    let otpFormVal = this.otpForm.value;

    var otpVal =
      this.otpForm.value.otpOne.toString() +
      this.otpForm.value.otpTwo.toString() +
      this.otpForm.value.otpThree.toString() +
      this.otpForm.value.otpFour.toString();
    if (otpVal) {
      this.isLoadingVerifyOtp = true;
    }
    otpData.append('otp', otpVal);
    otpData.append('api_token', this.apiToken);

    this.ApiService.varifyOtp(otpData).subscribe(
      (res: any) => {
        this.messageverify = res.message;
        if (res.success == 1) {
          console.log(res);

          this.isLoadingVerifyOtp = true;
          this.apiTokens = res.apiToken;
          this.userid = res.userId
          localStorage.setItem('user_id', res.userId);
          localStorage.removeItem('apiToken');
          this.authService.setUser(true);
          var OneSignal = window['OneSignal'] || [];
          if (res) {
            OneSignal.sendTag('user_id', res.userId);
          }
          this.otpForm.reset();
          this.submitted = false;
          this.clicked = false;
          localStorage.setItem('LoginToken', res.apiToken);

          this.authService.getAllPoints(res.apiToken);
          $('#varify-modal').modal('hide'); //Using modal pop-up Id.
          $('#login-success-modal').modal('show');
          if (this.data === 'startFundRaiser') {
            this.router.navigateByUrl('/start-fundraiser/' + this.campaignId);
            this.data = '';
          } else if (this.data === undefined) {
            $('#varify-modal').modal('hide'); //Using modal pop-up Id.
          }
        } else {
          this.loginForm.reset();
          this.authService.setUser(false);
          this.toastr.warning(res.message);
        }
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }
  closeloginSuccessModal() {
    $('#login-success-modal').modal('hide'); //Using modal pop-up Id.
    // this.router.navigateByUrl('/profile')
    // setTimeout(() => {
    //   location.reload();
    // }, 500);
  }
  closeOtpModal() {
    this.otpForm.reset();
    $('#varify-modal').modal('hide'); //Using modal pop-up Id.
  }
  ResendOtp(phone_number, country_code) {
    localStorage.removeItem('apiToken');
    this.otpForm.reset();
    const otpData = new FormData();
    otpData.append('phone_number', phone_number);
    otpData.append('country_code', country_code);
    this.ApiService.ResendOtp(otpData).subscribe(
      (res: any) => {
        if (res.success == 1) {
          this.submitted = false;
          localStorage.setItem('apiToken', res.apiToken);
          this.clicked = false;
        } else {
          this.toastr.warning(res.message);
        }
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }
  gotoDonation() {
    this.router.navigateByUrl('/fund-raiser');
  }
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  startaFundraiser(startFundRaiser) {
    $('#start-fundraiser-modal').modal('show'); //Using modal pop-up Id.
  }
  changeColor(color) {
    var ids = document.getElementById(this.campaignId);
    ids.style.background = color;
  }
  getCampaignid(id) {
    this.campaignId = id;
    this.selectData = false;
  }
  startFundRaiser(startFundRaiser) {
    if (localStorage.getItem('LoginToken')) {
      if (this.campaignId) {
        $('#start-fundraiser-modal').modal('hide');
        this.router.navigateByUrl('/start-fundraiser/' + this.campaignId);
        this.selectData = false;
      } else {
        this.selectData = true;
      }
    } else if (localStorage.getItem('LoginToken') === null) {
      if (this.campaignId) {
        this.data = startFundRaiser;
        $('#start-fundraiser-modal').modal('hide');
        $('#sign-up-modal').modal('show'); //Using modal pop-up Id.
        this.selectData = false;
      } else {
        this.selectData = true;
      }
    }
  }

  goToSinIn() {
    $('#sign-up-modal').modal('hide'); //Using modal pop-up Id.
    $('#sign-in-modal').modal('show');
  }
  closeSignUpModal() {
    this.signUpForm.reset();
    this.submitted = false;
  }

  gotoSignInModal() {
    $('#sign-in-modal').modal('show');
    $('#successModal').modal('show');
  }
  goToSignUp() {
    $('#sign-up-modal').modal('show'); //Using modal pop-up Id.
    $('#start-fundraiser-otp-modal').modal('hide'); //Using modal pop-up Id.
  }
  openFeedBackForm() {
    this.isLoadingFeedback = false;
    document.getElementById('myChatBox').style.display = 'block';
  }
  submitFeedback() {
    this.submittedfeedback = true;
    this.clicked = true;
    const feedbackData = new FormData();
    if (this.feedbackForm.invalid) {
      this.clicked = false;
    }
    let feedFormVal = this.feedbackForm.value;
    var data = {
      name: feedFormVal.name,
      email: feedFormVal.email,
      message: feedFormVal.message,
    };
    if (this.feedbackForm.invalid === false) {
      this.isLoadingFeedback = true;
    }
    if (this.feedbackForm.controls.email.valid) {
      this.ApiService.subitFeedbackData(data).subscribe((res: any) => {
        this.response = res;
        this.message = this.response.message;
        if (res.success == 1) {
          this.isLoadingFeedback = false;
          this.feedbackForm.reset();
          this.feedbackmessage = res.message;
          this.submittedfeedback = false;
          document.getElementById('myChatBox').style.display = 'none';

          $('#success-modals').modal('show'); //Using modal pop-up Id.
        }
      });
    }
  }
  closeFeedbackModal() {
    $('#success-modal').modal('hide'); //Using modal pop-up Id.
    window.location.reload();
  }
  closeChatBox() {
    document.getElementById('myChatBox').style.display = 'none';
    this.feedbackForm.reset();
    this.submittedfeedback = false;
  }

  searchByKeyWord() {
    let searchKeywordLength = this.searchForm.value.searchInput.length;
    var data = {
      keyword: this.searchForm.value.searchInput,
    };
    if (searchKeywordLength >= 3) {
      this.ApiService.search(data).subscribe((res: any) => {
        this.searchResult = res['list'];
      });
    }
  }
  selectResult(type, id) {
    console.log(type);
    console.log(id);
    if (type === 'fundraiser') {
      this.router.navigateByUrl('/fund-raiser-detail/' + id);
      this.searchForm.reset();
    } else if (type === 'campaign') {
      this.router.navigateByUrl('/campaign/' + id);
      this.searchForm.reset();
    }
  }

  logout() {
    this.router.navigateByUrl('/home');
    localStorage.removeItem('LoginToken');
    localStorage.removeItem('user_id');
    this.authService.setUser(false);
    $('#logout-modal').modal('hide'); //Using modal pop-up Id.

  }
  // DONATE NOW SECTION
  checkphoneNumValidation() {
    if (this.secondFormGroupNgo.value.mob_number_donor.length < 8) {
      this.phoneerror = true;
    } else {
      this.phoneerror = false;
    }
  }
  donatenowModalforNgo1() {
    // this.donationAmountNgo = 1000;
    $('#wizard-up-modal-ngo1').modal('show');
    console.log(this.donationAmountNgo);
    this.firstFormGroupNGO.controls['amount'].setValue(this.donationAmountNgo);
    this.stepper.selectedIndex = 0;
    this.submittedgmForm = false;
    this.submitDonationDetailsNgo() 
    // this.fundraiserId = this.fundraiser_id;
    //this.getrazerPaykeys();
    this.logintoken = localStorage.getItem('LoginToken');
    
  }
  donatenowModalforNgo() {
    // $('#alert-modal').modal('hide');

    // this.donationAmountNgo = 1000;
    $('#wizard-up-modal-ngo2').modal('show');
    // console.log(this.donationAmountNgo);
    // this.firstFormGroupNGO.controls['amount'].setValue(this.donationAmountNgo);
    this.stepper.selectedIndex = 0;
    this.submittedgmForm = false;

    // this.fundraiserId = this.fundraiser_id;
    // this.getrazerPaykeys();
    this.logintoken = localStorage.getItem('LoginToken');
  }
  get f5() {
    return this.secondFormGroupNgo.controls;
  }
  showinfoNgo(event) {
    this.infoStatus = event.target.checked;
    if (this.infoStatus === true) {
      this.show_donor_information = 1;
    } else {
      this.show_donor_information = 0;
    }
  }
  show80gFormNgo(event) {
    this.eightygStatus = event.target.checked;
    if (this.eightygStatus === true) {
      this.show_80g_formStatus = 1;
    } else {
      this.show_80g_formStatus = 0;
    }
  }
  donAmountNgo(e) {
    this.donationAmountNgo = e.target.outerText;
  }
  closeModalNgo() {
    $('#wizard-up-modal-ngo1').modal('hide');
    this.secondFormGroupNgo.reset();
    this.firstFormGroupNGO.reset();
    setTimeout(() => {
      $('#closeDonateModalNgo').modal('show');
      // this.donationAmountNgo = 1000;
    }, 200);
  }
  closeModalNgo2() {
    $('#wizard-up-modal-ngo2').modal('hide');
    this.secondFormGroupNgo.reset();
    this.firstFormGroupNGO.reset();
    setTimeout(() => {
      $('#closeDonateModalNgo').modal('show');
      // this.donationAmountNgo = 1000;
    }, 200);
  }
  closeDonateModalsNgo() {
    $('#newwizard-up-modalNgo').modal('hide');
    setTimeout(() => {
      $('#closeDonateModalNgo').modal('show');
    }, 200);
  }
  get f4() {
    return this.eightygmForm.controls;
  }

  getrazerPaykeys() {
    this.ApiService.getrazerPaykey().subscribe((res: any) => {
      this.key = res.apiKey;
      this.customer_id = res.customerId;
    });
  }
  appendHandler(config): any {
    const newConfig = { ...config };

    newConfig.handler = {
      notifyMerchant: this.notifyMerchantHandler
    }

    return newConfig;
  }

  notifyMerchantHandler = (eventType, data): void => {
    console.log('MERCHANT NOTIFY LOG', eventType, data);
    if(eventType=="SUCCESS"){
      console.log('success');

    }
  }
  //====================================================================================//
  //---------------------------------User Normal Donate--------------------------------//
  //====================================================================================//
       submitDonationDetailsNgo2() {
        console.log('user');
        this.isLoading = true; 
        if (this.FormGroupNgo.value.amount=='') {
          this.clicked                                  = false;
          this.submitted                                = true;
        }else{
              this.clicked                          = true;
              this.formdata                         = this.FormGroupNgo.value;
              console.log(this.formdata)
              this.pancard_no                       = this.formdata.pancard_no;
              this.certificate_address              = this.formdata.certificate_address;
              
              $('#wizard-up-modal-ngo2').modal('hide');
              //this.FormGroupNgo.reset();
              this.spinner.show();
              let amount                            = this.formdata.amount;
              let fundraiser_id                     = 'null';
              this.ApiService.getPaymentkey(fundraiser_id).subscribe((res: any) => {
              console.log('user1',res)
              this.apikey                           = res.apiKey;
              this.user                             = res.user_details;
              this.name                             = this.user.name;
              this.userid                           = this.user.id;
              this.email                            = this.user.email;
              this.phone_number                     = this.user.phone_number;
              this.customer_id                      = this.user.customer_id;
              this.ApiService.getOrderId(this.formdata).subscribe((res: any) => {
                
              // this.orderResponse                    = res;
              // this.orderId                          = res.orderId;
              // this.name                             = res.user_details.name;
              // this.email                            = res.user_details.email
              // this.mob                              = res.user_details.phone_number;
               this.amount                           = amount*100;
             
                if (res) {
                 this.isLoading                    = false;
                  this.spinner.hide();
                  this.RAZORPAY_OPTIONS            = {
                    key                            : this.apikey,
                    amount                         : this.amount,
                    name                           : 'NGO',
                    currency                       : 'INR',
                    order_id                       : this.orderId,
                    customer_id                    : this.userid,
                    description                    : 'App Payment',
                    image                          : 'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
                    prefill                        : {
                      name                         : this.user.name,
                      email                        : this.user.email,
                      contact                      : this.user.phone_number,
                      method                       : '',
                    },
                    notes                          : {
                      type                         : 'donate ',
                      amt                          : this.formdata.amount,
                      nam                          : this.formdata.name,
                      eml                          : this.formdata.email,
                      mob                          : this.formdata.mob_number_donor,
                      sdi                          : this.formdata.show_donor_information ? 1 : 0,
                      cpc                          : this.formdata.certificate_pan ? this.formdata.certificate_pan.toUpperCase()   : '',
                      cna                          : this.formdata.certificate_pan ? this.formdata.name : '',
                      d_by                         : this.dontedId ? this.dontedId : '',
                      cad                          : '',
                      cph                          : this.formdata.certificate_pan  ? this.formdata.mob_number_donor : '',
                    },
                    modal                          : {},
                    theme                          : {
                      color                        : '#0096C5',
                    },
                  };
                  this.RAZORPAY_OPTIONS.amount     = this.amount;
                  this.RAZORPAY_OPTIONS.key        = this.apikey;
                  this.RAZORPAY_OPTIONS.order_id   = this.orderId;
                  this.RAZORPAY_OPTIONS.customer_id= '';
                  this.secondFormGroupNgo.reset();
                  this.firstFormGroupNGO.reset();
                  this.FormGroupNgo.reset();
                  this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler1.bind(this);
                  this.rzppay                      = new Razorpay(this.RAZORPAY_OPTIONS);
                  this.rzppay.open();
                  this.submitted                   = false;
                  this.clicked                     = false;
                }
              });
     })
  }
}
  public razorPaySuccessHandler1(response) {
    this.razorpayResponse = 'Razorpay Response';
    this.showModal = true;
    if (response.razorpay_payment_id) {
        let data={
        transaction_id                             : response.razorpay_payment_id,
        amount                                     : this.amount/100,
        fundraiser_id                              : 'null',
        show_donor_information:this.formdata.show_donor_information ? 1 : 0,
        certificate_phone                          : this.phone_number,
        certificate_pan                            : this.pancard_no,
        certificate_address                        : this.certificate_address,
        certificate_name                           : this.name,
        name                                       : this.name,
        email                                      : this.email,
        user_id                                    : this.userid
      }   
        console.log('res',data)
      this.ApiService.guest(data).subscribe((res: any) => {
        this.feedbackmessage=res.message;
        if (res.statusCode==200) {  
         $('#success-modal').modal('show'); 
        } else {
          //this.toastr.warning(res.message);
          $('#success-modal1').modal('show'); 
        }
       
      })
      
    }
  }
  //============================================================================================//
  //-------------------------------------------Guest Donate-------------------------------------//
  //============================================================================================//
  submitDonationDetailsNgo() {  
    console.log('guest');
    this.isLoading = true;
    // this.submitted                                  = true;
    // this.clicked                                    = true;
    //onsole.log(this.show_80g_formStatus)
    // if (this.show_80g_formStatus                    === 0) {
    //   console.log('hh')
    //   this.secondFormGroupNgo.controls['pancard_no'].clearValidators();
    //   this.secondFormGroupNgo.controls['pancard_no'].updateValueAndValidity();
    // }
    // else{
    //   this.secondFormGroupNgo.controls['pancard_no'].setValidators([Validators.required])
    // }
    // this.checkphoneNumValidation();
    if (this.secondFormGroupNgo.value.amount=='' && this.secondFormGroupNgo.value.email==''&& this.secondFormGroupNgo.value.mob_number_donor==''&& this.secondFormGroupNgo.value.name=='') {
      this.clicked                                  = false;
      this.submitted                                = false;
      console.log('hii');
    }else{
    let submitFormVal                               = this.secondFormGroupNgo.value;
    var donorSattus                                 = this.show_donor_information;
     this.pancard_no                                = this.secondFormGroupNgo.value.pancard_no.toUpperCase();
        this.name                                   = submitFormVal.name;
        this.email                                  = submitFormVal.email;
        this.amount                                 = submitFormVal.amount;
        this.mob                                    = submitFormVal.mob_number_donor;
          this.data                                 = {
            name                                    : submitFormVal.name,
            email                                   : submitFormVal.email,
            amount                                  : submitFormVal.amount,
          };
          this.ApiService.guestDonate(this.data).subscribe((res: any) => {
          this.orderResponse                        = res;
          this.orderId                              = res.orderId;
          this.amount                               = this.amount;
              if (res) {
                this.isLoading = false;
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
                    name:this.name,
                    email:this.email,
                    contact:this.mob,
                    method: '',
                  },
                  notes: {
                    type: 'donate',
                    amt: this.amount,
                    // 'fid': this.fundraiser_id,
                    nam: this.name,
                    eml: this.email,
                    mob: this.mob,
                    sdi: this.secondFormGroupNgo.show_donor_information ? 1 : 0,
                    cpc: this.formdata.certificate_pan
                      ? this.formdata.certificate_pan.toUpperCase()
                      : '',
                    // 'd_by':this.dontedId?this.donatedId:''
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
                console.log(this.RAZORPAY_OPTIONS);
                this.RAZORPAY_OPTIONS.amount = this.amount;
                this.RAZORPAY_OPTIONS.key = this.key;
                this.RAZORPAY_OPTIONS.order_id = this.orderId;
                this.RAZORPAY_OPTIONS.customer_id = this.customer_id;
                this.secondFormGroupNgo.reset();
                this.firstFormGroupNGO.reset();
                this.donationAmountNgo = 1000;
                console.log(this.donationAmountNgo);
                this.RAZORPAY_OPTIONS['handler'] =
                  this.razorPaySuccessHandler.bind(this);
                this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
                this.rzppay.open();
                this.submitted = false;
                this.clicked = false;
              }
            });

        $('#wizard-up-modal-ngo1').modal('hide');
        this.formdata = this.data;
        console.log()
        this.spinner.hide();
          }
  
        }

  public razorPaySuccessHandler(response) {
    this.razorpayResponse              = 'Razorpay Response';
    this.showModal                     = true;
if (response.razorpay_payment_id) {
   console.log(response)
   $('#successPaymentModal').modal('show');
    let data1                          = {
    transaction_id                     : response.razorpay_payment_id,
    amount                             : this.amount,
    fundraiser_id                      : 'null',
    name                               : this.name,
    email                              : this.email,
    certificate_pan                    : this.pancard_no,
    certificate_name                   : this.name,
    certificate_address                : 'abcd',
    certificate_phone                  : this.mob,
    show_donor_information             : this.show_donor_information ? 1 : 0,
    donor_type                         : 'Guest',
  
  }
  this.ApiService.guest(data1).subscribe((res: any) => {
    console.log('db-guest',res);
    this.feedbackmessage=res.message;
    if (res.statusCode==200) {
     $('#success-modal').modal('show'); 
    } else {
     /// this.toastr.warning(res.message);
      $('#success-modal1').modal('show'); 
    } 
  })
  
}
}




  sureIwillhelpNgo() {
    $('#closeDonateModalNgo').modal('hide');
    $('#newwizard-up-modalNgo').modal('show');
  }

  submitSmallDonationNgo() {
    this.checkphoneNumValidation();
    if (this.show_80g_formStatus === 0) {
      this.secondFormGroupNgo.controls['pancard_no'].clearValidators();
      this.secondFormGroupNgo.controls['pancard_no'].updateValueAndValidity();
    }
    this.submitted = true;
    this.clicked = true;
    if (this.secondFormGroupNgo.invalid) {
      this.clicked = false;
    }
    var donationAmountNgo = 300;
    let submitFormVal = this.secondFormGroupNgo.value;
    let submitform = this.firstFormGroupNGO.value;
    // var id = this.fundraiserId;
    var donorSattus = this.show_donor_information;
    this.pancard_no = this.secondFormGroupNgo.value.pancard_no.toUpperCase();
    this.data = {
      name: submitFormVal.name,
      email: submitFormVal.email,
      smallamount: donationAmountNgo,
      show_donor_information: donorSattus,
      show_80g_form: submitFormVal.show_80g_form,
      // fundraiser_id:this.fundraiserId,
      mob_number_donor: submitFormVal.mob_number_donor,
      certificate_pan: submitFormVal.pancard_no,
    };
    var datas = {
      amount: donationAmountNgo,
      // fundraiser_id:id
    };
    if (
      this.secondFormGroupNgo.valid &&
      this.secondFormGroupNgo.controls.email.valid &&
      this.phoneerror === false
    ) {
      $('#newwizard-up-modalNgo').modal('hide');
      this.spinner.show();
      this.formdata = this.data;
      this.ApiService.getOrderId(datas).subscribe((res: any) => {
        this.orderResponse = res;
        this.orderId = res.orderId;
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
              // 'fid': this.fundraiser_id,
              nam: this.formdata.name,
              eml: this.formdata.email,
              mob: this.formdata.mob_number_donor,
              sdi: this.formdata.show_donor_information ? 1 : 0,
              cpc: this.formdata.certificate_pan
                ? this.formdata.certificate_pan
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
          this.RAZORPAY_OPTIONS.amount = this.smallamount;
          this.RAZORPAY_OPTIONS.key = this.key;
          this.RAZORPAY_OPTIONS.order_id = this.orderId;
          this.RAZORPAY_OPTIONS.customer_id = this.customer_id;
          this.RAZORPAY_OPTIONS['handler'] =
            this.razorPaySuccessHandler.bind(this);
          this.rzppay = new Razorpay(this.RAZORPAY_OPTIONS);
          this.rzppay.open();
          this.submitted = false;
          this.clicked = false;
        }
      });
    }
  }

 
  navclose() {
    // $('.navbar-collapse a''').click(function(){
    $('.navbar-collapse').collapse('hide');
    // });
  }

  closeAlertModal() {
    // $('#alert-modal').modal('hide');
  }
  // pay(){
  //   this.router.navigateByUrl['/paynow.html'];
  // 


  //----------------------------------paytm-----------------------------------//
  paytmpayment() {
    this.router.navigateByUrl('/paytm-payment');
  }

}
