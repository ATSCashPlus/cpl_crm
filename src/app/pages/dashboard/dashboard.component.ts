import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    private readonly toastr = inject(ToastrService);
    // constructor(private toastr: ToastrService) {}

    showSuccess() {
        this.toastr.success(
            'Thêm thành công',
            '',
            {
                timeOut: 30000
            }
        );
    }
    showFailed() {
        this.toastr.error(
            'Thêm thành công',
            '',
            {
                timeOut: 30000
            }
        );
    }
}
