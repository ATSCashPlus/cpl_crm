import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ImageComponent} from '@components/forms/image/image.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        ImageComponent
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

}
