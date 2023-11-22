import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
var loginToken = localStorage.getItem('LoginToken');
var userid=localStorage.getItem('user_id');
var httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + loginToken,
  }),
};
var headers_object = new HttpHeaders().set(
  'Authorization',
  'Bearer ' + loginToken
);

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //  public  BASE_URL= 'http://45.79.120.216/ngo/api/web/v1'
  public BASE_URL = 'https://www.cocoalabs.in/ngo/api/web/v1';

  constructor(private http: HttpClient) {}

  getFundraiserForBanners() {
    return this.http.get(this.BASE_URL + `/fundraiser-scheme/list`);
  }
  getmedialist() {
    return this.http.get(this.BASE_URL + `/media/list?page=1&per_page=10`);
  }
  getmedialistByPagination(page) {
    return this.http.get(this.BASE_URL + `/media/list`, {
      params: {
        page: page,
        per_page: '10',
      },
    });
  }
  getFundRaiserScheme() {
    return this.http.get(
      this.BASE_URL + `/fundraiser-scheme/list?page=1&per_page=18`
    );
  }
  getFundRaiserSchemePagination(page) {
    return this.http.get(this.BASE_URL + `/fundraiser-scheme/list`, {
      params: {
        page: page,
        per_page: '18',
      },
    });
  }
  browseFundRaiser(sorting, keyword, category_id) {
    return this.http.get(this.BASE_URL + `/fundraiser-scheme/list`, {
      params: {
        page: '1',
        per_page: '18',
        keyword: keyword,
        category_id: category_id,
        amount: sorting,
      },
    });
  }
  browseFundRaiserByPagination(sorting, keyword, category_id, page) {
    return this.http.get(this.BASE_URL + `/fundraiser-scheme/list`, {
      params: {
        page: page,
        per_page: '18',
        keyword: keyword,
        category_id: category_id,
        amount: sorting,
      },
    });
  }
  getCampaignList() {
    return this.http.get(this.BASE_URL + `/campaign/list`);
  }
  registerUser(data) {
    // for(let val of data){
    //   console.log(val)
    // }

    // const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    var datas = {
      name: 'ammu',
      email: 'ra@gmail.com',
      phone_number: '9875698563',
      date_of_birth: '2021-06-04',
      country_code: '+91',
    };
    return this.http.post(this.BASE_URL + `/user/sign-up`, data);
  }
  loginUser(data) {
    for (let val of data) {
    }
    return this.http.post(this.BASE_URL + `/user/send-otp`, data);
  }
  varifyOtp(data) {
    return this.http.post(this.BASE_URL + `/user/verify-otp`, data);
  }
  ResendOtp(data) {
    return this.http.post(this.BASE_URL + `/user/resend-otp`, data);
  }
  registerVolunteer(data) {
    for (let val of data) {
    }
    return this.http.post(
      this.BASE_URL + `/volunteer-request/create-volunteer`,
      data
    );
  }
  getUserProfile() {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(this.BASE_URL + `/user/profile`, httpOptions1);
  }
  getUserProfileData(token) {
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.get(this.BASE_URL + `/user/profile`, httpOptions1);
  }
  updateProfile(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/user/update-profile`,
      data,
      httpOptions1
    );
  }
  submitContact(data) {
    return this.http.post(this.BASE_URL + `/contact-us/add-contact`, data);
  }
  createPartner(data) {
    return this.http.post(this.BASE_URL + `/partner/add-partner`, data);
  }
  settings() {
    return this.http.get(this.BASE_URL + `/setting/list`);
  }
  getFaq() {
    return this.http.get(this.BASE_URL + `/faq/list?page=1&per_page=10`);
  }
  getdonations() {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL + `/fundraiser-scheme/donation-list?page=1&per_page=5`,
      httpOptions1
    );
  }
  getdonationsByPageChnaged(page) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL +
        `/fundraiser-scheme/donation-list?per_page=5&page=` +
        page,
      httpOptions1
    );
  }

  getMyFundRaisers() {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL + `/fundraiser-scheme/my-fundraisers?page=1&per_page=5`,
      httpOptions1
    );
  }
  getMyFundRaisersByPageChnaged(page) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL +
        `/fundraiser-scheme/my-fundraisers?per_page=5&page=` +
        page,
      httpOptions1
    );
  }
  getMyComments() {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL +
        `/fundraiser-scheme-comment/my-comments?page=1&per_page=5`,
      httpOptions1
    );
  }
  getMyCommentsByPageChnaged(page) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL +
        `/fundraiser-scheme-comment/my-comments?per_page=5&page=` +
        page,
      httpOptions1
    );
  }

  submitDonation(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/fundraiser-scheme/donate`,
      data,
      httpOptions1
    );
  }
  getComments(data) {
    return this.http.get(
      this.BASE_URL +
        `/fundraiser-scheme-comment/list?page=1&per_page=5&fundraiser_id=` +
        data.fundraiser_id
    );
  }
  getCommentsByPagination(data, page) {
    return this.http.get(this.BASE_URL + `/fundraiser-scheme-comment/list`, {
      params: {
        page: page,
        per_page: '5',
        fundraiser_id: data.fundraiser_id,
      },
    });
  }

  addcomment(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/fundraiser-scheme-comment/add-comment`,
      data,
      httpOptions1
    );
  }
  getTopDonors(data) {
    return this.http.get(
      this.BASE_URL +
        `/fundraiser-scheme/top-donors?page=1&per_page=5&fundraiser_id=` +
        data.fundraiser_id
    );
  }
  getTopDonorsByPagination(data, page) {
    return this.http.get(this.BASE_URL + `/fundraiser-scheme/top-donors`, {
      params: {
        page: page,
        per_page: '5',
        fundraiser_id: data.fundraiser_id,
      },
    });
  }
  getTopSupporters(data) {
    return this.http.get(
      this.BASE_URL +
        `/fundraiser-scheme/supporters?page=1&per_page=5&fundraiser_id=` +
        data.fundraiser_id
    );
  }
  getTopSupportersByPagination(data, page) {
    return this.http.get(this.BASE_URL + `/fundraiser-scheme/supporters`, {
      params: {
        page: page,
        per_page: '5',
        fundraiser_id: data.fundraiser_id,
      },
    });
  }
  getFundRaiserDetails(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    if (localStorage.getItem('LoginToken')) {
      return this.http.get(
        this.BASE_URL +
          `/fundraiser-scheme/my-fundraiser-detail?fundraiser_id=` +
          data.fundraiser_id,
        httpOptions1
      );
    } else {
      return this.http.get(
        this.BASE_URL +
          `/fundraiser-scheme/fundraiser-detail?fundraiser_id=` +
          data.fundraiser_id
      );
    }
  }

  getMyFundRaiserDetails(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    if (localStorage.getItem('LoginToken')) {
      return this.http.get(
        this.BASE_URL +
          `/fundraiser-scheme/my-fundraiser-detail?fundraiser_id=` +
          data.fundraiser_id,
        httpOptions1
      );
    } else {
      return this.http.get(
        this.BASE_URL +
          `/fundraiser-scheme/fundraiser-detail?fundraiser_id=` +
          data.fundraiser_id
      );
    }
  }
  getRelation() {
    return this.http.get(this.BASE_URL + `/master/relation-master`);
  }
  createFundRaiser(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/fundraiser-scheme/start-fundraiser`,
      data,
      httpOptions1
    );
  }
  updateFundRaiser(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/fundraiser-scheme/update-fundraiser`,
      data,
      httpOptions1
    );
  }

  subitFeedbackData(data) {
    return this.http.post(this.BASE_URL + `/feedbacks/add-feedback`, data);
  }
  createLoan(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/loan/create-loan`,
      data,
      httpOptions1
    );
  }
  updateDocument(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/fundraiser-scheme/upload-document`,
      data,
      httpOptions1
    );
  }
  RemoveDocuments(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/fundraiser-scheme/remove-document`,
      data,
      httpOptions1
    );
  }
  withdrawFundRaiser(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/fundraiser-scheme/withdraw`,
      data,
      httpOptions1
    );
  }
  search(data) {
    var data1 = data.keyword;
    return this.http.get(this.BASE_URL + `/master/search?keyword=` + data1);
  }

  getCampaginerList(sorting, keyword, category_id) {
    return this.http.get(this.BASE_URL + `/fundraiser-scheme/campaigns-list`, {
      params: {
        page: '1',
        per_page: '18',
        keyword: keyword,
        category_id: category_id,
        amount: sorting,
      },
    });
  }
  getCampaginerListByPagination(sorting, keyword, category_id, page) {
    return this.http.get(this.BASE_URL + `/fundraiser-scheme/campaigns-list`, {
      params: {
        page: page,
        per_page: '18',
        keyword: keyword,
        category_id: category_id,
        amount: sorting,
      },
    });
  }
  getLoanList(sorting, keyword) {
    return this.http.get(this.BASE_URL + `/loan/list`, {
      params: {
        page: '1',
        per_page: '18',
        keyword: keyword,
        // 'category_id[]':category_id,
        amount: sorting,
      },
    });
  }
  getLoanListBypagination(sorting, keyword, page) {
    return this.http.get(this.BASE_URL + `/loan/list`, {
      params: {
        page: page,
        per_page: '18',
        keyword: keyword,
        // 'category_id[]':category_id,
        amount: sorting,
      },
    });
  }
  getLoanDetails(data) {
    return this.http.get(
      this.BASE_URL + `/loan/detail?loan_id=` + data.loan_id
    );
  }
  createLoanLend(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(this.BASE_URL + `/loan/donate`, data, httpOptions1);
  }
  getMyLoans() {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL + `/loan/my-loans?per_page=18&page=1`,
      httpOptions1
    );
  }
  getMyLoansBypagination(page) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL + `/loan/my-loans?per_page=18&page=` + page,
      httpOptions1
    );
  }
  getMyLend() {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL + `/loan/my-lends?per_page=5&page=1`,
      httpOptions1
    );
  }
  getMyLendBypagination(page) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL + `/loan/my-lends?per_page=5&page=` + page,
      httpOptions1
    );
  }
  updateLoan(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/loan/update-loan`,
      data,
      httpOptions1
    );
  }
