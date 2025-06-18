import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  // @ts-expect-error: `console.error` is used here intentionally for simple error logging during bootstrap
  .catch((err) => console.error(err));
