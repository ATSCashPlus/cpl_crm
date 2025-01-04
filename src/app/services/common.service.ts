import {inject, Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
// Models
import {IResponseData} from '@models/response-data.interface';
import {IImage} from '@components/forms/image/image.component';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    private readonly baseUrl = environment.url;
    private readonly httpClient = inject(HttpClient);

    uploadFile(file: any) {
        const url = this.baseUrl + '/upload/uploadFile_store';
        return this.httpClient.post<IResponseData<IImage[]>>(url, file);
    }
}
