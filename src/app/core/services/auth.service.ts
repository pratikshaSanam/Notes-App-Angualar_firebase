


import { inject, Injectable } from '@angular/core';
import { Auth, signInAnonymously } from '@angular/fire/auth';
//used the  auth servisec arounthe  application
//Injectable is a decorator that marks the class as something Angular’s DI system can create and share.
//signInAnonymously is a helper that performs an anonymous sign-in (no email/password required)

@Injectable({ providedIn: 'root' })
//Declares the service class and makes it exportable so other files can import { AuthService } and inject it.
export class AuthService {
  private auth = inject(Auth);

  async signInAnonymously() {
    const result = await signInAnonymously(this.auth);
    return result.user.uid;
  }
}