import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { NewUserComponent } from './new-user/new-user.component';
import {MatchComponent} from './match/match.component';
import {PlaygroundComponent} from './playground/playground.component';
import {SigninComponent} from './signin/signin.component';
import {AuthGuardService} from './auth-guard.service';
import {SearchComponent} from './search/search.component';
import {MyprofileComponent} from './myprofile/myprofile.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {NewProfileComponent} from './new-profile/new-profile.component';
import {WordCloudGeneratorComponent} from './word-cloud-generator/word-cloud-generator.component';

const appRoutes: Routes = [
    {path: 'signup', component: SignupComponent },
    {path: 'newuser/:invite_code', component: NewUserComponent},
    {path: 'newuser', component: NewUserComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'resetpassword', component: ResetPasswordComponent},
    {path: 'home', redirectTo: '/myprofile', pathMatch: 'full'},
    {path: 'newprofile', component: NewProfileComponent, canActivate: [AuthGuardService]},
    {path: 'myprofile', component: MyprofileComponent, canActivate: [AuthGuardService]},
    {path: 'search', component: SearchComponent, canActivate: [AuthGuardService], children: [
            {path: ':id', component: MatchComponent}
        ]},
    {path: 'playground', component: PlaygroundComponent},
    {path: 'wordcloud', component: WordCloudGeneratorComponent},
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