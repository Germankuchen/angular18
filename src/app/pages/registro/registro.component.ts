import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarUsuario = false;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.usuario.email = 'germankuchen@gmail.com';
   }

   enviar(formulario: NgForm) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
    console.log(this.usuario);
    if (!formulario.errors) {
      this.authService.crearUsuario(this.usuario).subscribe(info => {
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
