import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    sidebarCollapsed = signal(false);

    toggleSidebar(flag: boolean) {
        this.sidebarCollapsed.set(flag);
    }
}
