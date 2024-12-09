import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import {UserValidationService} from '../../services/user-validation.service';

export class UsernameValidator {
    static createValidator(userValidationService: UserValidationService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            }

            return userValidationService.checkIfUsernameExists(control.value).pipe(
                map((result: boolean) => (result ? { usernameAlreadyExists: true } : null))
            );
        };
    }
}
