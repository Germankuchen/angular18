import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private authService: AuthService) { }

  ngOnInit() {
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
