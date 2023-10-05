import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClient, HttpHandler} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component';
import { ProjectDescriptionComponent } from './components/project-description/project-description.component';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ItalyMapComponent } from './components/italy-map/italy-map.component';
import { GridCarouselComponent } from './components/grid-carousel/grid-carousel.component';
import { CircleContainerComponent } from './components/project-description/circle-container/circle-container.component';
import 'd3';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ItalyMapComponent,
    GridCarouselComponent,
    HeaderComponent,
    ProjectDescriptionComponent,
    CircleContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
