import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
  }
  vision(){
   window.location.href = "about-us#vision"
   window.location.reload();
   setTimeout(() => {
    $('html, body').animate({ scrollTop: 0 }, 'fast');

   }, 1000);


}
mission(){
  window.location.href = "about-us#mission"
  window.location.reload();
  $('html, body').animate({ scrollTop: 0 }, 'fast');


}
ourTeams(){
  window.location.href = "about-us#ourTerms"
  window.location.reload();
  $('html, body').animate({ scrollTop: 0 }, 'fast');

}
partners(){
  window.location.href = "about-us#partners"
  window.location.reload();
  $('html, body').animate({ scrollTop: 0 }, 'fast');

}
media(){
  window.location.href = "about-us#media"
  window.location.reload();
  $('html, body').animate({ scrollTop: 0 }, 'fast');

}
stratfundraiser(){
  window.location.href = "howItWorks#startfundraiser"
  window.location.reload();
  $('html, body').animate({ scrollTop: 0 }, 'fast');


}
donate(){
  window.location.href = "howItWorks#donate"
  window.location.reload();
  $('html, body').animate({ scrollTop: 0 }, 'fast');


}
pricing(){
  window.location.href = "howItWorks#pricing"
  window.location.reload();
  $('html, body').animate({ scrollTop: 0 }, 'fast');


}
faq(){
  window.location.href = "howItWorks#faq"
  window.location.reload();
  $('html, body').animate({ scrollTop: 0 }, 'fast');


}
}
