import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({

    name: ['Test4', [Validators.required, Validators.minLength(3)]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    email: ['test4@gmail.com', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrar(){

    const {email, password, name} = this.miFormulario.value;

    this.authService.registro(name,email,password)
    .subscribe(valido => {

      if(valido === true){

        this.router.navigateByUrl('/dashboard');
      } else {

        Swal.fire('Error', valido, 'error')
      }
    });
  }
}
