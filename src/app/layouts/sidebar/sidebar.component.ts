import {
    ChangeDetectionStrategy,
    Component, ElementRef,
    inject,
    signal,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {animate, state, style, transition, trigger, AnimationEvent, query, stagger} from '@angular/animations';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {LayoutService} from '@services/layout.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ height: '0', overflow: 'hidden' }),
                animate('300ms ease-in', style({ height: '*' }))
            ]),
            transition(':leave', [
                style({ height: '*', overflow: 'hidden' }),
                animate('300ms ease-in', style({ height: '0' }))
            ])
        ]),
        trigger('sidebarToggle', [
            state('collapsed', style({ width: '46px'})),
            state('expanded', style({ width: '250px' })),
            transition('collapsed => expanded', [
                animate(
                    '300ms ease-in',
                    style({ width: '250px' })
                )
            ]),
            transition('expanded => collapsed', [
                style({ overflow: 'hidden' }),
                animate(
                    '300ms ease-in',
                    style({ width: '46px' })
                )
            ])
        ])
    ]
})
export class SidebarComponent {
    @ViewChild('menuTemplate') menuTemplate!: TemplateRef<any>;
    private readonly overlay = inject(Overlay);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly layoutService = inject(LayoutService);
    private overlayRef: OverlayRef | null = null;

    menus = signal<IMenu[]>([
        {id: 1, title: 'Dashboard', url: '', icon: 'bi-house-door'},
        {
            id: 2, title: 'Danh mục', url: '', icon: 'bi-house-door', showChildren: false,
            children: [
                {id: 1, title: 'Tỉnh/Thành phố', url: ''},
                {id: 2, title: 'Quận/Huyện/Thị xã', url: ''},
                {id: 3, title: 'Xã/Phường/Thị trấn', url: ''},
                {id: 3, title: 'Danh mục loại dịch vụ', url: ''}
            ]
        },
        {
            id: 3, title: 'Nghiệp vụ', url: '', icon: 'bi-house-door', showChildren: false,
            children: [
                {id: 1, title: 'Hợp đồng với đối tác', url: ''},
                {id: 2, title: 'Danh sách phiếu đổi điểm', url: ''},
                {id: 3, title: 'Quản lý đơn mua', url: ''},
                {id: 3, title: 'Quản lý sản phẩm', url: ''},
                {id: 3, title: 'Danh sách đánh giá của khách hàng', url: ''},
                {id: 3, title: 'Quản lý khiếu nại người tiêu dùng', url: ''}
            ]
        },
        {id: 4, title: 'Quản trị người dùng', url: '', icon: 'bi-house-door'},
        {id: 5, title: 'Quản lý thông tin đối tác', url: '', icon: 'bi-house-door'},
        {id: 6, title: 'Cấu hình hệ thống', url: '', icon: 'bi-house-door'},
        {id: 7, title: 'Đối soát', url: '', icon: 'bi-house-door'},
        {id: 8, title: 'Nhật ký hệ thống', url: '', icon: 'bi-house-door'},
        {id: 8, title: 'Nhật ký hệ thống', url: '', icon: 'bi-house-door'},
        {id: 8, title: 'Nhật ký hệ thống', url: '', icon: 'bi-house-door'},
        {id: 8, title: 'Nhật ký hệ thống', url: '', icon: 'bi-house-door'},
        {id: 8, title: 'Nhật ký hệ thống', url: '', icon: 'bi-house-door'},
        {id: 8, title: 'Nhật ký hệ thống', url: '', icon: 'bi-house-door'},
        {id: 9, title: 'Báo cáo thông tin', url: '', icon: 'bi-house-door'}

    ]);
    isCollapsed = signal(false);

    onCollapseMenu(event: MouseEvent, menu: IMenu) {
        if (this.isCollapsed()) {
            // Close any existing overlay
            if (this.overlayRef) {
                this.overlayRef.dispose();
            }

            // Get the clicked element
            const target = event.currentTarget as HTMLElement;

            // Create a position strategy connected to the clicked menu item
            const positionStrategy = this.overlay
                .position()
                .flexibleConnectedTo(target)
                .withPositions([
                    {
                        originX: 'end',
                        originY: 'top',
                        overlayX: 'start',
                        overlayY: 'top',
                        offsetX: 4
                    }
                ]);

            // Create the overlay
            this.overlayRef = this.overlay.create({
                positionStrategy,
                hasBackdrop: true,
                backdropClass: 'cdk-overlay-transparent-backdrop', // Optional: Use a transparent backdrop
            });

            // Attach the template portal to the overlay
            const portal = new TemplatePortal(this.menuTemplate, this.viewContainerRef, {
                menu
            });
            this.overlayRef.attach(portal);

            // Close the overlay when the backdrop is clicked
            this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
            return;
        }

        this.menus.update(oldVal => {
            return oldVal.map(it => {
                if (it.id === menu.id) {
                    it.showChildren = !it.showChildren;
                } else {
                    it.showChildren = false;
                }
                return it;
            });
        });
    }

    onToggleSidebar() {
        this.isCollapsed.set(!this.isCollapsed());
        this.layoutService.toggleSidebar(this.isCollapsed());
    }

    closeOverlay() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }



}

interface IMenu {
    id: number;
    title: string;
    url: string;
    icon?: string;
    showChildren?: boolean;
    children?: IMenu[];
}
