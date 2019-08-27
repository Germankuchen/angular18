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
    localStorage.removeItem('token');
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
    const hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('fechaExpiraToken', hoy.getTime().toString());
  }

  private obtenerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaLogueado(): boolean {
    if (this.userToken === undefined) {
      return false;
    }
    if (localStorage.getItem('fechaExpiraToken') === undefined) {
      return false;
    }
    const fechaActual = new Date().getTime();
    const fechaExpiraToken = Number(localStorage.getItem('fechaExpiraToken'));
    console.log('La fecha en tiempo de hoy es ' + fechaActual);
    console.log('La fecha en tiempo del token es ' + fechaExpiraToken);
    if (fechaActual > fechaExpiraToken) {
      return false;
    }
    return this.userToken.length > 0;
  }

}
