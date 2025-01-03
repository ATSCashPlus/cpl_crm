import {
    ChangeDetectionStrategy,
    Component,
    inject, OnInit,
    signal,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {RouterModule} from '@angular/router';
import {StorageService} from '@services/storage.service';
import {EStorageKey} from '@constants/store-key';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
    @ViewChild('userMenuTemplate') userMenuTemplate!: TemplateRef<any>;
    private readonly storageService = inject(StorageService);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly overlay = inject(Overlay);

    avatar = signal('');
    username = signal('');

    ngOnInit(): void {
        this.avatar.set(this.storageService.getItem(EStorageKey.AVATAR) ?? '');
        this.username.set(this.storageService.getItem(EStorageKey.USERNAME) ?? '');
    }

    onOpenMenu(event: MouseEvent) {
        const target = event.currentTarget as HTMLElement;

        // Create a position strategy connected to the clicked menu item
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(target)
            .withPositions([
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                    offsetY: 4
                }
            ]);

        // Create the overlay
        const overlayRef = this.overlay.create({
            positionStrategy,
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop'
        });

        // Attach the template portal to the overlay
        const portal = new TemplatePortal(this.userMenuTemplate, this.viewContainerRef);
        overlayRef.attach(portal);

        // Close the overlay when the backdrop is clicked
        overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
        return;
    }
}
