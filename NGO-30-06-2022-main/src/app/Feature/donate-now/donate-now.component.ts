import { element } from 'protractor';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/service/api.service';
import { Router,ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-donate-now',
  templateUrl: './donate-now.component.html',
  styleUrls: ['./donate-now.component.css']
})
export class DonateNowComponent implements OnInit {
  donateNowForm: any;
  submitted: boolean;
  clicked: boolean;
  infoStatus: boolean;
  show_donor_information: any;

  constructor(private fb: FormBuilder,private router: Router,private apiService: ApiService, ) {
    this.infoStatus = false;
    this.show_donor_information = 0;
    this.donateNowForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]] ,
      amount: ['',[Validators.required]],
      show_donor_information: [''],
    });
  }

  ngOnInit(): void {


  }
  get f2() {
    return this.donateNowForm.controls;
  }
  showinfo(event){
  this.infoStatus = event.target.checked;
  if(this.infoStatus === true){
    this.show_donor_information = 1;
  }
  else{
    this.show_donor_information = 0;

  }
  }
  submitDonationDetails(){
    this.submitted = true;
    this.clicked = true;
    const formData = new FormData();
    if (this.donateNowForm.invalid) {
        this.clicked = false;
    }
    let submitFormVal =  this.donateNowForm.value
var donorSattus = this.show_donor_information
    var data={
      name:submitFormVal.name,
      email:submitFormVal.email,
      amount:submitFormVal.amount,
      show_donor_information:donorSattus,
      fundraiser_id:2
    }
    this.apiService.submitDonation(data).subscribe((res:any)=>{
       if (res.success == 1) {
         this.donateNowForm.reset();
         this.submitted = false;
         this.clicked = false;

       } else {

       }
     }, error => {
     })
    }
   }
