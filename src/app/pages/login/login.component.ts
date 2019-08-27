import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarUsuario = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email') !== null) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarUsuario = true;
    }
  }

  enviar(formulario: NgForm) {
    if (formulario.valid) {
      console.log('Formulario correcto');
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor'
      });
      Swal.showLoading();
      console.log(formulario);
      this.authService.logIn(this.usuario).subscribe(info => {
        console.log(info);
        this.authService.guardarToken(info['idToken']);
        Swal.close();
        if (this.recordarUsuario) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      }, (error) => {
        console.log(error);
        Swal.fire({
          type: 'error',
          text: error.error.error.message
        });
      });
    }
  }

}
