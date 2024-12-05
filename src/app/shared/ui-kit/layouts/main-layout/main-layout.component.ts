import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styles: [
        `
            :host {
                .main-menu {
                    &-item {
                        @apply font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500;

                        &.active {
                            @apply font-medium focus:outline-none;

                            color: #00dddd;
                        }
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
