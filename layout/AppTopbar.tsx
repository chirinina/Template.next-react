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
        category: 'Agenda',
        title: 'Reunión de equipo',
        detail: 'Hoy, 16:30',
        time: 'Hoy',
        priority: 'Próximo'
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
                <button
                    ref={menubuttonRef}
                    type="button"
                    className={classNames('p-link layout-menu-button layout-topbar-button')}
                    onClick={onMenuToggle}
                    aria-label="Abrir menu"
                >
                    <span className="layout-topbar-icon">
                        <TopbarIcon name="menu" />
                    </span>
                </button>
                <span className="font-bold text-lg">
                    <span className="text-primary">Dio</span>lay
                </span>
            </div>

            <div className="flex align-items-center gap-2">
                <button
                    ref={topbarmenubuttonRef}
                    type="button"
                    className={classNames('p-link layout-topbar-menu-button layout-topbar-button')}
                    onClick={showProfileSidebar}
                    aria-label="Abrir accesos rapidos"
                >
                    <span className="layout-topbar-icon">
                        <TopbarIcon name="more" />
                    </span>
                </button>

                <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                    <button
                        type="button"
                        className={classNames('p-link layout-topbar-button')}
                        aria-label="Calendario"
                        onClick={(event) => calendarOverlayRef.current?.toggle(event)}
                    >
                        <span className="layout-topbar-icon">
                            <TopbarIcon name="calendar" />
                        </span>
                        <span className="layout-topbar-label">Calendario</span>
                    </button>

                    <button
                        type="button"
                        className={classNames('p-link layout-topbar-button layout-topbar-notification')}
                        aria-label="Notificaciones"
                        onClick={(event) => notificationsOverlayRef.current?.toggle(event)}
                    >
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
                <div className="layout-topbar-panel-header">
                   
                </div>
                <div className="layout-topbar-calendar-shell">
                    <div className="layout-topbar-calendar-overview">
                        <div className="layout-topbar-calendar-hero">
                            
                          
                        </div>
                        <div className="layout-topbar-calendar-meta">
                        </div>
                    </div>
                    <Calendar inline value={selectedDate} onChange={(e) => setSelectedDate(e.value as Date | null)} />
                </div>
            </OverlayPanel>

            <OverlayPanel ref={notificationsOverlayRef} showCloseIcon className="layout-topbar-panel layout-topbar-notifications-panel">
                
                <div className="layout-topbar-notification-hero">
                    <div className="layout-topbar-notification-hero-copy">
                        <small>Notifcaciones</small>
                        
                        <p>Solo lo importante, en orden y sin ruido.</p>
                    </div>
                    <div className="layout-topbar-notification-summary">
                        <div className="layout-topbar-summary-card">
                            <strong>03</strong>
                            <span>Sin leer</span>
                        </div>
                        <div className="layout-topbar-summary-card">
                            <strong>08</strong>
                            <span>Hoy</span>
                        </div>
                        <div className="layout-topbar-summary-card">
                            <strong>02</strong>
                            <span>Alta</span>
                        </div>
                    </div>
                </div>
                <div className="layout-topbar-filter-row">
                    <span className="layout-topbar-filter is-active">Todas</span>
                    <span className="layout-topbar-filter">Alta</span>
                    <span className="layout-topbar-filter">Sistema</span>
                </div>
                <div className="layout-topbar-notification-list">
                    {notifications.map((notification) => (
                        <div key={notification.title} className="layout-topbar-notification-item">
                            <span className="layout-topbar-notification-dot" />
                            <div className="layout-topbar-notification-content">
                                <div className="layout-topbar-notification-meta">
                                    <span>{notification.category}</span>
                                    <small>{notification.priority}</small>
                                </div>
                                <strong>{notification.title}</strong>
                                <p>{notification.detail}</p>
                                <div className="layout-topbar-notification-footer">
                                    <div className="layout-topbar-notification-tags">
                                        <small>{notification.time}</small>
                                        <span>{notification.priority}</span>
                                    </div>
                                    <button type="button" className="layout-topbar-inline-action">
                                        Ver
                                    </button>
                                </div>
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
