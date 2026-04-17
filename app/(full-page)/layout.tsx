import { Metadata } from 'next';
import AppConfig from '../../layout/AppConfig';
import React from 'react';

interface SimpleLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Diolay',
    description: 'Plataforma moderna para organizar procesos, clientes y operaciones con una experiencia clara y profesional.'
};

export default function SimpleLayout({ children }: SimpleLayoutProps) {
    return (
        <React.Fragment>
            {children}
            <AppConfig simple />
        </React.Fragment>
    );
}
