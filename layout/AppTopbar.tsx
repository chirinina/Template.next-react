/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '@/types';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const iconStyle: React.CSSProperties = {
        fontSize: '1rem',
        transition: 'color 0.3s, background-color 0.3s',
        borderRadius: '50%',
        padding: '0.25rem'
    };

    const buttonHoverClass = 'hover:text-primary hover:bg-primary/10';

    return (
        <div className="layout-topbar flex align-items-center justify-content-between px-3">

            <div className="flex align-items-center gap-3">
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
                        <span>Agenda</span>
                    </button>

                    <button
                        type="button"
                        className={classNames('p-link layout-topbar-button', buttonHoverClass)}
                    >
                        <i className="pi pi-user" style={iconStyle}></i>
                        <span>Perfil</span>
                    </button>

                    <Link href="/documentation">
                        <button
                            type="button"
                            className={classNames('p-link layout-topbar-button', buttonHoverClass)}
                        >
                            <i className="pi pi-cog" style={iconStyle}></i>
                            <span>Configuración</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
