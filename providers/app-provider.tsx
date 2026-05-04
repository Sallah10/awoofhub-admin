'use client';
import { Notifications } from '@/components/notifications/Notifications';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import ReactQueryProvider from './react-query-provider';

export default function AppProvider({ children }: { children: ReactNode }) {
    return (
        <>
            <Notifications />
            <ReactQueryProvider>
                <ReactQueryDevtools initialIsOpen={false} />
                    {children}
            </ReactQueryProvider>
        </>
    );
} 