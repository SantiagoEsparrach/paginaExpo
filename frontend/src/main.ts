import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {  AppModule } from './app/app.component';

bootstrapApplication(AppModule, appConfig)
  .catch((err) => console.error(err));