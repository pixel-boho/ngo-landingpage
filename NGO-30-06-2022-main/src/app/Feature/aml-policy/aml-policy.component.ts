import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-aml-policy',
  templateUrl: './aml-policy.component.html',
  styleUrls: ['./aml-policy.component.css']
})
export class AmlPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, 'fast');

  }


}
