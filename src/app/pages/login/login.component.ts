import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

// Services
import {AuthService} from '@services/auth.service';
import {StorageService} from '@services/storage.service';
// Models
import {ILoginRequest} from '@models/login-request.interface';
import {EStorageKey} from '@constants/store-key';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TranslateModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    private readonly formBuilder = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly storageService = inject(StorageService);

    readonly loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });
    submitted = signal(false);
    errorMessage = signal('');

    get username() {
        return this.loginForm.get('username') as FormControl;
    }
    get password() {
        return this.loginForm.get('password') as FormControl;
    }

    onSubmit() {
        this.submitted.set(true);
        const validForm = this.loginForm.valid;
        if (!validForm) {
            return;
        }


        const {username, password} = this.loginForm.value;

        const loginRequest: ILoginRequest = {
            username: username ?? '',
            password: password ?? ''
        };
        this.authService.login(loginRequest)
            .subscribe(res => {
                const {code, data, error} = res;
                if (code === '200') {
                    this.storageService.setItem(data.token, EStorageKey.TOKEN);
                    this.storageService.setItem(data.refreshToken, EStorageKey.REFRESH_TOKEN);
                } else {
                    this.errorMessage.set(`FORM.ERROR.${error ?? 'UNKNOWN'}`);
                }

            });
    }
}
