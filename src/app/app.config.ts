import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Scroll, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptor/headers/headers.interceptor';
import { errorsInterceptor } from './core/interceptor/errors/errors.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptor/loading/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/utils/httpLoadeFiles';




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes ,withInMemoryScrolling({scrollPositionRestoration:'top'})), 
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorsInterceptor,loadingInterceptor])),
     importProvidersFrom([BrowserAnimationsModule]),
     provideAnimations(),
     provideToastr(),
     importProvidersFrom(NgxSpinnerModule,TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
     }))
    ]
};
