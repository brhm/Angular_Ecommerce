import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login.model';
import { SharedModule } from '../../../../common/shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private _auth:AuthService,
    private _toastr:ToastrService,
    private _router:Router
  ){
  }

  login(form:NgForm){
    if(form.valid)
    {
      let model=new LoginModel();
      model.email=form.controls["email"].value;
      model.password=form.controls["password"].value;

      this._auth.login(model,res=>{
        this._toastr.success("Login is success");
        localStorage.setItem("token",res.token);
        localStorage.setItem("user",JSON.stringify(res.user));
        this._router.navigateByUrl("/");
      })
      console.log(form.value);
    }
  }
}
