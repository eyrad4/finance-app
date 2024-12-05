import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styles: [
        `
            :host {
                @apply grid grid-cols-[256px_1fr];

                .main-layout {
                    &__content {
                        width: calc(100vw - 256px);
                    }
                }
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, RouterLink]
})
export class MainLayoutComponent {
    @HostBinding('class')
    private _hostClass = 'main-layout';
}
