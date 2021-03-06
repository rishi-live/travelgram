import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router : Router,private toastr: ToastrService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f : NgForm) {
    const { email, password } = f.form.value;

    this.auth.signIn(email, password).then(res => {
      this.toastr.success("SignIn Success", '', {
        closeButton: true
      });
      this.router.navigateByUrl("/");
    }).catch((err) => {
      this.toastr.error('SignIn failed!!!', '', {
        closeButton: true
      });
    })


  }
}
