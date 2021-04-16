import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';
import { lowerCaseValidador } from 'src/app/shared/validators/lower-case.validador';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { userNamePassword } from './username-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService : UserNotTakenValidatorService,
    private signupService: SignupService,
    private router: Router,
    private platformDetectorService: PlataformDetectorService
  ) { }

  ngOnInit() : void{
    this.signupForm = this.formBuilder.group({
      email: [
        '', 
        [
          Validators.required, 
          Validators.email
        ]
      ],
      fullName: [
        '', 
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: [
        '', 
        [
          Validators.required,
          lowerCaseValidador,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: [
        '', 
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    },{
      validator: userNamePassword
    });
    this.platformDetectorService.isPlatformBrowser() && this.emailInput.nativeElement.focus();
  }

  signup(){
    if (this.signupForm.valid && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signupService
        .signup(newUser)
        .subscribe(() => 
          this.router.navigate(['']),
          err => console.log(err)
        );
    } else {

    }
  }

}
