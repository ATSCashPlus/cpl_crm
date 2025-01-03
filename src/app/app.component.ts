import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
// Components
import {HeaderComponent} from '@layouts/header/header.component';
import {SidebarComponent} from '@layouts/sidebar/sidebar.component';
import {filter} from 'rxjs';
import {LayoutService} from '@services/layout.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, HeaderComponent, SidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [
        trigger('mainScreenToggle', [
            state('collapsed', style({ paddingLeft: '63px'})),
            state('expanded', style({ paddingLeft: '265px' })),
            transition('collapsed => expanded', [
                animate( '300ms ease-in' )
            ]),
            transition('expanded => collapsed', [
                style({ overflow: 'hidden' }),
                animate( '300ms ease-in' )
            ])
        ])
    ]
})
export class AppComponent implements OnInit{
    private readonly router = inject(Router);
    private readonly translate = inject(TranslateService);
    private readonly activatedRoute = inject(ActivatedRoute);
    readonly layoutService = inject(LayoutService);

    isShowHeader = signal(false);
    isShowSidebar = signal(false);

    constructor() {
        this.translate.addLangs(['en', 'vi']);
        this.translate.setDefaultLang('vi');
        this.translate.use('vi');
    }

    ngOnInit() {

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(async () => {
                let currentRoute = this.activatedRoute;
                while (currentRoute.firstChild) {
                    currentRoute = currentRoute.firstChild;
                }

                currentRoute.data.subscribe(data => {
                    this.isShowSidebar.set(data['showSidebar']);
                    this.isShowHeader.set(data['showHeader']);
                });
            });


    }

    generateMainScreenState(): string {
        if (!this.isShowSidebar()) {
            return '';
        }
        return this.layoutService.sidebarCollapsed() ? 'collapsed' : 'expanded';
    }
}
