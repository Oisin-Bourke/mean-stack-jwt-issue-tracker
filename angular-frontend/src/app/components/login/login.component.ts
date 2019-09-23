import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from 'rxjs/operators';

import { AuthenticationService} from "../../services/authentication.service";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  //loading = false;
  //submitted = false;
  //returnUrl: string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    //redirect to issue list if logged in
    if(this.authenticationService.currentUserValue){
      var user = this.authenticationService.currentUserValue;
      var userId = user.id;
      this.router.navigate(['/issues/', userId]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/issues';
  }

  //get f() { return this.loginForm.controls; }

  onSubmit(username, password) {
    //this.submitted = true;

    //if form invalid stop
    if (this.loginForm.invalid){
      return;
    }

    //this.loading = true;
    this.authenticationService.login( username, password)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
          let userId = data._id;
          this.router.navigate(['/issues/', userId]);
        },
        error => {
          this.alertService.error(error);
          //this.loading = false;
        });
  }

}
