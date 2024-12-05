import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { BalanceService } from '../services/balance.service';

@Component({
    standalone: true,
    selector: 'app-balance',
    template: `
        <div class="flex items-center gap-2">
            <span class="text-nowrap">Total balance:</span>
            <span class=" text-[#00DDDD] text-xl font-bold text-nowrap truncate">$ {{ _currentBalance() }}</span>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BalanceService]
})
export class BalanceComponent {
    protected readonly _currentBalance = toSignal(inject(BalanceService)?.currentBalance() ?? 0);
}
