import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor/http-interceptor';

import { ToastrModule } from 'ngx-toastr';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary as cloudinary_core } from 'cloudinary-core';

import { components } from './components';
import { directives } from './directives';
import { modules } from './modules';

import { environment } from '../../environments/environment.prod';

const cloudinary = {
    Cloudinary: cloudinary_core
};

const config: CloudinaryConfiguration = environment.cloudinaryConfigs;

@NgModule({
  declarations: [
    // Shared components
    ...components,

    // Directives
    ...directives,
  ],
  imports: [
    ...modules,
    // Cloudinary and File upload
    CloudinaryModule.forRoot(cloudinary, config),
    // Toastr
    ToastrModule.forRoot(),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [
    // Modules
    ...modules,

    // Shared components
    ...components,

    // Directives
    ...directives
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
