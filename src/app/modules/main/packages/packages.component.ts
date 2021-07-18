import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubscriptionInformationComponent } from '../subscription-information/subscription-information.component';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentHelperService } from 'src/app/services/paymentHelper.service';
import { SellerRegistrationService } from 'src/app/services/seller-registration.service';
import { IPackage } from 'src/app/Models/IPackage';
var stripe: any;
var card: any;
var packageAmount: Number;
var packageId: Number;
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  handler: any = null;
  submitted = false;
  formProcess = false;

  elements: any;
  packagesList: Array<IPackage>;
  //stripe = Stripe("pk_test_51J9AHNBWPCkb0SAuGHpG7w3KpDGhUVDxnWLe4xOT0OlsUse7Za046Rfk7v1orL7XHoDl8zCRmdyoVKE4whP6jfRm00X44IHlGE");

  constructor(public dialog: MatDialog,
    private paymentService: PaymentService,
    private paymentHelperService: PaymentHelperService,
    private sellerService: SellerRegistrationService) { }

  ngOnInit() {
    //this.loadStripe();
    this.getPackagesData();
    this.loadAsync().then(y => {
      console.log(y);
    });
  }
  getPackagesData() {
    // we have to use api later
    // this.packagesList = [
    //   {
    //     packageId: "1",
    //     curreny: "GBP",
    //     amout: 29,
    //     noOfListing: 5,
    //     isRecommened: false
    //   },
    //   {
    //     packageId: "2",
    //     curreny: "GBP",
    //     amout: 79,
    //     noOfListing: 20,
    //     isRecommened: true
    //   },
    //   {
    //     packageId: "3",
    //     curreny: "GBP",
    //     amout: 149,
    //     noOfListing: 40,
    //     isRecommened: false
    //   }
    // ]
    this.sellerService.getPackages().then(response => {

      this.packagesList = response;
    });
  }
  async loadAsync() {
    stripe = await loadStripe('pk_test_51J9AHNBWPCkb0SAuGHpG7w3KpDGhUVDxnWLe4xOT0OlsUse7Za046Rfk7v1orL7XHoDl8zCRmdyoVKE4whP6jfRm00X44IHlGE');

  }
  charge() {
    this.paymentService
      .createPaymentIntent({ amount: (+packageAmount * 100), currency: "GBP" })
      .then(async (result: any) => {
        this.payWithCard(stripe, card, result.clientSecret);
      })
      .catch(er => {
        console.log(er);
      });
  }
  initialize() {
    if (!window['Stripe']) {
      alert('Oops! Stripe did not initialize properly.');
      return;
    }
    this.elements = stripe.elements();
    // Disable the button until we have Stripe set up on the page
    document.querySelector("button").disabled = false;


    var style = {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    card = this.elements.create("card", { style: style, hidePostalCode: true });

    console.log(card);
    // card.cardNumber = payment.value.cardNo;
    // card.cardExpiry = payment.value.expiryDate;
    // card.cardCvc    = payment.value.cardCvc;
    // Stripe injects an iframe into the DOM
    card.mount("#card-element");
    card.on("change", function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });


    // return result.json();
    // });
    // let windowObj:   any;
    // if (windowObj == undefined || windowObj == null || !windowObj) {
    //   windowObj = (window);
    // }


    // (<any>window).Stripe.card.createToken({
    //   number: payment.cardNo,
    //   exp_month: payment.expiryDate.getMonth(),
    //   exp_year: payment.expiryDate.getYear(),
    //   cvc: payment.cvc
    // }, (status: number, response: any) => {
    //   this.submitted = false;
    //   this.formProcess = false;
    //   if (status === 200) {
    //     alert(`Success! Card token ${response.card.id}.`);
    //   } else {
    //     alert(response.error.message);
    //   }
    // });


    // var handler = windowObj.StripeCheckout.configure({
    //   key: 'pk_test_51J9AHNBWPCkb0SAuGHpG7w3KpDGhUVDxnWLe4xOT0OlsUse7Za046Rfk7v1orL7XHoDl8zCRmdyoVKE4whP6jfRm00X44IHlGE',
    //   locale: 'auto',
    //   token: function (token: any) {
    //     // You can access the token ID with `token.id`.
    //     // Get the token ID to your server-side code for use.
    //     console.log(token)
    //     alert('Token Created!!');
    //   }
    // });

    // handler.open({
    //   name: 'Demo Site',
    //   description: '2 widgets',
    //   amount: payment.controls["amount"].value * 100
    // });

  }

  // Calls stripe.confirmCardPayment
  // If the card requires authentication Stripe shows a pop-up modal to
  // prompt the user to enter authentication details without leaving your page.
  payWithCard(stripe, card, clientSecret) {
    this.submitted = true;
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: card
        }
      })
      .then((result) => {
        if (result.error) {
          // Show error to your customer
          this.showError(result.error.message);
          this.paymentHelperService.setDisable(false);
        } else {
          // The payment succeeded!
          let payObj = {} as any;
          payObj.amount = result.paymentIntent.amount;
          payObj.currency = result.paymentIntent.currency;
          payObj.transactionId = result.paymentIntent.id;
          payObj.packageId = packageId ?? 1;

          this.paymentService.chargePayment(payObj).then(s => {
            this.orderComplete(result.paymentIntent.id);
            setTimeout(() => {
              this.dialog.closeAll();
            }, 10000)
          })
            .catch(er => {
              console.log(er);
            });
        }
      });

    // this.loading(true);

  };

  // Show the customer the error from Stripe if their card fails to charge
  showError(errorMsgText) {
    this.loading(false);
    var errorMsg = document.querySelector("#card-error");
    errorMsg.textContent = errorMsgText;
    setTimeout(function () {
      errorMsg.textContent = "";
    }, 4000);
  };
  // Show a spinner on payment submission
  loading(isLoading) {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector("button").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("button").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
  };
  // Shows a success message when the payment is complete
  orderComplete(paymentIntentId) {
    this.loading(false);
    document
      .querySelector(".result-message a")
      .setAttribute(
        "href",
        "https://dashboard.stripe.com/test/payments/" + paymentIntentId
      );
    document.querySelector(".result-message").classList.remove("hidden");
    document.querySelector("button").disabled = true;
  };
  openDialog(amount?, selectedPackage?, noOfListing?, currency?) {
    packageAmount = amount;
    packageId = selectedPackage;

    this.dialog.open(SubscriptionInformationComponent, {
      width: '90%',
      panelClass: 'custom-dialog',
      data: {
        packageAmount: packageAmount,
        packageId: packageId,
        noOfListing: noOfListing,
        currency: currency

      }
    });

  }
}
