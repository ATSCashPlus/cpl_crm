import {inject, Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from '@services/utils.service';

// Models
import {IResponseData} from '@models/response-data.interface';
import {IUserInfo} from '@models/user-info.interface';
import {ILoginRequest} from '@models/login-request.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = environment.url;
    private readonly httpClient = inject(HttpClient);
    private readonly utilService = inject(UtilsService);


    login(loginRequest: ILoginRequest): Observable<IResponseData<IUserInfo>> {
        const url = this.baseUrl + '/auth/adminLogin';
        return this.httpClient.post<IResponseData<IUserInfo>>(url, loginRequest)
            .pipe(map(res => this.utilService.convertKeysToCamelCase(res)));
    }
}