getPaymentkey(fundraiser_id) {
  var loginToken = localStorage.getItem('LoginToken');
  console.log(loginToken)
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL + `/master/get-api-key?fundraiser_id=` + fundraiser_id,httpOptions1
    );
  }
  getrazerPaykey() {
    
    return this.http.get(
      this.BASE_URL + `/master/get-api-key?fundraiser_id=` + ''
    );
  }
  getPaymentkeyForLoan(loan_id) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.get(
      this.BASE_URL + `/master/get-api-key?loan_id=` + loan_id
    );
  }

  getOrderId(data) {
    var loginToken = 'Bearer' + localStorage.getItem('LoginToken');
    let params = new HttpParams();
    // console.log(typeof(data.amount))
    // console.log(typeof(data.fundraiser_id))
    params = params.append('amount', data.amount);
    params = params.append('fundraiser_id', data.fundraiser_id);
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + localStorage.getItem("LoginToken"))
    const options = { params:params , headers:headers}
    //const options = { params: params };
    return this.http.get(this.BASE_URL + `/master/get-order-id`, options);
  }
  getOurTeams() {
    return this.http.get(this.BASE_URL + `/master/our-team`);
  }
  getTotalUsers() {
    return this.http.get(this.BASE_URL + `/master/report`);
  }
  getPricing() {
    return this.http.get(this.BASE_URL + `/master/pricing`);
  }
  getBankdetails(ifsccode) {
    return this.http.get(
      'https://bank-apis.justinclicks.com/API/V1/IFSC/' + ifsccode
    );
  }
  HowtogetPoints() {
    return this.http.get(this.BASE_URL + `/master/point`);
  }
  removeSubscription(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/razorpay/cancel-subscription`,
      data,
      httpOptions1
    );
  }
  transferAmount(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/razorpay/transfer`,
      data,
      httpOptions1
    );
  }

  addVisiters() {
    return this.http.get(this.BASE_URL + `/setting/add-visitor`);
  }

  reportFundRaiser(data) {
    console.log(data);
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    
    return this.http.post(
      this.BASE_URL + `/report-issue/add`,
      data,
      httpOptions1
    );
  }

  cancelFundRaiser(data) {
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + loginToken,
      }),
    };
    return this.http.post(
      this.BASE_URL + `/report-issue/cancel-fundraiser`,
      data,
      httpOptions1
    );
  }
  //------------------------------------------------//
    //-----------------------------------------//
    getpaytm(data){
      console.log(data)
      // return this.http.post<any>(`https://4aaa-117-201-128-246.in.ngrok.io/NGO-Backend/api/web/v1/paytm/initiate`,data );
    
       return this.http.post<any>(this.BASE_URL+`/paytm/initiate`,data );
    }
    getpaytm1(data){
      var userid=localStorage.getItem('user_id');
      console.log(data.amount,userid);
      return this.http.post<any>(this.BASE_URL+`/paytm/initiate`,{params:{user_id:userid,amount:data.amount}} );
    }
    gettransaction(data){
      console.log(data);
      return this.http.post<any>(this.BASE_URL+`/paytm/Transactionstatus`,data );
    }
    fetchapi(data){
      //var userid=localStorage.getItem('user_id');
      console.log(data);
      return this.http.post<any>(this.BASE_URL+`/paytm/fetch-payment`,data );
    }
    paynow(data){
      console.log(data);
      var loginToken = localStorage.getItem('LoginToken');
      
    //  var httpOptions1 = {
    //    headers: new HttpHeaders({
    //      Authorization: 'Bearer ' + loginToken,
         
    //    }),
    //  };
    let params = new HttpParams();
   
    params = params.append('order_id', data.order_id);
    let headers =new HttpHeaders();
    // headers = headers.set("Authorization", "Bearer " + localStorage.getItem("LoginToken"))
    // const options = { params:params , headers:headers}
    const options = { params: params };
      // const url="http://localhost/NGO/NGO/api/web/v1/"
      return this.http.post( this.BASE_URL+ `paytm/transactionstatus`,options);
    }
    upload_pancard(data){
      var loginToken = localStorage.getItem('LoginToken');
      console.log(loginToken)
      // const headers = { Authorization: 'Bearer '+loginToken };
     // console.log(headers)
      var httpOptions1 = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + loginToken,
        }),
        
      };
      console.log('header',httpOptions1)
      // const url="https://e59a-117-201-130-100.in.ngrok.io/NGO-Backend/api/web/v1/" 
      return this.http.post<any>( this.BASE_URL+`/user/pancardupload`, data,httpOptions1
      );

    }
    virtual_Account(data){
      // var data={
      //   name:'dsffsd',email_id:'fsdds@daf.fds',mobile_number:'2343243454',primary_contact:'crowd'
      // }
    let url="https://1951-117-201-134-50.in.ngrok.io";
    return this.http.post<any>( url+`/NGO-Test/api/web/v1/paytm/virtual-account`,data)
  }
  payment_token(data){
    let url="https://1951-117-201-134-50.in.ngrok.io";
    return this.http.post<any>( url+`/NGO-Test/api/web/v1/paytm/payment-token`,data)
  }
  guestDonate(data){
    console.log(data);
    let params = new HttpParams();
    params = params.append('amount', data.amount);
    params = params.append('email', data.email);
    params = params.append('name', data.name);
    let headers = new HttpHeaders();
    // headers = headers.set("Authorization", "Bearer " + localStorage.getItem("LoginToken"))
    // const options = { params:params , headers:headers}
    const options = { params: params };
    return this.http.get<any>(this.BASE_URL+`/master/payment-order-id`,options );
  }

