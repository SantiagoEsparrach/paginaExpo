import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { AppModule } from './app/app.component';

const bootstrap = () => bootstrapApplication(AppModule, config);

export default bootstrap;
