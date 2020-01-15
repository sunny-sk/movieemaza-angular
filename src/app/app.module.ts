import { LinkService } from './services/link.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SearchBoxComponent } from './search-box/search-box.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TrendingComponent } from './trending/trending.component';
import { DetailsComponent } from './details/details.component';
import { VideoComponent } from './videos/video.component';
import { AuthUserComponent } from './auth-user/auth-user.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { LinkComponent } from './link/link.component';
import { PostLinkComponent } from './post-link/post-link.component';
import { environment } from '../environments/environment';
import { MovieService } from './services/movie.service';
import { DetailService } from './services/detail.service';
import { VideoServices } from './videos/video.service';
import { AuthUserGaurdService } from './auth-user/auth.gaurd';
import { AuthUserService } from './auth-user/auth-user.service';


// routes
const appRoutes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'download-links', component: LinkComponent },
  { path: 'post-links', component: PostLinkComponent },
  {
    path: 'trending/:movieName',
    component: DetailsComponent,
    canActivateChild: [AuthUserGaurdService],
    children: [
      {
        path: ':downlaod',
        component: VideoComponent
      }
    ]
  },
  {
    path: 'movies/:movieName',
    component: DetailsComponent,
    canActivateChild: [AuthUserGaurdService],
    children: [
      {
        path: ':downlaod',
        component: VideoComponent
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [AuthUserGaurdService],
    component: AuthUserComponent
  },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'trending' },
];


@NgModule({
  declarations: [
    AppComponent, NavbarComponent,
    SearchBoxComponent, HomeComponent,
    FooterComponent, MoviesComponent,
    TrendingComponent, DetailsComponent,
    AboutComponent, VideoComponent,
    AuthUserComponent, LinkComponent,
    PostLinkComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [LinkService, MovieService, AuthUserService, VideoServices, DetailService],
  bootstrap: [AppComponent]
})
export class AppModule {}