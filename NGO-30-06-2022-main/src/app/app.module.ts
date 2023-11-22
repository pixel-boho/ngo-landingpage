import { BrowserModule, Meta  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DragDirective } from './Feature/dragDrop.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HomeComponent } from './Feature/home/home.component';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AboutUsComponent } from './Feature/about-us/about-us.component';
import { OurCampaignsComponent } from './Feature/our-campaigns/our-campaigns.component';
import { FundRaiserComponent } from './Feature/fund-raiser/fund-raiser.component';
import { HowItWorksComponent } from './Feature/how-it-works/how-it-works.component';
import { ContactUsComponent } from './Feature/contact-us/contact-us.component';
import { SignUpComponent } from './Feature/sign-up/sign-up.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { VolunteerComponent } from './Feature/volunteer/volunteer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatInputModule} from '@angular/material/input';
import { ProfileComponent } from './Feature/profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { DonateNowComponent } from './Feature/donate-now/donate-now.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FundRaiserDetailComponent } from './Feature/fund-raiser-detail/fund-raiser-detail.component';
import { LendComponent } from './Feature/lend/lend.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { StartFundraiserComponent } from './Feature/start-fundraiser/start-fundraiser.component';
import { WithdrawStartFundraiserComponent } from './Feature/withdraw-start-fundraiser/withdraw-start-fundraiser.component';
import { EditFundraiserComponent } from './Feature/edit-fundraiser/edit-fundraiser.component';
import { LoanDetailsComponent } from './Feature/loan-details/loan-details.component';
import { SearchListComponent } from './Feature/search-list/search-list.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EditLoanComponent } from './Feature/edit-loan/edit-loan.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatRadioModule} from '@angular/material/radio';
import { PageNotFoundComponent } from './Feature/page-not-found/page-not-found.component';
import { CampaignComponent } from './Feature/campaign/campaign.component';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule
import { NgxSlickJsModule } from 'ngx-slickjs';
import { StatisticsComponent } from './Feature/statistics/statistics.component'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PrivacyPolicyComponent } from './Feature/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './Feature/terms-and-conditions/terms-and-conditions.component';
import { AmlPolicyComponent } from './Feature/aml-policy/aml-policy.component';
import { CancellationPolicyComponent } from './Feature/cancellation-policy/cancellation-policy.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PaytmComponent } from './Feature/paytm/paytm.component';
import { CheckoutModule } from 'paytm-blink-checkout-angular';
import { PaytmPaymentComponent } from './Feature/paytm-payment/paytm-payment.component';
import { DonateUserComponent } from './donate-user/donate-user.component';
import { DemoComponent } from './demo/demo.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    OurCampaignsComponent,
    FundRaiserComponent,
    HowItWorksComponent,
    ContactUsComponent,
    SignUpComponent,
    VolunteerComponent,
    ProfileComponent,
    DonateNowComponent,
    FundRaiserDetailComponent,
    LendComponent,
    StartFundraiserComponent,
    WithdrawStartFundraiserComponent,
    EditFundraiserComponent,
    LoanDetailsComponent,
    SearchListComponent,
    EditLoanComponent,
    PageNotFoundComponent,
    CampaignComponent,
    StatisticsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    AmlPolicyComponent,
    CancellationPolicyComponent,
    PaytmComponent,
    PaytmPaymentComponent,
    DonateUserComponent, DragDirective, DemoComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxIntlTelInputModule,
    MatInputModule,
    MatAutocompleteModule,
    PdfViewerModule,
    FormsModule,
    MatRadioModule,
    NgxSpinnerModule,
    CheckoutModule,
    CarouselModule,MatStepperModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxSlickJsModule.forRoot({
      links: {
        // jquery: "https://code.jquery.com/jquery-1.12.4.min.js",
        slickJs: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickThemeCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
      }
  })

  ],
  providers: [Meta,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
