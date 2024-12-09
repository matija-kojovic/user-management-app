import {inject, Injectable} from '@angular/core';
import { UsersStore, User } from './users.store';
// import { User } from './users.model';
import {DUMMY_USERS} from './dummy-users';
import {UsersQuery} from './users.query';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private usersStore = inject(UsersStore);
    private usersQuery = inject(UsersQuery);

    constructor() {}

    initializeUsers(): void {
        this.usersStore.set(DUMMY_USERS);
    }

    addUser(user: User) {
        this.usersStore.add(user);
    }

    updateUser(id: number, user: Partial<User>) {
        this.usersStore.update(id, user);
    }
}
