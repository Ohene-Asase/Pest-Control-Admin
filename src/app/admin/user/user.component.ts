import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleService } from '../role/role.service';
import { Role, User, UserTypes } from '../../auth/auth.models';
import { UserService } from './user.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoadingMessages } from '../../shared/config-keys';
import { MessageBox } from '../../shared/message-helper';
import { componentSlide } from 'src/app/shared/animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [componentSlide]
})
export class UserComponent implements OnInit {
  showForm: boolean = false;
  userForm: FormGroup;
  roles: Role[];
  users: User[];
  pageSize = 15;
  filter = { text: '' };
  @BlockUI('loading') loading: NgBlockUI;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService) { }

  ngOnInit() {
    this.setUpForm();
    this.fetchRoles();
    this.fetchUsers({});
  }

  openForm(user?: User) {
    this.userForm.reset();
    this.showForm = true
    if (user != null) {
      this.userForm.patchValue(user);
    }
  }

  closeForm() { this.showForm = false; }

  async fetchUsers(filter: any) {
    try {
      this.loading.start()
      if (filter.region) filter.regionId = filter.region.id;
      filter._page = 1;
      filter._size = this.pageSize;
      this.users = await this.userService.query(filter);
    } catch (error) { } finally { this.loading.stop(); }
  }

  async loadMore(filter: any) {
    try {
      this.loading.start()
      let currentRecords = (this.users) ? this.users : [];
      if (filter.region) filter.regionId = filter.region.id;
      filter._page = (Math.ceil(currentRecords.length / this.pageSize) + 1);
      filter._size = this.pageSize;
      let data = await this.userService.query(filter);
      this.users = [...currentRecords, ...data];
    } catch (error) { } finally { this.loading.stop(); }
  }

  async save(user: User) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let success = await this.userService.save(user);
      if (success) {
        this.closeForm();
        this.fetchUsers(this.filter);
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  async delete(user: User) {
    try {
      let confirm = await MessageBox.confirm("Delete User", `Are you sure you want to delete ${user.name}?`)
      if (!confirm.value) return;

      this.loading.start(LoadingMessages.Deleting);
      let success = await this.userService.delete(user.username);
      if (success) {
        this.closeForm();
        this.fetchUsers(this.filter);
      }
    } catch (error) { } finally { this.loading.stop(); }
  }

  private async fetchRoles() { this.roles = await this.roleService.get().toPromise(); }

  private setUpForm() {
    this.userForm = this.fb.group({
      id: 0,
      username: '',
      name: '',
      phoneNumber: '',
      email: '',
      password: null,
      confirmPassword: null,
      profileId: 0
    })
  }
}
