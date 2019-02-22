import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { NewUserComponent } from './new-user/new-user.component';
import {DimInputComponent} from './dim-input/dim-input.component';
import {PlaygroundComponent} from './playground/playground.component';
import {SigninComponent} from './signin/signin.component';
import {AuthGuardService} from './auth-guard.service';

const appRoutes: Routes = [
    {path: 'signup', component: SignupComponent },
    {path: 'newuser/:signupid', component: NewUserComponent},
    {path: 'newuser', component: NewUserComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'home', component: PlaygroundComponent, canActivate: [AuthGuardService]},
    {path: 'playground', component: PlaygroundComponent},
    {path: '', redirectTo: '/signup', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}