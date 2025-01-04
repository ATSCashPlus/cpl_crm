import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
    selector: 'app-loading',
    standalone: true,
    imports: [],
    templateUrl: './loading.component.html',
    styleUrl: './loading.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
    type = input<'COMPONENT' | 'PAGE'>('COMPONENT');
}
