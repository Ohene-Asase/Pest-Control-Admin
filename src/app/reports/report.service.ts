import { Injectable } from '@angular/core';
import { LookUpStores, Enums } from '../shared/config-keys';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {

  }

  fetchReport(filter: object, path: string) {
    return this.http.get<any>(`${environment.baseApi}/${path}?${this.getQueryString(filter)}`).toPromise()
  }

  protected getQueryString(filter: object) {
    let queryString = Object.keys(filter).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(filter[key])
    }).join('&');

    return queryString
  }
}

export class InputType {
  static get Text() { return "text" }
  static get Date() { return "date" }
  static get DateRange() { return "dateRange" }
  static get Number() { return "number" }
  static get Select() { return "select" }
  static get Search() { return "search" }
}

export interface Report {
  name: string;
  title: string;
  notes?: string;
  icon?: string;
  dateFilter?: boolean;
  lookUps?: ReportLookUp[];
  query: string;
  privilege?: string
}

export const Reports: Report[] = [
  {
    name: "patient",
    title: "Patients List Report",
    notes: "List of patients registrated in your database.",
    query: "patients/report",
    lookUps: [
      { id: 'gender', label: "Gender", name: 'gender', store: Enums.Genders, enum: true, type: InputType.Select },
      { id: 'registrationDate', label: "Registration Date", name: 'RegistrationDate', type: InputType.DateRange }
    ]
  }
]

export interface ReportLookUp {
  id: string
  name: string
  label: string
  type: string
  store?: string
  enum?: boolean
  displayField?: string
  idField?: string
  source?: Array<any>
  filter?: any;
  startDateField?: string
  endDateField?: string
}

export interface ReportFilter extends ReportLookUp {
  value: any
  startDate: Date
  endDate: Date
  valueDisplay: string
}