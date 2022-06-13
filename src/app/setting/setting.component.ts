import { Component, OnInit } from '@angular/core';
import { LookUpModel, LookUps } from './lookup.service';
import { where, findWhere } from "underscore";
import { Router } from '@angular/router';
import { AppRouteNames } from '../shared/config-keys';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  selectedModelId: any
  models: LookUpModel[]

  constructor(private router: Router) { }

  ngOnInit() {
    this.models = where(LookUps.Models, { hidden: false })
  }

  openLookUp(name: string) {
    this.router.navigate([AppRouteNames.Settings])
    setTimeout(() => {
      if (name) {
        const model = findWhere(LookUps.Models, { name })
        if (model.route == AppRouteNames.GenericSettings) { this.router.navigate([AppRouteNames.Settings, name]) }
        else { this.router.navigate([`${AppRouteNames.Settings}/${model.route}`]) }
      }
    }, 10);
  }


}
