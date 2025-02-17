import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideHttpClient} from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { routes } from './app.routes';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
          BrowserModule,
          CommonModule,
          BrowserAnimationsModule,
          NgxSpinnerModule,
          SweetAlert2Module,
          ToastrModule.forRoot({
            closeButton:true,
            progressBar:true
          })
        ),
    provideRouter(routes),
  ]
};
