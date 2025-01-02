import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
// Components
import {HeaderComponent} from '@layouts/header/header.component';
import {SidebarComponent} from '@layouts/sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, HeaderComponent, SidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent{
    constructor(private translate: TranslateService) {
        this.translate.addLangs(['en', 'vi']);
        this.translate.setDefaultLang('vi');
        this.translate.use('vi');
    }
}
