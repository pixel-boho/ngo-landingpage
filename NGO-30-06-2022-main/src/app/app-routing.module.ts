import { PaytmComponent } from './Feature/paytm/paytm.component';
import { AdminGuard } from './core/guard/admin/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './Feature/about-us/about-us.component';
import { ContactUsComponent } from './Feature/contact-us/contact-us.component';
import { DonateNowComponent } from './Feature/donate-now/donate-now.component';
import { EditFundraiserComponent } from './Feature/edit-fundraiser/edit-fundraiser.component';
import { EditLoanComponent } from './Feature/edit-loan/edit-loan.component';
import { FundRaiserDetailComponent } from './Feature/fund-raiser-detail/fund-raiser-detail.component';
import { FundRaiserComponent } from './Feature/fund-raiser/fund-raiser.component';
import { HomeComponent } from './Feature/home/home.component';
import { HowItWorksComponent } from './Feature/how-it-works/how-it-works.component';
import { LendComponent } from './Feature/lend/lend.component';
import { LoanDetailsComponent } from './Feature/loan-details/loan-details.component';
import { OurCampaignsComponent } from './Feature/our-campaigns/our-campaigns.component';
import { ProfileComponent } from './Feature/profile/profile.component';
import { SearchListComponent } from './Feature/search-list/search-list.component';
import { SignUpComponent } from './Feature/sign-up/sign-up.component';
import { StartFundraiserComponent } from './Feature/start-fundraiser/start-fundraiser.component';
import { VolunteerComponent } from './Feature/volunteer/volunteer.component';
import { WithdrawStartFundraiserComponent } from './Feature/withdraw-start-fundraiser/withdraw-start-fundraiser.component';
import { PageNotFoundComponent } from './Feature/page-not-found/page-not-found.component';
import { CampaignComponent } from './Feature/campaign/campaign.component';
import { StatisticsComponent } from './Feature/statistics/statistics.component';
import { PrivacyPolicyComponent } from './Feature/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './Feature/terms-and-conditions/terms-and-conditions.component';
import { AmlPolicyComponent } from './Feature/aml-policy/aml-policy.component';
import { CancellationPolicyComponent } from './Feature/cancellation-policy/cancellation-policy.component';
import { PaytmPaymentComponent } from './Feature/paytm-payment/paytm-payment.component';

import { DemoComponent } from './demo/demo.component';
const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo',  component: DemoComponent,  },
  { path: 'home',  component: HomeComponent,  },
  { path: 'about-us',  component: AboutUsComponent,  },
  { path: 'campaigns',  component: OurCampaignsComponent,  },
  { path: 'fund-raiser',  component: FundRaiserComponent,  },
  { path: 'howItWorks',  component: HowItWorksComponent,  },
  { path: 'contact-us',  component: ContactUsComponent,  },
  { path: 'sign-up',  component: SignUpComponent,  },
  { path: 'volunteer',  component: VolunteerComponent,  },
  { path: 'profile',  component: ProfileComponent, canActivate: [AdminGuard] },
  { path: 'Donate',  component: DonateNowComponent,  },
  { path: 'fund-raiser-detail/:id',  component: FundRaiserDetailComponent,  },
  // { path: 'fund-raiser-detail/:id/:searchtype',  component: FundRaiserDetailComponent,  },


  { path: 'lend',  component: LendComponent,  },
  { path: 'start-fundraiser/:id',  component:   StartFundraiserComponent,},
  { path: 'withdraw-fundraiser/:id',  component:   WithdrawStartFundraiserComponent,},
  { path: 'edit-fundraiser/:id',  component:   EditFundraiserComponent,},
  { path: 'loan-details/:id',  component:   LoanDetailsComponent,},
  { path: 'campagins/:id',  component:   SearchListComponent,},
  { path: 'edit-loan/:id',  component:   EditLoanComponent,},
  { path: 'campaign/:id',  component:   CampaignComponent,},
  { path: 'graph',  component:   StatisticsComponent,},
  { path: 'privacy-policy',  component:   PrivacyPolicyComponent,},
  { path: 'terms-and-conditions',  component:   TermsAndConditionsComponent,},
  { path: 'Aml-policy',  component:   AmlPolicyComponent,},
  { path: 'cancellation-policy',  component:   CancellationPolicyComponent,},
  { path: 'paytm',  component:   PaytmComponent,},
  { path: 'paytm-payment',  component: PaytmPaymentComponent  },



  { path: 'page-not-found',  component: PageNotFoundComponent,},
  { path: "**", pathMatch:'full' , redirectTo: "page-not-found"},
    { path: "**", pathMatch:'full' , redirectTo: "demo"},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
