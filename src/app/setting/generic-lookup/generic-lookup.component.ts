import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute } from '@angular/router';
import { LookupService, LookUps, LookUpModel } from '../lookup.service';
import { findWhere } from "underscore";
import { Observable, of } from 'rxjs';
import { LoadingMessages } from '../../shared/config-keys';
import { MessageBox } from '../../shared/message-helper';
import { LookUp } from 'src/app/shared/models';

@Component({
  selector: 'app-generic-lookup',
  templateUrl: './generic-lookup.component.html',
  styleUrls: ['./generic-lookup.component.scss']
})
export class GenericLookupComponent implements OnInit {
  showForm: boolean
  lookupForm: FormGroup
  lookup: LookUpModel
  records: LookUp[]

  @BlockUI('loading') loading: NgBlockUI

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private lookupService: LookupService) { }

  ngOnInit() {
    let modelName = this.activatedRoute.snapshot.paramMap.get('model');
    this.lookup = findWhere(LookUps.Models, { name: modelName })
    this.setUpForm()
    this.fetchRecords()
  }

  openForm(record?: LookUp) {
    this.lookupForm.reset()
    this.showForm = true;
    if (record != null) this.lookupForm.patchValue(record)
  }

  closeForm() { this.showForm = false }

  async save(lookup: LookUp) {
    try {
      this.loading.start(LoadingMessages.Saving);
      let success = await this.lookupService.save(this.lookup.name, lookup);
      if (success) {
        this.closeForm()
        this.fetchRecords()
      }
    } catch (err) { } finally { this.loading.stop(); }
  }

  async delete(role: LookUp) {
    try {
      let confirm = await MessageBox.confirm("Delete Role", `Are you sure you want to delete ${role.name} role?`)
      if (!confirm.value) return
      this.loading.start(LoadingMessages.Deleting)
      let success = await this.lookupService.delete(this.lookup.name, role.id)
      if (success) {
        this.closeForm()
        this.fetchRecords()
      }
    } catch (err) { } finally { this.loading.stop(); }
  }

  async fetchRecords() {
    try {
      this.loading.start();
      this.records = await this.lookupService.fetchNow(this.lookup.store);
    } catch (error) { } finally { this.loading.stop(); }
  }

  private setUpForm() {
    this.lookupForm = this.fb.group({
      id: '',
      code: '',
      name: '',
      notes: ''
    })
  }

}
