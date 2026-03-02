/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    // Estilo personalizado para íconos más pequeños y hover
    const iconStyle: React.CSSProperties = {
        fontSize: '1rem', // ícono más pequeño
        transition: 'color 0.3s, background-color 0.3s',
        borderRadius: '50%',
        padding: '0.25rem',
    };

    const buttonHoverClass = 'hover:text-primary hover:bg-primary/10'; // fondo primario con opacidad ligera

    return (
        <div className="layout-topbar flex align-items-center justify-content-between px-3">

            {/* IZQUIERDA: Logo + Hamburguesa */}
            <div className="flex align-items-center gap-3">

                {/* Botón Hamburguesa más cerca del logo */}
                <button
                    ref={menubuttonRef}
                    type="button"
                    className={classNames(
                        'p-link layout-menu-button layout-topbar-button',
                        buttonHoverClass
                    )}
                    onClick={onMenuToggle}
                >
                    <i className="pi pi-bars" style={iconStyle} />
                </button>
                <span className="font-bold text-lg">
                <span className="text-primary">Dio</span>lay
                </span>
            </div>

            {/* DERECHA: Menú */}
            <div className="flex align-items-center gap-2">

                <button
                    ref={topbarmenubuttonRef}
                    type="button"
                    className={classNames(
                        'p-link layout-topbar-menu-button layout-topbar-button',
                        buttonHoverClass
                    )}
                    onClick={showProfileSidebar}
                >
                    <i className="pi pi-ellipsis-v" style={iconStyle} />
                </button>

                <div
                    ref={topbarmenuRef}
                    className={classNames(
                        'layout-topbar-menu',
                        { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible }
                    )}
                >
                    <button
                        type="button"
                        className={classNames('p-link layout-topbar-button', buttonHoverClass)}
                    >
                        <i className="pi pi-calendar" style={iconStyle}></i>
                        <span>Calendar</span>
                    </button>

                    <button
                        type="button"
                        className={classNames('p-link layout-topbar-button', buttonHoverClass)}
                    >
                        <i className="pi pi-user" style={iconStyle}></i>
                        <span>Profile</span>
                    </button>

                    <Link href="/documentation">
                        <button
                            type="button"
                            className={classNames('p-link layout-topbar-button', buttonHoverClass)}
                        >
                            <i className="pi pi-cog" style={iconStyle}></i>
                            <span>Settings</span>
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
