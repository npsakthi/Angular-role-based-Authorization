import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from "@angular/router";
import { User } from '../_models';
import { UserService } from '../_services';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];
    currentUser: User;
    totalRecords: Number
    page: Number=1

    constructor(private userService: UserService) {this.currentUser = JSON.parse(localStorage.getItem('currentUser')) }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}