donate(data){
  console.log(data);
  
  var loginToken = localStorage.getItem('LoginToken');
      //console.log(loginToken)
      // const headers = { Authorization: 'Bearer '+loginToken };
     // console.log(headers)
      var httpOptions1 = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + loginToken,
        }),
        
      };
// return this.http.post<any>(this.BASE_URL+`/fundraiser-scheme/donate`,data,httpOptions1 );
return this.http.post<any>(this.BASE_URL+`/master/donate-ngo`,data,httpOptions1 )
}
guest_donate(data){
  console.log('fun',data);
return this.http.post<any>(this.BASE_URL+`/fundraiser-scheme/donate`,data )
}
guest(data){
  console.log(data);
return this.http.post<any>(this.BASE_URL+`/fundraiser-scheme/donate-ngo`,data )
}
user_donate(data){
  var loginToken = localStorage.getItem('LoginToken');
      console.log('apilo',data)
      // const headers = { Authorization: 'Bearer '+loginToken };
     // console.log(headers)
      var httpOptions1 = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + loginToken,
        }),
        
      };
return this.http.post<any>(this.BASE_URL+`/fundraiser-scheme/donate`,data,httpOptions1 );
// return this.http.post<any>(this.BASE_URL+`/fundraiser-scheme/donate-ngo`,data )
}
tranferAmount(data:any){
  var loginToken = localStorage.getItem('LoginToken');
  var httpOptions1 = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + loginToken,
        }),
        
      };
