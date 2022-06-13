import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../auth/auth.models';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../auth/auth.service';
import { LoadingMessages } from '../../shared/config-keys';

@Component({
    selector: 'app-profile-account',
    templateUrl: './profile-account.component.html',
    styleUrls: ['./profile-account.component.scss']
})
export class ProfileAccountComponent implements OnInit {
    accountForm: FormGroup
    @BlockUI('account') blockUi: NgBlockUI

    constructor(private fb: FormBuilder, private authService: AuthService, private profileService: ProfileService) { }

    ngOnInit() {
        this.accountForm = this.fb.group({
            username: '',
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            picture: '',
            file: null
        })
        this.fetchProfile();
    }

    async fetchProfile() {
        try {
            this.blockUi.start();
            let data = await this.profileService.getAccount();
            if (data) this.accountForm.patchValue(data);
        } catch (error) { } finally { this.blockUi.stop(); }
    }

    async save(account: User) {
        try {
            this.blockUi.start(LoadingMessages.Saving);
            await this.profileService.updateAccount(account);
        } catch (error) { } finally { this.blockUi.stop(); }
    }

}
