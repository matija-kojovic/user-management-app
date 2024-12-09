import { Component } from '@angular/core';
import {UserManagementComponent} from './components/user-management/user-management.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        UserManagementComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'user-management-app';
}