return this.http.post<any>(this.BASE_URL+`/razorpay/transfer`,data,httpOptions1 );
}
get_contact(data:any){
  var loginToken = localStorage.getItem('LoginToken');
  var httpOptions1 = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + loginToken,
        }),
        
      };
return this.http.post<any>(this.BASE_URL+`/razorpay/get-contact`,data,httpOptions1 );

}
fund_account(data:any){
  var loginToken = localStorage.getItem('LoginToken');
  var httpOptions1 = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + loginToken,
        }),
        
      };
return this.http.post<any>(this.BASE_URL+`/razorpay/fund-account`,data,httpOptions1 );
}
payout(data:any):Observable<any>{
  console.log('payout-val',data)
  // var loginToken = localStorage.getItem('LoginToken');
  // var httpOptions1 = {
  //       headers: new HttpHeaders({
  //         Authorization: 'Bearer ' + loginToken,
  //       }),
        
  //     };
return this.http.post<any>(this.BASE_URL+`/paytm/payoutapi`,data );
}
withdraw(data:any){
  var loginToken = localStorage.getItem('LoginToken');
  var httpOptions1 = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + loginToken,
        }),
        
      };
return this.http.post<any>(this.BASE_URL+`/fundraiser-scheme/withdraw`,data,httpOptions1 );
}
campaign(data:any){
return this.http.post<any>(this.BASE_URL+`/campaign/donate`,data); 
}
campaign_user(data:any){
  var loginToken = localStorage.getItem('LoginToken');
  var httpOptions1 = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + loginToken,
        }),
        
      };
  return this.http.post<any>(this.BASE_URL+`/campaign/donate`,data,httpOptions1); 
  }
  payment_history(){
    var loginToken = localStorage.getItem('LoginToken');
    var httpOptions1 = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + loginToken,
          }),
          
        };
    return this.http.get<any>(this.BASE_URL+`/user/payment-history`,httpOptions1);  
  }
}
