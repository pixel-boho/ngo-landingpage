import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-cancellation-policy',
  templateUrl: './cancellation-policy.component.html',
  styleUrls: ['./cancellation-policy.component.css']
})
export class CancellationPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, 'fast');

  }


}
