import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {combineLatest, map, Observable} from 'rxjs';
import {UsersQuery} from '../../users/users.query';
import {User} from '../../users/users.model';
import {UsersService} from '../../users/users.service';
import {UserTableComponent} from './user-table/user-table.component';
import {AsyncPipe} from '@angular/common';
import {UserModalComponent} from '../user-modal/user-modal.component';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    standalone: true,
    imports: [
        UserTableComponent,
        AsyncPipe,
        UserModalComponent
    ],
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
    @ViewChild('userModal') userModal!: UserModalComponent;
    users$: Observable<User[]> = new Observable<User[]>();
    canAddUser$!: Observable<boolean>;
    private usersQuery = inject(UsersQuery);
    private usersService = inject(UsersService);

    constructor() {}

    ngOnInit(): void {
        this.usersService.initializeUsers();
        this.users$ = this.usersQuery.selectAll();

        this.canAddUser$ = combineLatest([
            this.usersQuery.selectAll(),
            this.usersQuery.selectCount()
        ]).pipe(
            map(([users, count]) => {
                const allUsersActive = users.every(user => user.active);
                const countLessThanFive = count < 5;
                return allUsersActive && countLessThanFive;
            })
        );
    }

    handleToggleActive(userId: number): void {
        const user = this.usersQuery.getEntity(userId);
        this.usersService.updateUser(userId, { active: !user?.active });
    }

    openModal(): void {
        this.userModal.open();
    }

    handleCreateUser(user: { name: string; active: boolean }): void {
        const id = this.generateUserId();
        this.usersService.addUser({ id, ...user });
    }

    private generateUserId(): number {
        const characters = '0123456789';
        let random = '';
        for (let i = 0; i < 13; i++) {
            random += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return +random;
    }
}
