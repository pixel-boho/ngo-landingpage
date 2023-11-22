import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm:any;
  submitted: boolean;
  clicked: boolean;
  List: any;
  contact_us_title: any;
  address: any;
  email:any;
  latitude: any;
  longitude: any;
  mapUrl: any;
  message: any;
  loading: boolean;
  constructor(private fb: FormBuilder,private router: Router,private apiService: ApiService,private sanitizer: DomSanitizer ) {
    this.contactForm = this.fb.group({
      name: ['',[Validators.required]],
      message: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
    });
  }

  ngOnInit(): void {
    this.Settings();
    $('html, body').animate({ scrollTop: 0 }, 'fast');

  }
  get f2() {
    return this.contactForm.controls;
  }
  Settings(){
    this.apiService.settings().subscribe((res:any)=>{
      this.List = res['list'];
      this.contact_us_title= this.List[0].contact_us_title;
      this.address= this.List[0].address;
      this.email=this.List[0].email;
      this.latitude = this.List[0].latitude;
      this.longitude = this.List[0].longitude
      // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.402205046862!2d76.5776868736974!3d9.38605178330045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06251d8b34b98b%3A0xf369e8705b4f526a!2sCrowd%20Works%20India%20Foundation!5e0!3m2!1sen!2sin!4v1688965174750!5m2!1sen!2sin" 
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.402205046862!2d76.5776868736974!3d9.38605178330045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06251d8b34b98b%3A0xf369e8705b4f526a!2sCrowd%20Works%20India%20Foundation!5e0!3m2!1sen!2sin!4v1688965174750!5m2!1sen!2sin' + this.latitude + ',' + this.longitude + '&zoom=14');
    })
  }
  submit(){
    this.submitted = true;
    this.clicked = true;
    const formData = new FormData();
    if (this.contactForm.invalid) {
        this.clicked = false;
        return;
    }
    let submitFormVal =  this.contactForm.value
    formData.append('name', submitFormVal.name);
    formData.append('email', submitFormVal.email);
    formData.append('message', submitFormVal.message);
      if(this.contactForm.invalid === false){
        this.loading = true;
      }
    this.apiService.submitContact(formData).subscribe((res:any)=>{
       if (res.success == 1) {
         this.contactForm.reset();
         this.submitted = false;
         this.clicked = false;
         this.loading = false;
         this.message = res.message;
         $('#successcontactusModal').modal('show'); //Using modal pop-up Id.

       } else {

       }
     }, error => {
     })

  }
  closeModal(){
    $('#success-modal').modal('hide'); //Using modal pop-up Id.

  }
}
