import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form = this.fb.group({
    account: this.fb.control(''),
    password: this.fb.control(''),
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  login(){
    this.auth.login(this.form.get('account').value, this.form.get('password').value).subscribe(value => {
      console.log(this.auth.isLoggedIn);
      if (this.auth.isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  isButtonEnabled(): boolean {
    return this.form.get('account').value && this.form.get('password').value;
  }


}
