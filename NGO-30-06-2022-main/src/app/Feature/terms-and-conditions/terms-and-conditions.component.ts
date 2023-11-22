import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, 'fast');

  }

}
