import { Component, OnDestroy } from '@angular/core';
import { CheckoutService } from 'paytm-blink-checkout-angular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-paytm',
  templateUrl: './paytm.component.html',
  styleUrls: ['./paytm.component.css']
})
export class PaytmComponent implements OnDestroy {

  private subs: Subscription;

  constructor(private readonly checkoutService: CheckoutService) {
    this.checkoutService.init(
      //config
      {
        data: {
          orderId: "test4",
          amount: "3337",
          token: "e334366c509b4294a285a3b42a5659ea1584106015734",
          tokenType: "TXN_TOKEN"
        },
        merchant: {
          mid: "CROWDW70497326361319",
          name: "Dummy",
          redirect: true
        },
        flow: "DEFAULT",
        handler: {
          notifyMerchant: this.notifyMerchantHandler
        }
      },
      //options
      {
        env: 'STAGE', // optional, possible values : STAGE, PROD; default : PROD
        openInPopup: true // optional; default : true
      }
    );

    this.subs = this.checkoutService
      .checkoutJsInstance$
      .subscribe(instance=>console.log(instance));
  }

  notifyMerchantHandler = (eventType, data): void => {
    console.log('MERCHANT NOTIFY LOG', eventType, data);
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
