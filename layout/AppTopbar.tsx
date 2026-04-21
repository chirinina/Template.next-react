'use client';

/* eslint-disable @next/next/no-img-element */

import { Calendar } from 'primereact/calendar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { AppTopbarRef, LayoutState } from '@/types';
import { LayoutContext } from './context/layoutcontext';

type TopbarIconName = 'menu' | 'more' | 'calendar' | 'bell' | 'settings';

const notifications = [
    {
        category: 'Proyecto',
        title: 'Entrega de informe',
        detail: 'Mañana, 16:30',
        time: 'Mañana',
        priority: 'Próximo'
    },
    {
        category: 'Sistema',
        title: 'Actualización disponible',
        detail: 'Disponible para descargar',
        time: 'Hace 2 horas',
        priority: 'Media'
    },
    {
        category: 'Seguridad',
        title: 'Intento de inicio de sesión sospechoso',
        detail: 'Desde una nueva ubicación',
        time: 'Hace 30 minutos',
        priority: 'Alta'
    },
    {
        category: 'Redes Sociales',
        title: 'Nuevo mensaje de Juan',
        detail: '¿Quieres salir esta noche?',
        time: 'Hace 10 minutos',
        priority: 'Baja'
    }
];

const TopbarIcon = ({ name }: { name: TopbarIconName }) => {
    const sharedProps = {
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        strokeWidth: 1.8
    };

    switch (name) {
        case 'menu':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path {...sharedProps} d="M4 7.5h16M4 12h16M4 16.5h16" />
                </svg>
            );
        case 'more':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="5.5" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="18.5" r="1.5" fill="currentColor" />
                </svg>
            );
        case 'calendar':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path {...sharedProps} d="M7 3.75v2.5M17 3.75v2.5M4.75 9.25h14.5M6.25 5.75h11.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-1.5 1.5H6.25a1.5 1.5 0 0 1-1.5-1.5V7.25a1.5 1.5 0 0 1 1.5-1.5Z" />
                </svg>
            );
        case 'bell':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path {...sharedProps} d="M12 4.75a4.75 4.75 0 0 0-4.75 4.75v1.08c0 .9-.28 1.78-.81 2.52l-1 1.4a1 1 0 0 0 .81 1.58h11.5a1 1 0 0 0 .81-1.58l-1-1.4a4.38 4.38 0 0 1-.81-2.52V9.5A4.75 4.75 0 0 0 12 4.75Z" />
                    <path {...sharedProps} d="M9.75 18.25a2.25 2.25 0 0 0 4.5 0" />
                </svg>
            );
        case 'settings':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        {...sharedProps}
                        d="M12 4.75a1.5 1.5 0 0 1 1.47 1.18l.22 1.01a5.95 5.95 0 0 1 1.34.56l.92-.45a1.5 1.5 0 0 1 1.83.32l.85.85a1.5 1.5 0 0 1 .32 1.83l-.45.92c.23.42.42.86.56 1.34l1.01.22A1.5 1.5 0 0 1 19.25 12a1.5 1.5 0 0 1-1.18 1.47l-1.01.22a5.95 5.95 0 0 1-.56 1.34l.45.92a1.5 1.5 0 0 1-.32 1.83l-.85.85a1.5 1.5 0 0 1-1.83.32l-.92-.45a5.95 5.95 0 0 1-1.34.56l-.22 1.01A1.5 1.5 0 0 1 12 19.25a1.5 1.5 0 0 1-1.47-1.18l-.22-1.01a5.95 5.95 0 0 1-1.34-.56l-.92.45a1.5 1.5 0 0 1-1.83-.32l-.85-.85a1.5 1.5 0 0 1-.32-1.83l.45-.92a5.95 5.95 0 0 1-.56-1.34l-1.01-.22A1.5 1.5 0 0 1 4.75 12a1.5 1.5 0 0 1 1.18-1.47l1.01-.22c.14-.48.33-.92.56-1.34l-.45-.92a1.5 1.5 0 0 1 .32-1.83l.85-.85a1.5 1.5 0 0 1 1.83-.32l.92.45c.42-.23.86-.42 1.34-.56l.22-1.01A1.5 1.5 0 0 1 12 4.75Z"
                    />
                    <circle cx="12" cy="12" r="2.75" {...sharedProps} />
                </svg>
            );
    }
};

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar, setLayoutState } = useContext(LayoutContext);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const menubuttonRef = useRef<HTMLButtonElement>(null);
    const topbarmenuRef = useRef<HTMLDivElement>(null);
    const topbarmenubuttonRef = useRef<HTMLButtonElement>(null);
    const calendarOverlayRef = useRef<OverlayPanel>(null);
    const notificationsOverlayRef = useRef<OverlayPanel>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const openConfigSidebar = () => {
        setLayoutState((prevState: LayoutState) => ({
            ...prevState,
            configSidebarVisible: true,
            profileSidebarVisible: false
        }));
    };

    const todayLabel = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(new Date());
    const dayNumber = new Intl.DateTimeFormat('es-ES', { day: '2-digit' }).format(new Date());
    const monthLabel = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(new Date());
    const fullMonthLabel = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(new Date());

    return (
        <div className="layout-topbar flex align-items-center justify-content-between px-3">
            <div className="flex align-items-center gap-3">
                <button ref={menubuttonRef} type="button" className={classNames('p-link layout-menu-button layout-topbar-button')} onClick={onMenuToggle} aria-label="Abrir menu">
                    <span className="layout-topbar-icon">
                        <TopbarIcon name="menu" />
                    </span>
                </button>
                <span className="font-bold text-lg">
                    <span className="text-primary">Dio</span>lay
                </span>
            </div>

            <div className="flex align-items-center gap-2">
                <button ref={topbarmenubuttonRef} type="button" className={classNames('p-link layout-topbar-menu-button layout-topbar-button')} onClick={showProfileSidebar} aria-label="Abrir accesos rapidos">
                    <span className="layout-topbar-icon">
                        <TopbarIcon name="more" />
                    </span>
                </button>

                <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                    <button type="button" className={classNames('p-link layout-topbar-button')} aria-label="Calendario" onClick={(event) => calendarOverlayRef.current?.toggle(event)}>
                        <span className="layout-topbar-icon">
                            <TopbarIcon name="calendar" />
                        </span>
                        <span className="layout-topbar-label">Calendario</span>
                    </button>

                    <button type="button" className={classNames('p-link layout-topbar-button layout-topbar-notification')} aria-label="Notificaciones" onClick={(event) => notificationsOverlayRef.current?.toggle(event)}>
                        <span className="layout-topbar-icon">
                            <TopbarIcon name="bell" />
                        </span>
                        <span className="layout-topbar-badge">3</span>
                        <span className="layout-topbar-label">Notificaciones</span>
                    </button>

                    <button type="button" className={classNames('p-link layout-topbar-button')} aria-label="Configuracion" onClick={openConfigSidebar}>
                        <span className="layout-topbar-icon">
                            <TopbarIcon name="settings" />
                        </span>
                        <span className="layout-topbar-label">Configuración</span>
                    </button>

                    <button type="button" className={classNames('p-link layout-topbar-button layout-topbar-profile')} aria-label="Perfil">
                        <span className="layout-topbar-avatar">
                            <img src="/demo/images/avatar/profile.jpg" alt="Avatar de perfil" />
                        </span>
                        <span className="layout-topbar-profile-copy">
                            <strong>Efrain Chiri</strong>
                            <small>Administrador</small>
                        </span>
                        <span className="layout-topbar-label">Perfil</span>
                    </button>
                </div>
            </div>

            <OverlayPanel ref={calendarOverlayRef} showCloseIcon className="layout-topbar-panel layout-topbar-calendar-panel">
                <div className="layout-topbar-panel-header"></div>
                <div className="layout-topbar-calendar-shell">
                    <div className="layout-topbar-calendar-overview">
                        <div className="layout-topbar-calendar-hero"></div>
                        <div className="layout-topbar-calendar-meta"></div>
                    </div>
                    <Calendar inline value={selectedDate} onChange={(e) => setSelectedDate(e.value as Date | null)} />
                </div>
            </OverlayPanel>
            <OverlayPanel ref={notificationsOverlayRef} showCloseIcon className="layout-topbar-panel layout-topbar-notifications-panel">
                <div className="layout-topbar-notification-hero">
                    <div className="flex flex-col rounded-lg shadow-lg ring-1 ring-blue-500 backdrop-blur-md">
                        <small className="text-xs font-bold tracking-wide text-blue-700">Notificaciones</small>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center justify-center rounded-xl  shadow-md border border-gray-100 p-4 hover:shadow-lg transition">
                            <strong className="text-2xl font-bold text-gradient-900">03 </strong>
                            <span className="text-sm mt-1">Sin leer</span>
                        </div>

                        <div className="flex flex-col items-center justify-center rounded-xl  shadow-md border border-gray-100 p-4 hover:shadow-lg transition">
                            <strong className="text-2xl font-bold text-blue-600">08 </strong>
                            <span className="text-sm  mt-1">Hoy</span>
                        </div>

                        <div className="flex flex-col items-center justify-center rounded-xl  shadow-md border border-gray-100 p-4 hover:shadow-lg transition">
                            <strong className="text-2xl font-bold text-red-600">02 </strong>
                            <span className="text-sm mt-1">Alta</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg shadow-md ring-1 ring-gray-200">
                    <span className="px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 bg-indigo-100 ring-1 ring-indigo-200 cursor-pointer">Todas</span>
                    <span className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Alta</span>
                    <span className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Baja</span>
                    <span className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">Medio</span>
                    <span className="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">En espera</span>
                </div>
                <div className="space-y-6 rounded-lg shadow-lg ring-1 ring-gray-200 max-w-xl mx-auto">
                    {notifications.map((notification) => (
                        <div key={notification.title} className="flex items-start space-x-4 p-4 rounded-xl transition duration-200">
                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 self-center" />
                            <div className="flex-1">
                                <small className="text-xs text-blue-400">{notification.priority}</small>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm font-semibold text-yellow-600">{notification.category}</span>
                                </div>
                                <strong className="text-xl font-medium">{notification.title}</strong>
                                <p className="text-sm text-gray-500 font-semibold mt-1">{notification.detail}</p>
                                <div className="flex justify-between items-center mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </OverlayPanel>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
