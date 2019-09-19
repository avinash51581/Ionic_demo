import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [

  
  
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },  
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },

  { path: 'new-place', loadChildren: './new-place/new-place.module#NewPlacePageModule' },
  { path: 'place', loadChildren: './place/place.module#PlacePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: '', redirectTo: 'landing',pathMatch: 'full'
  },
  { path: 'get-users', loadChildren: './pages/auth/get-users/get-users.module#GetUsersPageModule' },
  { path: 'developers', loadChildren: './pages/developers/developers.module#DevelopersPageModule' },
  { path: 'developer', loadChildren: './pages/developer/developer.module#DeveloperPageModule' },
  { path: 'photo', loadChildren: './pages/photo/photo.module#PhotoPageModule' }
  /*
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'new-place', loadChildren: './new-place/new-place.module#NewPlacePageModule' },
  { path: 'place', loadChildren: './place/place.module#PlacePageModule' },
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },  */

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
