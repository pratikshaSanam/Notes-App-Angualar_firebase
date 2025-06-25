import { makeEnvironmentProviders } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';

export const provideFirebase = () => makeEnvironmentProviders([
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

  provideFirestore(() => {
    return initializeFirestore(
      initializeApp(environment.firebaseConfig),
      {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      }
    );
  }),

  provideAuth(() => getAuth())
]);
