import {inject, Injectable} from '@angular/core';
import {UsersQuery} from '../users/users.query';
import {timer} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserValidationService {
    userQuery = inject(UsersQuery);

    checkIfUsernameExists(value: string) {
        const existingUsernames = this.userQuery.getAll().map(user => user.name);
        return timer(1000).pipe(
            map(() => existingUsernames.some((u) => u.toLowerCase() === value.toLowerCase()))
        );
    }
}
