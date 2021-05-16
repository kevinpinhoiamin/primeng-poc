import { UserListService } from './user-list.service';
import { User } from './../user/user';
import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users: User[];
  rows: number = 5;
  totalRecords: number;
  loading: boolean = true;

  constructor(private userListService: UserListService) {}

  loadUsers(event: LazyLoadEvent): void {
    console.log(event);
    this.loading = true;

    const limit = event.rows !== undefined ? event.rows : this.rows;
    const page = event.first !== undefined ? ((event.first / limit) + 1) : 1;
    const sort = event.sortField !== undefined ? event.sortField : '';
    const order = event.sortOrder === 1 ? 'asc' : 'desc';
    const search = event.globalFilter !== undefined && event.globalFilter !== null ? event.globalFilter : '';
    this.userListService.getUsers(page, limit, sort, order, search).subscribe((userList) => {
      this.users = userList.users;
      this.totalRecords = userList.totalCount;
      this.loading = false;
    });
  }
}
