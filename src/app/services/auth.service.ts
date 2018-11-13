import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;


  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  async signup(email: string, password: string) {
    try {
      const user = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.authState = user;
    } catch (error) {
      return console.log(error);
    }
  }


  async login(email: string, password: string) {
    try {
      const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.authState = user;
    } catch (error) {
      return console.log(error);
    }
 }

 async resetPassword(email: string) {
  try {
     await this.afAuth.auth.sendPasswordResetEmail(email);
     return console.log('email sent');
   } catch (error) {
     return console.log(error);
   }
}

  logout(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
