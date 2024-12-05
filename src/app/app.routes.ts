import { Routes } from '@angular/router';

import { MainLayoutComponent } from '@finance-app/shared/ui-kit';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'transactions',
                loadComponent: () => import('@finance-app/features/transaction').then((c) => c.TransactionListComponent)
            },
            {
                path: 'operation',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('@finance-app/features/operation/upsert').then((c) => c.OperationUpsertComponent)
                    },
                    {
                        path: ':id',
                        loadComponent: () => import('@finance-app/features/operation/upsert').then((c) => c.OperationUpsertComponent)
                    }
                ]
            }
        ]
    }
];
