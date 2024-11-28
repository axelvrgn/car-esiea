import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBcBoY56yWNwn3FW5FCBetHTEOYiH18oXM',
  authDomain: 'car-esiea.firebaseapp.com',
  projectId: 'car-esiea',
  storageBucket: 'car-esiea.firebasestorage.app',
  messagingSenderId: '178835345874',
  appId: '1:178835345874:web:add180018aadb2ba3f780b',
  databaseURL:
    'https://car-esiea-default-rtdb.europe-west1.firebasedatabase.app',
};

initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
