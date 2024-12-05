import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet } from '@angular/router';

import { BalanceService } from '@finance-app/features/balance';

@Component({
    standalone: true,
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styles: [
        `
            :host {
                .main-menu {
                    &-item {
                        @apply font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400
                               dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500;

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
    imports: [RouterOutlet, RouterLink],
    providers: [BalanceService]
})
export class MainLayoutComponent {
    @HostBinding('class')
    private _hostClass = 'main-layout';

    protected readonly _currentBalance = toSignal(inject(BalanceService)?.currentBalance() ?? 0);
}
