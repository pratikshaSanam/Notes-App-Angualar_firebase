
import { bootstrapApplication } from '@angular/platform-browser';
//its start to  helper that starts a stand-alone Angular app
import { AppComponent } from './app/app.component';
//this  is  out root component where first angular app  render
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
//its  used  for creting a  firebase instans with angular dependancy injection
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; //its  return the default firebase configuration and provider firestore handal  inject anywher 
import { environment } from './environments/environment';//its  used  for  load the some of teh firebase  configuration witch is important to crete firebase app
import { provideAnimations } from '@angular/platform-browser/animations';// Enables Angular’s animation engine so any component can use

import { provideRouter } from '@angular/router';//Registers Angular Router for stand-alone apps
import { provideHttpClient } from '@angular/common/http';//Registers HttpClientModule so we can can inject HttpClient
import { provideFirebase } from './app/core/firebase.config';
import { NotesStore } from './app/stores/notes.store';//The NgRx-Signals store; listing it as a provider registers its state & methods globally

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
    provideHttpClient(),
    provideFirebase(),
    NotesStore,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()), // USE getFirestore() instead of initializeFirestore()
    provideAnimations()
  ]
});
