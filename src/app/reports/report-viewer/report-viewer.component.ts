import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DatePipe } from '@angular/common';
import { ReportService, Reports, Report, ReportFilter, InputType, ReportLookUp } from '../report.service';
import { LookupService } from 'src/app/setting/lookup.service';
import { Toast } from 'src/app/shared/message-helper';
import { findWhere, indexOf, clone, where, isObject } from 'underscore';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {
  @BlockUI("main") loading: NgBlockUI
  reports = Reports
  reportName: string
  report: Report
  newFilter: ReportFilter
  filters: ReportFilter[] = []
  pdfUrl: string;
  pdfData: any;

  constructor(private datePipe: DatePipe,
    private reportService: ReportService,
    private lookUpService: LookupService) { }

  ngOnInit() { }

  async runReport() {
    try {
      this.loading.start();
      const filter = this.generateQueryFilter();
      const data = await this.reportService.fetchReport(filter, this.report.query);
      this.pdfUrl = `data:application/pdf;base64,${data}`;
      // this.pdfData = { data: atob(`data:application/pdf;base64,${data}`) };
    } catch (error) { } finally { this.loading.stop(); }
  }

  async downloadAsFile(type: string) {
    Toast.info('Coming Soon!!!');
  }

  selectReport(name: string) {
    this.reset();
    this.report = findWhere(this.reports, { name });
    this.fetchLookUps(this.report)
  }

  reset() {
    this.newFilter = null;
    this.report = null;
    this.clearFilters();
    this.pdfUrl = null;
  }

  clearFilters() { this.filters = []; }

  removeFilter(filter: ReportFilter) { this.filters.splice(indexOf(this.filters, filter), 1); }

  addFilter(filter: ReportFilter) {
    if (!filter.value && filter.type != InputType.DateRange) return
    switch (filter.type) {
      case InputType.Select:
        if (!isObject(filter.value)) filter.valueDisplay = filter.value;
        else if (filter.enum) filter.valueDisplay = filter.value.value;
        else filter.valueDisplay = filter.value[filter.displayField || 'name'];
        break;
      case InputType.Date:
        filter.valueDisplay = this.formatDate(filter.value)
        break;
      case InputType.DateRange:
        filter.valueDisplay = `from ${this.formatDate(filter.startDate) || '-'} to ${this.formatDate(filter.endDate) || '-'}`
        break;
      default:
        filter.valueDisplay = filter.value
    }

    let exist = findWhere(this.filters, { name: filter.name });
    if (exist) {
      let index = indexOf(this.filters, exist);
      this.filters[index] = clone(filter);
    } else { this.filters.push(clone(filter)); }
  }

  private formatDate(date: Date) {
    return this.datePipe.transform(date, 'EEEE, MMMM d, y');
  }

  private generateQueryFilter() {
    let queryFilter: any = {}
    this.filters.forEach(filter => {
      if (filter.type != InputType.DateRange) {
        queryFilter[filter.id] = this.getFilterValue(filter);
      } else {
        queryFilter[filter.startDateField || 'startDate'] = filter.startDate;
        queryFilter[filter.endDateField || 'endDate'] = filter.endDate;
      }
    });
    return queryFilter
  }

  private getFilterValue(filter: ReportFilter) {
    switch (filter.type) {
      case InputType.Select:
        if (!isObject(filter.value)) return filter.value;
        if (filter.enum) return filter.value.value;
        if (filter.idField) return filter.value[filter.idField];
        return filter.value['id'];
      case InputType.Number:
        return +filter.value;
      default:
        return filter.value;
    }
  }

  private fetchLookUps(report: Report) {
    if (!(report && report.lookUps)) return;
    let selects: ReportLookUp[] = where(report.lookUps, { type: InputType.Select });
    selects.forEach(async (lookUp) => {
      if (!lookUp.source) {
        let data = (lookUp.enum)
          ? await this.lookUpService.fetchEnum(lookUp.store)
          : await this.lookUpService.fetchNow(lookUp.store);

        lookUp.source = (lookUp.filter) ? where(data, lookUp.filter) : data
      }
    })
  }

}
