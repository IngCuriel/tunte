import { Component, OnInit } from '@angular/core';
import { User } from '@core/model/user';
import { UserService } from '@core/service/user.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   user:User;

   formUser: FormGroup;

  constructor(private userService:UserService,
              private formBuilder: FormBuilder,
              private toastrService:ToastrService) {
               }

  ngOnInit(): void {
    this.builbForm();

  }
  
   loginTuten = async(event: Event) => {
    event.preventDefault();
     this.user = new User();
     this.user.email = this.formUser.value.email;
     this.user.password = this.formUser.value.password;
      try {
        const responseLogin = await this.userService.login(this.user).toPromise();
        console.log('responseLogin', responseLogin);
        this.toastrService.success('Logiado correctamente');

      } catch (e) {
         this.toastrService.warning(e.error, 'Login error');
      }
  }
  private builbForm() {
    this.formUser = this.formBuilder.group({
     email : ['', [Validators.required, Validators.email]],
     password: ['', Validators.required]
    });
  }

}
