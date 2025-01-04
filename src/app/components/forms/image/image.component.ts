import {ChangeDetectionStrategy, Component, effect, inject, input, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '@services/common.service';
// Components
import {LoadingComponent} from '@components/loading/loading.component';


@Component({
    selector: 'app-image',
    standalone: true,
    imports: [CommonModule, LoadingComponent],
    templateUrl: './image.component.html',
    styleUrl: './image.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
    avatar = input('');
    width = input('150px');
    height = input('150px');

    private readonly commonService = inject(CommonService);
    private readonly toastService = inject(ToastrService);

    loading = signal(false);
    innerAvatar = signal('');

    constructor() {
        effect(() => {
            this.innerAvatar.set(this.avatar());
        }, {allowSignalWrites: true});
    }

    onUpdateImage(fileInput: FileList | null) {
        if (fileInput && fileInput.length > 0) {
            const imageFile = fileInput[0];
            this.uploadImage(imageFile);
        }
    }

    uploadImage(file: File) {
        this.loading.set(true);
        const MAX_SIZE_MB = 5;
        const fileSizeMB = file.size / 1024 / 1024;

        if (fileSizeMB > MAX_SIZE_MB) {
            this.toastService.error('Vui lòng tải File < 5MB');
            return;
        }

        const data = new FormData();
        data.append('files', file);
        this.commonService.uploadFile(data)
            .subscribe(res => {
                const {data, code} = res;
                this.loading.set(false);
                if (code.toString() === 'OK' && data) {
                    this.innerAvatar.set(data[0]?.url ?? '');
                } else {
                    this.toastService.error('Tải ảnh không thành công');
                }
            });
    }

    onLoadImageError() {
        this.toastService.error('Tải ảnh không thành công');
        this.innerAvatar.set('');
    }

}

export interface IImage {
    name: string;
    url: string;
}
