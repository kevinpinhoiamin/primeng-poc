import { UserGender } from './../user/user-gender';
import { UserProfile } from './../user/user-profile';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './../user/user';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserListService {
  constructor(private httpClient: HttpClient) {}

  getUsers(
    page: number,
    limit: number,
    sort: string,
    order: string,
    search: string
  ): Observable<UserList> {
    return this.httpClient
      .get<User[]>(environment.api.users, {
        params: new HttpParams()
          .append('_page', String(page))
          .append('_limit', String(limit))
          .append('_sort', sort)
          .append('_order', order)
          .append('q', search),
        observe: 'response',
      })
      .pipe(
        delay(500),
        switchMap((response) => {
          const users = response.body
            ? response.body.map((user) => {
                user.profile =
                  UserProfile[
                    user.profile.toString() as keyof typeof UserProfile
                  ];
                user.gender =
                  UserGender[
                    user.profile.toString() as keyof typeof UserGender
                  ];
                return user;
              })
            : [];
          let totalCount: string | null | number =
            response.headers.get('X-Total-Count');
          totalCount = totalCount !== null ? +totalCount : 0;

          return of({ users, totalCount });
        })
      );
  }
}

export interface UserList {
  users: User[];
  totalCount: number;
}
