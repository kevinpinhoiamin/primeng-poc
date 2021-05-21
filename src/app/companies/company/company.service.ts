import { environment } from './../../../environments/environment.prod';
import { Company } from './company';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  getCompanies(term: string): Observable<Company[]> {
    return this.httpClient.get<Company[]>(environment.api.companies, {
      params: new HttpParams().append('name_like', term).append('_limit', '10'),
    });
  }
}
