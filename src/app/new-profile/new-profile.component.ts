import { Component, OnInit } from '@angular/core';
import {st} from '@angular/core/src/render3';
import {ApiService} from '../api.service';
import {environment} from '../../environments/environment';
import {UploadPictureComponent} from '../upload-picture/upload-picture.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

enum Steps {
    basic_info,
    personal_info,
    picture,
    contact,
    identities,
    preferences,
    bioline
}

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {
    loaded: boolean;
    current_step: Steps;
    api_url = environment.apiUrl;
    preferred_name: string;
    birthday: string;
    age: number;
    nyc: number;
    bio1: string;
    bio2: string;
    bio3: string;
    picture_file: string;
    contact: string;
    bioline: string;
    categorySelected: boolean;
    hideCategories: number[];
    nextHideCategories: number[];
    showOnlyCategory: number;

    get stepsEnum() { return Steps; }

    constructor(private apiService: ApiService,
                public dialog: MatDialog,
                private router: Router) {
        this.loaded = false;
        this.hideCategories = [];
        this.nextHideCategories = [];
        this.categorySelected = false;
    }

    ngOnInit() {
        this.apiService.getUserProfileMatch().subscribe(response => this.processGetMatch(response));
        this.current_step = Steps.basic_info;
    }

    processGetMatch(response) {
        if (response['status'] === 1) {
            this.preferred_name = response.data.match.preferred_name;
            this.birthday = response.data.match.birthday ? response.data.match.birthday : '';
            this.nyc = parseInt(response.data.match.nyc, 10);
            this.bio1 = response.data.match.bio1;
            this.bio2 = response.data.match.bio2;
            this.bio3 = response.data.match.bio3;
            this.age = response.data.match.age;
            this.picture_file = response.data.match.picture_file;
            this.contact = response.data.match.contact;
            this.bioline = response.data.match.bioline;
        }
        if (this.age < 18 && this.birthday.length > 0) {
            this.current_step = Steps.basic_info;
            alert('Please be 18 or older.');
        }
        this.loaded = true;
    }

    buttonDisabled() {
        if (this.current_step === Steps.basic_info && this.loaded) {
            return (this.preferred_name.length === 0 ||
                this.birthday.length === 0 ||
                (this.nyc !== 1 && this.nyc !== 0));
        } else if (this.current_step === Steps.personal_info) {
            return false;
        } else if (this.current_step === Steps.picture) {
            return false;
        } else if (this.current_step === Steps.contact) {
            return false;
        } else if (this.current_step === Steps.identities) {
            return !this.categorySelected;
        } else if (this.current_step === Steps.preferences) {
            return !this.categorySelected;
        } else {
            return false;
        }
    }

    next() {
        if (this.current_step === Steps.basic_info) {
            const date = new Date(this.birthday);
            const myProfile = {'preferred_name': this.preferred_name,
                'birthday': date.toISOString().substr(0, 10),
                'nyc': this.nyc};
            this.apiService.saveProfile(myProfile).subscribe(response => this.processGetMatch(response));
            this.current_step = Steps.personal_info;
        } else if (this.current_step === Steps.personal_info) {
            const myProfile = {'bio1': this.bio1,
                'bio2': this.bio2,
                'bio3': this.bio3};
            this.apiService.saveProfile(myProfile).subscribe(response => this.processGetMatch(response));
            this.current_step = Steps.picture;
        } else if (this.current_step === Steps.picture) {
            this.current_step = Steps.contact;
        } else if (this.current_step === Steps.contact) {
            const myProfile = {'contact': this.contact};
            this.apiService.saveProfile(myProfile).subscribe(response => this.processGetMatch(response));
            this.current_step = Steps.identities;
        } else if (this.current_step === Steps.identities) {
            this.categorySelected = false;
            this.current_step = Steps.preferences;
        } else if (this.current_step === Steps.preferences) {
            this.current_step = Steps.bioline;
        } else if (this.current_step === Steps.bioline) {
            const myProfile = {'bioline': this.bioline};
            this.apiService.saveProfile(myProfile).subscribe(response => this.processGetMatch(response));
            this.router.navigate(['search']);
        }
    }

    newCat() {
        const hideCategories = [];
        this.nextHideCategories.forEach((catId) => {
            hideCategories.push(catId);
        });
        this.hideCategories = hideCategories;
        this.categorySelected = false;
        this.current_step = Steps.identities;
    }

    openUploadModal() {
        const dialogRef = this.dialog.open(UploadPictureComponent, {
            height: '400px',
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.apiService.getUserProfileMatch().subscribe(response => this.processGetMatch(response));
        });
    }

    categoryClick(event) {
        const cat = event;
        this.showOnlyCategory = cat.id;
        this.categorySelected = true;
        this.nextHideCategories.push(cat.id);
    }

}
