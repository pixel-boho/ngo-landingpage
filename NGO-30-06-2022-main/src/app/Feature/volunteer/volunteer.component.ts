import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/service/api.service';
import { Router,ActivatedRoute } from '@angular/router';
declare var $:any

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  createVolunteerForm: any;
  submitted: boolean;
  clicked: boolean;
  loading: boolean;
  phoneerror: boolean;

  constructor(private fb: FormBuilder,private router: Router,private apiService: ApiService, ) {
    this.createVolunteerForm = this.fb.group({
      username: ['',[Validators.required]],
      phone_number:['', [Validators.required,Validators.pattern("^[0-9]*$")]] ,
      address: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      // $('#alert-modal').modal('show');

    }, 5000);
  }
  get f2() {
    return this.createVolunteerForm.controls;
  }
  checkphoneNumValidation(){
    if(this.createVolunteerForm.value.phone_number.length < 8){
      this.phoneerror = true;
    }
    else{
      this.phoneerror = false;
    }
  }
  submitVolunteer(){
    this.submitted = true;
    this.clicked = true;
    const formData = new FormData();
    this.checkphoneNumValidation();
    if (this.createVolunteerForm.invalid) {
        this.clicked = false;
        return;
    }
    let submitFormVal =  this.createVolunteerForm.value

    formData.append('name', submitFormVal.username);
    formData.append('email', submitFormVal.email);
    formData.append('phone_number', submitFormVal.phone_number);
    formData.append('address', submitFormVal.address);
    if(this.createVolunteerForm.invalid === false){
      this.loading = true;
    }
    this.apiService.registerVolunteer(formData).subscribe((res:any)=>{
       if (res.success == 1) {
         this.createVolunteerForm.reset();
         this.submitted = false;
         this.loading = false;
         this.clicked = false;
         $('#successvolunteerModal').modal('show');
       } else {

       }
     }, error => {
     })
    }

  }

