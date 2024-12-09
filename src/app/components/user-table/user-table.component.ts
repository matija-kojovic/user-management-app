import {Component, input, output} from '@angular/core';
import {User} from '../../users/users.model';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-user-table',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './user-table.component.html',
    styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
    users = input<User[] | null>();
    toggleActive = output<number>();
    editUser = output<User>();
    deleteUser = output<number>();
}
