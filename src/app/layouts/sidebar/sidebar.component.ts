import {ChangeDetectionStrategy, Component, signal} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

    menus = signal([
        { id: 1, title: 'Dashboard', url: '', icon: 'bi-house-door' },
        {
            id: 2, title: 'Danh mục', url: '', icon: 'bi-house-door', showChildren: false,
            children: [
                { id: 1, title: 'Tỉnh/Thành phố', url: '' },
                { id: 2, title: 'Quận/Huyện/Thị xã', url: '' },
                { id: 3, title: 'Xã/Phường/Thị trấn', url: '' },
                { id: 3, title: 'Danh mục loại dịch vụ', url: '' }
            ]
        },
        {
            id: 3, title: 'Nghiệp vụ', url: '', icon: 'bi-house-door', showChildren: false,
            children: [
                { id: 1, title: 'Hợp đồng với đối tác', url: '' },
                { id: 2, title: 'Danh sách phiếu đổi điểm', url: '' },
                { id: 3, title: 'Quản lý đơn mua', url: '' },
                { id: 3, title: 'Quản lý sản phẩm', url: '' },
                { id: 3, title: 'Danh sách đánh giá của khách hàng', url: '' },
                { id: 3, title: 'Quản lý khiếu nại người tiêu dùng', url: '' }
            ]
        },
        { id: 4, title: 'Quản trị người dùng', url: '', icon: 'bi-house-door' },
        { id: 5, title: 'Quản lý thông tin đối tác', url: '', icon: 'bi-house-door' },
        { id: 6, title: 'Cấu hình hệ thống', url: '', icon: 'bi-house-door' },
        { id: 7, title: 'Đối soát', url: '', icon: 'bi-house-door' },
        { id: 8, title: 'Nhật ký hệ thống', url: '', icon: 'bi-house-door' },
        { id: 9, title: 'Báo cáo thông tin', url: '', icon: 'bi-house-door' }

    ]);

}
