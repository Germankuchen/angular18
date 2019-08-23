import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  constructor(private authService: AuthService) { }

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
        Swal.close():
      }, (error) => console.log(error) );
     }
   }


}
