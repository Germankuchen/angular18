import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  urlSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  APIKEY = 'AIzaSyAn6U3ARGokMlTdNeAGwX8quTC-OTpZ60U ';
  userToken: string;

  constructor(private http: HttpClient) { }

  logOut() {

  }

  logIn(usuario: UsuarioModel) {
    const data = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(this.urlSignIn + this.APIKEY, data);
  }

  crearUsuario(usuario: UsuarioModel) {
    const data = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(this.urlSignUp + this.APIKEY, data);
  }

  guardarToken(token: string) {
    this.userToken = token;
    console.log('Se va a guardar el token' + token);
    localStorage.setItem('token', this.userToken);
  }

  private obtenerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

}
