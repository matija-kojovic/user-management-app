import {Component, inject, output} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {UserValidationService} from '../../services/user-validation.service';
import {NgClass, NgIf} from '@angular/common';
import {UsernameValidator} from './user-validator';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgClass
    ],
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent {
    createUser = output<{ name: string; active: boolean }>()
    isVisible = false;
    userValidationService = inject(UserValidationService);

    constructor() {}

    userForm = new FormGroup({
        name: new FormControl('', {
            validators: [Validators.required],
            asyncValidators: [UsernameValidator.createValidator(this.userValidationService),]
        }),
        active: new FormControl(false),
    })

    open(): void {
        this.isVisible = true;
        this.userForm.reset({ name: '', active: false });
    }

    close(): void {
        this.isVisible = false;
    }

    submit(): void {
        if (this.userForm.controls.name.value && this.userForm.controls.active.value != null) {
            this.createUser.emit({name: this.userForm.controls.name.value, active: this.userForm.controls.active.value});
            this.close();
        }
    }
}
