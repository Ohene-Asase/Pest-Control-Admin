import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoleService } from './role.service';
import { Role } from '../../auth/auth.models';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { LoadingMessages, AppRouteNames } from '../../shared/config-keys';
import { MessageBox } from '../../shared/message-helper';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  showForm: boolean;
  privileges: string[]
  roles: Role[]
  roleForm: FormGroup
  routes = Object.keys(AppRouteNames)
  @BlockUI('loading') loading: NgBlockUI

  constructor(private fb: FormBuilder, private roleService: RoleService) { }

  ngOnInit() {
    this.setUpForm()
    this.loadPrivileges()
    this.fetchRoles()
  }

  openForm(role?: Role) {
    this.roleForm.reset()
    this.showForm = true;
    if (role != null) this.roleForm.patchValue(role)
  }

  closeForm() { this.showForm = false }

  setUpForm() {
    this.roleForm = this.fb.group({
      id: 0,
      name: '',
      privileges: [],
      description: '',
      defaultView: ''
    })
  }

  selectAllPrivileges() {
    this.roleForm.patchValue({ privileges: this.privileges });
  }

  private closeFormAndLoadRecords() {
    this.closeForm();
    this.fetchRoles();
  }

  async save(role: Role) {
    this.loading.start(LoadingMessages.Saving)
    try {
      await this.roleService.save(role)
      this.closeFormAndLoadRecords()
    } catch (error) {
      // console.log(error);
    } finally {
      this.loading.stop()
    }
  }

  async delete(role: Role) {
    let confirm = await MessageBox.confirm("Delete Role", `Are you sure you want to delete ${role.name} role?`)
    if (!confirm.value) return
    this.loading.start(LoadingMessages.Deleting)
    try {
      await this.roleService.delete(role.id)
      this.closeFormAndLoadRecords()
    } catch (error) { } finally {
      this.loading.stop()
    }
  }

  private async loadPrivileges() {
    this.privileges = await this.roleService.getPrivilegs();
  }

  private async fetchRoles() {
    try {
      this.loading.start()
      this.roles = await this.roleService.get().toPromise();
    } catch (error) { } finally { this.loading.stop(); }
  }

}
