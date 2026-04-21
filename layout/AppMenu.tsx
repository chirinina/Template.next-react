/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: 'Inicio',
            items: [{ label: 'Panel', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Administración',
            items: [
                { label: 'Registro', icon: 'pi pi-fw pi-send', to: '/pages/crud' }
            ]
        },
        {
            label: 'Componentes UI',
            items: [
                { label: 'CRUD', icon: 'pi pi-fw pi-pencil', to: '/pages/crud' },
                { label: 'Diseño de formularios', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                { label: 'Entradas', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                { label: 'Etiqueta flotante', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
                { label: 'Estado inválido', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
                { label: 'Botones', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
                { label: 'Tablas', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
                { label: 'Listas', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
                { label: 'Árbol', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
                { label: 'Paneles', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
                { label: 'Multimedia', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
                { label: 'Menú', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
                { label: 'Mensajes', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
                { label: 'Archivos', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
                { label: 'Gráficos', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
                { label: 'Varios', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
            ]
        },
        {
            label: 'Bloques Prime',
            items: [
                { label: 'Bloques gratis', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
                { label: 'Todos los bloques', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
            ]
        },
        {
            label: 'Utilidades',
            items: [
                { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
                { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
            ]
        },
        {
            label: 'Páginas',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Inicio público',
                    icon: 'pi pi-fw pi-globe',
                    to: '/landing'
                },
                {
                    label: 'Autenticación',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Ingresar',
                            icon: 'pi pi-fw pi-sign-in',
                            to: '/auth/login'
                        },
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            to: '/auth/error'
                        },
                        {
                            label: 'Acceso denegado',
                            icon: 'pi pi-fw pi-lock',
                            to: '/auth/access'
                        }
                    ]
                },

                {
                    label: 'Línea de tiempo',
                    icon: 'pi pi-fw pi-calendar',
                    to: '/pages/timeline'
                },
                {
                    label: 'No encontrado',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    to: '/pages/notfound'
                },
                {
                    label: 'Vacío',
                    icon: 'pi pi-fw pi-circle-off',
                    to: '/pages/empty'
                }
            ]
        },
        {
            label: 'Jerarquía',
            items: [
                {
                    label: 'Submenú 1',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenú 1.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenú 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenú 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenú 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                        {
                            label: 'Submenú 1.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [{ label: 'Submenú 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                        }
                    ]
                },
                {
                    label: 'Submenú 2',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenú 2.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenú 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenú 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                        {
                            label: 'Submenú 2.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [{ label: 'Submenú 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                        }
                    ]
                }
            ]
        },
        {
            label: 'Empezar',
            items: [
                {
                    label: 'Documentación',
                    icon: 'pi pi-fw pi-question',
                    to: '/documentation'
                },
                {
                    label: 'Figma',
                    url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/Diolay-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
                    icon: 'pi pi-fw pi-pencil',
                    target: '_blank'
                },
                {
                    label: 'Ver código fuente',
                    icon: 'pi pi-fw pi-search',
                    url: 'https://github.com/primefaces/Diolay-react-next.js',
                    target: '_blank'
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
